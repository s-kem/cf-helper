/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const readFile = require('fs-readfile-promise');
const writeFile = require('fs-writefile-promise');
const ChildProcessPromise = require('child-process-promise');
const cfEnv = require('./cfEnv');

module.exports = {

    generate(inputPath, outputPath) {
        return this.jsonify(inputPath)
        .then(obj => {
            const output = "export VCAP_SERVICES='" + JSON.stringify(obj.VCAP_SERVICES) + "'";
            if (outputPath != null) {
                return this.writeFile(JSON.stringify(obj.VCAP_SERVICES), outputPath)
                .then(result => {
                        return result;
            }).catch(error => console.log('file write error: ', error));
            } else {
                console.log(output);
                return output;
            }
    }).catch(error => console.log(error));
    },

    jsonify(filePath) {
        return readFile(filePath)
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
    },


    writeFile(str, filePath) {
        str = "export VCAP_SERVICES='" + str + "'";
        return writeFile(filePath, str).then(fileName => fileName);
    },

    generateFromCF(apps, outputPath) {
        return cfEnv.getEnvs(apps).then(function(envs) {
            const vcap = JSON.stringify(JSON.parse(envs).VCAP_SERVICES);
            const out = `export VCAP_SERVICES='${vcap}'`;
            if (outputPath != null) {
                writeFile(out, outputPath);
            } else {
                console.log(out);
            }
            return out;
        });
    }
};
