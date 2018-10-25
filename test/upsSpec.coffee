
cups = require '../src/ups'
chai = require 'chai'
chai.use require 'chai-as-promised'
expect = chai.expect
sinon = require 'sinon'

cfEnv = require '../src/cfEnv'
cfTestData = require './cfTestData'

describe 'ups', ->
    sandbox = null

    beforeEach ->
        sandbox = sinon.sandbox.create()

    afterEach ->
        sandbox.restore()

    genOutput = (type) ->
      """cf #{type} firstAlias -p '{"alias":"firstAlias","url":"https://firstalias.url"}'
          cf #{type} secondAlias -p '{"alias":"secondAlias","url":"https://secondalias.url"}'
          cf #{type} thirdAlias -p '{"alias":"thirdAlias","url":"https://firstalias.url"}'"""

    it 'generates cups from CF', () ->
        sandbox.stub(cfEnv, 'getEnvs').withArgs('appname').returns Promise.resolve JSON.stringify cfTestData.vcap1
        expect(cups.generateFromCF('cups', 'appname')).to.eventually.eql genOutput('cups')

    it 'generates ups from CF', () ->
        sandbox.stub(cfEnv, 'getEnvs').withArgs('appname').returns Promise.resolve JSON.stringify cfTestData.vcap1
        expect(cups.generateFromCF('uups', 'appname')).to.eventually.eql genOutput('uups')
