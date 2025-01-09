import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
  i18n: service(),
  session: service(),
  currentUser: service(),
  errorLogger: service(),
  actions: {
    async logout(e) {
      e.preventDefault();
      try {
        await this.get('session').invalidate();
      } catch (error) {
        this.errorLogger.logError(error);
      }
    },
    changeLanguage(language) {
      try {
        set(this, 'i18n.locale', language);
      } catch (error) {
        this.errorLogger.logError(error);
      }
    }
  },
  init() {
    this._super(...arguments);
    try {
      set(this, 'i18n.locale', 'ru');
    } catch (error) {
      this.errorLogger.logError(error);
    }
  }
});
