import ChildProcessPromise from 'child-process-promise'
import flatten from 'lodash/flatten'
import flow from 'lodash/flow'
import getOr from 'lodash/get'
import map from 'lodash/fp/map'
import uniqBy from 'lodash/fp/uniqBy'

export const getEnvForApp = async appName => {
  const cmd = `cf env ${appName}`
  const result = await ChildProcessPromise.exec(cmd)

  return result
}

export const parseEnv = envString => {
  let output = ''
  let ct = 0
  let isFirst = true
  let ctRaised = false

  envString.split('\n').forEach( line => {
    if ( line.includes('{') ) {
      ct += 1
      ctRaised = true
    }
    if ( ct > 0 && isFirst ) { output += line }
    if ( line.includes('}') ) { ct -= 1 }
    if ( ct === 0 && ctRaised ) { isFirst = false }
  })

  try {
    return JSON.parse(output)
  } catch ( err ) {
    throw `Error scraping environment string: -- ${err}` // eslint-disable-line no-throw-literal
  }
}

export const getCredentialsAndName = vcapObject =>
  getOr(vcapObject, 'VCAP_SERVICES.user-provided', [])
  .map(({ name, credentials }) => ({ name, credentials }))

export const getCredentialsFromCf = async apps => {
  const envPromises = apps.map(app => getEnvForApp(app))
  const results = await Promise.all(envPromises)

  return flow(
    map(env => getCredentialsAndName(parseEnv(env))),
    flatten,
    uniqBy(({ name }) => name),
  )(results)
}
