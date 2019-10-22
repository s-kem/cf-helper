chai = require 'chai'
chai.use require 'chai-as-promised'
readFile = require 'fs-readfile-promise'
expect = chai.expect
sinon = require 'sinon'
fs = require 'fs'
ChildProcessPromise = require('child-process-promise')
_ = require 'underscore'

testData = require './testData'

gen = require '../src/gen-vcap-services'
cfEnv = require '../src/cfEnv'

cfTestData = require './cfTestData'


describe 'cfEnv', ->
    sandbox = null

    beforeEach () ->
        sandbox = sinon.sandbox.create()

    afterEach () ->
        sandbox.restore()

    it 'gets environment from cf', () ->
        sandbox.stub(ChildProcessPromise, 'exec').withArgs('cf env testapp').returns Promise.resolve {stdout: cfTestData.cfenvOutput}
        expect(cfEnv.getEnv('testapp')).to.eventually.eql cfTestData.vcap1

    it 'gets multiple environments from cf and combines', () ->
        stub = sandbox.stub(ChildProcessPromise, 'exec').withArgs('cf env testapp').returns Promise.resolve {stdout: cfTestData.cfenvOutput}
        stub.withArgs('cf env testapp2').returns Promise.resolve {stdout: cfTestData.cfenvOutput2 }
        stub.withArgs('cf env testapp3').returns Promise.resolve {stdout: cfTestData.cfenvOutput3 }
        expect(cfEnv.getEnvs('testapp,testapp2,testapp3')).to.eventually.eql JSON.stringify cfTestData.mergedContents
