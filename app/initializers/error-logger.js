export function initialize(application) {
  application.inject('route', 'errorLogger', 'service:error-logger');
  application.inject('controller', 'errorLogger', 'service:error-logger');
  application.inject('component', 'errorLogger', 'service:error-logger');
}

export default {
  initialize
};
