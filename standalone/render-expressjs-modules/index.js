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
      return _.merge(module, _.find(repos, {name: module.name}));
    });

    console.log('yey',modules);
    r_renderTpl({
      outputPath: path.resolve(process.cwd(), './MODULES.md'),
      tplPath: path.resolve(__dirname, './.MODULES.tpl.md'),
      locals: {
        modules: modules
      }
    }, cb);

  });
};
