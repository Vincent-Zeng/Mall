<template>
  <div class="ad">

    <div class="empty-cart" v-show="this.products.length === 0 && this.shops.length === 0">
      <span>NO ADVERTISEMENT FOR</span>
      <span>NOW</span>
    </div>

    <div class="ad-panel-all">
      <div class="ad-panel" v-for="shop in shops">
        <router-link :to="{path:'/shops/' + shop.id}">
          <img :src="shop.url" alt="">
        </router-link>
      </div>
    </div>

    <div class="product-panel">
      <div class="product-hint" v-show="this.products.length > 0">
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
export default {
  name: 'ad',
  data () {
    return {
      products: [],
      shops: []
    }
  },
  created () {
    this.$http.get('/productAd/getVerified')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      let products = []
      for (var i = 0; i < data.length; i++) {
        let json = data[i]
        products.push({
          id: json.productId,
          price: json.price,
          name: json.name,
          url: json.photoURL
        })
      }
      this.products = products
    }).catch((err) => {
      console.log(err)
      this.$message({
        message: 'Networking Error',
        type: 'warning'
      })
    })
    this.$http.get('/shopAd/verified')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      let shops = []
      for (var i = 0; i < data.length; i++) {
        let json = data[i]
        shops.push({
          id: json.shopId,
          url: json.photoUrl
        })
      }
      this.shops = shops
    }).catch((err) => {
      console.log(err)
      this.$message({
        message: 'Networking Error',
        type: 'warning'
      })
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.ad-panel-all {
  margin: 0px 0px 20px 0px;
  text-align: center;
}

.ad-panel {
  width: 16%;
  height: 80px;
  overflow: hidden;
  display: inline-block;
  border: 1px solid #eeeeee;

  img {
    max-width: 100%;
    max-height: 80px;
  }
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

.empty-cart {
  text-align: center;
  font-size: 40px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100px;
  line-height: 100px;

  span {
    height: 100px;
    line-height: 100px;
  }


  span:last-child {
    font-weight: bold;
  }
}

</style>
