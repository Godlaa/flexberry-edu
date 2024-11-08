import Controller from '@ember/controller';

export default class SpeakersEditController extends Controller {
  async saveSpeaker() {
    const speaker = this.model;
    await fetch(`http://localhost:3000/speakers/${speaker.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: speaker.name,
        topic: speaker.topic,
      }),
    });
    this.transitionToRoute('speakers'); // Переход после сохранения
  }
}
