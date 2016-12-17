<template>
  <div class="shop">

    <div class="shop-panel">
      <div class="product-hint">
        {{ this.shop.name }}
      </div>
      <div class="no-products" v-show="this.products.length === 0">
        No products for now
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
export default {
  name: 'shop',
  data () {
    return {
      products: [],
      shop: {
        name: 'Shop'
      }
    }
  },
  created () {
    this.$http.get(`/shop/searchById?id=${this.$route.params.id}`)
    .then(res => res.json())
    .then(data => {
      this.shop = {
        id: data.id,
        name: data.name
      }
    })

    this.$http.get(`/product/searchByShop?id=${this.$route.params.id}&count=100&page=1`)
    .then(res => res.json())
    .then(data => {
      let products = []
      for (let i = 0; i < data.length; i++) {
        const product = data[i]
        products.push({
          id: product.id,
          name: product.name,
          price: product.price,
          url: product.photoURL
        })
      }
      this.products = products
    })
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

.shop-panel {
  text-align: center;

  .product-hint {
    font-size: 40px;
    font-weight: bolder;
  }
}

.no-products {
  font-size: 30px;
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
