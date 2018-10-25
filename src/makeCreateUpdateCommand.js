export const makeCreateUpdateCommand = (command, upsArray) =>
  upsArray.map(ups =>
      `cf ${command} ${ups.name || ups.alias} -p '${JSON.stringify(ups.credentials)}'`)
