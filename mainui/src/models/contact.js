function createDefault () {
  const lastUpdated = new Date()
  return {
    lastUpdated,
    name: 'Unknown Contact'
  }
}

function create (source) {
  const result = Object.assign(createDefault(), source || {})

  return result
}

export default create
