//
// # entities.example
//
define([
  'helpers/namespace',
  'marionette',
  'entities/base/model',
  'entities/base/collection',
  'entities/config'
],

function(app, Marionette, BaseModel, BaseCollection) {

  'use strict';

  var entities = {};

  entities.CommentModel = BaseModel.extend({
    defaults: {
      courseId: '', // TODO make proper relation
      title: '',
      description: '',
      url: '',
      created_at: ''
    }
  }),

  entities.CommentsCollection = BaseCollection.extend({
    model: entities.CommentModel,
    url: app.request('entities:config').get('apiUrl') + 'comments'
  });

  var API = {
    getsomeResource: function() {
      var collection = new entities.CommentsCollection();
      collection.fetch();

      return collection;
    }
  };

  app.reqres.addHandler("entities:comments", function() {
    return API.getsomeResource();
  });

});
