const report = (...messages) => { console.log('[api/rpc.js]', ...messages) }
const singleton = {}

const exposedMethods = ['sendData', 'requestData', 'clearData', 'updateDeveloperTools', 'findFiles', 'version']

function setup (window) {
  function api () {
    return window.electron || {}
  }
  report('Setup lazy RPC proxy on', window)
  const proxy = exposedMethods.reduce((acc, item) => {
    const proxyFn = (...args) => api()[item](...args)
    acc[item] = (...args) => {
      try {
        return proxyFn(...args)
      } catch (ex) {
        report('Item proxy fail:', item, 'retrying...')
        let resolveFn, rejectFn
        const retry = new Promise((resolve, reject) => {
          resolveFn = resolve
          rejectFn = reject
        })
        setTimeout(() => {
          try {
            const result = proxyFn(...args)
            resolveFn(result)
          } catch (ex2) {
            report('Item proxy fail on second attempt:', item, ex)
            rejectFn(ex2)
          }
        }, 1000)
        return retry
      }
    }
    return acc
  }, {})
  Object.assign(singleton, proxy)
  return singleton
}

setup.default = singleton
module.exports = setup
