import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    saveMeeting(meeting) {
      let meetingModel = this.get('model');
      meetingModel.setProperties(meeting);
      meetingModel.save();
    },
    deleteReport(report) {
      report.destroyRecord();
    }
  }
});
