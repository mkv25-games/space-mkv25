import remoteModel from 'remote-model'

const report = (...messages) => { console.log('[api/rpc.js]', ...messages) }

const exposedMethods = ['sendData', 'requestData', 'clearData', 'updateDeveloperTools', 'findFiles', 'findModpacks', 'version']

let windowObject
function checkForWindowReady (res, rej) {
  let work
  if (!res) {
    work = new Promise((resolve, reject) => {
      res = resolve
      rej = reject
    })
  }
  setTimeout(() => {
    report('Checking window object:', windowObject)
    if (windowObject) {
      res(windowObject)
    } else {
      checkForWindowReady(res)
    }
  }, 500)
  return work
}

function notify (window) {
  report('Updating window object:', window)
  windowObject = window
}

function setup () {
  const proxy = {}
  const rpcModel = remoteModel({
    async fetcher () {
      await checkForWindowReady()
      exposedMethods.forEach(key => {
        proxy[key] = windowObject.electron[key]
      })
      report('Assigned', Object.keys(windowObject.electron), 'to', proxy)
      return proxy
    },
    updateIntervalMs: 1 * 60 * 1000 // 1 minutes
  })

  return rpcModel
}

export default { instance: setup(), notify }
