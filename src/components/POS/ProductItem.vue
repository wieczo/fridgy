<template>
  <div class="productItem" v-on:click='onClick({product: product, idx: idx})'>
    <h5 class="title">
      {{product.name}}
    </h5>
    <span class="description">{{product.description}}</span>
    <span class="price">{{product.price}}</span>
  </div>
</template>

<script>

export default {
  name: 'ProductItem',
  props: {
    idx: Number,
    product: Object,
    onClick: Function
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .productItem{
    border: 1px solid red;
  }
</style>
