import perlin from '../utils/perlin'

function createQuadrant (x, y) {
  const factor = 0.12
  const density = perlin.perlin2(x * factor, y * factor)
  const mass = perlin.perlin3(x * factor, y * factor, density)
  const composition = perlin.perlin3(density * factor, mass * factor, x * y)
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

function createGalaxy ({ w, h }) {
  const quadrants = []
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      const q = createQuadrant(i, j)
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
  const size = { w: 50, h: 50 }
  const galaxy = createGalaxy(size)
  console.log('Galaxy:', galaxy)
  return galaxy
}

function create (source) {
  const result = Object.assign(createDefault(), source || {})

  return result
}

export default create
