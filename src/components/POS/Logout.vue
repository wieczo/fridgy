<template>
<transition name="fade">
<div>
  <div class="backdrop" style="position: absolute; background: #3FCA8C; top: 0px; left: 0px; right: 0px; bottom: 0px;">
  <center style="margin-top: 180px; z-index: 2;">
       <div><i class='fas fa-check-circle'></i></div>
       <h2>Vielen Dank für Deinen <u>{{cartSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}}</u> Einkauf</h2>
  </center>
  </div>
</div>
</transition>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Logout',
  created () {
    setTimeout(e => {
      this.logout()
    }, 5000)
  },
  computed: {
    ...mapGetters(['cartCount', 'cartSum'])
  },
  methods: {
    ...mapMutations(['logout'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  i{
    font-size: 90px; 
    color: #fff;
    margin-bottom: 40px;
  }

</style>
