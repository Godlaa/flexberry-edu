import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
export default Route.extend({
  model() {
    return EmberObject.create({
      title: 'Новое событие',
      date: new Date(),
      speaker: '',
      book: '',
      feedback: '',
      videoURL: '',
      presentationURL: ''
    })
  }
});
