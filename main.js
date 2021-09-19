const path = require('path')
const { app, BrowserWindow } = require('electron')
const store = require('./src/store')

const { title, version } = require('./package.json')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    useContentSize: true,
    webPreferences: {
      preload: path.join(__dirname, 'src/preload.js')
    }
  })

  const mode = selectApplicationMode(process)
  console.log('App Mode:', mode.name)
  mode.fn(mainWindow)

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle(title)
  })
}

function selectApplicationMode ({ env }) {
  const config = env.APP_MODE || false
  const modes = {
    default: {
      name: `Build: ${version}`,
      fn: loadFromLocalFileSystem
    },
    'local-dist': {
      name: `Local Distribution Build (${version})`,
      fn: loadFromLocalFileSystem
    },
    'local-dev': {
      name: `Local Development Build (${version})`,
      fn: loadFromLocalServer
    }
  }
  return modes[config] || modes.default
}

function loadFromLocalServer (mainWindow) {
  const winUrl = 'http://localhost:8080/'
  mainWindow.loadURL(winUrl)
  mainWindow.webContents.openDevTools()
}

function loadFromLocalFileSystem (mainWindow) {
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
