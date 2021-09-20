import { createStore } from 'vuex'

const main = createStore({
  state: {
    count: 0,
    developerTools: {
      visible: false
    }
  },
  mutations: {
    increment: (state) => {
      state.count++
    },
    hideDeveloperTools: (state) => {
      state.developerTools.visible = false
    },
    showDeveloperTools: (state) => {
      state.developerTools.visible = true
    }
  },
  actions: {
    increment ({ commit }) {
      commit('increment')
    },
    async hideDeveloperTools ({ commit, state }) {
      commit('hideDeveloperTools')
      await window.electron.updateDeveloperTools(state.developerTools.visible)
    },
    async showDeveloperTools ({ commit, state }) {
      commit('showDeveloperTools')
      await window.electron.updateDeveloperTools(state.developerTools.visible)
    }
  },
  modules: {
  }
})

if (typeof window !== 'undefined') {
  const mainui = window.mainui || {}
  mainui.store = main
  window.mainui = mainui
}

export default main
