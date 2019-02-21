import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Products from '@/components/Products'
import Product from '@/components/Product'
import Users from '@/components/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
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
