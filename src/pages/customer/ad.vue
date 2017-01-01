<template>
  <div class="ad">
    <div class="empty-cart" v-show="this.products.length === 0 && this.shops.length === 0">
      <span>NO ADVERTISEMENT FOR</span>
      <span>NOW</span>
    </div>
    <div class="ad-panel-all">
      <swiper :options="swiperOption">
        <swiper-slide v-for="shop in shops">
          <router-link :to="{path:'/shops/' + shop.id}">
            <img :src="shop.url" alt="" class="banner-img">
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-scrollbar"   slot="scrollbar"></div>
      </swiper>
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
import Vue from 'vue'
import AwesomeSwiper from 'vue-awesome-swiper'
Vue.use(AwesomeSwiper)
export default {
  name: 'ad',
  data () {
    return {
      products: [],
      shops: [],
      swiperOption: {
        notNextTick: true,
        autoplay: 1000,
        autoplayDisableOnInteraction: false,
        grabCursor: true,
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        autoHeight: true,
        pagination: '.swiper-pagination',
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        scrollbar: '.swiper-scrollbar'
      }
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
.banner-img{
  height: 200px;
}
.ad-panel-all {
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
  min-width: 1000px;
  width:100%;
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
      max-width: 80%;
      transform: translateY(-50%);
      max-width: 70%;
      max-height: 70%;
    }
    height: 240px;
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
