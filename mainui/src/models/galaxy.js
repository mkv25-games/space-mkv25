import perlin from '../utils/perlin'

function createQuadrant (x, y, seed) {
  const seedFactor = (seed % 1000) / 10000
  const factor = 0.07 + seedFactor
  const xseed = (seed + x) * factor
  const yseed = (seed + y) * factor
  perlin.seed(seed)
  const density = Math.abs(perlin.perlin2(xseed, yseed))
  const mass = Math.abs(perlin.perlin3(xseed, yseed, density))
  const composition = Math.abs(perlin.perlin3(density, mass, x * y))
  return {
    x,
    y,
    mass,
    density,
    composition,
    name: `Quadrant: ${x}-${y}`,
    key: `${x}-${y}`
  }
}

function createGalaxy ({ size, seed }) {
  const { w, h } = size
  const quadrants = []
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      const q = createQuadrant(i, j, seed)
      quadrants.push(q)
    }
  }
  const mass = {
    min: Math.min(...quadrants.map(q => q.mass)),
    max: Math.max(...quadrants.map(q => q.mass))
  }
  const density = {
    min: Math.min(...quadrants.map(q => q.density)),
    max: Math.max(...quadrants.map(q => q.density))
  }
  const composition = {
    min: Math.min(...quadrants.map(q => q.composition)),
    max: Math.max(...quadrants.map(q => q.composition))
  }
  return {
    size: { w, h },
    quadrants,
    mass,
    density,
    composition
  }
}

function createDefault () {
  const size = { w: 10, h: 10 }
  const seed = 1
  return { size, seed }
}

function create (source) {
  const galaxySettings = Object.assign(createDefault(), source || {})
  const galaxy = createGalaxy(galaxySettings)
  return galaxy
}

export default create
