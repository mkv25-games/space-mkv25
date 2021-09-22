const report = (...messages) => { console.log('[api/rpc.js]', ...messages) }
const singleton = {}

function setup (window) {
  function api () {
    return window.electron || {}
  }
  report('Setup lazy RPC proxy on', window)
  Object.assign(singleton, {
    sendData: (...args) => api().sendData(...args),
    requestData: (...args) => api().requestData(...args),
    updateDeveloperTools: (...args) => api().updateDeveloperTools(...args)
  })
  return singleton
}

setup.default = singleton

module.exports = setup
