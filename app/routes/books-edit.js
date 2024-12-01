import Route from '@ember/routing/route';
export default class BooksEditRoute extends Route {
  async model({ book_id }) {
    return this.store.findRecord('book', book_id);
  }
}
