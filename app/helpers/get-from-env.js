import { helper } from '@ember/component/helper';
import ENV from 'flexberry-edu/config/environment';

export default helper(function getFromEnv([key]) {
  return ENV[key];
});