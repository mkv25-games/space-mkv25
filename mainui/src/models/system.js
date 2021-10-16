function cpz (type, lowerMass, upperMass, lowerDensity, upperDensity) {
  return {
    type,
    density: {
      lower: lowerDensity,
      upper: upperDensity
    },
    mass: {
      lower: lowerMass,
      upper: upperMass
    }
  }
}

const probabilities = [
  cpz('asteroid-field', 0.0, 0.6, 0.0, 0.6),
  cpz('main-sequence-star', 0.4, 0.4, 0.8, 0.8),
  cpz('frozen-planet', 0.0, 0.6, 0.4, 1.0),
  cpz('frozen-giant', 0.4, 0.8, 0.2, 0.8),
  cpz('gas-giant', 0.4, 0.8, 0.4, 0.8)
]

function createSystem ({ mass, density, composition }) {
  const unusedMass = mass
  return {
    mass,
    density,
    composition
  }
}

module.exports = createSystem
