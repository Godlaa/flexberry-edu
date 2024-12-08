import ApplicationSerializer from './application';
import DS from 'ember-data';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    books: {
      serialize: 'ids',
      deserialize: 'records'
    },
    speakers: {
      serialize: 'ids',
      deserialize: 'records'
    },
    meetings: {
      serialize: true,
      deserialize: 'records'
    }
  },

  normalize(model, hash) {
    hash = this._super(model, hash);
    return hash;
  },
});
