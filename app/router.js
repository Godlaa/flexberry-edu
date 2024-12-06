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
  this.route('books-new', { path: '/books/edit/new' });
  this.route('books-edit', { path: '/books/edit/:book_id' });
  this.route('speakers-new', { path: '/speakers/edit/new' });
  this.route('speakers-edit', { path: '/speakers/edit/:speaker_id' });

  this.route('404', { path: '/*path' });
  this.route('meetings', { path: '/meetings' });
  this.route('meetings-edit', { path: '/meetings/edit/:meeting_id' });
  this.route('meetings-new', { path: '/meetings/edit/new' });
  this.route('reports-edit', { path: '/reports/edit/:report_id' });
  this.route('reports-new', { path: '/reports/edit/new/:meeting_id' });
});

export default Router;
