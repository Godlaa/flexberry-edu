import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  showValidations: false,
  errorLogger: service(),

  actions: {
    async saveMeeting(meeting) {
      this.set('showValidations', true);
      try {
        if (meeting.validations.isValid) {
          let meetingModel = this.get('model');
          meetingModel.set('date', meeting.date);
          meetingModel.set('reports', meeting.reports);
          meetingModel.set('user', this.get('currentUser.user'));
          meetingModel.serialize();
          await meetingModel.save();
          this.transitionToRoute('meetings');
        }
      }
      catch(e) {
        this.errorLogger.logError(e);
        this.send('error', e);
      }
    },
    deleteReport(report) {
      try {
        report.destroyRecord();
      }
      catch(e) {
        this.errorLogger.logError(e);
        this.send('error', e);
      }
    },
    cancel(meeting) {
      meeting.rollbackAttributes();
      this.transitionToRoute('meetings');
    }
  }
});
