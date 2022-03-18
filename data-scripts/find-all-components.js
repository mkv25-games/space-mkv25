const { find, position, write } = require('promise-path')

function filenameFromPath (vueFile) {
  return vueFile.split('/').pop().split('.vue')[0]
}

async function run () {
  console.log('Find All Components (*.vue files)')
  const mainui = position(__dirname, '../mainui/src')
  const search = mainui('**/*.vue')
  const vueFilepaths = await find(search)
  const mainuiPath = mainui('./').split('\\').join('/')
  const vueFiles = vueFilepaths.map(s => s.replace(mainuiPath, '')).filter(file => file !== 'App.vue')
  const importStatements = vueFiles.map(vueFile => {
    const filename = filenameFromPath(vueFile)
    return `import ${filename} from './${vueFile}'`
  })
  const vueFilenames = vueFiles.map(filenameFromPath)
  console.log('Found', vueFiles.length, 'vue files')
  console.log(vueFiles.join('\n'))
  console.log('Found', vueFiles.length, 'vue files')

  const lines = ['/* Generated file: node data-scripts/find-all-components.js */']
  lines.push('')
  lines.push(...importStatements)
  lines.push('')
  lines.push('export default {')
  lines.push('  ' + vueFilenames.join(', '))
  lines.push('}')

  const outputFile = 'componentIndex.js'
  const body = lines.join('\n')
  console.log('Writing', body.length, 'bytes to', outputFile)
  await write(mainui(outputFile), body, 'utf8')
}

run()
