<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <header>
      <span class="time">{{currentTime}}</span>
      <span class="time" v-if="current_user">
        <i class="fas fa-user"></i> {{current_user.name}}
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
      this.currentTime = new Date().getHours() + ':' + new Date().getMinutes()
    }, 1000)
  },
  props: {
    currentTime: '00:00'
  },
  computed: {
    ...mapState(['current_user'])
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
