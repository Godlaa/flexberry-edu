import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async saveBook(book) {
      let newBook = this.get('store').createRecord('book', book);
      await newBook.save();
      this.transitionToRoute('books');
    },
    cancel() {
      this.transitionToRoute('books');
    }
  }
});
