import { postsService } from '../_services'

const state = {
  all: []
}

const actions = {
  cargarPosts ({ commit }) {
    commit('getAllRequest')

    postsService.getAll()
      .then(
        result => commit('getAllSuccess', result.data),
        error => commit('getAllFailure', error)
      )
  },

  creaPost ({ dispatch, commit }, post) {
    commit('registerRequest', post)

    postsService.register(post)
      .then(
        postx => {
          commit('registerSuccess', postx)
        },
        error => {
          commit('registerFailure', error)
        }
      )
  },

  dilitPost ({ commit }, id) {
    commit('deleteRequest', id)

    postsService.delete(id)
      .then(
        post => commit('deleteSuccess', id),
        error => commit('deleteFailure', { id, error: error.toString() })
      )
  },

  updeitPost ({ commit }, post) {
    commit('updateRequest', post.id)
    postsService.update(post)
      .then(
        post => commit('updateSuccess', post),
        error => commit('updateFailure', { post, error: error.toString() })
      )
  }
}

const mutations = {
  getAllRequest (state) {
    state.all = { loading: true }
  },
  getAllSuccess (state, posts) {
    state.all = { items: posts }
  },
  getAllFailure (state, error) {
    state.all = { error }
  },
  registerRequest (state, post) {
    state.status = { registering: true }
  },
  registerSuccess (state, post) {
    state.all.items.push(post)
  },
  registerFailure (state, error) {
    state.status = {}
    console.log(error)
  },
  deleteRequest (state, id) {
    state.all.items = state.all.items.map(post =>
      post.id === id
        ? { ...post, deleting: true }
        : post
    )
  },
  deleteSuccess (state, id) {
    state.all.items = state.all.items.filter(post => post.id !== id)
  },
  deleteFailure (state, { id, error }) {
    state.all.items = state.all.items.map(post => {
      if (post.id === id) {
        const { deleting, ...postCopy } = post
        return { ...postCopy, deleteError: error }
      }

      return post
    })
    console.log(error)
  },
  updateRequest (state, id) {
    state.all.items = state.all.items.map(post =>
      post.id === id
        ? { ...post, updating: true }
        : post
    )
  },
  updateSuccess (state, postx) {
    const item = state.all.items.find(post => post.id === postx.id)
    Object.assign(item, postx)
  },
  updateFailure (state, { id, error }) {
    state.all.items = state.map(post => {
      if (post.id === id) {
        const { updating, ...postCopy } = post
        return { ...postCopy, updateError: error }
      }

      return post
    })
  }
}
const getters = {
  //
}
export const posts = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
