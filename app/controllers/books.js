import Controller from '@ember/controller';

export default Controller.extend({
    queryParams: ['search', 'tags'],
    search: '',
    tag: '',
    filterByTag(tag) {
        this.set('tags', tag);
        this.transitionToRoute({ queryParams: { tags: tag } });
    },
    actions: {
      async deleteBook(book) {
        await book.destroyRecord();
        this.get('store').unloadRecord(book);
      }
    }
});
