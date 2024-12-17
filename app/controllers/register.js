import Controller from '@ember/controller';
import ENV from 'flexberry-edu/config/environment';

export default Controller.extend({
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
        error.user = newUser
        this.send('error', error);
      }
    },
    async verified(key) {
      try {
        const { success } = await (await fetch(`${ENV.backendURL}/recaptcha?key=${key}`)).json();
        this.set('iAmRobot', !success);
      } catch (error) {
        this.set('reset', true);
      }
    },

    expired() {
      this.set('iAmRobot', true);
    },
    error(error) {
      this.set('errors', error.user.errors);
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
