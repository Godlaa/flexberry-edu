import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  showValidations: false,
  actions: {
    async saveSpeaker(speaker) {
      this.set('showValidations', true);
      if (speaker.validations.isValid) {
        let speakerModel = this.get('model');
        speakerModel.set('firstName', speaker.firstName);
        speakerModel.set('lastName', speaker.lastName);
        speakerModel.set('patronymic', speaker.patronymic);
        speakerModel.set('imageURL', speaker.imageURL);
        speakerModel.set('user', this.get('currentUser.user'));
        await speakerModel.save();
        this.transitionToRoute('speakers');
      }
    },
    cancel(speaker) {
      speaker.rollbackAttributes();
      this.transitionToRoute('speakers');
    }
  }
});
