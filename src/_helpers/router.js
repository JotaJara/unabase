import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home'
import Post from '../views/Post'
import User from '../views/User'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'Posts',
          component: Post
        },
        {
          path: 'Users',
          component: User
        }
      ]
    }
  ]
})
