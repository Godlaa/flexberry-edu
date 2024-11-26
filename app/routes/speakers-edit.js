import Route from '@ember/routing/route';

export default class SpeakersEditRoute extends Route {
  async model({ speaker_id }) {
    return this.store.findRecord('speaker', speaker_id);
  }
}
