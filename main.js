const path = require('path')
const { app, BrowserWindow } = require('electron')

const { title } = require('./package.json')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    useContentSize: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const mode = selectApplicationMode(process)
  mode(mainWindow)

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle(title)
  })
}

function selectApplicationMode({ env }) {
  const config = env.APP_MODE || false
  console.log('App Mode:', config)
  const modes = {
    default: loadFromLocalFileSystem,
    dev: loadFromLocalServer
  }
  return modes[config] || modes.default
}

function loadFromLocalServer(mainWindow) {
  const winUrl = 'http://localhost:8080/'
  mainWindow.loadURL(winUrl)
}

function loadFromLocalFileSystem(mainWindow) {
  const winFilepath = path.join(__dirname, 'mainui/dist/index.html')
  mainWindow.loadFile(winFilepath)
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
