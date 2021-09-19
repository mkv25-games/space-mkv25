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

  const winUrl = 'http://localhost:8080/'
  mainWindow.loadURL(winUrl)

  mainWindow.webContents.on('did-finish-load', () => {
    
    mainWindow.setTitle(title)
  })
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
