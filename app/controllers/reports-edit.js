import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async saveReport(report) {
      let reportModel = this.get('model');
      reportModel.setProperties(report);
      await reportModel.save();
      this.transitionToRoute('meetings');
    },
    cancel() {
      this.transitionToRoute('meetings');
    }
  }
});
