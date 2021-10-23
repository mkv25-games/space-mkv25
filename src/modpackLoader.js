const { find, read, position } = require('promise-path')

async function searchDirectory(directory) {
  const location = position(directory)
  const query = location('**/modpack.json')
  const modpacks = await find(query)

  console.log('Found', modpacks.length, 'modpacks in', directory)
  return modpacks
}

async function loadModpacks(directories) {
  const modpacks = directories.map(searchDirectory).reduce((acc, results) => {
    return acc.push(...results)
  }, [])

  console.log('Found', modpacks.length, 'modpacks in', directories.length, 'locations.')

  return modpacks
}

module.exports = loadModpacks
