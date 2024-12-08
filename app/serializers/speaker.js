import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    reports: {
      serialize: 'ids',
      deserialize: 'records'
    }
  },
});
