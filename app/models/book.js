import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  pagesCount: DS.attr('number'),
  descriptionURL: DS.attr('string'),
  coverImage: DS.attr('string'),
  tags: DS.attr(),
  rating: DS.attr('number'),
  report: DS.hasMany('report'),
});
