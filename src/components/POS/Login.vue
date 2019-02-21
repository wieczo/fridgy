<template>
  <div>
    <center>BITTE EINLOGGEN<br>HALTE DEINEN RFID CHIP AN DEN READER</center>
    <a v-on:click="loginCallback()" href="#" >Anmelden</a>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    loginCallback: Function
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
