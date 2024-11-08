import Controller from '@ember/controller';

export default class EditBookController extends Controller {
  saveBook(event) {
    event.preventDefault();

    let title = this.get('title');
    let author = this.get('author');
    let pagesCount = this.get('pagesCount');
    let descriptionURL = this.get('descriptionURL');
    let tags = this.get('tags');
    let coverImage = this.get('coverImage');

    let updatedBook = {
      title,
      author,
      pagesCount,
      descriptionURL,
      tags,
      coverImage
    };

    fetch(`http://localhost:3000/books/${this.model.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBook)
    })
      .then(response => {
        if (response.ok) {
          alert('Книга успешно обновлена!');
          this.transitionToRoute('books');
        } else {
          alert('Произошла ошибка при обновлении книги');
        }
      });
  }
}