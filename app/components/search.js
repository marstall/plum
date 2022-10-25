import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SearchComponent extends Component {
  @tracked query = '';
  @tracked textInput = this.query;
  @service router;
  thumbnailMap = {};

  queryParams = ['query'];
  @tracked releases = [];
  //
  // get thumbnail([id]) {
  //   return this.thumbnailMap[id]
  // }

  @action async serch() {
    console.log('serch!', this.textInput);
    console.log({ thumbnailMap: this.thumbnailMap });
    this.router.transitionTo('home', {
      queryParams: { query: this.textInput },
    });
  }
}
