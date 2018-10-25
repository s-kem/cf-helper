import {
  getCredentialsAndName,
  getCredentialsFromCf,
  getEnvForApp,
  parseEnv,
} from '../src/scraper'
import {
  makeApp1Vcap,
  makeApp2Vcap,
  makeTestCfOutput,
} from './makeTestData'
import ChildProcessPromise from 'child-process-promise'

it('scrapes the environment from cf', async () => {
  const vcapString = makeTestCfOutput()

  ChildProcessPromise.exec = jest.fn(arg => {
    if ( arg === 'cf env app1' ) {
      return Promise.resolve(vcapString)
    }

    return ''
  })

  const result = await getEnvForApp('app1')

  expect(result).toEqual(vcapString)
})

it('parses the environment and pulls the VCAP_SERVICES object out', () => {
  const vcapString = makeTestCfOutput()

  const result = parseEnv(vcapString)

  expect(result).toEqual(makeApp1Vcap())
})

it('returns array of credentials from VCAP_SERVICES object', () => {
  const result = getCredentialsAndName(makeApp1Vcap())

  expect(result).toEqual([
    { name: 'b1', credentials: { alias: 'b1', url: 'url1' } },
    { name: 'b2', credentials: { alias: 'b2', url: 'url2' } },
    { name: 'b3', credentials: { alias: 'b3', url: 'url3' } },
  ])
})

it('gets a list of credentials from a list of cf apps', async () => {
  const vcapString = makeTestCfOutput()

  ChildProcessPromise.exec = jest.fn(arg => {
    if ( arg === 'cf env app1' ) {
      return Promise.resolve(vcapString)
    }

    return ''
  })

  const result = await getCredentialsFromCf([ 'app1' ])

  expect(result).toEqual([
    { name: 'b1', credentials: { alias: 'b1', url: 'url1' } },
    { name: 'b2', credentials: { alias: 'b2', url: 'url2' } },
    { name: 'b3', credentials: { alias: 'b3', url: 'url3' } },
  ])
})

it('gets a unique of credentials from a list of cf apps', async () => {
  ChildProcessPromise.exec = jest.fn(arg => {
    if ( arg === 'cf env app1' ) {
      return Promise.resolve(makeTestCfOutput(makeApp1Vcap()))
    }
    if ( arg === 'cf env app2' ) {
      return Promise.resolve(makeTestCfOutput(makeApp2Vcap()))
    }

    return ''
  })

  const result = await getCredentialsFromCf([ 'app1', 'app2' ])

  expect(result).toEqual([
    { name: 'b1', credentials: { alias: 'b1', url: 'url1' } },
    { name: 'b2', credentials: { alias: 'b2', url: 'url2' } },
    { name: 'b3', credentials: { alias: 'b3', url: 'url3' } },
    { name: 'b4', credentials: { alias: 'b4', url: 'url4' } },
  ])
})
