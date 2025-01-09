import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  showValidations: false,
  errorLogger: service(),
  actions: {
    async saveSpeaker(speaker) {
      this.set('showValidations', true);
      try {

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
      }
      catch(e) {
        this.errorLogger.logError(e);
        this.send('error', e);
      }
    },
    cancel(speaker) {
      speaker.rollbackAttributes();
      this.transitionToRoute('speakers');
    }
  }
});
