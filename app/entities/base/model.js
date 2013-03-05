//
// ## entities.base.model
//

define([
  'relational'
],

function() {

  "use strict";

  var SuperModel = Backbone.SuperModel = Backbone.Model.extend({
    idAttribute: 'id'
  });

  return SuperModel;

});
