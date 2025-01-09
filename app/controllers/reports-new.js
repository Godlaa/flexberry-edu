import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  errorLogger: service(),
  actions: {
    async saveReport(report) {
      try {
        let speaker = await this.store.findRecord('speaker', this.get('model.speaker'));
        let book = await this.store.findRecord('book', this.get('model.book'));
        let meeting = await this.get('model.meeting');
        let newReport = this.store.createRecord('report', {
          user: this.get('currentUser.user'),
          feedback: report.feedback,
          videoURL: report.videoURL,
          presentationURL: report.presentationURL,
          bookRate: report.bookRate,
          speaker: speaker,
          book: book,
          meeting: meeting
        });
        newReport.serialize();
        await newReport.save();
        this.transitionToRoute('meetings-edit', this.get('model.meeting'));
      }
      catch (error) {
        this.errorLogger.logError(error);
      }
    },
    updateSpeaker(selectedSpeakerId) {
      this.set('model.speaker', selectedSpeakerId);
    },
    updateBook(selectedBookId) {
      this.set('model.book', selectedBookId);
    },
    cancel() {
      this.transitionToRoute('meetings');
    }
  }
});
