// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const readFile = require('fs-readfile-promise');
const writeFile = require('fs-writefile-promise');
const ChildProcessPromise = require('child-process-promise');

const callCF = function(appName) {
    const cmd = 'cf env ' + appName;
    return ChildProcessPromise.exec(cmd).then(result => result.stdout).catch(error => console.log(error.stdout));
};


const pruneOutput = function(str) {
    let output = "";
    let ct = 0;
    let isFirst = true;
    let ctRaised = false;
    str.split('\n').forEach(function(line) {
        if (line.includes('{')) {
            ct++;
            ctRaised = true;
        }
        if ((ct > 0) && isFirst) {
            output+=line;
        }
        if (line.includes('}')) {
            ct--;
        }
        if ((ct === 0) && ctRaised) {
            return isFirst = false;
        }
    });
    return output;
};

const combineCredentials = function(arr) {
    const merged = arr.map(function(obj, index) {
        const str = JSON.stringify(obj.VCAP_SERVICES['user-provided']);
        if (index === 0) {
            return str.substring(0, str.length-1);
        } else {
            return str.substring(1, str.length-1);
        }
    });
    const obj = JSON.parse(JSON.stringify(arr[0]));
    obj.VCAP_SERVICES['user-provided'] = JSON.parse(merged.join(',') + ']');
    return obj;
};

const cfEnv = {
    getEnvs(apps) {
        const promises = apps.split(',').map(app => callCF(app));
        return Promise.all(promises).then(results => {
            const parsed = results.map((result, index) => {
                const pruned = pruneOutput(result);
                try {
                    return JSON.parse(pruned);
                } catch (error) {
                    return Promise.reject('error parsing JSON: ', err);
                }
            });

            return JSON.stringify(combineCredentials(parsed));
        });
    },

    getEnv(app) {
        return callCF(app).then(function(result) {
            const pruned = pruneOutput(result);
            try {
                return JSON.parse(pruneOutput(result));
            } catch (err) {
                return Promise.reject('error parsing JSON: ', err);
            }
        });
    }
};

module.exports = cfEnv;
