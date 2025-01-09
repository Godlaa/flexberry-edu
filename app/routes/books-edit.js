import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  errorLogger: service(),

  async model({ book_id }) {
    try {
      return this.store.findRecord('book', book_id);
    } catch (error) {
      this.errorLogger.logError(error);
    }
  }
});
