<template>
  <div class="pos">
    <Login v-if="login_state=='logged_out'" v-bind:loginCallback="login" />
    <Logout v-if="login_state=='logging_out'"/>
    <div v-if="login_state=='logged_in'">

      <h3>Produkte</h3>
      <ProductList v-bind:items='products' v-bind:onProductClick='addToCart' />

      <h3>Warenkorb ({{cartCount}})</h3>
      <ProductList v-bind:items='cart' v-bind:onProductClick='removeFromCart' />
      <div class="total">{{cartSum}} EUR</div> 

      <button v-on:click='checkoutCart()'>Checkout</button>
    </div>

  </div>
</template>

<script>

import Login from '@/components/POS/Login'
import Logout from '@/components/POS/Logout'
import ProductList from '@/components/POS/ProductList'
import api from '@/api'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Main',
  data () {
    return {
      state: 'logged_out'
    }
  },
  created () {
    this.$store.commit('refreshProducts')
    this.backgroundLogin = function () {
      // GET http://localhost:8081/current_user
      api.getCurrenttUser().then(function (currentUser) {
        if (currentUser) {
          this.$store.commit('login', currentUser)
        }
        this.timer = setTimeout(this.backgroundLogin.bind(this), 1000)
      }.bind(this))
    }
    this.timer = setTimeout(this.backgroundLogin.bind(this), 1000)
  },
  computed: {
    ...mapState(['products', 'cart', 'login_state']),
    ...mapGetters(['cartCount', 'cartSum'])
  },
  components: { Login, Logout, ProductList },
  methods: {
    ...mapMutations(['login', 'addToCart', 'removeFromCart', 'checkoutCart'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
