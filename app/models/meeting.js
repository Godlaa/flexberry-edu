import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  date: [
    validator('presence', {
      presence: true,
      message: 'Дата обязательна для заполнения'
    }),
    validator('date', {
      before: 'now',
      message: 'Дата должна быть в прошлом'
    })
  ]
});

export default DS.Model.extend(Validations, {
  date: DS.attr('moment-date'),
  reports: DS.hasMany('report'),
  user: DS.belongsTo('user'),
});
