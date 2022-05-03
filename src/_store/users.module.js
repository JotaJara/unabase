import { userService } from '../_services'

const state = {
  all: []
}

const actions = {
  getAll ({ commit }) {
    commit('getAllRequest')

    userService.getAll()
      .then(
        result => commit('getAllSuccess', result.data),
        error => commit('getAllFailure', error)
      )
  },

  creaUser ({ dispatch, commit }, user) {
    commit('registerRequest', user)

    userService.register(user)
      .then(
        userx => {
          console.log(user)
          commit('registerSuccess', userx)
        },
        error => {
          commit('registerFailure', error)
        }
      )
  },

  dilitUser ({ commit }, id) {
    commit('deleteRequest', id)

    userService.delit(id)
      .then(
        user => commit('deleteSuccess', id),
        error => commit('deleteFailure', { id, error: error.toString() })
      )
  },

  updeitUser ({ commit }, user) {
    commit('updateRequest', user.id)
    userService.update(user)
      .then(
        result => {
          commit('updateSuccess', result)
          console.log(result)
        },
        error => commit('updateFailure', { user, error: error.toString() })
      )
  }
}

const mutations = {
  getAllRequest (state) {
    state.all = { loading: true }
  },
  getAllSuccess (state, users) {
    state.all = { items: users }
  },
  getAllFailure (state, error) {
    state.all = { error }
  },
  registerRequest (state, user) {
    state.status = { registering: true }
  },
  registerSuccess (state, user) {
    state.all.items.push(user)
  },
  registerFailure (state, error) {
    state.status = {}
  },
  deleteRequest (state, id) {
    state.all.items = state.all.items.map(user =>
      user.id === id
        ? { ...user, deleting: true }
        : user
    )
  },
  deleteSuccess (state, id) {
    state.all.items = state.all.items.filter(user => user.id !== id)
  },
  deleteFailure (state, { id, error }) {
    state.all.items = state.items.map(user => {
      if (user.id === id) {
        const { deleting, ...userCopy } = user
        return { ...userCopy, deleteError: error }
      }

      return user
    })
  },
  updateRequest (state, id) {
    state.all.items = state.all.items.map(user =>
      user.id === id
        ? { ...user, updating: true }
        : user
    )
  },
  updateSuccess (state, userx) {
    const item = state.all.items.find(user => user.id === userx.id)
    Object.assign(item, userx)
  },
  updateFailure (state, { id, error }) {
    state.all.items = state.items.map(user => {
      if (user.id === id) {
        const { updating, ...userCopy } = user
        return { ...userCopy, updateError: error }
      }

      return user
    })
  }
}

export const users = {
  namespaced: true,
  state,
  actions,
  mutations
}
