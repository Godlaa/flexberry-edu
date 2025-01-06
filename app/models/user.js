import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import { translationMacro as t } from 'ember-i18n';

const Validations = buildValidations({
  email: [
    validator('presence', {
      presence: true,
      message: t('validation.required', { description: t('edit.fields.email') })
    }),
    validator('format', {
      type: 'email',
      message: t('validation.email')
    })
  ],
  password: [
    validator('presence', {
      presence: true,
      message: t('validation.required', { description: t('edit.fields.password') })
    })
  ],
  passwordConfirmation: [
    validator('presence', {
      presence: true,
      message: t('validation.required', { description: t('edit.fields.passwordConfirmation') })
    }),
    validator('confirmation', {
      on: 'password',
      message: t('validation.passwordConfirmation')
    })
  ],
  role: [
    validator('presence', {
      presence: true,
      message: t('validation.required', { description: t('edit.fields.role') })
    })
  ]
});

export default DS.Model.extend(Validations, {
  email: DS.attr('string'),
  password: DS.attr(),
  passwordConfirmation: DS.attr(),
  role: DS.attr('string'),
});
