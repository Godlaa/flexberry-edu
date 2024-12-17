import { computed } from '@ember/object';
import { Ability } from 'ember-can';
import { inject as service } from '@ember/service';

export default Ability.extend({
  currentUser: service(),
  session: service(),

  canEdit: computed(function () {
    return this.get('currentUser.user.role') === 'admin';
  }).volatile()
});
