import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  speaker: DS.belongsTo('speaker'),
  book: DS.belongsTo('book'),
  feedback: DS.attr('string'),
  videoURL: DS.attr('string'),
  presentationURL: DS.attr('string'),
});
