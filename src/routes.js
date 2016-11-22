import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from './pages/home'
import Search from './pages/customer/search'

const routes = [{
  path: '/',
  component: Home
}, {
  path: '/search',
  component: Search
}]

export default new VueRouter({
  mode: 'history',
  routes
})
