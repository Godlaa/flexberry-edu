import { validatePresence, validateLength, validateNumber } from 'ember-changeset-validations/validators';

export default {
  date: [
    validatePresence({ presence: true, message: 'Дата встречи обязательна для заполнения' })
  ],
  speaker: [
    validatePresence({ presence: true, message: 'Спикер обязателен для заполнения' })
  ],
  book: [
    validatePresence({ presence: true, message: 'Книга обязательна для заполнения' })
  ],
  feedback: [
    validateLength({ min: 10, message: 'Отзыв должен содержать минимум 10 символов' })
  ],
  bookRate: [
    validateNumber({ integer: true, positive: true, message: 'Оценка книги должна быть положительным целым числом' })
  ]
};
