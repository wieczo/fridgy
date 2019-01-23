<template>
  <div class="hello">
    <h1>
      <span v-for="m in msg">{{m}}<br></span>
    </h1>
    
    <br>
    <br>

    <h2>Link der Woche</h2>
    <ul>
      <li><a href="https://www.kohldampfmaschine.de" target="_blank" rel="noopener">kohldampfmaschine</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: [
        'Willkommen beim Blueemd Kühlschwank!',
        'Bitte halte d1 Pim an den Reader!'
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
