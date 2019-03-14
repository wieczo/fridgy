<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <header>
      <span class="time">{{currentTime}}</span>
      <span class="user" v-if="currentUser">
        <a v-on:click="logout()" class="logout">Logout</a>
        <i class="fas fa-user"></i> <router-link to="/me"><a style="color:#fff">{{currentUser.name}}</a></router-link>
      </span>
      <span><i class='fas fa-beer'></i> Fridge-Checkout</span>      
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  created () {
    setInterval((e) => {
      this.currentTime = new Date().toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'})
    }, 1000)
  },
  props: {
    currentTime: '00:00'
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

.time{
  padding: 20px;
  float: right;
  opacity: 0.5;
}

.user{
  padding: 20px;
  float: right;
  z-index: 3;
}

.user a.logout{
  background: rgb(243, 82, 82); 
  border-radius: 3px;
  padding: 5px 8px;
  color: white;
  margin-right:15px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #1a79e3;
  color: #ffffff;
  box-shadow: 0px 0px 3px rgba(0,0,0,0.2);
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
