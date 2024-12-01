import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
export default Route.extend({
  model() {
    return EmberObject.create({
      title: 'Новая книга',
      author: '',
      pagesCount: 0,
      descriptionURL: '',
      coverImage: '',
      tags: [],
      rating: 0
    })
  }
});
