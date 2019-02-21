<template>
  <div>
    <center>
      <div><i class='fas fa-lock'></i></div>
      BITTE EINLOGGEN<br>HALTE DEINEN RFID CHIP AN DEN READER</center>
      <div class='login'>
       <a v-on:click="loginCallback()" href="#" >Anmelden</a>
      </div>
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
<style scoped>

  i {
    font-size: 60px;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .login {
    margin-top: 300px;
  }
</style>
