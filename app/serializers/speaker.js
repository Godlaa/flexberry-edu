import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalize(model, hash) {
    let hashCopy = Object.assign({}, hash);
    hashCopy.attributes = {};
    hashCopy.attributes.firstName = hash.firstName;
    hashCopy.attributes.lastName = hash.lastName;
    hashCopy.attributes.patronymic = hash.patronymic;
    hashCopy.attributes.imageURL = hash.imageURL;
    delete hashCopy.firstName;
    delete hashCopy.lastName;
    delete hashCopy.patronymic;
    delete hashCopy.imageURL;
    hash = {
      data: hashCopy
    };
    return hash;
  },
  serialize(snapshot, options) {
    let json = this._super(snapshot, options);
    json.type = snapshot.modelName;
    return json;
  }
});
