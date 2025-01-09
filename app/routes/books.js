import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  errorLogger: service(),
  queryParams: {
    search: {
      refreshModel: true
    },
    tags: {
      refreshModel: true
    }
  },
  afterModel() {
    this._super(...arguments);
    this.errorLogger.logError('Books route rendered');
  },
  model({search, tags}) {
    try {
      if (search && tags) {
        return this.get('store').query('book', { q: search, tags_like: tags });
      }
      if (search) {
        return this.get('store').query('book', { q: search });
      }
      if (tags) {
        return this.get('store').query('book', { tags_like: tags });
      }
      return this.get('store').findAll('book');
    }
    catch (error) {
      this.errorLogger.logError(error);
    }
  },

  actions: {
    loading() {
      return false;
    }
  }
});
