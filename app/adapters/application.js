import Adapter from '@ember-data/adapter';
import RSVP from 'rsvp';
import { paramsToQueryString } from '../utils/utils';
import _ from 'lodash';
// import fetch from 'ember-fetch';
import RESTAdapter from '@ember-data/adapter/rest';
export default class ApplicationAdapter extends RESTAdapter {
  // Application specific overrides go here
  host = 'https://musicbrainz.org';
  baseUrl = 'https://musicbrainz.org';

  namespace = 'ws/2';
  extraParams = 'fmt=json';
  incs = {
    'release-group': 'releases+artists',
    release: 'recordings+artist-credits+labels+artists',
    recording: 'work-level-rels+work-rels+artist-rels+releases+release-rels',
    artist:
      'releases+recordings+recording-rels+artist-credits+instrument-rels+release-rels+work-rels+works',
  };

  async __query(store, type, query) {
    const incString = this.incs[type.modelName]
      ? '?inc=' + this.incs[type.modelName] + '&'
      : '?';
    const url =
      this.baseUrl +
      '/' +
      type.modelName +
      incString +
      this.extraParams +
      paramsToQueryString(query);
    return new RSVP.Promise(function (resolve, reject) {
      fetch(url).then(
        function (data) {
          resolve(data);
        },
        function (jqXHR) {
          reject(jqXHR);
        }
      );
    });
  }

  async _query(store, type, query) {
    try {
      console.log('inapp query');
      // console.log('findRecord', store, type, id);
      const incString = this.incs[type.modelName]
        ? '?inc=' + this.incs[type.modelName] + '&'
        : '?';
      const url =
        this.baseUrl +
        '/' +
        type.modelName +
        incString +
        this.extraParams +
        paramsToQueryString(query);
      const response = await fetch(url, {
        mode: 'cors',
        headers: { origin: '*' },
      });
      const json = await response.json();
      console.log({
        query: { type: type.modelName, url, releases: json.releases },
      });
      return _.slice(json.releases, 0, 1);
    } catch (error) {
      console.log({ findRecordError: error });
      return { data: {} };
    }
  }

  async findRecord(store, type, id = '') {
    try {
      // console.log('findRecord', store, type, id);
      const incString = this.incs[type.modelName]
        ? '?inc=' + this.incs[type.modelName] + '&'
        : '?';
      const url =
        this.baseUrl +
        '/' +
        this.namespace +
        `/${type.modelName}/${id}` +
        incString +
        this.extraParams;
      const response = await fetch(url);
      const json = await response.json();
      //console.log({ type: type.modelName, id, url, json });
      return json;
    } catch (error) {
      console.log({ findRecordError: error });
      return { data: {} };
    }
  }
}
