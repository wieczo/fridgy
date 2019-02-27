<template>
  <div>
    <center>     
      <div><i class='fas fa-user'></i></div>
      <h2>Anmelden</h2>
      <br>Halte Deinen RFID Chip an das Lesegerät oder wähle manuelle Anmeldung

      <div class='login'>
        <button v-on:click="loginCallback({id: 1, name: 'Daniel'})" href="#" >Alternative Anmeldung</button>
        <button v-on:click="loginCallback({id: 1, name: 'Gast'})" href="#" >Gast</button>
      </div>

    </center>
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
    background: rgb(0,0,0, 0.2);
    color: white;
    border-radius: 999px;
    padding: 30px 35px;
  }

  .login {
    margin-top: 100px;
  }
</style>
