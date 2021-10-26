const { find, read, position } = require('promise-path')

async function searchDirectory (directory) {
  const location = position(directory)
  const query = location('./**/modpack.json')
  const modpackPaths = await find(query)

  console.log('Found', modpackPaths.length, 'modpacks in', directory)

  const modpacks = await Promise.all(modpackPaths.map(loadModpack))

  return modpacks
}

async function readJson (filepath) {
  const body = await read(filepath, 'utf8')
  return JSON.parse(body)
}

async function loadModpackFile ({ packpath, filename, packdata }) {
  let error
  try {
    const filepath = packpath(`${filename}.json`)
    packdata[filename] = await readJson(filepath)
  } catch (ex) {
    error = `Unable to read ${filename}: ${ex.message}`
  }
  return error
}

async function loadModpack (filepath) {
  let packdata = {}
  let packError; let fileErrors = []
  try {
    const body = await read(filepath, 'utf8')
    packdata = JSON.parse(body)

    const packpath = position(filepath.replace('modpack.json', ''))
    fileErrors = await Promise.all([
      loadModpackFile({ packpath, filename: 'regions', packdata }),
      loadModpackFile({ packpath, filename: 'stellarArchetypes', packdata })
    ])
  } catch (ex) {
    packError = ex.message
  }

  return {
    filepath,
    packdata,
    messages: [packError, ...fileErrors].filter(n => n)
  }
}

async function modpackLoader (directories) {
  const modpacks = (await Promise.all(directories.map(searchDirectory))).reduce((acc, results) => {
    acc.push(...results)
    return acc
  }, [])

  console.log('Found', modpacks.length, 'modpacks in', directories.length, 'locations.')

  return modpacks
}

module.exports = modpackLoader
