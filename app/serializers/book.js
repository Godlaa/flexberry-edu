import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalize(model, hash) {
    let hashCopy = Object.assign({}, hash);
    hashCopy.attributes = {};
    hashCopy.attributes.title = hash.title;
    hashCopy.attributes.author = hash.author;
    hashCopy.attributes.pagesCount = hash.pagesCount;
    hashCopy.attributes.descriptionURL = hash.descriptionURL;
    hashCopy.attributes.coverImage = hash.coverImage;
    hashCopy.attributes.tags = hash.tags;
    delete hashCopy.title;
    delete hashCopy.author;
    delete hashCopy.pagesCount;
    delete hashCopy.descriptionURL;
    delete hashCopy.coverImage;
    delete hashCopy.tags;
    hash = {
      data: hashCopy
    };
    return hash;
  },
  serialize(snapshot, options) {
    let json = this._super(snapshot, options);
    return json;
  }
});
