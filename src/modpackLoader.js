const { find, read, position } = require('promise-path')
const mkvconf = require('mkvconf')

async function searchDirectory (directory) {
  const location = position(directory)
  const query = location('./**/modpack.json')
  const modpackPaths = await find(query)

  console.log('Found', modpackPaths.length, 'modpacks in', directory)

  const modpacks = await Promise.all(modpackPaths.map(loadModpack))

  return modpacks
}

function copyItemsIntoTarget (source, target) {
  Object.keys(source).forEach(key => {
    const sourceItems = source[key]
    const targetItems = target[key] || []
    sourceItems.forEach(item => {
      targetItems.push(item)
    })
    target[key] = targetItems
  })
}

async function loadModpackFile ({ filename, packdata }) {
  let error
  try {
    const filebody = await read(filename, 'utf8')
    const filedata = mkvconf.parse(filebody)
    copyItemsIntoTarget(filedata, packdata)
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
    const confFiles = await find(packpath('./**/*.conf'))
    const loadingWork = confFiles.map(filename => loadModpackFile({ packpath, filename, packdata }))
    fileErrors = await Promise.all(loadingWork)
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
