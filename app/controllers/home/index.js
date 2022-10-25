import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import ApplicationSerializer from '../../serializers/application';

export default class HomeController extends Controller {
  @tracked query = '';
  queryParams = ['query'];
}
