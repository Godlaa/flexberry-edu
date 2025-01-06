import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  feedback: [
    validator('presence', {
      presence: true,
      message: 'Отзыв обязателен для заполнения'
    })
  ],
  videoURL: [
    validator('presence', {
      presence: true,
      message: 'URL видео обязателен для заполнения'
    }),
    validator('format', {
      type: 'url',
      message: 'URL видео должен быть действительным'
    })
  ],
  presentationURL: [
    validator('presence', {
      presence: true,
      message: 'URL презентации обязателен для заполнения'
    }),
    validator('format', {
      type: 'url',
      message: 'URL презентации должен быть действительным'
    })
  ],
  bookRate: [
    validator('presence', {
      presence: true,
      message: 'Оценка книги обязательна для заполнения'
    }),
    validator('number', {
      integer: true,
      message: 'Оценка книги должна быть целым числом'
    })
  ]
});

export default DS.Model.extend(Validations, {
  speaker: DS.belongsTo('speaker'),
  book: DS.belongsTo('book'),
  feedback: DS.attr('string'),
  videoURL: DS.attr('string'),
  presentationURL: DS.attr('string'),
  bookRate: DS.attr('number'),
  meeting: DS.belongsTo('meeting'),

  user: DS.belongsTo('user'),
});
