/* eslint-disable no-console */
// eslint-disable-next-line no-undef
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const moment = require('moment')
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

function responseInterceptor(req, res, next) {
  var originalSend = res.send;

  res.send = function() {
    let body = arguments[0];

    if (req.method === 'DELETE') {
      let urlSegms = req.url.split('/');
      let idStr = urlSegms[urlSegms.length - 1];
      let id = idStr;
      id = isNaN(id) ? idStr : id;

      let newBody = Object.assign({}, JSON.parse(body));
      newBody.id = id;
      arguments[0] = JSON.stringify(newBody);
    }

    originalSend.apply(res, arguments);
  };

  next();
}

server.use(responseInterceptor);

server.use((req, res, next) => {
  const speaker = req.query.speakerSelected !== undefined ? Number(req.query.speakerSelected) : null;
  const book = req.query.bookSelected !== undefined ? Number(req.query.bookSelected) : null;
  const date = req.query.meetingDate || null;
  const limit = req.query.limit !== undefined ? Number(req.query.limit) : null;
  const page = req.query.page !== undefined ? Number(req.query.page) : 1;

  const isValidNumber = (val) => !isNaN(Number(val)) && val !== null;

  if (
    req.method === 'GET' &&
    req.path === '/meetings' &&
    (isValidNumber(speaker) || isValidNumber(book) || date)
  ) {
    let reports = router.db.get('reports')
      .filter((r) =>
        (!isValidNumber(speaker) || r.speakerId === speaker) &&
        (!isValidNumber(book) || r.bookId === book)
      )
      .value();

    const uniqueMeetingIds = [...new Set(reports.map(r => r.meetingId))];

    let meetings = router.db.get('meetings')
      .filter((m) => (
        !date || moment(m.date).format('YYYY-MM-DD') === date
      ))
      .filter((m) => uniqueMeetingIds.includes(m.id))
      .value();

    meetings = meetings.map((meeting) => {
    const relatedReports = reports.filter((report) => report.meetingId === meeting.id);
    return { ...meeting, reports: relatedReports };
    });

    if (limit && page) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      meetings = meetings.slice(startIndex, endIndex);
    }

    res.json(meetings);
  } else {
    next();
  }
});


// Use default router
server.use(router)

let port = 3000;
server.listen(port, () => {
  console.log(`JSON Server is running at port ${port}`);
})
