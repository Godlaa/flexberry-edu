import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  actions: {
    async saveSpeaker(speaker) {
      speaker.user = this.get('currentUser.user');
      let newSpeaker = this.get('store').createRecord('speaker', speaker);
      await newSpeaker.save();
      this.transitionToRoute('speakers');
    },
    cancel() {
      this.transitionToRoute('speakers');
    }
  }
});
