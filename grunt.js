/*global module:false*/
var fs = require('fs'),
    jshintOptions = JSON.parse(fs.readFileSync('./.jshintrc'));

module.exports = function(grunt) {

  "use strict";

  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-less');

  // Project configuration.
  grunt.initConfig({

    lint: {
      files: [
        'grunt.js',
        'test/app/**/*.js',
        'app/**/*.js'
      ]
    },

    watch: {
      files: ['<config:lint.files>', 'assets/css/app/*.less'],
      tasks: 'lint watch'
    },

    copy: {
      dist: {
        files: {
          'prod/app/index.html': 'app/index.html',
          'prod/assets/css/': 'assets/css/**'
        }
      }
    },

    less: {
      all: {
        src: 'assets/css/app/app.less',
        dest: 'assets/css/app/app.css',
        options: {
          compress: false,
          yuicompress: false
        }
      }
    },

    jshint: {
      options: jshintOptions
    },

    shell: {
      test: {
        command: 'node node_modules/testem/testem.js ci',
        stdout: true
      }
    },

    requirejs: {
      js: {
        almond: true,
        replaceRequireScript: [{
          files: ['prod/app/index.html'],
          module: 'main',
          modulePath: 'prod/app/main'
        }],
        insertRequire: ['main'],
        baseUrl: "app/",
        optimizeCss: "none",
        optimize: "uglify",
        uglify: {
          "beautify": false,
          "no-dead-code": true,
          "reserved-names": "require"
        },
        inlineText: true,
        useStrict: true,
        findNestedDependencies: true,
        optimizeAllPluginResources: true,
        paths: {
          app:           '.',
          text:          '../lib/require-text/text',
          hbs:           '../lib/backbone.marionette.hbs/backbone.marionette.hbs',
          jquery:        '../lib/jquery/jquery',
          handlebars:    '../lib/handlebars/handlebars',
          lodash:        '../lib/lodash/lodash',
          backbone:      '../lib/backbone/backbone',
          marionette:    '../lib/backbone.marionette/lib/backbone.marionette'
        },
        shim: {
          'backbone': {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
          },

          'marionette': {
            deps: ['backbone'],
            exports: 'Backbone.Marionette'
          },

          'handlebars': {
            exports: 'Handlebars'
          }
        },
        out: "prod/app/main.js",
        name: "main"
      }
    }

  });
  // Default task.
  grunt.registerTask('test', 'lint shell:test');
  grunt.registerTask('build', 'lint copy requirejs:js');

};
