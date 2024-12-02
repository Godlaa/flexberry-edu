import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async saveMeeting(meeting) {
      let newMeeting = this.store.createRecord('meeting', meeting);
      await newMeeting.save();
      this.transitionToRoute('meetings');
    },
    cancel() {
      this.transitionToRoute('meetings');
    }
  }
});
