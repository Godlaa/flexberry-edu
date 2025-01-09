import Controller from '@ember/controller';
import moment from 'moment';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
export const PER_PAGE = 3;

export default Controller.extend({
  errorLogger: service(),
  currentUser: service(),
  queryParams: ['speakerSelected', 'bookSelected', 'meetingDate', 'page'],
  speakerSelected: '',
  bookSelected: '',
  meetingDate: '',
  page: 1,
  pages: computed('model.meetings.meta.total', function() {
    const total = parseInt(this.get('model.meetings.meta.total'));
    if(Number.isNaN(total) || total <= 0) {
      return [];
    }

    let res = new Array(Math.ceil((total) / PER_PAGE))
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
      try {
        let newMeeting = this.store.createRecord('meeting', {
          date: moment().format('YYYY-MM-DD'),
          reports: [],
          user: this.get('currentUser.user'),
        })
        newMeeting.serialize();
        await newMeeting.save().then(() => {
          newMeeting.set('id', newMeeting.id);
          this.transitionToRoute('meetings-edit', newMeeting);
        })}
      catch (error) {
        this.errorLogger.logError(error);
      }
    },
    async deleteMeeting(meeting) {
      try {
        await meeting.destroyRecord();
        this.get('store').unloadRecord(meeting);
      }
      catch (error) {
        this.errorLogger.logError(error);
      }
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
