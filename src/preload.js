const { contextBridge } = require('electron')
const store = require('./rpc')

contextBridge.exposeInMainWorld('electron', {
  desktop: true,
  requestData: store.sendDataToBrowser,
  sendData: store.receiveDataFromBrowser,
  updateDeveloperTools: store.updateDeveloperTools
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
