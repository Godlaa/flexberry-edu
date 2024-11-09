import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    queryParams: ['search', 'tags'],
    dataService: service('data-service'),
    search: '',
    tag: '',
    filterByTag(tag) {
        this.set('tags', tag);
        this.transitionToRoute({ queryParams: { tags: tag } });
      }
});
