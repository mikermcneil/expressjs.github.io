/**
 * Module dependencies
 */

var _ = require('lodash');



module.exports = function(options, cb) {
  require('node-machine')
  .build(require('machinepack-github/get-organization-repos'))
  .configure({
    user: 'expressjs'
  })
  .configure(options)
  .exec(function(err, repos) {
    if (err) return cb(err);
    repos = _.map(repos, function(repo) {
      return _.pick(repo, ['id', 'name', 'description', 'html_url']);
    });
    return cb(null, repos);
  });
};
