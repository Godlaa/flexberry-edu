import Controller from '@ember/controller';
import moment from 'moment';
import { computed } from '@ember/object';

export const PER_PAGE = 3;

export default Controller.extend({
  queryParams: ['speakerSelected', 'bookSelected', 'meetingDate', 'page'],
  speakerSelected: '',
  bookSelected: '',
  meetingDate: '',
  page: 1,
  pages: computed('model.meetings.meta.total', function() {
    const total = this.get('model.meetings.meta.total');
    if(Number.isNaN(total) || total <= 0) {
      return [];
    }

    let res = new Array(Math.ceil(total / PER_PAGE))
      .fill()
      .map((_, index) => index + 1);

    return res;
  }),

  currentPage: computed('page', function() {
    return parseInt(this.get('page')) || 1;
  }),

  totalPages: computed(function() {
    return this.get('pages').length;
  }),
  actions: {
    updateSpeaker(selectedSpeakerId) {
      this.set('speakerSelected', selectedSpeakerId);
    },
    updateBook(selectedBookId) {
      this.set('bookSelected', selectedBookId);
    },
    async addMeeting() {
      let newMeeting = this.store.createRecord('meeting', {
        date: moment().format('YYYY-MM-DD'),
        reports: []
      })
      newMeeting.serialize();
      await newMeeting.save().then(() => {
        newMeeting.set('id', newMeeting.id);
        this.transitionToRoute('meetings-edit', newMeeting);
      })
    },
    async deleteMeeting(meeting) {
      await meeting.destroyRecord();
      this.transitionToRoute('meetings');
    },
    clearFilter(){
      this.set('speakerSelected', '');
      this.set('bookSelected', '');
      this.set('meetingDate', '');
    },
    filter(){
      this.send('refreshMeetings');
    }
  }
});
