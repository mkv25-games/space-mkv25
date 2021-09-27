import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/root'
import rpcActions from './actions/rpcActions'

let mainUIStarted = false
async function startMainUI () {
  if (mainUIStarted) {
    return
  }
  mainUIStarted = true
  createApp(App).use(store).use(router).mount('#mainui-app')
  store.dispatch('refreshContactList')
}

function glueSystemsTogether () {
  const rpc = require('./api/rpc')(window)
  rpcActions.setup(store, rpc)
}

function raceStartupEvent () {
  window.preloadComplete = startMainUI
  if (typeof window.mainuiRunning === 'function') {
    console.log('[mainui.js] Main UI Running')
    window.mainuiRunning()
  }
  setTimeout(startMainUI, 500)
}

glueSystemsTogether()
raceStartupEvent()
