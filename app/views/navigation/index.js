//
//  ## views.navigation.index
//

define([
 'helpers/namespace',
 'marionette',
 'hbs!templates/navigation/index'
],

function (app, Marionette, template) {

  'use strict';

  var view = Marionette.ItemView.extend({
    template : template
  });

  return view;

});
