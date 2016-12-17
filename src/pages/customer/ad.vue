<template>
  <div class="ad">

    <router-link :to="{path:'/shops/' + 1}">
      <div class="ad-panel">
      </div>
    </router-link>

    <div class="product-panel">
      <div class="product-hint">
        Popular Now
      </div>
      <div class="product" v-for="product in products">
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
      products: items
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.ad-panel {
  margin: 0px 0px 70px 0px;
  width: 100%;
  height: 400px;
  background-color: gray;
  overflow: hidden;
}

.product-panel {
  text-align: center;

  .product-hint {
    font-size: 40px;
    font-weight: bolder;
  }
}

.product {
  display: inline-block;
  width: 23%;
  border: 1px solid #E4E4E4;
  margin: 14px;
  padding: 20px 0;
  cursor: pointer;

  a {
    color: black;
  }

  .product-img {
    width: 100%;
    img {
      display: block;
      margin: auto;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
    height: 366px;
  }

  .product-name {
    margin-top: 17px;
    font-size: 18px;
    text-align: center;
  }

  .product-price {
    margin-top: 7px;
    font-size: 18px;
    color: #FF3F13;
    text-align: center;
  }
}

</style>
