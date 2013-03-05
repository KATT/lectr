var express   = require('express'),
    fs        = require('fs'),
    _         = require('underscore'),

    site      = express(),
    staticDir = express['static'];

module.exports = function(opts) {
  opts = _.extend({
    port :      4444,
    tests :     true,
    baseDir :   './'
  }, opts || {});

  site.configure(function() {
    [ 'app', 'lib', 'assets', 'tests' ].forEach(function(dir) {
      site.use('/' + dir, staticDir(opts.baseDir + dir));
    });
    site.use(express.bodyParser());
  });

  site.get("/", function(req, res) {
    fs.createReadStream(opts.baseDir + 'app/index.html').pipe(res);
  });

  if (opts.tests) {
    site.get("/_test", function(req, res) {
      fs.createReadStream(opts.baseDir + 'tests/app/runner.html').pipe(res);
    });
  }

  var getCollection = function (model, where) {
    var collection = JSON.parse(fs.readFileSync(__dirname + '/../data/output/' + model + '.json'));
    if (where) {
      collection = _.where(collection, where);
    }
    return collection;
  };

  var respond = function (req, res) {
    var data;
    if (req.params.submodel) {
      var where = {};

      // lectures -> lectureId
      where[req.params.model.substr(0, req.params.model.length-1) + 'Id']  = parseInt(req.params.modelID, 10);
      data = getCollection(req.params.submodel, where);
      return res.send(data);
    }

    data = getCollection(req.params.model);
    
    if (req.params.modelID) {
      data = _.findWhere(data, {
        id: parseInt(req.params.modelID, 10)
      });
    }

    return res.send(data);
  };


  site.get('/:model/:modelID/:submodel', respond);
  site.get('/:model/:modelID', respond);
  site.get('/:model', respond);

  var idCounter = 1000;
  site.post('*', function (req, res) {
    var body = req.body;
    body.id = idCounter++;

    res.send(body);
  });

  // Actually listen
  site.listen(opts.port || null);
  console.log("Serving at http://localhost:" + (opts.port || ''));
};
