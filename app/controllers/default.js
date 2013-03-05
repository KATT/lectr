//
// ## controllers.default
//

define([
  'helpers/namespace',
  'marionette',
  'views/viewer/index',
  'views/timeline/collection',
  'entities/courses'
],

function (app, Marionette, ViewerView, TimelineView) {

  "use strict";

  var controller = Marionette.Controller.extend({

    initialize: function (options) {
      var self = this;
      this.options = options || {};

      this.collection = app.request('entities:courses');

      this.viewer();
      this.timeline();
    },

    viewer: function () {
      var view = new ViewerView();
      app.viewer.show(view);
    },

    timeline: function () {
      var view = new TimelineView({
        collection: this.collection
      });
      app.timeline.show(view);
    }

  });

  return controller;

});
