const rpc = require('./rpc')
const report = (...messages) => { console.log('[preload.js]', ...messages) }

window.mainuiRunning = function () {
  report('Received notification from [mainui.js] that Main UI Running')
}

window.addEventListener('DOMContentLoaded', () => {
  rpc.setupBrowserRPC()
  if (typeof window.preloadComplete === 'function') {
    report('Preload Complete')
    window.preloadComplete()
  }
})
