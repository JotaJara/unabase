import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export const userService = {
  getAll,
  register,
  getById,
  update,
  delete: _delete
}

function getAll () {
  return axios.get('/users')
}

function register (user) {
  return axios.post('/users/', user).then(handleResponse)
}

function getById (id) {
  return axios.get(`/users/${id}`).then(handleResponse)
}

function update (user) {
  return axios.put(`/users/${user.id}`, user).then(handleResponse)
}

function _delete (id) {
  return axios.delete(`/users/${id}`).then(handleResponse)
}

function handleResponse (result) {
  if (result.statusText !== '') {
    return result.error
  }
  return result
}
