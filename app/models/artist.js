import Model, { attr } from '@ember-data/model';

export default class ArtistModel extends Model {
  @attr('string') name;
  @attr relations;
  @attr releases;
}
