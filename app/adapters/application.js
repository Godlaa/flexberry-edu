import DS from 'ember-data';
import ENV from 'flexberry-edu/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: ENV.backendURL
});
