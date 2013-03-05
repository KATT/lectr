//
// ## controllers.default
//

define([
  'helpers/namespace',
  'marionette',
  'entities/courses',
],

function (app, Marionette) {

  "use strict";

  var controller = Marionette.Controller.extend({

    initialize: function (options) {
      var self = this;
      this.options = options || {};

      this.collection = app.request('entities:courses');

      console.log(this.collection)

    }

  });

  return controller;

});
