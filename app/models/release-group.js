import Model, { attr } from '@ember-data/model';

export default class ReleaseGroupModel extends Model {
  @attr title;
  @attr releases;
  @attr artistCredits;
}
