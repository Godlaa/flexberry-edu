import Service from '@ember/service';

export default Service.extend({
    getBooks(search, tags) {
        let queryParams = '';
        if(search && tags){
            queryParams = `?q=${search}`;
            queryParams += `&tags_like=${tags}`;
        }
        else if(search){
            queryParams = `?q=${search}`;
        }
        else if(tags){
            queryParams += `?tags_like=${tags}`;
        }
        return fetch(`http://localhost:3000/books${queryParams}`).then(response => response.json());
    },
    getBook(id) {
        return fetch(`http://localhost:3000/books/${id}`).then(response => response.json());
    },
    getSpeakers(search) {
        let queryParams = '';
        if(search){
            queryParams = `?q=${search}`;
        }
        return fetch(`http://localhost:3000/speakers${queryParams}`).then(response => response.json());
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
