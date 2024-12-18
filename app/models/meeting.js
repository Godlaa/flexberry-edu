import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('moment-date'),
  reports: DS.hasMany('report'),

  user: DS.belongsTo('user'),
});
