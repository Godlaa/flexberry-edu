import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  topic: DS.attr('string')
});
