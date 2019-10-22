// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const chai = require('chai');
chai.use(require('chai-as-promised'));
const readFile = require('fs-readfile-promise');
const {
    expect
} = chai;
const sinon = require('sinon');
const fs = require('fs');
const ChildProcessPromise = require('child-process-promise');
const _ = require('underscore');

const testData = require('./testData');

const gen = require('../src/gen-vcap-services');
const cfEnv = require('../src/cfEnv');

const cfTestData = require('./cfTestData');


describe('cfEnv', function() {
    let sandbox = null;

    beforeEach(() => sandbox = sinon.sandbox.create());

    afterEach(() => sandbox.restore());

    it('gets environment from cf', function() {
        sandbox.stub(ChildProcessPromise, 'exec').withArgs('cf env testapp').returns(Promise.resolve({stdout: cfTestData.cfenvOutput}));
        return expect(cfEnv.getEnv('testapp')).to.eventually.eql(cfTestData.vcap1);
    });

    return it('gets multiple environments from cf and combines', function() {
        const stub = sandbox.stub(ChildProcessPromise, 'exec').withArgs('cf env testapp').returns(Promise.resolve({stdout: cfTestData.cfenvOutput}));
        stub.withArgs('cf env testapp2').returns(Promise.resolve({stdout: cfTestData.cfenvOutput2 }));
        stub.withArgs('cf env testapp3').returns(Promise.resolve({stdout: cfTestData.cfenvOutput3 }));
        return expect(cfEnv.getEnvs('testapp,testapp2,testapp3')).to.eventually.eql(JSON.stringify(cfTestData.mergedContents));
    });
});
