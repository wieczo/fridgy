<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Product</h1>
    <div v-for="product in products" :key="product.id">
      <p>{{product.id}} {{product.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'products',
  data () {
    return {
      products: [
        {
          id: 1,
          name: 'Simon'
        }
      ]
    }
  }
}
</script>