import Controller from '@ember/controller';

export default class BooksEditController extends Controller {
  async saveBook() {
    const book = this.model;
    await fetch(`http://localhost:3000/books/${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: book.title,
        author: book.author,
      }),
    });
    this.transitionToRoute('books'); // Переход после сохранения
  }
}
