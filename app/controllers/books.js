import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debounce } from '@ember/runloop';

export default Controller.extend({
  errorLogger: service(),
  queryParams: ['search', 'tags'],
  actualSearch: '',
  search: '',
  tag: '',
  searchAuthors(event) {
    let { target } = event;
    debounce(() => {
      this.set('search', target.value);
    }, 1000);
  },
  filterByTag(tag) {
      this.set('tags', tag);
      this.transitionToRoute({ queryParams: { tags: tag } });
  },
  actions: {
    searchAuthors(event) {
      this.searchAuthors(event);
    },

    async deleteBook(book) {
      try {
        await book.destroyRecord();
      } catch (error) {
        this.errorLogger.logError(error);
      }
    }
  }
});
