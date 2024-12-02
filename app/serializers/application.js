import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalize(model, hash) {
    return this._super(model, hash);
  },

  keyForRelationship(key, typeClass, method) {
    if (typeClass === 'belongsTo') {
      return `${key}Id`;
    }
    this._super(key, typeClass, method);
  },

  extractRelationship(relationshipModelName, relationshipHash) {
    let hash = relationshipModelName.id ? relationshipHash.id : relationshipHash;
    return this._super.call(this, relationshipModelName, hash);
  }
});
