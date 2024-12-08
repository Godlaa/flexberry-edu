import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async saveMeeting(meeting) {
      let meetingModel = this.get('model');
      meetingModel.set('date', meeting.date);
      meetingModel.set('reports', meeting.reports);
      meetingModel.serialize();
      await meetingModel.save();
      this.transitionToRoute('meetings');
    },
    deleteReport(report) {
      report.destroyRecord();
    },
    cancel() {
      this.transitionToRoute('meetings');
    }
  }
});
