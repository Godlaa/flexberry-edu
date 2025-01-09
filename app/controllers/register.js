import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ENV from 'flexberry-edu/config/environment';

export default Controller.extend({
  errorLogger: service(),
  iAmRobot: true,
  reset: false,

  actions: {
    async saveUser(user) {
      let newUser;
      try {
        newUser = this.get('store').createRecord('user', user);
        newUser.set('passwordConfirmation', user.password);
        await newUser.save();
        this.transitionToRoute('index');
      } catch (error) {
        error.user = newUser;
        this.errorLogger.logError(error);
        this.send('error', error);
      }
    },
    async verified(key) {
      try {
        const { success } = await (await fetch(`${ENV.backendURL}/recaptcha?key=${key}`)).json();
        this.set('iAmRobot', !success);
      } catch (error) {
        this.errorLogger.logError(error);
        this.set('reset', true);
      }
    },
    expired() {
      this.set('iAmRobot', true);
    },
    error(error) {
      this.set('errors', error.user.errors);
      this.errorLogger.logError(error);
      return false;
    },
    goBack() {
      try {
        window.history.back();
      } catch (error) {
        this.errorLogger.logError(error);
      }
    }
  },
  resetErrors() {
    try {
      this.set('errors', {});
    } catch (error) {
      this.errorLogger.logError(error);
    }
  }
});
