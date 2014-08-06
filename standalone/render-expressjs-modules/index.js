/**
 * Module dependencies
 */

var path = require('path');
var _ = require('lodash');
var r_getWebFrameworkRepos = require('../get-expressjs-repos');
var r_renderTpl = require('../render-template');

module.exports = function(options, cb) {

  r_getWebFrameworkRepos({limit:100}, function(err, repos) {
    if (err) return cb(err);

    var moduleMetadatas = require('./modules.meta.json');
    var modules = _.map(moduleMetadatas, function (module){
      return _.extend(module, _.find(repos, {name: module.name}));
    });

    r_renderTpl({
      outputPath: path.resolve(process.cwd(), './MODULES.md'),
      tplPath: path.resolve(__dirname, './.MODULES.tpl.md'),
      locals: {
        modules: modules
      }
    }, function (err) {
      if (err) return cb(err);
      return cb(null, modules);
    });

  });
};
