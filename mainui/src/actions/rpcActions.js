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
      store.commit('setUserPreferences', preferences.data)
    },
    loadContact: async (state, payload) => {
      const contact = await rpc.requestData(payload.name)
      store.commit('assignContact', contact.data)
    },
    refreshContactList: async (state) => {
      const files = await rpc.findFiles('**/*')
      const contactList = files
        .filter(file => file.filepath.includes('/savedata/'))
        .filter(file => !file.filepath.includes('userPreferences.json'))
      store.commit('contactList', contactList)
    }
  }

  const afterEvents = {
    increment: async (state) => {
      rpc.sendData('userPreferences', state)
    },
    hideDeveloperTools: async (state) => {
      return rpc.updateDeveloperTools(state.developerTools.visible)
    },
    showDeveloperTools: async (state) => {
      return rpc.updateDeveloperTools(state.developerTools.visible)
    },
    resetUserPreferences: async (state) => {
      rpc.sendData('userPreferences', state)
    },
    getVersion: async (state) => {
      const version = await rpc.version()
      store.commit('setVersion', version)
    }
  }

  store.subscribeAction({
    before: async (action, state) => {
      const { type, payload } = action
      history.push({ timestamp: Date.now(), type: action.type, state })
      const fn = (beforeEvents[action.type] || noop)
      return fn(clone(state), payload)
    },
    after: async (action, state) => {
      const { type, payload } = action
      const fn = (afterEvents[type] || noop)
      return fn(clone(state), payload)
    }
  })

  return {
    store,
    history
  }
}

export default { setup }
