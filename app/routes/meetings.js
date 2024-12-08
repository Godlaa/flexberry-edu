import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { PER_PAGE } from '../controllers/meetings';
import RSVP from 'rsvp';

export default Route.extend({
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
    let promise = new Promise((resolve, reject) => {
      later(async () => {
        try {
          let model = RSVP.hash({
            meetings: await this.store.query('meeting', query),
            speakers: await this.store.findAll('speaker'),
            books: await this.store.findAll('book')
          });
          resolve(model);
        }
        catch(e) {
          reject('Connection failed');
        }
      }, 1000);
    }).then((model) => {
      this.set('controller.model', model);
    }).finally(() => {
      if (promise === this.get('modelPromise')) {
        this.set('controller.isLoading', false);
      }
    });
    this.set('modelPromise', promise);
    return { isLoading: true };
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('isLoading', false);
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
