import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('transform:moment-date', 'Unit | Transform | moment date', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let transform = this.owner.lookup('transform:moment-date');
    assert.ok(transform);
  });
});
