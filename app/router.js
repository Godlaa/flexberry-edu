import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import ENV from 'flexberry-edu/config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: ENV.rootURL });
  this.route('books', { path: ENV.rootURL + '/books' });
  this.route('speakers', { path: ENV.rootURL + '/speakers' });
  this.route('books-edit', { path: ENV.rootURL + '/books/edit/:book_id' });
  this.route('speakers-edit', { path: ENV.rootURL + '/speakers/edit/:speaker_id' });
  this.route('404', { path: ENV.rootURL + '/*path' });
});

export default Router;
