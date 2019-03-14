<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Mein Konto</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <h3> Summe: {{ ledgers.map(x => x.amount).reduce((accumulator, currentValue) => accumulator + currentValue).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) }} </h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Datum</th>
              <th>Vorgang</th>
              <th>Buchung</th>
              <th>Storno?</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ledger in ledgers" :key="ledger.id">
              <td>{{ new Date(ledger.date).toLocaleDateString("de-DE") + ' ' + new Date(ledger.date).toLocaleTimeString("de-DE") }}</td>
              <td>{{ ledger.purpose }}</td>
              <td>{{ ledger.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="denkstePuppe(user)">STORNO KASSE 3</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="'Konto aufladen'" style="text-align:center;">
          <span>Zahlung per Paypal an Simon oder ins Sparschwein, dann Button drücken:</span>
          <button v-on:click="chargeBalance({amount: 5})">5 EUR</button><br>
          <button v-on:click="chargeBalance({amount: 10})">10 EUR</button><br>
          <button v-on:click="chargeBalance({amount: 15})">15 EUR</button><br>
          <button v-on:click="chargeBalance({amount: 20})">20 EUR</button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

export default {
  data () {
    return {
      loading: false,
      model: {}
    }
  },
  async created () {
    if (!this.currentUser.id) {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState(['users', 'cart', 'loginState', 'currentUser', 'ledgers'])
  },
  methods: {
    ...mapMutations(['chargeBalance'])
  }
}
</script>
