//
// # layout
//

define([
  'marionette',
  'helpers/namespace',
  'hbs!templates/layout',
  'views/navigation/index'
],

function (Marionette, app, appLayoutTmpl, NavView) {

  'use strict';

  var Layout, container, layout;

  //
  // create layouts and regions
  //
  Layout = Marionette.Layout.extend({
    template: appLayoutTmpl
  });

  container = new Backbone.Marionette.Region({
    el: "#content"
  });

  layout = new Layout();
  container.show(layout);

  app.addRegions({
    nav: "#nav",
    viewer: '#viewer',
    timeline: '#timeline'
  });

  app.nav.show(new NavView());

  return app;

});
