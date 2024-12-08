import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
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
      let reportModel = this.get('model');
      reportModel.set('feedback', report.feedback);
      reportModel.set('videoURL', report.videoURL);
      reportModel.set('presentationURL', report.presentationURL);
      reportModel.set('bookRate', report.bookRate);
      reportModel.serialize();
      await reportModel.save();
      this.transitionToRoute('meetings-edit', this.get('model.meeting'));
    },
    updateSpeaker(selectedSpeakerId) {
      let selectedSpeaker = this.get('speakers').findBy('id', selectedSpeakerId);
      this.set('model.speaker', selectedSpeaker);
    },
    updateBook(selectedBookId) {
      let selectedBook = this.get('books').findBy('id', selectedBookId);
      this.set('model.book', selectedBook);
    },
    cancel() {
      this.transitionToRoute('meetings');
    }
  }
});
