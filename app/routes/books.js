import Route from '@ember/routing/route';

export default class BooksIndexRoute extends Route {
  async model() {
    const response = await fetch('http://localhost:3000/books');
    const books = await response.json();
    return books;
  }
}
