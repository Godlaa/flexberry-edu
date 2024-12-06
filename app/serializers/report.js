import ApplicationSerializer from './application';
import DS from 'ember-data';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    books: {
      serialize: 'records',
      deserialize: 'records'
    },
    speakers: {
      serialize: 'records',
      deserialize: 'records'
    }
  },

  normalize(model, hash) {
    hash = this._super(model, hash);
    return hash;
  },
});
