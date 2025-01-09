import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  errorLogger: service(),
  model() {
    try {
      return EmberObject.create({
        title: 'Новая книга',
        author: '',
        pagesCount: 0,
        descriptionURL: '',
        coverImage: '',
        tags: [],
        rating: 0
      })
    } catch (error) {
      this.errorLogger.logError(error);
    }
  }
});
