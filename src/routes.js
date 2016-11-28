import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

import Home from './pages/home'
import Products from './pages/customer/products'
import Product from './pages/customer/product'
import OwnerLogin from './pages/owner/login'
import OwnerNavigation from './pages/owner/navigation'
import OwnerDashboard from './pages/owner/dashboard'
import AdminLogin from './pages/admin/login'
import AdminNavigation from './pages/admin/navigation'
import AdminDashboard from './pages/admin/dashboard'
import AdminApprove from './pages/admin/approve'
import AdminOwner from './pages/admin/owner'

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
}, {
  path: '/owner/navigation',
  component: OwnerNavigation,
  children: [
    {
      path: '/owner/navigation/dashboard',
      component: OwnerDashboard
    }
  ]
}, {
  path: '/admin',
  component: AdminLogin
}, {
  path: '/admin/navigation',
  component: AdminNavigation,
  children: [
    {
      path: '/admin/navigation/dashboard',
      component: AdminDashboard
    },
    {
      path: '/admin/navigation/approve',
      component: AdminApprove
    },
    {
      path: '/admin/navigation/owner',
      component: AdminOwner
    }
  ]
}]

export default new VueRouter({
  mode: 'history',
  routes
})
