const path = require('path')
const asyncExec = require('./build-scripts/util/asyncExec')
const NL = '\n'

function reportPad(...messages) {
  const paddedMessage = [NL, '[forge.config.js]: ', ...messages, NL].join('')
  console.log(paddedMessage)
}

module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'space_mkv25'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: [
        'darwin'
      ]
    },
    {
      name: '@electron-forge/maker-deb',
      config: {}
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
    }
  ],
  hooks: {
    generateAssets: async (forgeConfig) => {
      reportPad('We need to generate some assets:');
      const cwd = path.join(__dirname, 'mainui')
      const output = await asyncExec(`npm run build`, { cwd })
      reportPad('Completed build of mainui:', output.stdout || output.stderr)
    }
  }
}
