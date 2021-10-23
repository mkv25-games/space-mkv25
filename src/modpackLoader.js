const { find, read, position } = require('promise-path')

async function searchDirectory(directory) {
  const location = position(directory)
  const query = location('./**/modpack.json')
  const modpacks = await find(query)

  console.log('Found', modpacks.length, 'modpacks in', directory)
  return modpacks
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
