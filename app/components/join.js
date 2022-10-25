import Component from '@glimmer/component';
import _ from 'lodash';
export default class JoinComponent extends Component {
  get items() {
    const { field, items } = this.args;
    return items && items.map((item) => _.get(item, field));
  }
}
