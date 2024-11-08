import Route from '@ember/routing/route';

export default class SpeakersIndexRoute extends Route {
  async model() {
    const response = await fetch('http://localhost:3000/speakers');
    const speakers = await response.json();
    return speakers;
  }
}
