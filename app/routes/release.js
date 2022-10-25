import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import _ from 'lodash';
import { clog } from '../utils/utils';

export default class ReleaseRoute extends Route {
  @service store;

  async model(params) {
    const release = await this.store.findRecord('release', params.release_id);
    if (!release.tracks) {
      return { release };
    }
    const tracks = release.tracks;
    const url = `https://coverartarchive.org/release/${release.id}`;
    const response = await fetch(url, { redirect: 'follow' });
    let thumbnailUrl = null;
    if (response.ok) {
      const json = await response.json();
      const images = json.images;
      if (images && images.length > 0) {
        thumbnailUrl = images[0].thumbnails.small;
      }
    }
    const recordings = [];
    for (let track of _.slice(tracks, 0, 10)) {
      try {
        recordings.push(
          await this.store.findRecord('recording', track.recording.id)
        );
      } catch (e) {
        clog('error loading recording', e);
      }
    }

    const [trackToRecordingMap, __] = tracks
      ? tracks.reduce(
          ([hash, index], track) => {
            return [
              {
                ...hash,
                ...{ [track.id]: recordings[index] },
              },
              index + 1,
            ];
          },
          [{}, 0]
        )
      : [{}, 0];
    const tracksWithRecordings = release.tracks.map((track) => {
      const trackClone = { ...track };
      trackClone.recording = trackToRecordingMap[track.id];
      return trackClone;
    });
    const artist =
      release.artistCredits && release.artistCredits.length > 0
        ? _.get(release, 'artistCredits[0].artist.name')
        : '';
    const spotifyUrl = `https://open.spotify.com/search/artist:${artist} album:${release.title}`;
    const tidalUrl = `https://listen.tidal.com/search?q=${artist} ${release.title}`;
    return {
      release,
      thumbnailUrl,
      tracks: tracksWithRecordings,
      spotifyUrl,
      tidalUrl,
    };
  }
}
