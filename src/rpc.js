
const { app, ipcMain, ipcRenderer, contextBridge } = require('electron')
const { read, write, make, position } = require('promise-path')
const report = (...messages) => { console.log('[rpc.js]', ...messages) }
const packageJson = require('../package.json')

let currentMainWindow
async function setupProcessRPC (mainWindow) {
  currentMainWindow = mainWindow
  registerIPCEvents()
}

let ipcEventsRegistered = false
function registerIPCEvents () {
  if (ipcEventsRegistered) {
    return
  }
  ipcEventsRegistered = true

  ipcMain.handle('request-user-data', async (event, message) => {
    report('IPCM Request User Data, received message:', message)
    return app.getPath('userData')
  })

  ipcMain.handle('update-developer-tools', async (event, visible) => {
    const webContents = currentMainWindow.webContents
    if (visible) {
      report('Open Dev Tools')
      webContents.openDevTools()
    } else if (webContents.isDevToolsOpened()) {
      report('Closing Dev Tools')
      webContents.closeDevTools()
    } else {
      report('Dev Tools already closed')
    }
  })
}

function setupBrowserRPC () {
  async function getUserPath () {
    return ipcRenderer.invoke('request-user-data', { timestamp: Date.now() })
  }

  async function updateDeveloperTools (visible) {
    return ipcRenderer.invoke('update-developer-tools', visible)
  }

  async function receiveDataFromBrowser (key, data) {
    const userDataFilePath = await getUserPath()
    const userDataPath = position(userDataFilePath, 'savedata')
    await make(userDataPath('./'))
    const body = JSON.stringify(data, null, 2)
    try {
      await write(userDataPath(`${key}.json`), body, 'utf8')
      return {
        message: `Received ${body.length} characters of data for ${key}.`
      }
    } catch (ex) {
      return {
        message: `Received ${body.length} characters of data for ${key}.`,
        error: ex.message
      }
    }
  }

  async function sendDataToBrowser (key) {
    const userDataFilePath = await getUserPath()
    const userDataPath = position(userDataFilePath, 'savedata')
    await make(userDataPath('./'))
    report('User Data Path', userDataPath('./'))
    const timestamp = Date.now()
    try {
      const body = await read(userDataPath(`${key}.json`), 'utf8')
      const data = JSON.parse(body)
      return {
        key,
        data,
        timestamp
      }
    } catch (ex) {
      return {
        key,
        timestamp,
        error: ex.message
      }
    }
  }

  async function version() {
    const { name, version } = packageJson
    return `${name} : ${version}`
  }

  contextBridge.exposeInMainWorld('electron', {
    desktop: true,
    requestData: sendDataToBrowser,
    sendData: receiveDataFromBrowser,
    updateDeveloperTools: updateDeveloperTools,
    version
  })
}

module.exports = {
  setupProcessRPC,
  setupBrowserRPC
}
