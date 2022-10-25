import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'plum/config/environment';
import ApplicationAdapter from './adapters/application';
import Inflector from 'ember-inflector';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
  ApplicationAdapter = ApplicationAdapter;
}

var inflector = Inflector.inflector;

inflector.irregular('release', 'release');

loadInitializers(App, config.modulePrefix);
