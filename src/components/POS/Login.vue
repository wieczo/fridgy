<template>
  <div>
    <div style="text-align: center;">
      <div><i class='fas fa-user'></i></div>
      <h2>Anmelden</h2>
      <br>Halte Deinen RFID Chip an das Lesegerät oder wähle manuelle Anmeldung

      <div class='login'>
        <button v-on:click="loginCallback({id: 1, name: 'Daniel'})" href="#" >Alternative Anmeldung</button>
        <button v-on:click="loginCallback({id: 1, name: 'Gast'})" href="#" >Gast</button>
      </div>

      <div style="position: absolute; left: 20px; right: 0; bottom: 0; ">
        <div>
          <UserSelect v-for="user in users" v-bind:key="user.id" v-bind:user="user" v-bind:click="loginCallback" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import UserSelect from '@/components/POS/UserSelect'
import { mapState } from 'vuex'

export default {
  name: 'Login',
  props: {
    loginCallback: Function
  },
  computed: {
    ...mapState(['users', 'cart', 'loginState', 'currentUser'])
  },
  components: { UserSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
i {
  font-size: 60px;
  margin-top: 50px;
  margin-bottom: 30px;
  background: rgba(0,0,0,0.2);
  color: white;
  border-radius: 999px;
  padding: 30px 35px;
}

.login {
  margin-top: 100px;
  display: none;
}
</style>
