import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | books-new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:books-new');
    assert.ok(route);
  });
});
