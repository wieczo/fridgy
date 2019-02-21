import api from '@/api'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_id: 0,
    login_state: 'logged_out',
    products: [{name: 'Unloaded'}],
    cart: []
  },
  mutations: {
    login () {
      this.state.login_state = 'logged_in'
    },
    logout () {
      this.state.login_state = 'logged_out'
    },
    addToCart (context, payload) {
      this.state.cart.push(payload.product)
    },
    removeFromCart (context, payload) {
      console.log(payload)
      this.state.cart.splice(payload.idx, 1)
    },
    checkoutCart () {
      for (var i = 0; i < this.state.cart.length; i++) {
        var product = this.state.cart[i]
        api.createLedger({userId: 1, productId: product.id, amount: product.price, date: Date.now()})
      }
      this.state.cart = []
      this.commit('logout')
    },
    async refreshProducts () {
      this.state.products = await api.getProducts()
    }
  },
  getters: {
    cartCount (state) {
      return state.cart.length
    },
    cartSum (state) {
      return state.cart.reduce(function (prev, item) {
        return prev + item.price
      }, 0)
    }
  }
})
