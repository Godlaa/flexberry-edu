import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  patronymic: DS.attr('string'),
  imageURL: DS.attr('string'),
  reports: DS.hasMany('report'),

  user: DS.belongsTo('user'),
});
