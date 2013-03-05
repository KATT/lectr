//
// ## app/config
//

require.config({
  deps:            window.mocha ? ['../tests/app/config'] : ['main'],
  paths: {
    lib:           '../lib/',
    tests:         '../tests',
    app:           '.',
    text:          '/lib/requirejs-text/text',
    hbs:           '/lib/backbone.marionette.hbs/backbone.marionette.hbs',
    jquery:        '/lib/jquery/jquery',
    handlebars:    '/lib/handlebars/handlebars',
    lodash:        '/lib/lodash/lodash',
    backbone:      '/lib/backbone/backbone',
    bootstrap:     '/lib/bootstrap/boostrap',
    marionette:    '/lib/backbone.marionette/lib/backbone.marionette',
    relational:    '/lib/backbone-relational/backbone-relational'
  },

  shim: {
    'backbone': {
      deps: ['lodash', 'jquery'],
      exports: 'Backbone'
    },

    'marionette': {
      deps: ['backbone'],
      exports: 'Backbone.Marionette'
    },

    'handlebars': {
      exports: 'Handlebars'
    },
    'bootstrap':{
      deps: ['jquery']
    }
  }
});

//
// requirejs error reporting
//
window.requirejs.onError = function (err) {
  "use strict";

  console.warn('require error: ', err.requireType);
  if (err.requireType === 'timeout') {
    console.warn('modules: ' + err.requireModules);
  }

  throw err;
};

if (!window.mocha) {
  require(['main']);
}
