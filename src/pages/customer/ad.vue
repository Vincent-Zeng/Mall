<template>
  <div class="ad">

    <div class="ad-panel">
    </div>

    <div class="product-panel">
      <div class="product" v-for="product in products" @click="showDetailBox(true)">
        <router-link :to="{path:'/products/' + product.id}">
          <div class="product-img">
            <img :src="product.url" alt="">
          </div>
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">{{ product.price.toFixed(2) }} HK $</div>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import pic from './images/product.png'

export default {
  name: 'ad',
  data () {
    let items = []
    for (var i = 0; i < 20; i++) {
      items.push({
        id: i,
        url: pic,
        name: 'iPhone 7 16G Jet Black',
        price: 649.00,
        quantity: 1
      })
    }

    return {
      items: items
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>


</style>
