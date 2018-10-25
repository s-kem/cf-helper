readFile = require 'fs-readfile-promise'
writeFile = require 'fs-writefile-promise'
ChildProcessPromise = require('child-process-promise')

callCF = (appName) ->
    cmd = 'cf env ' + appName
    ChildProcessPromise.exec(cmd).then (result) ->
        result.stdout
    .catch (error) ->
        console.log error.stdout


pruneOutput = (str) ->
    output = ""
    ct = 0
    isFirst = true
    ctRaised = false
    str.split('\n').forEach (line) ->
        if line.includes '{'
            ct++
            ctRaised = true
        if ct > 0 and isFirst
            output+=line
        if line.includes '}'
            ct--
        if ct is 0 and ctRaised
            isFirst = false
    output

combineCredentials = (arr) ->
    merged = arr.map (obj, index) ->
        str = JSON.stringify(obj.VCAP_SERVICES['user-provided'])
        if index is 0
            str.substring(0, str.length-1)
        else
            str.substring(1, str.length-1)
    obj = JSON.parse JSON.stringify(arr[0])
    obj.VCAP_SERVICES['user-provided'] = JSON.parse merged.join(',') + ']'
    obj

cfEnv =
    getEnvs: (apps) ->
        promises = apps.split(',').map (app) => callCF(app)
        Promise.all(promises).then (results) =>
            parsed = results.map (result, index) =>
                pruned = pruneOutput result
                try
                    JSON.parse pruned
                catch
                    Promise.reject 'error parsing JSON: ', err

            JSON.stringify combineCredentials parsed

    getEnv: (app) ->
        callCF(app).then (result) ->
            pruned = pruneOutput result
            try
                JSON.parse pruneOutput(result)
            catch err
                Promise.reject 'error parsing JSON: ', err

module.exports = cfEnv
