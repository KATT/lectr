//
//  ## views.viewer.index
//

define([
 'helpers/namespace',
 'marionette',
 'hbs!templates/viewer/index',
 'swfobject'
],

function (app, Marionette, template, swfobject) {

  'use strict';

  var view = Marionette.ItemView.extend({
    template : template,
    initialize: function () {
    }

  });

  return view;

});
