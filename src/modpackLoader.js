const { find, read, position } = require('promise-path')

async function searchDirectory(directory) {
  const location = position(directory)
  const query = location('./**/modpack.json')
  const modpackPaths = await find(query)

  console.log('Found', modpackPaths.length, 'modpacks in', directory)

  const modpacks = await Promise.all(modpackPaths.map(loadModpack))

  return modpacks
}

async function readJson(filepath) {
  try {
    const body = await read(filepath, 'utf8')
    return JSON.parse(body)
  } catch (ex) {
    console.log('Unable to load', filepath, ex.message)
  }
}

async function loadModpack(filepath) {
  let packdata = {}
  let error
  try {
    const body = await read(filepath, 'utf8')
    packdata = JSON.parse(body)

    const packpath = position(filepath.replace('modpack.json', ''))
    packdata.regions = await readJson(packpath('regions.json'))
    packdata.stellarArchetypes = await readJson(packpath('stellarArchetypes.json'))
  } catch (ex) {
    error = ex.message
  }

  return {
    filepath,
    packdata,
    messages: [error].filter(n => n)
  }
}

async function modpackLoader(directories) {
  const modpacks = (await Promise.all(directories.map(searchDirectory))).reduce((acc, results) => {
    acc.push(...results)
    return acc
  }, [])

  console.log('Found', modpacks.length, 'modpacks in', directories.length, 'locations.')

  return modpacks
}

module.exports = modpackLoader
