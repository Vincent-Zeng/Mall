<template>
  <div>
    <img src="../../assets/logo.png" alt="">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'products',
  data () {
    return {
      msg: 'Products'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
</style>
