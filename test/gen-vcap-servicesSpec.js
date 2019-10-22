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
const cfData = require('./cfTestData');

describe('gen-vcap-services', function() {

    let sandbox = null;

    beforeEach(() => sandbox = sinon.sandbox.create());

    afterEach(() => sandbox.restore());

    it('opens a file, JSONifies it', () => expect(gen.jsonify(process.cwd() + '/test/testFile')).to.eventually.eql(testData.obj));


    it('writes the string to a file', async () => {
      const outPath = `${process.cwd()}/test/testFileOut`

      const writeResult = await gen.writeFile(JSON.stringify(testData.obj.VCAP_SERVICES), outPath)

      expect(writeResult).to.eql(outPath)

      const result = await readFile(outPath)
      expect(result.toString()).to.eql(testData.expectedFileContents);

      fs.unlinkSync(outPath) //delete the generated test output file
    })

    it('generates with file output', async () => {
      const outPath = `${process.cwd()}/test/testOut`

      sandbox.stub(gen, 'jsonify').returns(Promise.resolve(testData.obj))
      const writeFileStub = sandbox.stub(gen, 'writeFile').returns(Promise.resolve(outPath))
      const result = await gen.generate(testData.testFilePath, outPath)

      expect(result).to.eql(outPath)
      expect(writeFileStub.calledWith(JSON.stringify(testData.obj.VCAP_SERVICES), outPath)).to.be.true
    })

    it('generates without file output', function() {
        sandbox.stub(gen, "jsonify").returns(Promise.resolve(testData.obj));
        const writeFileStub = sandbox.stub(gen, "writeFile");
        expect(writeFileStub.callCount).to.eql(0);
        return expect(gen.generate(testData.testFilePath)).to.eventually.eql(testData.expectedFileContents);
    });

    return it('generates from cf', function() {
        sandbox.stub(cfEnv, 'getEnvs').withArgs('testapp').returns(Promise.resolve(JSON.stringify(cfData.vcap1)));
        //cfStub.withArgs('testapp2').returns Promise.resolve cfData.vcap2
        return expect(gen.generateFromCF('testapp')).to.eventually.eql(testData.expectedFileContents);
    });
});


    // it 'gets input from cf instead of file', () ->
    //     sandbox.stub(ChildProcessPromise, 'exec').withArgs('cf env testapp').returns Promise.resolve {stdout: testData.cfenvOutput}
    //     expect(gen.generateFromCF('testapp')).to.eventually.eql testData.expectedFileContents
