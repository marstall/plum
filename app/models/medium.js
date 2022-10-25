import Model, { attr, belongsTo } from '@ember-data/model';

export default class MediumModel extends Model {
  @attr('string') format;
  @belongsTo('release') release;
}
