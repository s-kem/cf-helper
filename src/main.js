// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('underscore');
const string = require('underscore.string');
const gen = require('./gen-vcap-services');
const ups = require('./ups');

const getOptions = function(args) {
    let options = require('minimist')(args);
    options.output = (options.o != null ? options.o.trim() : undefined) || null;
    options.command = options['_'][2];
    options = _(options).chain().map((val, key) => [string.camelize(key), val]).object().value();
    return options;
};

const parsePath = function(path) {
    if (path.startsWith('~')) {
        return path.replace('~', process.env.HOME);
    } else if (!path.startsWith('/')) {
        return process.cwd() + '/' + path;
    } else {
        return path;
    }
};

const genExport = function(options, input, output) {
  if (options.cfapps) {
    return gen.generateFromCF(options.cfapps, output);
  } else if (input) {
      return gen.generate(input, output);
  } else {
      return console.log('cfapps or file input argument required');
  }
};

const genUps = function(command, options, input, output) {
  if (options.file != null) {
      return ups.generate(command, options.file).then(result => console.log(result));
  } else if (options.cfapps) {
      return ups.generateFromCF(command, options.cfapps).then(result => console.log(result));
  }
};
const main = function(args) {
    const options = getOptions(args);
    const input = (options.file != null) ? parsePath(options.file) : null;
    const output = (options.output != null) ? parsePath(options.output) : null;
    switch (options.command) {
      case 'gen-export': return genExport(options, input, output);
      case 'gen-cups': return genUps('cups', options, input, output);
      case 'gen-uups': return genUps('uups', options, input, output);
      default: return console.log(`Command: ${options.command} not recognized. Valid options are gen-export, gen-cups, and gen-uups.`);
    }
};
module.exports = {main};
