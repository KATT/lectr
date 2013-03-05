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
    tagname: 'section',
    template : template
  });

  var List = Marionette.CollectionView.extend({
    tagName: 'media',
    itemView: Item
  });

  return List;

});
