import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    },
  },
  dataService: service('data-service'),
  model({search}) {
    let promise = new Promise((resolve, reject) => {
      later(async () => {
        try {
          let books = search ? await this.get('dataService').getSpeakers(search) : await this.get('dataService').getSpeakers();
          resolve(books);
        }
        catch(e) {
          reject('Connection failed');
        }
      }, 1000);
    }).then((speakers) => {
      this.set('controller.model', speakers);
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
      this.refresh();
    },
    loading() {
      return false;
    },
  }
});
