import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    },
    tags: {
      refreshModel: true
    }
  },
  model({search, tags}) {
    if (search) {
      return this.get('store').query('book', { q: search });
    }
    if (tags) {
      return this.get('store').query('book', { tags_like: tags });
    }
    return this.get('store').findAll('book');
  },

  actions: {
    loading() {
      return false;
    }
  }
});
