import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ReleaseGroupRoute extends Route {
  @service store;

  // async model(params) {
  //   console.log('release-group');
  //
  //   console.log({ params: Object.entries(params) });
  //   console.log(params['releaseGroupId']);
  //   return params.release_group_id
  //     ? this.store.findRecord('release-group', params.release_group_id)
  //     : {};
  //
  //   // const url =
  //   //   'https://musicbrainz.org/ws/2/release-group/a9e30282-5b37-3f92-b897-b9659a1a312b?inc=releases%2Bartists&fmt=json';
  //   // const response = await fetch(url);
  //   // const json = await response.json();
  //   // console.log({ json });
  //   // return json;
  // }
}
