
const regions = require('../../../data/regions.json')

function createSystem ({ mass, density, composition }) {
  const unusedMass = mass
  return {
    mass,
    density,
    composition
  }
}

module.exports = createSystem
