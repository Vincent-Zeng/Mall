import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from './pages/home'
import Products from './pages/customer/products'
import Product from './pages/customer/product'

const routes = [{
  path: '/',
  component: Home,
  children: [
    {
      path: '/products',
      component: Products
    },
    {
      path: '/products/:id',
      component: Product
    }
  ]
}]

export default new VueRouter({
  mode: 'history',
  routes
})
