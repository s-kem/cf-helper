export const makeBinding = (name, url) => ({
  credentials: {
    alias: name,
    url,
  },
  label: 'some label',
  name,
  tags: [],
  otherData: '',
})

export const makeApp1Vcap = () => ({
  VCAP_SERVICES: {
    'user-provided': [
      makeBinding('b1', 'url1'),
      makeBinding('b2', 'url2'),
      makeBinding('b3', 'url3'),
    ],
  },
})

export const makeApp2Vcap = () => ({
  VCAP_SERVICES: {
    'user-provided': [
      makeBinding('b2', 'url2'),
      makeBinding('b3', 'url3'),
      makeBinding('b4', 'url4'),
    ],
  },
})

export const makeTestCfOutput = (vcap = makeApp1Vcap()) => `
Getting env variables for app app1 in some place as a person
OK


System-Provided:
${JSON.stringify(vcap, null, 2)}
{
 "VCAP_APPLICATION": {
  "thing": "stuff"
 }
}

User-Provided:
cdnHost: some-host
localDevelopment: false

No running env variables have been set

No staging env variables have been set
`
