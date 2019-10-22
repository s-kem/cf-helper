_ = require 'underscore'
string = require 'underscore.string'
gen = require './gen-vcap-services'
ups = require './ups'

getOptions = (args) ->
    options = require('minimist')(args)
    options.output = options.o?.trim() or null
    options.command = options['_'][2]
    options = _(options).chain().map((val, key) -> [string.camelize(key), val]).object().value()
    options

parsePath = (path) ->
    if path.startsWith('~')
        path.replace('~', process.env.HOME)
    else if not path.startsWith('/')
        process.cwd() + '/' + path
    else
        path

genExport = (options, input, output) ->
  if options.cfapps
    gen.generateFromCF(options.cfapps, output)
  else if input
      gen.generate(input, output)
  else
      console.log 'cfapps or file input argument required'

genUps = (command, options, input, output) ->
  if options.file?
      ups.generate(command, options.file).then (result) ->
        console.log result
  else if options.cfapps
      ups.generateFromCF(command, options.cfapps).then (result) ->
          console.log result
main = (args) ->
    options = getOptions(args)
    input = if options.file? then parsePath options.file else null
    output = if options.output? then parsePath options.output else null
    switch options.command
      when 'gen-export' then genExport(options, input, output)
      when 'gen-cups' then genUps('cups', options, input, output)
      when 'gen-uups' then genUps('uups', options, input, output)
      else console.log "Command: #{options.command} not recognized. Valid options are gen-export, gen-cups, and gen-uups."
module.exports = {main}
