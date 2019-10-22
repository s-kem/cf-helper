cfEnv = require './cfEnv'
readFile = require 'fs-readfile-promise'
_ = require 'underscore'


generateUps = (command, ups) ->
    "cf #{command} #{ups.name || ups.credentials.alias} -p '#{JSON.stringify ups.credentials}'"

jsonify = (filePath) ->
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

cups =
    generate: (command, file) ->
      jsonify(file)
        .then (obj) =>
            try
                obj.VCAP_SERVICES['user-provided']
                .map( (ups) -> generateUps(command, ups)).join('\n')
            catch err
                console.log err
        .catch (error) ->
                console.log error

    generateFromCF: (command, appname) ->
        cfEnv.getEnvs(appname).then (env) ->
            try
                JSON.parse(env).VCAP_SERVICES['user-provided']
                .map( (ups) -> generateUps(command, ups)).join('\n')
            catch err
                console.log err
        .catch (err) ->
            console.log 'failed to get cf env: ', err



module.exports = cups
