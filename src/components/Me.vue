<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Mein Konto</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
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
              <td>{{ ledger.amount }} EUR</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateUserToEdit(user)">STORNO KASSE 3</a>
              </td>
            </tr>
          </tbody>
        </table>
        <h3> Summe: {{ledgers.map(x => x.amount).reduce((accumulator, currentValue) => accumulator + currentValue) }} </h3>
      </b-col>
      <b-col lg="3">
        <b-card :title="'Konto aufladen'" style="text-align:center;">
          <span>Zahlung per Paypal an Simon oder ins Sparschwein, dann Button drücken:</span>
          <br>
          <button>5 EUR</button><br>
          <button>10 EUR</button><br>
          <button>15 EUR</button><br>
          <button>20 EUR</button><br>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      ledgers: [{name: 'fake'}],
      model: {}
    }
  },
  async created () {
    this.refreshLedgers()
  },
  methods: {
    async refreshLedgers () {
      this.loading = true
      this.ledgers = await api.getLedgers()
      this.loading = false
    },
    async populateUserToEdit (user) {
      this.model = Object.assign({}, user)
    },
    async saveUser () {
      if (this.model.id) {
        await api.updateUser(this.model.id, this.model)
      } else {
        await api.createUser(this.model)
      }
      this.model = {} // reset form
      await this.refreshUsers()
    },
    async deleteUser (id) {
      if (confirm('Are you sure you want to delete this product?')) {
        // if we are editing a product we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteUser(id)
        await this.refreshUsers()
      }
    }
  }
}
</script>
