import Route from '@ember/routing/route';

export default Route.extend({
  async model(meeting_id) {
    return this.store.findRecord('meeting', meeting_id);
  }
});
