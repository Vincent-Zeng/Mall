import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from './pages/home'

const routes = [{
  path: '/',
  component: Home
}]

export default new VueRouter({
  mode: 'history',
  routes
})
