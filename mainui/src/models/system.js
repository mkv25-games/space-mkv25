function createSystem ({ mass, density, composition, allRegionTypes }) {
  const unusedMass = mass

  const regionsPresent = allRegionTypes.filter(region => {
    const inDensity = density >= region.density.lower && density <= region.density.upper 
    const inMass = mass >= region.mass.lower && mass <= region.mass.upper 
    return inDensity && inMass
  })

  return {
    mass,
    density,
    composition,
    regionsPresent
  }
}

module.exports = createSystem
