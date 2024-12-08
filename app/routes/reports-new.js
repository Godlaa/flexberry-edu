import Route from '@ember/routing/route';

export default Route.extend({
  model({ meeting_id }) {
    return {
      meeting: this.store.findRecord('meeting', meeting_id),
      feedback: '',
      videoURL: '',
      presentationURL: '',
      book: {},
      speaker: {},
      books: this.store.findAll('book'),
      speakers: this.store.findAll('speaker')
    };
  }
});
