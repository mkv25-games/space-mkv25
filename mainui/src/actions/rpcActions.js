function report (...messages) {
  console.log('[actions/rpcActions.js]', ...messages)
}

function clone (data) {
  return JSON.parse(JSON.stringify(data))
}

function setup (store, rpc) {
  const noop = async () => {}
  const history = []

  const beforeEvents = {
    loadUserPreferences: async (state) => {
      const preferences = (await rpc.requestData('userPreferences')) || {}
      report('Load User Preferences:', preferences)
      store.commit('setUserPreferences', preferences.data)
    }
  }

  const afterEvents = {
    increment: async (state) => {
      report('Incrementing data based on user preference', state)
      rpc.sendData('userPreferences', state)
    },
    hideDeveloperTools: async (state) => {
      return rpc.updateDeveloperTools(state.developerTools.visible)
    },
    showDeveloperTools: async (state) => {
      return rpc.updateDeveloperTools(state.developerTools.visible)
    }
  }

  store.subscribeAction({
    before: async (action, state) => {
      report('Before', action.type)
      history.push({ timestamp: Date.now(), type: action.type, state })
      const fn = (beforeEvents[action.type] || noop)
      return fn(clone(state))
    },
    after: async (action, state) => {
      report('After', action.type)
      const fn = (afterEvents[action.type] || noop)
      return fn(clone(state))
    }
  })

  return {
    store,
    history
  }
}

export default { setup }
