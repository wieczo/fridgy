<template>
  <div>
    <ProductItem v-for="(product,index) in items" v-bind:key="index"  v-bind:idx="index" v-bind:product="product" v-bind:onClick="onProductClick"/>
  </div>
</template>

<script>
import ProductItem from '@/components/POS/ProductItem'

export default {
  name: 'ProductList',
  props: {
    items: Array,
    onProductClick: Function
  },
  components: { ProductItem }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
