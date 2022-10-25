import Model, { attr, hasMany } from '@ember-data/model';

export default class ReleaseModel extends Model {
  @attr('date') date;
  @attr('string') title;
  @attr media;
  @attr artistCredits;
  @attr labelInfo;
  @attr format;
  @attr primaryType;
  @attr tracks;
}
