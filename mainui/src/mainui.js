import { createApp } from 'vue'
import App from './App.vue'
import rpc from './api/rpc'
import router from './router'
import store from './store/main'

import setupFontAwesome from './components/FontAwesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import componentIndex from './componentIndex'

function registerAllComponentsGlobally (app) {
  Object.entries(componentIndex).forEach(([name, value]) => {
    app.component(name, value)
  })
}

let mainUIStarted = false
async function startMainUI () {
  if (mainUIStarted) {
    return
  }
  mainUIStarted = true
  setupFontAwesome(App)
  const app = createApp(App)
    .use(store)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)

  registerAllComponentsGlobally(app)

  app.mount('#mainui-app')
}

function glueSystemsTogether () {
  console.log('Window ready?', window)
  rpc.notify(window)
}

function raceStartupEvent () {
  window.preloadComplete = startMainUI
  if (typeof window.mainuiRunning === 'function') {
    console.log('[mainui.js] Main UI Running')
    window.mainuiRunning()
  }
  setTimeout(startMainUI, 500)
}

glueSystemsTogether(window)
raceStartupEvent()
