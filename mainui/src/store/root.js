import { createStore } from 'vuex'

function defaultUserPreferences () {
  return {
    count: 0,
    developerTools: {
      visible: false
    }
  }
}

const main = createStore({
  state: defaultUserPreferences(),
  mutations: {
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
    async loadUserPreferences ({ commit, state }) {

    },
    async resetUserPreferences ({ commit, state }) {
      commit('setUserPreferences', defaultUserPreferences())
    },
    async getVersion ({ commit, state }) {}
  },
  modules: {
  }
})

export default main
