import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('books', { path: '/books' });
  this.route('speakers', { path: '/speakers' });
  this.route('books-edit', { path: '/books/edit/:book_id' });
  this.route('speakers-edit', { path: '/speakers/edit/:speaker_id' });
  this.route('404', { path: '/*path' });
});

export default Router;
