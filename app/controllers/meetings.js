import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['speaker', 'book', 'meetingDate'],
  speaker: '',
  book: '',
  date: '',
  actions: {
    async deleteMeeting(meeting) {
      await meeting.destroyRecord();
    }
  }
});
