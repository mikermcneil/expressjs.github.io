/**
 * Module dependencies
 */

var util = require('util');
var fsx = require('fs-extra');
var _ = require('lodash');




/**
 *
 */

module.exports = function renderTemplate(options, cb){
  options = options || {};

  options.outputPath = options.outputPath || '.travis.yml';
  options.tplPath = options.tplPath || '.travis.yml.tpl';
  options.locals = options.locals || {};

  try {

    // Now if `.travis.yml.tpl` exists, write the encrypted data
    // to the travis file.
    if (!fsx.existsSync(options.tplPath)) {
      return cb(new Error(util('Could not find template file for .travis.yml at %s', options.tplPath)));
    }

    fsx.writeFileSync(options.outputPath,
      _.template(
        fsx.readFileSync(options.tplPath),
        _.extend(options.locals, {_:_})
      )
    );
  }
  catch (e) { return cb(e); }

  return cb();
};

