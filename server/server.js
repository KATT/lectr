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

  var respond = function (req, res) {
    var collection = JSON.parse(fs.readFileSync(__dirname + '/../data/output/data.json'));
    
    if (!req.params.id) {
      return res.send(collection);
    }
    var model = _.findWhere(collection, {
      id: parseInt(req.params.id)
    });

    if (!req.params.submodel) {
      return res.send(model);
    }

    var subCollection = model[req.params.submodel];

    if (!req.params.submodelId) {
      return res.send(subCollection);
    }


    var subModel = _.findWhere(subCollection, {
      id: parseInt(req.params.submodelId)
    });

    return res.send(subModel);
  };

  site.get('/:model/:id/:submodel/:submodelId', respond);
  site.get('/:model/:id/:submodel', respond);
  site.get('/:model/:id', respond);
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
