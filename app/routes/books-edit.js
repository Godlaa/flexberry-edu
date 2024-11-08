import Route from '@ember/routing/route';

export default class BooksEditRoute extends Route {
  async model({ book_id}) {
    const response = await fetch(`http://localhost:3000/books/${book_id}`);
    const book = await response.json();
    return book;
  }
}
