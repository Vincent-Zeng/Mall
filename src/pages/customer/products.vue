<template>
  <div>
    <div class="search-box">
      <input type="text" placeholder="Search here" v-model="keyword" @keyup.enter="searchProducts()"/>
    </div>

    <div class="product-list" >
      <div class="product" v-for="product in products" @click="showDetailBox(true)">
        <router-link :to="{path:'/products/' + product.id}">
          <div class="product-img">
            <img :src="product.url" alt="">
          </div>
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">${{ product.price }}</div>
        </router-link>
      </div>
    </div>
    <div>
    <div class="product-detail" v-show="showDetail">
      <div class="box-top-bar" >
        <span @click="showDetailBox(false)"><router-link :to="{path:'/products'}" >×</router-link></span>
      </div>
      <router-view></router-view>
    </div>
    <div class="shade" v-show="showDetail"></div>
  </div>
</template>

<script>
import router from '../../routes'
import pic from './images/product.png'
import { search } from '../../services/customer/search'

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
      products: products,
      showDetail: this.$route.params.id !== undefined,
      oldScrollTop: false
    }
  },
  methods: {
    handleDetailClicked (productId) {
      router.push('/products/' + productId)
    },
    showDetailBox (show) {
      this.showDetail = show
      if (show) {
        this.oldScrollTop = document.body.scrollTop
        document.body.scrollTop = 0
      } else {
        document.body.scrollTop = this.oldScrollTop
      }
    },
    searchProducts () {
      search(0, this.keyword).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  beforeUpdate: function () {
    this.showDetail = this.$route.params.id !== undefined
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

$color1: gray;
$color2: #f5f5f5;
$color3: #0077d8;
$color4: #258bde;

h1 {
  font-weight: normal;
}

@media (min-width: 1500px) {
  .product-list {
    padding-left: 200px;
    padding-right: 200px;
  }
  .search-box {
    padding-left: 200px;
    padding-right: 200px;
  }
}

@media (max-width: 1500px) and (min-width: 1200px) {
  .product-list {
    padding-left: 100px;
    padding-right: 100px;
  }
  .search-box {
    padding-left: 100px;
    padding-right: 100px;
  }
}

@media (max-width: 1200px) {
  .product-list {
    padding-left: 5px;
    padding-right: 5px;
  }
  .search-box {
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
  cursor: pointer;
  a {
    color:black;
  }
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

.product-detail {
  position:absolute;
  top:100px;
  left:0;
  right:0;
  margin:0 auto;
  width:600px;
  border:1px solid $color2;
  border-radius:4px;
  padding:20px 30px;
  z-index:90;
  background:white;
  box-shadow:4px 4px 20px $color1;
}

.box-top-bar {
  color:gray;
  height:30px;
  line-height:30px;
  span {
    font-size:30px;
    float:right;
  }
  a {
    color:gray;
  }
}

.shade {
  z-index:89;
  position:fixed;
  width:100%;
  height:100%;
  top:0;
  left:0;
  opacity:0.4;
  background-color:black;
}

a {
  text-decoration:none;
}

.search-box {
  text-align: right;
  margin-top: 40px;
  margin-bottom: 25px;
  margin-right: 70px;

  input {
    width: 100%;
    background-image: url(./images/search_icon.png);
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 36px 36px;
    height: 50px;
    border-radius: 100px;
    background-color: $color2;
    border: none;
    padding-left: 70px;
    font-size: 20px;
    outline: none;
  }
}

</style>
