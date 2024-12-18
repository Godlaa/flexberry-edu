import DS from 'ember-data';

export default DS.Model.extend({
  speaker: DS.belongsTo('speaker'),
  book: DS.belongsTo('book'),
  feedback: DS.attr('string'),
  videoURL: DS.attr('string'),
  presentationURL: DS.attr('string'),
  bookRate: DS.attr('number'),
  meeting: DS.belongsTo('meeting'),

  user: DS.belongsTo('user'),
});
