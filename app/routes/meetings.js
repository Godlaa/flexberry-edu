import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { PER_PAGE } from '../controllers/meetings';
import RSVP from 'rsvp';

export default Route.extend({
  errorLogger: service(),
  queryParams: {
    speakerSelected: {
      refreshModel: true
    },
    bookSelected: {
      refreshModel: true
    },
    meetingDate: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    }
  },
  dataService: service('data-service'),
  afterModel() {
    this._super(...arguments);
    this.errorLogger.logError('Meetings route rendered');
  },
  async model({speakerSelected, bookSelected, meetingDate, page}) {
    const query = {
      _page: page,
      _limit: PER_PAGE,
    }
    if (speakerSelected) {
      query.speakerSelected = speakerSelected;
    }
    if (bookSelected) {
      query.bookSelected = bookSelected;
    }
    if (meetingDate) {
      query.meetingDate = meetingDate;
    }

    return RSVP.hash({
      meetings: this.get('store').query('meeting', query),
      speakers: this.get('store').findAll('speaker'),
      books: this.get('store').findAll('book'),
    });
  },

  actions: {
    refreshMeetings() {
      this.refresh();
    },
    loading() {
      return false;
    },
  }
});
