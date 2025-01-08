import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

  currentUser: service(),
  i18n: service(),
  selectedFile: null,
  selectedFileName: null,
  showValidations: false,

  init() {
    this._super(...arguments);
  },

  actions: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.set('selectedFile', file);
        this.set('selectedFileName', file.name);
      }
    },
    clearFile() {
      const fileInput = document.getElementById('customFile');
      if (fileInput) {
        fileInput.value = '';
      }
      this.set('selectedFile', null);
      this.set('selectedFileName', null);
    },
    async saveBook(book) {
      this.set('showValidations', true);
      if (book.validations.isValid) {
        try {
          let bookModel = this.get('model');
          if (this.selectedFile) {
            const formData = new FormData();
            formData.append('file', this.selectedFile);
            try {
              const uploadResponse = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData
              });
              const uploadResult = await uploadResponse.json();
              book.set('coverImage', uploadResult.filename);
            } catch (error) {
              // console.error('Ошибка загрузки файла:', error);
              return;
            }
          }
          let tags = book.tags.toString().split(',');
          bookModel.set('title', book.title);
          bookModel.set('author', book.author);
          bookModel.set('pagesCount', book.pagesCount);
          bookModel.set('descriptionURL', book.descriptionURL);
          bookModel.set('coverImage', book.coverImage);
          bookModel.set('tags', tags);
          bookModel.set('rating', book.rating);
          bookModel.set('user', this.get('currentUser.user'));
          await bookModel.save();
          this.transitionToRoute('books');
        }
        catch (error) {
          // console.error('Ошибка сохранения книги:', error);
          return;
        }
      }
    },
    cancel(book) {
      book.rollbackAttributes();
      this.transitionToRoute('books');
    }
  }
})
