import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  rememberMe: false,
  errorLogger: service(),

  actions: {
    async login(user) {
      try {
        await this.get('session').authenticate('authenticator:jwt', {
          email: user.email,
          password: user.password
        });
        this.transitionToRoute('index');
      }
      catch(e) {
        this.errorLogger.logError(e);
        this.send('error', e);
      }
    },

    error(error) {
      if (error instanceof Error) {
        return true;
      }

      this.set('errors', error.json.errors);
      return false;
    },

    goBack() {
      window.history.back();
    }
  },

  resetErrors() {
    this.set('errors', {});
  }
});
