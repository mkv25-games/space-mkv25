const { find, position, write } = require('promise-path')

const kebabize = str => {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
      ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
      : letter
  }).join('')
}

const titleize = str => {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
      ? `${idx !== 0 ? ' ' : ''}${letter}`
      : letter
  }).join('')
}

function routeFromPath (vueFile) {
  const filename = filenameFromPath(vueFile)
  const path = `/${vueFile.replace('.vue', '').split('/').map(kebabize).join('/')}`
  const name = titleize(filename)
  return {
    path,
    name,
    component: filename
  }
}

function filenameFromPath (vueFile) {
  return vueFile.split('/').pop().split('.vue')[0]
}

async function run () {
  console.log('Find All Routes (*.vue files)')
  const mainui = position(__dirname, '../mainui/src/views')
  const search = mainui('**/*.vue')
  const vueFilepaths = await find(search)
  const vueFiles = vueFilepaths.map(s => s.replace(mainui('./'), '')).filter(file => file !== 'App.vue')
  const vueViewFiles = vueFiles.filter(f => !f.includes('/ui/'))

  const importStatements = vueViewFiles.map(vueFile => {
    const filename = filenameFromPath(vueFile)
    return `import ${filename} from '../views/${vueFile}'`
  })

  const vueRoutes = vueViewFiles.map(routeFromPath)
  console.log(vueViewFiles.join('\n'))
  console.log('Found', vueViewFiles.length, 'vue view files')

  const lines = ['/* Generated file: node data-scripts/find-all-views.js */']
  lines.push('')
  lines.push(...importStatements)
  lines.push('')
  lines.push('')
  lines.push(`const routes = ${JSON.stringify(vueRoutes, null, 2)}`)
  lines.push('')
  lines.push('export default routes')

  const outputFile = '../router/routes.js'
  let body = lines.join('\n')
  vueRoutes.forEach(route => {
    const { component } = route
    body = body.replace(`"component": "${component}"`, `component: ${component}`)
  })
  body = body.replace(/"/g, "'")
  body = body.replace(/'path'/g, 'path')
  body = body.replace(/'name'/g, 'name')

  console.log('Writing', body.length, 'bytes to', outputFile)
  await write(mainui(outputFile), body, 'utf8')
}

run()
