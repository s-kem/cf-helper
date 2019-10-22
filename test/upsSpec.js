// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

const cups = require('../src/ups');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const {
    expect
} = chai;
const sinon = require('sinon');

const cfEnv = require('../src/cfEnv');
const cfTestData = require('./cfTestData');

describe('ups', function() {
    let sandbox = null;

    beforeEach(() => sandbox = sinon.sandbox.create());

    afterEach(() => sandbox.restore());

    const genOutput = type => `cf ${type} firstAlias -p '{"alias":"firstAlias","url":"https://firstalias.url"}'
cf ${type} secondAlias -p '{"alias":"secondAlias","url":"https://secondalias.url"}'
cf ${type} thirdAlias -p '{"alias":"thirdAlias","url":"https://firstalias.url"}'`;

    it('generates cups from CF', function() {
        sandbox.stub(cfEnv, 'getEnvs').withArgs('appname').returns(Promise.resolve(JSON.stringify(cfTestData.vcap1)));
        return expect(cups.generateFromCF('cups', 'appname')).to.eventually.eql(genOutput('cups'));
    });

    return it('generates ups from CF', function() {
        sandbox.stub(cfEnv, 'getEnvs').withArgs('appname').returns(Promise.resolve(JSON.stringify(cfTestData.vcap1)));
        return expect(cups.generateFromCF('uups', 'appname')).to.eventually.eql(genOutput('uups'));
    });
});
