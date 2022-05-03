import Vue from 'vue'
import Vuex from 'vuex'

import { users } from './users.module'
import { posts } from './posts.module'
import { alerts } from './alerts.module'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    alerts,
    posts,
    users
  }
})
