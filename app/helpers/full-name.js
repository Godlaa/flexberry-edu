import { helper } from '@ember/component/helper';

export function fullName(params/*, hash*/) {
  const firstName = params[0];
  const lastName = params[1];
  const patronymic = params[2];
  return `${lastName} ${firstName} ${patronymic}`
}

export default helper(fullName);
