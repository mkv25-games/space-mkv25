
const { app, ipcMain, ipcRenderer } = require('electron')
const { read, write, make, position } = require('promise-path')

let userDataFilePath

async function setup() {
  // sender - renderer process (web page)
  if (ipcRenderer) {
    userDataFilePath = await ipcRenderer.invoke('request-user-data', { timestamp: Date.now() })
    console.log('IPCR Request User Data:', userDataFilePath)
  }
  // receiver - main electron process
  if (ipcMain) {
    ipcMain.handle('request-user-data', async (event, message) => {
      console.log('IPCM Request User Data, received message:', message)
      return app.getPath('userData')
    })
  }
}

async function receiveDataFromBrowser(key, data) {
  const userDataPath = position(userDataFilePath, 'savedata')
  await make(userDataPath('./'))
  const body = JSON.stringify(data, null, 2)
  try {
    await write(userDataPath(`${key}.json`), body, 'utf8')
    return {
      message: `Received ${body.length} characters of data for ${key}.`
    }
  }
  catch(ex) {
    return {
      message: `Received ${body.length} characters of data for ${key}.`,
      error: ex.message
    }
  }
}

async function sendDataToBrowser(key) {
  const userDataPath = position(userDataFilePath, 'savedata')
  await make(userDataPath('./'))
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

setup()

module.exports = {
  receiveDataFromBrowser,
  sendDataToBrowser
}