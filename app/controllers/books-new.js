import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  selectedFile: null,
  selectedFileName: 'Выберите файл',
  isFileClearButtonDisabled: true,

  actions: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.set('selectedFile', file);
        this.set('selectedFileName', file.name);
        this.set('isFileClearButtonDisabled', false);
      }
    },
    clearFile() {
      const fileInput = document.getElementById('customFile');
      if (fileInput) {
        fileInput.value = '';
      }
      this.set('selectedFile', null);
      this.set('selectedFileName', 'Выберите файл');
      this.set('isFileClearButtonDisabled', true);
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
          // console.error('Ошибка загрузки файла:', error);
          return;
        }
      }
      book.set('user', this.get('currentUser.user'));
      let newBook = this.get('store').createRecord('book', book);
      await newBook.save();
      this.transitionToRoute('books');
    },
    cancel() {
      this.transitionToRoute('books');
    }
  }
});
