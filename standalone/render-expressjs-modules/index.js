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
      // Merge repo data on top of manulaly curated module metadata
      var repoData = _.find(repos, {name: module.name});
      module = _.extend(module, repoData);

      // Wrap req/res properties in backticks
      function backtickify (property){
        return '`'+property+'`';
      }
      module.req = _.map(module.req||[], backtickify);
      module.res = _.map(module.res||[], backtickify);
      return module;
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
