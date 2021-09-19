
const { app, ipcMain, ipcRenderer } = require('electron')
const { read, write, make, position } = require('promise-path')

let userDataFilePath

function setup() {
  // sender - renderer process (web page)
  if (ipcRenderer) {
    console.log('IPCR Setup', Date.now())
    ipcRenderer.on('request-user-data-reply', (event, reply) => {
      console.log('IPCR Request User Data, received reply:', reply)
      userDataFilePath = reply
    })
    ipcRenderer.send('request-user-data', { timestamp: Date.now() })
  }
  // receiver - main electron process
  if (ipcMain) {
    console.log('IPCM Setup', Date.now())
    ipcMain.on('request-user-data', (event, message) => {
      console.log('IPCM Request User Data, received message:', message)
      event.reply('request-user-data-reply', app.getPath('userData'))
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