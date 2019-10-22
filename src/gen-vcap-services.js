readFile = require 'fs-readfile-promise'
writeFile = require 'fs-writefile-promise'
ChildProcessPromise = require('child-process-promise')
cfEnv = require './cfEnv'

module.exports =

    generate: (inputPath, outputPath) ->
        @jsonify(inputPath)
        .then (obj) =>
            output = "export VCAP_SERVICES='" + JSON.stringify(obj.VCAP_SERVICES) + "'"
            if outputPath?
                @writeFile(JSON.stringify(obj.VCAP_SERVICES), outputPath)
                .then (result) =>
                        result
                .catch (error) ->
                        console.log 'file write error: ', error
            else
                console.log output
                output
        .catch (error) ->
                console.log error

    jsonify: (filePath) ->
        readFile filePath
        .then (data) ->
            func = (data, tries) ->
                try
                    JSON.parse(data)
                catch err
                    if tries is 1
                        data = '{' + data + '}'
                        func(data, tries+1)
                    else
                        Promise.reject 'error parsing JSON: ' + err
            func(data, 1)


    writeFile: (str, filePath) ->
        str = "export VCAP_SERVICES='" + str + "'"
        writeFile(filePath, str).then (fileName) ->
            fileName

    generateFromCF: (apps, outputPath) ->
        cfEnv.getEnvs(apps).then (envs) ->
            vcap = JSON.stringify JSON.parse(envs).VCAP_SERVICES
            out = "export VCAP_SERVICES='#{vcap}'"
            if outputPath?
                writeFile(out, outputPath)
            else
                console.log out
            out
