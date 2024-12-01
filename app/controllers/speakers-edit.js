import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async saveSpeaker(speaker) {
      let speakerModel = this.get('model');
      speakerModel.set('firstName', speaker.firstName);
      speakerModel.set('lastName', speaker.lastName);
      speakerModel.set('paratonymic', speaker.patronymic);
      speakerModel.set('imageURL', speaker.imageURL);
      await speakerModel.save();
      this.transitionToRoute('speakers');
    },
    cancel() {
      this.transitionToRoute('speakers');
    }
  }
});
