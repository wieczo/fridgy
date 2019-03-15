import api from '@/api'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: false,
    loginState: 'loggedOut',
    products: [{name: 'Unloaded'}],
    ledgers: [{test: 'tt'}],
    users: [],
    cart: []
  },
  mutations: {
    initialiseStore (state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    },
    login (context, user) {
      this.state.loginState = 'loggedIn'
      this.state.cart = []
      this.state.ledgers = []
      this.state.currentUser = user
      this.dispatch('refreshLedgers')
    },
    logout () {
      // api.deleteCurrenttUser()
      this.state.loginState = 'loggedOut'
      this.state.currentUser = false
      this.state.cart = []
      this.state.ledgers = []
    },
    addToCart (context, payload) {
      this.state.cart.push(payload.product)
    },
    removeFromCart (context, payload) {
      this.state.cart.splice(payload.idx, 1)
    },
    checkoutCart () {
      var audio = new Audio('/static/checkout.mp3')
      audio.play()
      Promise.all(this.state.cart.map(async (product) => api.createLedger({userId: this.state.currentUser.id, productId: product.id, amount: product.price * -1, purpose: 'Einkauf: ' + product.name, date: Date.now()}))).then((e) => {
        this.state.loginState = 'loggingOut'
        if (this.state.cart.length === 0) {
          this.commit('logout')
        }
      })
    },
    chargeBalance (context, payload) {
      var audio = new Audio('/static/charge.mp3')
      audio.play()
      api.createLedger({userId: this.state.currentUser.id, amount: payload.amount * 1, purpose: 'Einzahlung: ' + payload.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }), date: Date.now()}).then((e) => {
        this.dispatch('refreshLedgers')
      })
    },
    setLedgers (state, payload) {
      this.state.ledgers = payload.ledgers
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
  },
  actions: {
    async refreshLedgers () {
      var ledgers = await api.getLedgers(this.state.currentUser.id)
      this.commit('setLedgers', {ledgers: ledgers})
    }
  }
})
