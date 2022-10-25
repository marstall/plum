import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class RelationComponent extends Component {
  get text() {
    console.log({ args: this.args.relation });
    return this.args.relation.direction;
  }
}
