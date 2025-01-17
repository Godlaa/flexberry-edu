/* eslint-disable no-undef */
/* eslint-disable no-console */
// eslint-disable-next-line no-undef
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const moment = require('moment')
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fetch = require('node-fetch');

const secretKey = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';
const hashingSecret = "f844b09ff50c";
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const RECAPTCHA_SECRET = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

const generateAccessToken = (userData) => {
  return jwt.sign(userData, secretKey, { expiresIn: '1800s' });
}

const getErrors = (errorsToSend) => {
  let errors = [];
  if (errorsToSend && Array.isArray(errorsToSend)) {
    errors = [...errorsToSend];
  }

  return {
    errors
  };
};

const getError = (title, detail, status, pathToAttribute) => {
  let errors = [];
  errors.push({
    title,
    detail,
    status,
    source: pathToAttribute ? { pointer: pathToAttribute } : null
  });

  return getErrors(errors);
};

const getUnauthorizedError = () => getError('Login', 'You are not authorized, please log in', 401, null);
const getForbiddenError = () => getError('Forbidden', 'You don\'t have permissions to this resource', 403, null);

const getBaseRoute = (req) => {
  const path = req.path.split('/');
  return path.length > 1 ? path[1] : '/';
};

const isAuthorized = (req) => {
  const baseRoute = getBaseRoute(req);
  console.log(req.path);
  if (req.path === '/log-error' || req.path === '/recaptcha' || req.path === '/upload' || req.path === '/users' || req.path === '/token' || ((baseRoute === 'speakers' || baseRoute === 'books' || baseRoute === 'meetings') && req.method === 'GET')) {
    return 200;
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return 401;
  }

  try {
    let user = jwt.verify(token, secretKey);
    req.app.set('sessionUser', user);
    return 200;
  }
  catch (e) {
    return 403;
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Уникальное имя файла
  }
});

const upload = multer({ storage: storage });

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.post('/log-error', (req, res) => {
  const errorData = req.body;
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  errorData.ip = clientIp;

  console.log('Error logged:', errorData);
  res.status(200).send(errorData);
});

server.post('/token', function (req, res) {
  const emailFromBody = req.body.email;
  const passwordFromBody = req.body.password;
  const hashedPassword = crypto.createHmac('sha256', hashingSecret).update(passwordFromBody).digest('hex');

  const db = router.db; //lowdb instance
  const user = db.get('users').find({ email: emailFromBody, password: hashedPassword }).value();

  if (user) {
    const token = generateAccessToken({ email: user.email });
    res.json({ token });
  }
  else {
    res.status(401).json(getError('Login', 'Error logging in user with that e-mail and password', 401, null));
  }
});

// Check authorization
server.use((req, res, next) => {
  const authorizeCode = isAuthorized(req);
  if (authorizeCode === 200) {
    next() // continue to JSON Server router
  }
  else if (authorizeCode === 401) {
    res.status(401).json(getUnauthorizedError());
  }
  else if (authorizeCode === 403) {
    res.status(403).json(getForbiddenError());
  }
  else {
    res.status(403).json(getForbiddenError());
  }
});

// Get current user
server.use((req, res, next) => {
  if (req.path === '/users/me' && req.method === 'GET') {
    let storedUser = req.app.get('sessionUser');
    if (!storedUser) {
      res.sendStatus(404);
    }
    else {
      const db = router.db; //lowdb instance
      const user = db.get('users').find({ email: storedUser.email }).value();
      const userCopy = Object.assign({}, user);

      delete userCopy.password;
      delete userCopy.passwordConfirmation;
      res.json(userCopy);
    }
  }
  else {
    next();
  }
});

// Disable get, modify or delete users
server.use((req, res, next) => {
  if (getBaseRoute(req) === 'users' && (req.method === 'PATCH' || req.method === 'DELETE')) {
    res.sendStatus(404);
  }
  else if (getBaseRoute(req) === 'users' && req.method === 'GET') {
    let urlSegms = req.url.split('/');
    let idStr = urlSegms[urlSegms.length - 1];
    let id = parseInt(idStr);
    id = isNaN(id) ? idStr : id;

    const db = router.db; //lowdb instance
    const user = db.get('users').find({ id: id }).value();
    const userCopy = Object.assign({}, user);

    delete userCopy.password;
    delete userCopy.passwordConfirmation;
    res.json(userCopy);
  }
  else {
    // Continue to JSON Server router
    next();
  }
});

// Validate user to add
server.use((req, res, next) => {
  const db = router.db; //lowdb instance
  const email = db.get('users').find({ email: req.body.email }).value();

  const valid = !req.body || req.body && !email;
  if (getBaseRoute(req) === 'users' && req.method === 'POST' && !valid) {
    res.status(422).json(getError('Email', 'email is already taken', 422, '/data/attributes/email'));
  }
  else if (getBaseRoute(req) === 'users' && req.method === 'POST') {
    const hashedPassword = crypto.createHmac('sha256', hashingSecret).update(req.body.password).digest('hex');
    req.body.password = hashedPassword;
    req.body.passwordConfirmation = hashedPassword;
    next();
  }
  else {
    // Continue to JSON Server router
    next();
  }
});

server.use(async (request, response, next) => {
  if (request.path === '/recaptcha' && request.query.key) {
    const { success } = await (await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET}&response=${request.query.key}`,
    })).json();

    response.json({ success });
  } else {
    next();
  }
});

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

server.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.json({
      filename: `uploads/${req.file.filename}`,
      message: 'Файл успешно загружен'
    });
  } else {
    res.status(400).json({ message: 'Ошибка загрузки файла' });
  }
});
// Use default router
server.use(router)

let port = 3000;
server.listen(port, () => {
  console.log(`JSON Server is running at port ${port}`);
})
