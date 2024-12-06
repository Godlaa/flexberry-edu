import Route from '@ember/routing/route';

export default Route.extend({
  async model({meeting_id}) {
    let storeMeetings = await this.store.findRecord('meeting', meeting_id);
    return storeMeetings;
  }
});
