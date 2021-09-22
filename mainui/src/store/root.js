import { createStore } from 'vuex'

const main = createStore({
  state: {
    count: 0,
    developerTools: {
      visible: false
    }
  },
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

    }
  },
  modules: {
  }
})

export default main
