import Service from '@ember/service';

export default Service.extend({
    getBooks(search) {
        let queryParams = '';
        if(search){
            queryParams = `?q=${search}`;
        }
        return fetch(`http://localhost:3000/books${queryParams}`).then(response => response.json());
    },
    getBook(id) {
        return fetch(`http://localhost:3000/books/${id}`).then(response => response.json());
    },
    getSpeakers() {
        return fetch('http://localhost:3000/speakers').then(response => response.json());
    },
    getSpeaker(id) {
        return fetch(`http://localhost:3000/speakers/${id}`).then(response => response.json());
    },
    deleteBook(book) {
        return fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'DELETE'
        });
    },
    deleteSpeaker(speaker) {
        return fetch(`http://localhost:3000/speakers/${speaker.id}`, {
            method: 'DELETE'
        });
    }
});
