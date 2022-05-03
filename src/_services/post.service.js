import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export const postsService = {
  getAll,
  register,
  getById,
  update,
  delete: _delete
}

function getAll () {
  return axios.get('/posts')
}

function register (post) {
  return axios.post('/posts/', post).then(handleResponse)
}

function getById (id) {
  return axios.get(`/posts/${id}`).then(handleResponse)
}

function update (post) {
  return axios.put(`/posts/${post.id}`, post).then(handleResponse)
}

function _delete (id) {
  return axios.delete(`/posts/${id}`).then(handleResponse)
}

function handleResponse (result) {
  if (result.statusText !== 'OK') {
    return result.error
  }
  return result.data
}
