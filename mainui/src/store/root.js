import { createStore } from 'vuex'

const main = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment ({ commit }) {
      commit('increment')
      console.log('Node', window.electron)
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
