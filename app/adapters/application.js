import DS from 'ember-data';
import ENV from 'flexberry-edu/config/environment';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default DS.JSONAPIAdapter.extend({
  session: service(),
  host: ENV.backendURL,

  headers: computed(function() {
    let resultHeaders = {
      'Content-Type': 'application/json'
    };

    if (this.get('session.isAuthenticated')) {
      resultHeaders['Authorization'] = `Bearer ${this.session.data.authenticated.token}`;
    }
    return resultHeaders;
  }).volatile(),

  buildURL(modelName, id, snapshot, requestType, query) {
    let url = this._super(modelName, id, snapshot, requestType, query);
    if (modelName === 'report' && requestType === 'findAll') {
      url += '?_expand=book&_expand=speaker';
    }
    if (modelName === 'report' && requestType === 'findRecord' && id) {
      url += '?_expand=book&_expand=speaker';
    }
    if (modelName === 'meeting' && requestType === 'findAll') {
      url += '?_embed=reports';
    }
    if (modelName === 'meeting' && requestType === 'findRecord' && id) {
      url += '?_embed=reports';
    }
    if (modelName === 'meeting' && requestType === 'query') {
      url += '?_embed=reports';
    }
    return url;
  },

  handleResponse(status, headers, payload) {
    const meta = {
      total: payload.length,
    };
    payload.meta = meta;
    return this._super(...arguments);
  }
});
