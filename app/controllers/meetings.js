import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['speaker', 'book', 'date'],
  speaker: '',
  book: '',
  date: '',
  actions: {
    deleteMeeting(meeting) {
      meeting.destroyRecord();
    }
  }
});
