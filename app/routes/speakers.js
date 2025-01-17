import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    },
  },
  dataService: service('data-service'),
  errorLogger: service(),
  afterModel() {
    this._super(...arguments);
    this.errorLogger.logError('Speakers route rendered');
  },
  model({search}) {
    if (search) {
      return this.get('store').query('speaker', { q: search });
    }
    return this.get('store').findAll('speaker');
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
