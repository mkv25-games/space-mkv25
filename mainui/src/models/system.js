
const regions = require('../../../mods/mkv25/official/regions.json')

function createSystem ({ mass, density, composition }) {
  const unusedMass = mass
  return {
    mass,
    density,
    composition
  }
}

module.exports = createSystem
