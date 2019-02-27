import api from '@/api'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current_user: false,
    login_state: 'logged_out',
    products: [{name: 'Unloaded'}],
    cart: []
  },
  mutations: {
    login (context, user) {
      this.state.login_state = 'logged_in'
      this.state.cart = []
      this.state.current_user = user
    },
    logout () {
      api.deleteCurrenttUser()
      this.state.login_state = 'logged_out'
      this.state.current_user = false
      this.state.cart = []
    },
    addToCart (context, payload) {
      this.state.cart.push(payload.product)
    },
    removeFromCart (context, payload) {
      this.state.cart.splice(payload.idx, 1)
    },
    checkoutCart () {
      for (var i = 0; i < this.state.cart.length; i++) {
        var product = this.state.cart[i]
        api.createLedger({userId: 1, productId: product.id, amount: product.price, date: Date.now()})
      }
      this.state.login_state = 'logging_out'
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
