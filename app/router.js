import EmberRouter from '@ember/routing/router';
import config from 'plum/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('iteration', function () {});
  this.route('home', { path: '/' }, function () {});
  this.route('release-group', { path: '/release-group/:release_group_id' });
  this.route('release', { path: '/release/:release_id' });
  this.route('recording', { path: '/recording/:recording_id' });
  this.route('artist', { path: '/artist/:artist_id' });
  this.route('work', { path: '/work/:work_id' });
  this.route('label', { path: '/label/:label_id' });
});
