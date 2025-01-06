import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  firstName: [
    validator('presence', {
      presence: true,
      message: 'Имя обязательно для заполнения'
    })
  ],
  lastName: [
    validator('presence', {
      presence: true,
      message: 'Фамилия обязательна для заполнения'
    })
  ],
  patronymic: [
    validator('presence', {
      presence: true,
      message: 'Отчество обязательно для заполнения'
    })
  ],
  imageURL: [
    validator('presence', {
      presence: true,
      message: 'URL изображения обязателен для заполнения'
    }),
    validator('format', {
      type: 'url',
      message: 'URL изображения должен быть действительным'
    })
  ]
});

export default DS.Model.extend(Validations, {
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  patronymic: DS.attr('string'),
  imageURL: DS.attr('string'),
  reports: DS.hasMany('report'),

  user: DS.belongsTo('user'),
});
