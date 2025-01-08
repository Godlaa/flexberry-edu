import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
  i18n: service(),
  session: service(),
  currentUser: service(),
  actions: {
    async logout(e) {
      e.preventDefault();
      this.get('session').invalidate();
    },
    changeLanguage(language) {
      set(this, 'i18n.locale', language);
    }
  },
  init() {
    this._super(...arguments);
    set(this, 'i18n.locale', 'ru');
  }
});
