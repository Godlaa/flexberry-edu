import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {

  session: service(),
  currentUser: service(),
  errorLogger: service(),

  beforeModel() {
    this._super(...arguments);
    try {
      this.loadUser();
    } catch (error) {
      this.errorLogger.logError(error);
    }
  },

  sessionAuthenticated() {
    this._super(...arguments);

    this.loadUser();
  },

  sessionInvalidated() {
    this.get('currentUser').resetCurrentUser();
    window.location.replace('/login');
  },

  loadUser() {
    if (this.get('session.isAuthenticated')) {
      this.get('currentUser').load();
    }
  },

  actions: {
    error(error, transition) {
      if (transition) {
        transition.abort();
      }
      this.errorLogger.logError(error);
      this.intermediateTransitionTo('error', { error: error.message });
    }
  }
});
