import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalize(model, hash) {
    hash = this._super(model, hash);
    return hash;
  },
});
