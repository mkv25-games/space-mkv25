import { createStore } from 'vuex'
import rpcModel from '@/api/rpc'
import newContact from '@/models/contact.js'
import newUserPreferences from '@/models/userPreferences.js'

function defaultUserPreferences () {
  return {
    userPreferences: newUserPreferences(),
    contact: newContact(),
    contactList: []
  }
}

function clone(data) {
  return JSON.parse(JSON.stringify(data))
}

function setup() {
  const rpc = rpcModel.instance
  const main = createStore({
    state: defaultUserPreferences(),
    mutations: {
      increment (state) {
        state.userPreferences.count++
      },
      hideDeveloperTools (state) {
        state.userPreferences.developerTools.visible = false
      },
      showDeveloperTools (state) {
        state.userPreferences.developerTools.visible = true
      },
      setUserPreferences (state, newUserPreferences) {
        Object.assign(state.userPreferences, newUserPreferences)
      },
      assignContact (state, contact) {
        state.contact = contact
      },
      contactList (state, contactList) {
        state.contactList = contactList
      },
      setVersion (state, version) {
        state.version = version
      }
    },
    actions: {
      async increment ({ commit, dispatch }) {
        commit('increment')
        dispatch('saveUserPreferences')
      },
      async saveUserPreferences({ state }) {
        const rpcProxy = await rpc.fetch()
        return rpcProxy.sendData('userPreferences', clone(state.userPreferences))
      },
      async loadUserPreferences ({ commit }) {
        const rpcProxy = await rpc.fetch()
        const preferences = await rpcProxy.requestData('userPreferences') || {}
        commit('setUserPreferences', preferences.data)
      },
      async resetUserPreferences ({ commit }) {
        commit('setUserPreferences', defaultUserPreferences())
        const rpcProxy = await rpc.fetch()
        await rpcProxy.sendData('userPreferences', state)
      },
      async getVersion ({ commit }) {
        const rpcProxy = await rpc.fetch()
        const version = await rpcProxy.version()
        commit('setVersion', version)
      },
      async loadContact ({ commit }, payload) {
        const rpcProxy = await rpc.fetch()
        const contact = await rpcProxy.requestData(payload.name)
        console.log('store/main.js Contact:', contact, 'Payload:', payload)
        commit('assignContact', contact.data)
      },
      async saveContact ({ commit, state }, contact) {
        commit('assignContact', contact)
        const rpcProxy = await rpc.fetch()
        const data = clone(contact)
        return rpcProxy.sendData(state.contact.name, data)
      },
      async refreshContactList ({ commit }) {
        const rpcProxy = await rpc.fetch()
        const files = await rpcProxy.findFiles('**/*')
        const contactList = files
          .filter(file => file.filepath.includes('/savedata/') || file.filepath.includes('\\savedata\\'))
          .filter(file => !file.filepath.includes('userPreferences.json'))
        commit('contactList', contactList)
      },
      async hideDeveloperTools({ commit, state }) {
        commit('hideDeveloperTools')
        const rpcProxy = await rpc.fetch()
        return rpcProxy.updateDeveloperTools(state.developerTools.visible)
      },
      async showDeveloperTools({ commit, state }) {
        commit('showDeveloperTools')
        const rpcProxy = await rpc.fetch()
        return rpcProxy.updateDeveloperTools(state.developerTools.visible)
      }
    },
    modules: {}
  })

  return main
}

export default setup()
