import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  showValidations: false,
  actions: {
    async saveMeeting(meeting) {
      this.set('showValidations', true);
      if (meeting.validations.isValid) {
        let meetingModel = this.get('model');
        meetingModel.set('date', meeting.date);
        meetingModel.set('reports', meeting.reports);
        meetingModel.set('user', this.get('currentUser.user'));
        meetingModel.serialize();
        await meetingModel.save();
        this.transitionToRoute('meetings');
      }
    },
    deleteReport(report) {
      report.destroyRecord();
    },
    cancel(meeting) {
      meeting.rollbackAttributes();
      this.transitionToRoute('meetings');
    }
  }
});
