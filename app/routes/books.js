import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    },
    tags: {
      refreshModel: true
    }
  },
  dataService: service('data-service'),
  model({search, tags}) {
    let promise = new Promise((resolve, reject) => {
      later(async () => {
        try {
          let books = search || tags ? await this.get('dataService').getBooks(search, tags) : await this.get('store').findAll('book');
          resolve(books);
        }
        catch(e) {
          reject('Connection failed');
        }
      }, 1000);
    }).then((books) => {
      this.set('controller.model', books);
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
    refreshBooks() {
      // this.refresh();
    },
    loading() {
      return false;
    },
  }
});
