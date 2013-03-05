//
// ## router
//

define([
  'helpers/namespace',
  'marionette'
],

function(app, Marionette) {

  'use strict';

  var router, Router;

  app.on('initialize:before', function() {

    Router = Backbone.Router.extend({

      routes: {
        '*default' :  'index'
      },

      index: function() {
        require(['controllers/default'], function (Controller) {
          new Controller();
        });
      }

    });

    app.router = new Router();

  });

  app.on('start', function () {
    if (Backbone.history) {
      Backbone.history.start();
    }
  });

  return app;

});
