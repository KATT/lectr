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

  entities.CourseModel = BaseModel.extend({
    defaults: {
      title: '',
      description: ''
    }
  }),

  entities.CoursesCollection = BaseCollection.extend({
    model: entities.CourseModel,
    url: app.request('entities:config').get('apiUrl') + 'courses'
  });

  var API = {
    getsomeResource: function() {
      var collection = new entities.CoursesCollection();
      collection.fetch();

      return collection;
    }
  };

  app.reqres.addHandler("entities:courses", function() {
    return API.getsomeResource();
  });

});
