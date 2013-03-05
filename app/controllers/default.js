//
// ## controllers.default
//

define([
  'helpers/namespace',
  'marionette',
  'views/viewer/index',
  'views/timeline/collection',
  'entities/courses',
  'entities/lectures',
  'entities/comments'
],

function (app, Marionette, ViewerView, TimelineView) {

  "use strict";

  var controller = Marionette.Controller.extend({

    initialize: function (options) {
      var self = this;
      this.options = options || {};

      this.collection = app.request('entities:lectures');
      this.comments = app.request('entities:comments');

      this.collection.on('reset', function (data) {
        self.viewer(data.first());
      });
      this.comments.on('reset', function (data) {
        self.timeline(data);
      });
    },

    viewer: function (data) {
      var view = new ViewerView({
        model: data
      });
      app.viewer.show(view);
    },

    timeline: function (data) {
      var view = new TimelineView({
        collection: data
      });
      app.timeline.show(view);
    }

  });

  return controller;

});
