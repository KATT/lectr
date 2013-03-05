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

  entities.LectureModel = BaseModel.extend({
    defaults: {
      courseId: '', // TODO make proper relation
      title: '',
      description: '',
      url: ''
    }
  }),

  entities.LecturesCollection = BaseCollection.extend({
    model: entities.LectureModel,
    url: app.request('entities:config').get('apiUrl') + 'lectures'
  });

  var API = {
    getsomeResource: function() {
      var collection = new entities.LecturesCollection();
      collection.fetch();

      return collection;
    }
  };

  app.reqres.addHandler("entities:lectures", function() {
    return API.getsomeResource();
  });

});
