/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const chai = require('chai');
chai.use(require('chai-as-promised'));
const {
    expect
} = chai;
const sinon = require('sinon');
const gen = require('../src/gen-vcap-services');
const main = require('../src/main');
const ups = require('../src/ups');

describe('main', function() {
    let sandbox = null;
    let genStub = null;
    let cfStub = null;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();
        genStub = sandbox.stub(gen, 'generate').returns(Promise.resolve('bob'));
        return cfStub = sandbox.stub(gen, 'generateFromCF').returns(Promise.resolve('bill'));
    });

    afterEach(() => sandbox.restore());

    it('process command line args for generating export', function(done) {
        const cmdargs = ['abc', 'def', 'gen-export', '--file', 'banana', '-o output'];
        main.main(cmdargs);
        const output = process.cwd() + '/output';
        const input = process.cwd() + '/banana';
        expect(genStub.calledWith(input, output)).to.be.true;
        return done();
    });

    it('process comand line args with ~', function(done) {
        const cmdargs = ['abc', 'def', '--file', '~/banana', '-o ~/output', 'gen-export'];
        main.main(cmdargs);
        const output = process.env.HOME + '/output';
        const input = process.env.HOME + '/banana';
        expect(genStub.calledWith(input, output)).to.be.true;
        return done();
    });

    it('does not run when no args given', function(done) {
        const cmdargs = ['abc', 'def'];
        main.main(cmdargs);
        expect(genStub.callCount).to.eql(0);
        return done();
    });

    it('catches an arg for hitting cf apps', function(done) {
        const cmdargs = ['abc', 'def', '--cfapps', 'appname', 'gen-export'];
        main.main(cmdargs);
        expect(cfStub.calledWith('appname')).to.be.true;
        expect(genStub.callCount).to.eql(0);
        return done();
    });

    return describe('ups', function() {
        it('process command for cups and file', function(done) {
            const upsStub = sandbox.stub(ups, 'generate').returns(Promise.resolve({}));
            const cmdargs = ['abc', 'def', '--file', 'fileName', 'gen-cups'];
            main.main(cmdargs);
            expect(cfStub.callCount).to.eql(0);
            expect(genStub.callCount).to.eql(0);
            expect(upsStub.calledWith('cups', 'fileName')).to.eql(true);
            return done();
        });

        it('process command for cups and cf', function(done) {
            const upsStub = sandbox.stub(ups, 'generateFromCF').returns(Promise.resolve({}));
            const cmdargs = ['abc', 'def', '--cfapps', 'appname', 'gen-cups'];
            main.main(cmdargs);
            expect(cfStub.callCount).to.eql(0);
            expect(genStub.callCount).to.eql(0);
            expect(upsStub.calledWith('cups', 'appname')).to.eql(true);
            return done();
        });

        it('process command for uups and file', function(done) {
          const upsStub = sandbox.stub(ups, 'generate').returns(Promise.resolve({}));
          const cmdargs = ['abc', 'def', '--file', 'fileName', 'gen-uups'];
          main.main(cmdargs);
          expect(cfStub.callCount).to.eql(0);
          expect(genStub.callCount).to.eql(0);
          expect(upsStub.calledWith('uups', 'fileName')).to.eql(true);
          return done();
        });

        return it('process command for uups and cf', function(done) {
            const upsStub = sandbox.stub(ups, 'generateFromCF').returns(Promise.resolve({}));
            const cmdargs = ['abc', 'def', '--cfapps', 'appname', 'gen-uups'];
            main.main(cmdargs);
            expect(cfStub.callCount).to.eql(0);
            expect(genStub.callCount).to.eql(0);
            expect(upsStub.calledWith('uups', 'appname')).to.eql(true);
            return done();
        });
    });
});
