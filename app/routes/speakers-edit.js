import Route from '@ember/routing/route';

export default class SpeakersEditRoute extends Route {
  async model({ speaker_id }) {
    const response = await fetch(`http://localhost:3000/speakers/${speaker_id}`);
    const speaker = await response.json();
    return speaker;
  }
}
