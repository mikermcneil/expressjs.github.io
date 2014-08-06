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

    // console.log('META',require('../../modules.meta.json'));
    r_renderTpl({
      outputPath: path.resolve(process.cwd(), './MODULES.md'),
      tplPath: path.resolve(__dirname, './.MODULES.tpl.md'),
      locals: {
        repos: repos
      }
    }, cb);

  });
};
