import api from '@/api'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: false,
    loginState: 'loggedOut',
    products: [{name: 'Unloaded'}],
    users: [],
    cart: []
  },
  mutations: {
    login (context, user) {
      this.state.loginState = 'loggedIn'
      this.state.cart = []
      this.state.currentUser = user
    },
    logout () {
      api.deleteCurrenttUser()
      this.state.loginState = 'loggedOut'
      this.state.currentUser = false
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
        api.createLedger({userId: 1, productId: product.id, amount: product.price * -1, purpose: 'Einkauf: ' + product.name, date: Date.now()})
      }

      var audio = new Audio('/static/checkout.mp3')
      audio.play()

      this.state.loginState = 'loggingOut'
      if (this.state.cart.length === 0) {
        this.commit('logout')
      }
    },
    async refreshProducts () {
      this.state.products = await api.getProducts()
    },
    async refreshUsers () {
      this.state.users = await api.getUsers()
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
