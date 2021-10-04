export default {
  quadrantColour(quadrant) {
    const mass = Math.round(255 * quadrant.mass)
    const density = Math.round(255 * quadrant.density)
    const composition = Math.round(255 * quadrant.composition)
    const alpha = 1.0 - (quadrant.density / 2)
    return `rgba(${mass},${composition},${density},${alpha})`
  },
  massColour(quadrant, alpha=1.0) {
    const mass = Math.round(255 * quadrant.mass)
    return `rgba(${mass},0,0,${alpha})`
  },
  compositionColour(quadrant, alpha=1.0) {
    const composition = Math.round(255 * quadrant.composition)
    return `rgba(0,${composition},0,${alpha})`
  },
  densityColour(quadrant, alpha=1.0) {
    const density = Math.round(255 * quadrant.density)
    return `rgba(0,0,${density},${alpha})`
  }
}