import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

import Home from './pages/home'
import Me from './pages/customer/me'
import Products from './pages/customer/products'
import Product from './pages/customer/product'
import Order from './pages/customer/order'
import Cart from './pages/customer/cart'
import Pay from './pages/customer/pay'
import Checkout from './pages/customer/checkout'
import CheckoutOrder from './pages/customer/checkout-orders'
import Ad from './pages/customer/ad'
import Shop from './pages/customer/shop'
import Favourite from './pages/customer/favourite'
import OwnerLogin from './pages/owner/login'
import OwnerRegister from './pages/owner/register'
import OwnerNavigation from './pages/owner/navigation'
import OwnerDashboard from './pages/owner/dashboard'
import OwnerProducts from './pages/owner/products'
import OwnerProductDetail from './pages/owner/product-detail'
import OwnerShop from './pages/owner/shop'
import OwnerCreateShop from './pages/owner/create'
import OwnerAd from './pages/owner/ad'
import OwnerOrder from './pages/owner/order'
import AdminLogin from './pages/admin/login'
import AdminNavigation from './pages/admin/navigation'
import AdminDashboard from './pages/admin/dashboard'
import AdminApprove from './pages/admin/approve'
import AdminOwner from './pages/admin/owner'
import AdminCustomer from './pages/admin/customer'
import ShopDetail from './pages/admin/shop-detail'
import AdminAd from './pages/admin/ad'
import AdminOrder from './pages/admin/order'

const routes = [{
  path: '/',
  component: Home,
  children: [
    {
      name: 'customer-me',
      path: '/me',
      component: Me
    },
    {
      name: 'customer-products',
      path: '/products',
      component: Products
    },
    {
      path: '/products/:id',
      component: Product
    },
    {
      name: 'customer-order',
      path: '/order',
      component: Order
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/checkout',
      component: Checkout
    },
    {
      path: '/checkout-order',
      component: CheckoutOrder
    },
    {
      path: '/',
      component: Ad
    },
    {
      path: '/shops/:id',
      component: Shop
    },
    {
      path: '/pay',
      component: Pay
    },
    {
      name: 'customer-favourite',
      path: '/favourite',
      component: Favourite
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
      name: 'owner-dashboard',
      path: '/owner/navigation/dashboard',
      component: OwnerDashboard
    },
    {
      name: 'owner-order',
      path: '/owner/navigation/order',
      component: OwnerOrder
    },
    {
      name: 'owner-products',
      path: '/owner/navigation/products',
      component: OwnerProducts
    },
    {
      path: '/owner/navigation/products/new',
      component: OwnerProductDetail
    },
    {
      path: '/owner/navigation/products/:id',
      component: OwnerProductDetail
    },
    {
      name: 'owner-shop',
      path: '/owner/navigation/shop',
      component: OwnerShop
    },
    {
      path: '/owner/navigation/shop/create',
      component: OwnerCreateShop
    },
    {
      name: 'owner-ad',
      path: '/owner/navigation/ad',
      component: OwnerAd
    }
  ]
}, {
  path: '/owner/register',
  component: OwnerRegister
}, {
  path: '/admin',
  component: AdminLogin
}, {
  name: 'admin-navigation',
  path: '/admin/navigation',
  component: AdminNavigation,
  children: [
    {
      name: 'admin-dashboard',
      path: '/admin/navigation/dashboard',
      component: AdminDashboard
    },
    {
      name: 'admin-ad',
      path: '/admin/navigation/ad',
      component: AdminAd
    },
    {
      name: 'admin-approve',
      path: '/admin/navigation/approve',
      component: AdminApprove
    },
    {
      name: 'admin-owner',
      path: '/admin/navigation/owner',
      component: AdminOwner
    },
    {
      name: 'admin-customer',
      path: '/admin/navigation/customer',
      component: AdminCustomer
    },
    {
      path: '/admin/navigation/shopdetail',
      component: ShopDetail
    },
    {
      name: 'admin-order',
      path: '/admin/navigation/order',
      component: AdminOrder
    }
  ]
}]

export default new VueRouter({
  mode: 'history',
  routes
})
