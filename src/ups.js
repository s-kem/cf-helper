/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const cfEnv = require('./cfEnv');
const readFile = require('fs-readfile-promise');
const _ = require('underscore');


const generateUps = (command, ups) => `cf ${command} ${ups.name || ups.credentials.alias} -p '${JSON.stringify(ups.credentials)}'`;

const jsonify = filePath => readFile(filePath)
.then(function(data) {
    var func = function(data, tries) {
        try {
            return JSON.parse(data);
        } catch (err) {
            if (tries === 1) {
                data = '{' + data + '}';
                return func(data, tries+1);
            } else {
                return Promise.reject('error parsing JSON: ' + err);
            }
        }
    };
    return func(data, 1);
});

const cups = {
    generate(command, file) {
      return jsonify(file)
        .then(obj => {
            try {
                return obj.VCAP_SERVICES['user-provided']
                .map( ups => generateUps(command, ups)).join('\n');
            } catch (err) {
                return console.log(err);
            }
    }).catch(error => console.log(error));
  },

    generateFromCF(command, appname) {
        return cfEnv.getEnvs(appname).then(function(env) {
            try {
                return JSON.parse(env).VCAP_SERVICES['user-provided']
                .map( ups => generateUps(command, ups)).join('\n');
            } catch (err) {
                return console.log(err);
            }}).catch(err => console.log('failed to get cf env: ', err));
    }
};



module.exports = cups;
