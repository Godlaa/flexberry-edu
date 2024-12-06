import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
export default Route.extend({
  model({meeting_id}) {
    return EmberObject.create({
      speaker: {},
      book: {},
      meeting: meeting_id,
      feedback: '',
      videoURL: '',
      presentationURL: ''
    })
  }
});
