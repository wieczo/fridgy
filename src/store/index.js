import api from '@/api'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentViewTitle: 'Login',
    currentUser: false,
    loginState: 'loggedOut',
    products: [{
      name: 'Unloaded'
    }],
    ledgers: [{
      test: 'tt'
    }],
    users: [],
    cart: []
  },
  mutations: {
    INITIALISE_STORE (state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    },
    LOGIN (state, user) {
      state.loginState = 'loggedIn'
      state.cart = []
      state.ledgers = []
      state.currentUser = user
    },
    LOGOUT () {
      // api.deleteCurrenttUser()
      this.state.loginState = 'loggedOut'
      this.state.currentUser = false
      this.state.cart = []
      this.state.ledgers = []
    },
    ADD_TO_CART (state, product) {
      state.cart.push(product)
    },
    REMOVE_FROM_CART (state, idx) {
      state.cart.splice(idx, 1)
    },
    checkoutCart () {
      var audio = new Audio('/static/checkout.mp3')
      audio.play()
      Promise.all(this.state.cart.map(async (product) => api.createLedger({
        userId: this.state.currentUser.id,
        productId: product.id,
        amount: product.price * -1,
        purpose: 'Einkauf: ' + product.name,
        date: Date.now()
      }))).then((e) => {
        this.state.loginState = 'loggingOut' // Triggers Logout.vue
        if (this.state.cart.length === 0) {
          this.dispatch('logoutAction')
        }
      })
    },
    chargeBalance (context, payload) {
      var audio = new Audio('/static/charge.mp3')
      audio.play()
      api.createLedger({
        userId: this.state.currentUser.id,
        amount: payload.amount * 1,
        purpose: 'Einzahlung: ' + payload.amount.toLocaleString('de-DE', {
          style: 'currency',
          currency: 'EUR'
        }),
        date: Date.now()
      }).then(
        (e) => {
          this.dispatch('refreshLedgers')
        })
    },
    SET_LEDGERS (state, { ledgers }) {
      state.ledgers = ledgers
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
    addToCart (context, { product }) {
      context.commit('ADD_TO_CART', product)
    },
    removeFromCart (context, { idx }) {
      context.commit('REMOVE_FROM_CART', idx)
    },
    async refreshLedgers (context) {
      var ledgers = await api.getLedgers(this.state.currentUser.id)
      context.commit('SET_LEDGERS', {
        ledgers
      })
    },
    async refreshProducts ({ state }) {
      state.products = await api.getProducts()
    },
    async refreshUsers ({ state }) {
      state.users = await api.getUsers()
    },
    login (context, user) {
      context.commit('LOGIN', user)
      context.dispatch('refreshLedgers')
    },
    logoutAction () {
      Vue.router.push('/')
      this.commit('LOGOUT')
    }
  }
})
