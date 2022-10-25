import Model, { attr } from '@ember-data/model';

export default class RecordingModel extends Model {
  @attr('string') title;
  @attr firstReleaseDate;
  @attr relations;
  @attr releases;
}
