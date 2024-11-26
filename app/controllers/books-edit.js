import Controller from '@ember/controller';

export default Controller.Extend({
  actions: {
    async saveBook(book) {
      const _model = this.get('model');
      _model.set('title', book.title);
      _model.set('author', book.author);
      _model.set('pagesCount', book.pagesCount);
      _model.set('descriptionURL', book.descriptionURL);
      _model.set('coverImage', book.coverImage);
      _model.set('tags', book.tags);
      await _model.save();
      this.transitionToRoute('books');
    }
  }
})
