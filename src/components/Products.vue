<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Products Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Updated At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.updatedAt }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateProductToEdit(product)">Edit</a> -
                <a href="#" @click.prevent="deleteProduct(product.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Product ID#' + model.id : 'New Product')">
          <form @submit.prevent="saveProduct">
            <b-form-group label="Title">
              <b-form-input type="text" v-model="model.title"></b-form-input>
            </b-form-group>
            <b-form-group label="Body">
              <b-form-textarea rows="4" v-model="model.body"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Product</b-btn>
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
      products: [],
      model: {}
    }
  },
  async created () {
    this.refreshProducts()
  },
  methods: {
    async refreshProducts () {
      this.loading = true
      this.products = await api.getProducts()
      this.loading = false
    },
    async populateProductToEdit (product) {
      this.model = Object.assign({}, product)
    },
    async saveProduct () {
      if (this.model.id) {
        await api.updateProduct(this.model.id, this.model)
      } else {
        await api.createProduct(this.model)
      }
      this.model = {} // reset form
      await this.refreshProducts()
    },
    async deleteProduct (id) {
      if (confirm('Are you sure you want to delete this product?')) {
        // if we are editing a product we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteProduct(id)
        await this.refreshProducts()
      }
    }
  }
}
</script>