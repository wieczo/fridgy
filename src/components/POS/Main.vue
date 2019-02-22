<template>
  <div class="pos">    
    <Login v-if="login_state=='logged_out'" v-bind:loginCallback="login" />
    <Logout v-if="login_state=='logging_out'"/>
    <div v-if="login_state=='logged_in'">

    <div style="float: left; width: 70%;">  
      <div style="padding: 0px 60px 0px 20px;">
        <h3>Produkte</h3>
        <ProductList v-bind:items='products' v-bind:onProductClick='addToCart' />
      </div>
    </div>
    <div style="float: left; width: 28%;">  
      <h3><i class="fas fa-shopping-cart"></i> Warenkorb ({{cartCount}})</h3>
      <div v-if='cartCount==0'>
        &raquo; Bitte wähle links die gewünschten Produkte aus
      </div>
      
      <ProductList v-bind:items='cart' v-bind:onProductClick='removeFromCart' compact="true" />

      <div class="total">
        <button v-on:click='checkoutCart()'>Checkout</button>
        <div style="float: right;">{{cartSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}}</div>       
      </div>

    </div>  
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
        if (currentUser && (currentUser.id !== this.$store.currentUser.id)) {
          this.$store.commit('login', currentUser)
        }
        this.timer = setTimeout(this.backgroundLogin.bind(this), 1000)
      }.bind(this))
    }
    this.timer = setTimeout(this.backgroundLogin.bind(this), 1000)
  },
  computed: {
    ...mapState(['products', 'cart', 'login_state', 'current_user']),
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

body{
  background-color: #4096ee; 
  @include filter-gradient(#4096ee, #4096ee, vertical);
  @include background-image(linear-gradient(top, #4096ee 0%,#4096ee 100%));
  color: #eee;
}

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

.total{
  border-top: 2px solid white;
  margin-top: 10px;
  padding-top: 10px;
  font-size: 24px;
}

button{
  margin-top: 30px;
  background: rgba(0, 0, 0, 0.2);
  font-size: 22px;
  font-weight: lighter;
  padding: 8px 15px ;
  border: none;
  border-radius: 5px;
  margin: auto;
  color: white;
  cursor: pointer;
}

button:active{
  opacity: 0.6;
}
</style>
