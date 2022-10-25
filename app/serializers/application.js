import JSONSerializer from '@ember-data/serializer/json';
import { clog } from '../utils/utils';
import _ from 'lodash';

export default class ApplicationSerializer extends JSONSerializer {
  normalizeQueryResponse(store, primaryModelClass, payload) {
    return {
      data: payload.releases.map((elem) =>
        this.normalize(primaryModelClass, elem)
      ),
    };
  }

  normalizeReleaseAttributes(payload) {
    const primaryType = _.get(payload, 'release-group', {})['primary-type'];
    const format = _.get(payload, 'media[0].format');
    const tracks = _.get(payload, 'media', []).reduce(
      (acc, media) => [...acc, ...media.tracks],
      []
    );
    return {
      title: payload.title,
      media: payload.media,
      tracks,
      artistCredits: payload['artist-credit'],
      date: _.split(payload['date'] || '', '-')[0],
      packaging: payload.packaging,
      format,
      labelInfo: _.get(payload, 'label-info', []),
      primaryType,
    };
  }

  normalize(primaryModelClass, payload) {
    const props = {
      'release-group': {
        attributes: {
          title: payload.title,
          releases: payload.releases,
          artistCredits: payload['artist-credit'],
        },
      },
      release: {
        attributes: this.normalizeReleaseAttributes(payload),
      },
      recording: {
        attributes: {
          title: payload.title,
          firstReleaseDate: payload['first-release-date'],
          relations: payload.relations,
          releases: payload.releases,
        },
      },
      artist: {
        attributes: {
          name: payload.name,
          relations: payload.relations,
          releases: payload.releases,
        },
      },
    };

    return {
      data: {
        id: payload.id,
        type: primaryModelClass.modelName,
        attributes: props[primaryModelClass.modelName].attributes,
        relationships: props[primaryModelClass.modelName].relationships,
      },
    };
  }
}
