import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/POS/Main'
import Products from '@/components/Products'
import Product from '@/components/Product'
import Users from '@/components/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/products/:id',
      name: 'Product',
      component: Product
    }
  ]
})
