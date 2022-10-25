import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import jsont from 'json-transforms';
import _ from 'lodash';

export default class IndexController extends Controller {
  @tracked query = 'green-house';
  @tracked results = [];
  constructor() {
    super();
    this.serch();
  }

  @action async serch() {
    const url = `https://musicbrainz.org/ws/2/release-group?fmt=json&query=${this.query}`;
    const response = await fetch(url);
    const json = await response.json();
    const rules = [
      jsont.pathRule('."release-groups"', (d) => d.runner()),
      jsont.pathRule('.', (d) => ({
        title: d.match.title,
        artists: d.match['artist-credit'],
      })),
      jsont.identity,
    ];

    this.results = jsont.transform(json, rules);

    // const predicate = '*';
    //
    // this.results = _.get(json['release_groups'], []).map((releaseGroup) => {
    //   const artists = (releaseGroup['artist_credit'] || []).re;
    //   return {
    //     title: releaseGroup.title,
    //   };
    // });

    console.log(json, this.query, this.results[0]);
  }
}
