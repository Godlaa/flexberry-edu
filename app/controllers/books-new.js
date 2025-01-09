import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  errorLogger: service(),
  selectedFile: null,
  selectedFileName: 'Выберите файл',
  isFileClearButtonDisabled: true,

  actions: {
    handleFileUpload(event) {
      try {
        const file = event.target.files[0];
        if (file) {
          this.set('selectedFile', file);
          this.set('selectedFileName', file.name);
          this.set('isFileClearButtonDisabled', false);
        }
      } catch (error) {
        this.errorLogger.logError(error);
      }
    },
    clearFile() {
      try {
        const fileInput = document.getElementById('customFile');
        if (fileInput) {
          fileInput.value = '';
        }
        this.set('selectedFile', null);
        this.set('selectedFileName', 'Выберите файл');
        this.set('isFileClearButtonDisabled', true);
      } catch (error) {
        this.errorLogger.logError(error);
      }
    },
    async saveBook(book) {
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
          this.errorLogger.logError(error);
          return;
        }
      }
      try {
        let tags = book.tags.toString().split(',');
        book.set('user', this.get('currentUser.user'));
        book.set('tags', tags);
        let newBook = this.get('store').createRecord('book', book);
        await newBook.save();
        this.transitionToRoute('books');
      } catch (error) {
        this.errorLogger.logError(error);
      }
    },
    cancel() {
      try {
        this.transitionToRoute('books');
      } catch (error) {
        this.errorLogger.logError(error);
      }
    }
  }
});
