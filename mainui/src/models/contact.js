import createGalaxy from './galaxy'

function createDefault () {
  const now = new Date()
  const lastUpdated = now.toISOString()
  return {
    lastUpdated,
    name: 'Unknown Contact',
    galaxy: createGalaxy()
  }
}

function create (source) {
  return Object.assign(createDefault(), source || {})
}

export default create
