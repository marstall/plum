import Route from '@ember/routing/route';
import _ from 'lodash';

export default class IndexRoute extends Route {
  queryParams = {
    query: {
      refreshModel: true,
    },
  };

  async model(params) {
    console.log('The model hook just ran!', params);
    if (!params.query || params.query.length === 0) return;
    const releases = await this.store.query('release', {
      query: params.query,
      fmt: 'json',
    });
    const thumbnailMap = {};
    for (let release of _.slice(releases.content, 0, 5)) {
      const url = `https://coverartarchive.org/release/${release.id}`;
      const response = await fetch(url, { redirect: 'follow' });
      if (response.ok) {
        const json = await response.json();
        const images = json.images;
        if (images && images.length > 0) {
          thumbnailMap[release.id] = images[0].thumbnails.small;
        }
      }
    }
    return { releases, thumbnailMap };
  }
}
