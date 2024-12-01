import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async saveSpeaker(speaker) {
      let newSpeaker = this.get('store').createRecord('speaker', speaker);
      await newSpeaker.save();
      this.transitionToRoute('speakers');
    },
    cancel() {
      this.transitionToRoute('speakers');
    }
  }
});
