import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default Route.extend({
  queryParams: {
    speaker: {
      refreshModel: true
    },
    book: {
      refreshModel: true
    },
    date: {
      refreshModel: true
    },
  },
  dataService: service('data-service'),
  model({speaker, book, date}) {
    let promise = new Promise((resolve, reject) => {
      later(async () => {
        try {
          let meetings = speaker || book || date ? await this.get('dataService').getMeetings(speaker, book, date) : await this.get('store').findAll('meeting');
          resolve(meetings);
        }
        catch(e) {
          reject('Connection failed');
        }
      }, 1000);
    }).then((meetings) => {
      this.set('controller.model', meetings);
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
    refreshSpeakers() {
      // this.refresh();
    },
    loading() {
      return false;
    },
  }
});
