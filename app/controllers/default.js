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
        //self.fixViewer();
      });
      this.comments.on('reset', function (data) {
        //self.timeline(data);

        var steps = 200;
        var totalTime = 600000;
        var i = 0;
        setInterval(function() {
          self.updateTimeline(steps*i++ / totalTime);
        }, steps);
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
    },


    fixViewer: function() {
      var $viewerBody = $('#viewer-body');

      var $viewerPlaceHolder = $('div');
      $viewerPlaceHolder.css({
        width: $viewerBody.width(),
        height: $viewerBody.height()
      });

      $viewerBody.css({
        position: 'fixed',
        top: 0,
        left: '50%',
        marginLeft: - $viewerBody.width()/2
      });

    },

    updateTimeline: function(percentage) {
      var $timeline = $('#timeline');

      var height = $timeline.height();

      var offset = height * percentage * -1;

      $timeline.css({
        backgroundPosition: '0 ' + offset + 'px'
      });
    }

  });

  return controller;

});
