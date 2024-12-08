import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async saveBook(book) {
      let bookModel = this.get('model');
      bookModel.set('title', book.title);
      bookModel.set('author', book.author);
      bookModel.set('pagesCount', book.pagesCount);
      bookModel.set('descriptionURL', book.descriptionURL);
      bookModel.set('coverImage', book.coverImage);
      bookModel.set('tags', book.tags);
      bookModel.set('rating', book.rating);
      await bookModel.save();
      this.transitionToRoute('books');
    },
    cancel() {
      this.transitionToRoute('books');
    }
  }
})
