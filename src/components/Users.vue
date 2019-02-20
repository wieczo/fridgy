<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">User Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Karma</th>
              <th>Kontostand</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.karma }}</td>
              <td>{{ user.credit_debit }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateUserToEdit(user)">Bearbeiten</a> -
                <a href="#" @click.prevent="deleteUser(user.id)">Löschen</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit User ID#' + model.id : 'Neuer User')">
          <form @submit.prevent="saveUser">
            <b-form-group label="Name">
              <b-form-input type="text" v-model="model.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Karma">
              <b-form-input type="text" v-model="model.karma"></b-form-input>
            </b-form-group>
            <b-form-group label="Kontostand">
              <b-form-input type="decimal" v-model="model.credit_debit"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save User</b-btn>
            </div>
          </form>
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
      users: [],
      model: {}
    }
  },
  async created () {
    this.refreshUsers()
  },
  methods: {
    async refreshUsers () {
      this.loading = true
      this.users = await api.getUsers()
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