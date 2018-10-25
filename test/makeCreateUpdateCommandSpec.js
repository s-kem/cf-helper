import { makeCreateUpdateCommand } from '../src/makeCreateUpdateCommand'

it('creates cups commands from list of user-provided services', () => {
  const ups = [
    { name: 'name1', credentials: { alias: 'a1', url: 'u1' } },
    { name: 'name2', credentials: { alias: 'a2', url: 'u2' } },
  ]

  const expected = [
    `cf cups name1 -p '${JSON.stringify(ups[0].credentials)}'`,
    `cf cups name2 -p '${JSON.stringify(ups[1].credentials)}'`,
  ]

  const result = makeCreateUpdateCommand('cups', ups)

  expect(result).toEqual(expected)
})

it('creates uups commands from list of user-provided services', () => {
  const ups = [
    { name: 'name1', credentials: { alias: 'a1', url: 'u1' } },
    { name: 'name2', credentials: { alias: 'a2', url: 'u2' } },
  ]

  const expected = [
    `cf uups name1 -p '${JSON.stringify(ups[0].credentials)}'`,
    `cf uups name2 -p '${JSON.stringify(ups[1].credentials)}'`,
  ]

  const result = makeCreateUpdateCommand('uups', ups)

  expect(result).toEqual(expected)
})
