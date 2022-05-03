const state = {
  all: []
}

const actions = {
  success ({ commit }, payload) {
    payload.showing = true
    commit('success', payload)
  },
  error ({ commit }, payload) {
    payload.showing = true
    commit('error', payload)
  },
  clear ({ commit }, payload) {
    payload.showing = false
    commit('success', payload)
  }
}

const mutations = {
  success (state, alert) {
    alert.type = 'alert-success'
    state.all.push(alert)
  },
  error (state, alert) {
    alert.type = 'alert-danger'
    state.all = state.all.concat(alert)
  },
  clear (state) {
    state.all = []
  }
}

export const alerts = {
  namespaced: true,
  state,
  actions,
  mutations
}
