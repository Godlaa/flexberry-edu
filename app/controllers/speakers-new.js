import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  errorLogger: service(),
  actions: {
    async saveSpeaker(speaker) {
      try {
        speaker.user = this.get('currentUser.user');
        let newSpeaker = this.get('store').createRecord('speaker', speaker);
        await newSpeaker.save();
        this.transitionToRoute('speakers');
      }
      catch (error) {
        this.errorLogger.logError(error);
      }
    },
    cancel() {
      this.transitionToRoute('speakers');
    }
  }
});
