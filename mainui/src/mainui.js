import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/root'

createApp(App).use(store).use(router).mount('#mainui-app')

function clone (data) {
  return JSON.parse(JSON.stringify(data))
}

const noop = () => {}
const history = []
const subscriptions = {
  increment: (state) => {
    console.log('Incrementing data based on user preference', state)
    window.electron.sendData('userPreferences', state)
  }
}
store.subscribeAction({
  before: (action, state) => {
    history.push({ timestamp: Date.now(), type: action.type, state })
  },
  after: (action, state) => {
    console.log('Action', action, state)
    const fn = (subscriptions[action.type] || noop)
    fn(clone(state))
  }
})
