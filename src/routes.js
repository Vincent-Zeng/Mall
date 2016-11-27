import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from './pages/home'
import Products from './pages/customer/products'
import Product from './pages/customer/product'
import OwnerLogin from './pages/owner/login'

const routes = [{
  path: '/',
  component: Home,
  children: [
    {
      path: '/products',
      component: Products,
      children: [
        {
          path: '/products/:id',
          component: Product
        }
      ]
    }
  ]
}, {
  path: '/owner',
  component: OwnerLogin
}]

export default new VueRouter({
  mode: 'history',
  routes
})
