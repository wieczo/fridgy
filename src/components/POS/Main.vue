<template>
  <div class="pos">    
    <Login v-if="login_state=='logged_out'" v-bind:loginCallback="login" />
    <Logout v-if="login_state=='logging_out'"/>
    <div v-if="login_state=='logged_in'">
      <div style="margin-right: 330px;">  
        <div style="padding: 0px 60px 0px 30px;">
          <h3>Produkte</h3>
          <ProductList v-bind:items='products' v-bind:onProductClick='addToCart' />
        </div>
      </div>
      <div class="cart_sidebar">  
        <h3><i class="fas fa-shopping-cart"></i> Warenkorb ({{cartCount}})</h3>
        <div class="cart_items">
          <div v-if='cartCount==0'>
            &laquo; Bitte wähle links die gewünschten Produkte aus
          </div>
          <ProductList v-bind:items='cart' v-bind:onProductClick='removeFromCart' compact="true" />
        </div>
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
  position: absolute;
  bottom: 0px;
  right: 0px;
  left: 0px;
  padding: 30px;
  padding-top: 15px;
  font-size: 36px;
  font-weight: lighter;
}

button{
  margin-top: 30px;
  background: rgba(0, 0, 0, 0.2);
  background: #3FCA8C;
  font-size: 22px;
  font-weight: lighter;
  padding: 8px 15px ;
  border: none;
  border-radius: 5px;
  margin: auto;
  color: white;
  cursor: pointer;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
}

button:active{
  opacity: 0.6;
}

.cart_sidebar{
  background: rgba(0,0,0,0.1); 
  /* background: #1A79E3; */
  position: fixed; 
  right: 0px; 
  top: 55px; 
  bottom: 0px; 
  width: 350px; 
  padding: 30px;
  box-shadow: inset 8px 0 8px -8px rgba(0,0,0,0.2);
}

.cart_items{
  position: absolute;
  top: 70px;
  left: 30px;
  right: 20px;
  padding-right: 10px;
  bottom: 10px;
  margin-bottom: 100px;
  overflow: auto;
}
</style>
