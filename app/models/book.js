import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: [
    validator('presence', {
      presence: true,
      message: 'Название книги обязательно для заполнения'
    })],
  author: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Автор книги обязателен для заполнения'
      })
    ]
  },
  pagesCount: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Количество страниц обязательно для заполнения'
      })
    ]
  },
  descriptionURL: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'URL описания обязателен для заполнения'
      }),
      validator('format', {
        type: 'url',
        message: 'URL должен быть действительным'
      })
    ]
  },
  rating: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Рейтинг обязателен для заполнения'
      })
    ]
  },
  tags: {
    description: 'Tags',
    validators: [
      validator('presence', {
        presence: true,
        description: 'Tags',
        message: 'Теги обязательны для заполнения'
      })
    ]
  }
});

export default DS.Model.extend(Validations, {
  title: DS.attr('string'),
  author: DS.attr('string'),
  pagesCount: DS.attr('number'),
  descriptionURL: DS.attr('string'),
  coverImage: DS.attr('string'),
  tags: DS.attr(),
  rating: DS.attr('number'),
  reports: DS.hasMany('report'),
  user: DS.belongsTo('user'),
});
