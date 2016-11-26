<template>
  <div>
    <div class="product-list" >
      <div class="product" v-for="product in products" @click="handleDetailClicked(product.id)">
        <div class="product-img">
          <img :src="product.url" alt="">
        </div>
        <div class="product-name">{{ product.name }}</div>
        <div class="product-price">${{ product.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import pic from './images/product.png'
import router from '../../routes'

export default {
  name: 'products',
  data () {
    let products = []
    for (var i = 0; i < 20; i++) {
      products.push({
        id: 1,
        name: 'iPhone 7 128G Jet Black',
        price: '649.00',
        url: pic
      })
    }
    return {
      products: products
    }
  },
  methods: {
    handleDetailClicked (productId) {
      router.push('/products/' + productId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  font-weight: normal;
}

@media (min-width: 1500px) {
  .product-list {
    padding-left: 200px;
    padding-right: 200px;
  }
}

@media (max-width: 1500px) and (min-width: 1200px) {
  .product-list {
    padding-left: 100px;
    padding-right: 100px;
  }
}

@media (max-width: 1200px) {
  .product-list {
    padding-left: 5px;
    padding-right: 5px;
  }
}

$product-width: 267px;

.product {
  display: inline-block;
  width: $product-width;
  height: 368px;
  border: 1px solid #E4E4E4;
  margin: 14px;

  .product-img {
    width: $product-width;
    height: $product-width;

    img {
      display: block;
      margin: auto;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
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
