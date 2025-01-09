import Controller from '@ember/controller';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  showValidations: false,
  errorLogger: service(),
  init() {
    this._super(...arguments);
    this.get('store').findAll('meeting').then((meetings) => {
      let books = A();
      meetings.forEach((meeting) => {
        meeting.reports.forEach((report) => {
          let book = report.book;
          if (!books.findBy('id', book.get('id'))) {
            books.pushObject(book);
          }
        });
      });
      this.set('books', books);
    });
    this.get('store').findAll('speaker').then((speakers) => {
      let speakersList = A();
      speakers.forEach((speaker) => {
        if (!speakersList.findBy('id', speaker.get('id'))) {
          speakersList.pushObject(speaker);
        }
      });
      this.set('speakers', speakersList);
    });
  },
  actions: {
    async saveReport(report) {
      this.set('showValidations', true);
      try {
        if (report.validations.isValid) {
          let reportModel = this.get('model');
          reportModel.set('feedback', report.feedback);
          reportModel.set('videoURL', report.videoURL);
          reportModel.set('presentationURL', report.presentationURL);
          reportModel.set('bookRate', report.bookRate);
          reportModel.set('user', this.get('currentUser.user'));
          reportModel.serialize();
          await reportModel.save();
          this.transitionToRoute('meetings-edit', this.get('model.meeting'));
        }
      }
      catch(e) {
        this.errorLogger.logError(e);
        this.send('error', e);
      }
    },
    updateSpeaker(selectedSpeakerId) {
      try {
      let selectedSpeaker = this.get('speakers').findBy('id', selectedSpeakerId);
      this.set('model.speaker', selectedSpeaker);
      }
      catch(e) {
        this.errorLogger.logError(e);
        this.send('error', e);
      }
    },
    updateBook(selectedBookId) {
      try {
      let selectedBook = this.get('books').findBy('id', selectedBookId);
      this.set('model.book', selectedBook);
      }
      catch(e) {
        this.errorLogger.logError(e);
        this.send('error', e);
      }
    },
    cancel(report) {
      report.rollbackAttributes();
      this.transitionToRoute('meetings');
    }
  }
});
