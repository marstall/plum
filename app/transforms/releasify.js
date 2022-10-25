import Transform from '@ember-data/serializer/transform';

export default class ReleasifyTransform extends Transform {
  // deserialize(serialized) {
  //   return serialized / 100; // returns dollars
  // }

  serialize(releases) {
    return releases.map((release) => {
      return this.store.createRecord('release', release);
    });
  }
}
