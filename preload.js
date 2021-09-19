const { contextBridge, ipcRenderer } = require('electron')
const { read, write, position } = require('promise-path')

const userdataPath = position(__dirname, 'userdata')

contextBridge.exposeInMainWorld('electron', {
  desktop: true,
  requestData: async (key) => {
    console.log('[preload.js] BrowserWindow (mainui) is requesting data...', key)
    const body = await read(userdataPath(`${key}.json`), 'utf8')
    return JSON.parse(body)
  },
  sendData: async (key, data) => {
    console.log('[preload.js] BrowserWindow (mainui) is sending data...', key, data)
    const body = JSON.stringify(data, null, 2)
    return await write(userdataPath(`${key}.json`), body, 'utf8')
  }
})

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
