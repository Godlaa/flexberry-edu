import DS from 'ember-data';
import { isNone } from '@ember/utils';

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

  serializeBelongsTo(snapshot, json, relationship) {
    let key = relationship.key;
    let belongsTo = snapshot.belongsTo(key);

    key = this.keyForRelationship ? this.keyForRelationship(key, 'belongsTo', 'serialize') : key;
    json[key] = isNone(belongsTo) ? belongsTo : parseInt(belongsTo.record.get('id'));
  },

  extractRelationship(relationshipModelName, relationshipHash) {
    // let hash = relationshipModelName.id ? relationshipHash.id : relationshipHash;
    // return this._super.call(this, relationshipModelName, hash);
    return this._super(relationshipModelName, relationshipHash);
  }
});
