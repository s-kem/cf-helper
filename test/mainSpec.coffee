chai = require 'chai'
chai.use require 'chai-as-promised'
expect = chai.expect
sinon = require 'sinon'
gen = require '../src/gen-vcap-services'
main = require '../src/main'
ups = require '../src/ups'

describe 'main', ->
    sandbox = null
    genStub = null
    cfStub = null

    beforeEach ->
        sandbox = sinon.sandbox.create()
        genStub = sandbox.stub(gen, 'generate').returns Promise.resolve 'bob'
        cfStub = sandbox.stub(gen, 'generateFromCF').returns Promise.resolve 'bill'

    afterEach ->
        sandbox.restore()

    it 'process command line args for generating export', (done) ->
        cmdargs = ['abc', 'def', 'gen-export', '--file', 'banana', '-o output']
        main.main(cmdargs)
        output = process.cwd() + '/output'
        input = process.cwd() + '/banana'
        expect(genStub.calledWith(input, output)).to.be.true
        done()

    it 'process comand line args with ~', (done) ->
        cmdargs = ['abc', 'def', '--file', '~/banana', '-o ~/output', 'gen-export']
        main.main(cmdargs)
        output = process.env.HOME + '/output'
        input = process.env.HOME + '/banana'
        expect(genStub.calledWith(input, output)).to.be.true
        done()

    it 'does not run when no args given', (done) ->
        cmdargs = ['abc', 'def']
        main.main(cmdargs)
        expect(genStub.callCount).to.eql 0
        done()

    it 'catches an arg for hitting cf apps', (done) ->
        cmdargs = ['abc', 'def', '--cfapps', 'appname', 'gen-export']
        main.main(cmdargs)
        expect(cfStub.calledWith('appname')).to.be.true
        expect(genStub.callCount).to.eql 0
        done()

    describe 'ups', ->
        it 'process command for cups and file', (done) ->
            upsStub = sandbox.stub(ups, 'generate').returns Promise.resolve {}
            cmdargs = ['abc', 'def', '--file', 'fileName', 'gen-cups']
            main.main(cmdargs)
            expect(cfStub.callCount).to.eql 0
            expect(genStub.callCount).to.eql 0
            expect(upsStub.calledWith('cups', 'fileName')).to.eql true
            done()

        it 'process command for cups and cf', (done) ->
            upsStub = sandbox.stub(ups, 'generateFromCF').returns Promise.resolve {}
            cmdargs = ['abc', 'def', '--cfapps', 'appname', 'gen-cups']
            main.main(cmdargs)
            expect(cfStub.callCount).to.eql 0
            expect(genStub.callCount).to.eql 0
            expect(upsStub.calledWith('cups', 'appname')).to.eql true
            done()

        it 'process command for uups and file', (done) ->
          upsStub = sandbox.stub(ups, 'generate').returns Promise.resolve {}
          cmdargs = ['abc', 'def', '--file', 'fileName', 'gen-uups']
          main.main(cmdargs)
          expect(cfStub.callCount).to.eql 0
          expect(genStub.callCount).to.eql 0
          expect(upsStub.calledWith('uups', 'fileName')).to.eql true
          done()

        it 'process command for uups and cf', (done) ->
            upsStub = sandbox.stub(ups, 'generateFromCF').returns Promise.resolve {}
            cmdargs = ['abc', 'def', '--cfapps', 'appname', 'gen-uups']
            main.main(cmdargs)
            expect(cfStub.callCount).to.eql 0
            expect(genStub.callCount).to.eql 0
            expect(upsStub.calledWith('uups', 'appname')).to.eql true
            done()
