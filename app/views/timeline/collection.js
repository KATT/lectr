//
//  ## views.timeline.index
//

define([
 'helpers/namespace',
 'marionette',
 'hbs!templates/timeline/item'
],

function (app, Marionette, template) {

  'use strict';

  var Item = Marionette.ItemView.extend({
    tagname: 'li',
    template : template
  });

  var List = Marionette.CollectionView.extend({
    tagName: 'ul',
    itemView: Item
  });

  return List;

});
