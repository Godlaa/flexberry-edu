import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  actions: {
    async saveSpeaker(speaker) {
      let speakerModel = this.get('model');
      speakerModel.set('firstName', speaker.firstName);
      speakerModel.set('lastName', speaker.lastName);
      speakerModel.set('paratonymic', speaker.patronymic);
      speakerModel.set('imageURL', speaker.imageURL);
      speakerModel.set('user', this.get('currentUser.user'));
      await speakerModel.save();
      this.transitionToRoute('speakers');
    },
    cancel() {
      this.transitionToRoute('speakers');
    }
  }
});
