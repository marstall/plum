import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RecordingRoute extends Route {
  @service store;
  async model(params) {
    console.log('recording route');
    const recording = params.recording_id
      ? await this.store.findRecord('recording', params.recording_id)
      : {};

    const works =
      recording.relations &&
      recording.relations
        .filter((relation) => relation['target-type'] === 'work')
        .map((relation) => relation.work);
    const work = works && works.length > 0 ? works[0] : null;
    console.log({ work });
    return { recording, work };
  }
}
