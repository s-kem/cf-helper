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
cfData = require './cfTestData'

describe 'gen-vcap-services', ->

    sandbox = null

    beforeEach () ->
        sandbox = sinon.sandbox.create()

    afterEach () ->
        sandbox.restore()

    it 'opens a file, JSONifies it', () ->
        expect(gen.jsonify process.cwd() + '/test/testFile').to.eventually.eql testData.obj


    it 'writes the string to a file', () ->
        outPath = process.cwd() + '/test/testFileOut'
        expect(gen.writeFile JSON.stringify(testData.obj.VCAP_SERVICES), outPath).to.eventually.eql outPath
        readFile(outPath).then (result) ->
            expect(result.toString()).to.eql testData.expectedFileContents
            fs.unlinkSync(outPath) #delete the generated test output file

    it 'generates with file output', (done) ->
        outPath = process.cwd() + '/test/testOut'
        sandbox.stub(gen, "jsonify").returns Promise.resolve testData.obj
        writeFileStub = sandbox.stub(gen, "writeFile").returns Promise.resolve outPath
        gen.generate(testData.testFilePath, outPath).then (result) ->
            expect(result).to.eql outPath
            expect(writeFileStub.calledWith(JSON.stringify(testData.obj.VCAP_SERVICES), outPath)).to.be.true
            done()
        .catch(done)

    it 'generates without file output', () ->
        sandbox.stub(gen, "jsonify").returns Promise.resolve testData.obj
        writeFileStub = sandbox.stub(gen, "writeFile")
        expect(writeFileStub.callCount).to.eql 0
        expect(gen.generate(testData.testFilePath)).to.eventually.eql testData.expectedFileContents

    it 'generates from cf', () ->
        sandbox.stub(cfEnv, 'getEnvs').withArgs('testapp').returns Promise.resolve JSON.stringify cfData.vcap1
        #cfStub.withArgs('testapp2').returns Promise.resolve cfData.vcap2
        expect(gen.generateFromCF('testapp')).to.eventually.eql testData.expectedFileContents


    # it 'gets input from cf instead of file', () ->
    #     sandbox.stub(ChildProcessPromise, 'exec').withArgs('cf env testapp').returns Promise.resolve {stdout: testData.cfenvOutput}
    #     expect(gen.generateFromCF('testapp')).to.eventually.eql testData.expectedFileContents
