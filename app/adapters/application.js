import DS from 'ember-data';
import ENV from 'flexberry-edu/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: ENV.backendURL,
  init() {
    this._super(...arguments);
    this.set('headers', {
      'Content-Type': 'application/json'
    });
  },

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
    return url;
  },
});
