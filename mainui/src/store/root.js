import { createStore } from 'vuex'
import newContact from '@/models/contact.js'

function defaultUserPreferences () {
  return {
    count: 0,
    developerTools: {
      visible: false
    },
    contact: newContact(),
    contactList: []
  }
}

const main = createStore({
  state: defaultUserPreferences(),
  mutations: {
    assignContact (state, contact) {
      state.contact = contact
    },
    contactList (state, contactList) {
      state.contactList = contactList
    },
    increment (state) {
      state.count++
    },
    hideDeveloperTools (state) {
      state.developerTools.visible = false
    },
    showDeveloperTools (state) {
      state.developerTools.visible = true
    },
    setUserPreferences (state, newState) {
      Object.assign(state, newState)
    },
    setVersion (state, version) {
      state.version = version
    }
  },
  actions: {
    increment ({ commit }) {
      commit('increment')
    },
    async hideDeveloperTools ({ commit, state }) {
      commit('hideDeveloperTools')
    },
    async showDeveloperTools ({ commit, state }) {
      commit('showDeveloperTools')
    },
    async resetUserPreferences ({ commit, state }) {
      commit('setUserPreferences', defaultUserPreferences())
    },
    async getVersion ({ commit, state }) {},
    async loadUserPreferences ({ commit, state }) {},
    async loadContact ({ commit, state }) {},
    async refreshContactList({ commit, state }) {}
  },
  modules: {
  }
})

export default main
