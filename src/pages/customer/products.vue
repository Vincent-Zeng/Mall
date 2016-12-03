<template>
  <div>
    <div class="wrapper">
      <div class="catalog">
          <p>ALL CATAGORIES</p>
          <ul>
                <li v-for="catalog in catalogs" class="catalog-item" @click="searchProducts(catalog.id)">{{ catalog.name }}</li>
          </ul>
      </div>
      <div class="product-list" >
        <div class="search-box">
          <input type="text" placeholder="Search here" v-model="keyword" @keyup.enter="searchProducts(0)"/>
        </div>
        <div class="product" v-for="product in products" @click="showDetailBox(true)">
          <router-link :to="{path:'/products/' + product.id}">
            <div class="product-img">
              <img :src="product.url" alt="">
            </div>
            <div class="product-name">{{ product.name }}</div>
            <div class="product-price">{{ product.price }}.00 HK $</div>
          </router-link>
        </div>
      </div>
    </div>


    <div>
      <div class="product-detail" v-show="showDetail">
        <div class="box-top-bar">
          <span @click="showDetailBox(false)"><router-link :to="{path:'/products'}">×</router-link></span>
        </div>
        <router-view></router-view>
      </div>
      <div class="shade" v-show="showDetail"></div>
    </div>
  </div>
</template>

<script>
import router from '../../routes'
import { search } from '../../services/customer/search'
/* import foldingList from './components/folding_list' */
export default {
  name: 'products',
  data () {
    let catalogs = []
    let catelogNames = [
      'TV & Home Theater',
      'Computers & Tablets',
      'Cell Phones',
      'Cameras & Camcorders',
      'Audio',
      'Car Electronics & GPS',
      'Video, Games, Movies & Music',
      'Health, Fitness & Sports',
      'Home & Office'
    ]
    console.log(this.$route.query)
    for (let i = 0; i < 10; i++) {
      catalogs.push({
        id: i + 1,
        name: catelogNames[i]
      })
    }

    return {
      products: [],
      showDetail: this.$route.params.id !== undefined,
      oldScrollTop: false,
      catalogs: catalogs
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
    searchProducts (id) {
      let keyword = this.keyword
      if (id !== 0) {
        keyword = ''
      }
      search(id, keyword)
        .then(res => res.json())
        .then(data => {
          let products = []
          for (let i = 0; i < data.length; i++) {
            const product = data[i]
            console.log(product)
            products.push({
              id: product.id,
              name: product.name,
              price: product.price,
              url: product.photoURL
            })
          }
          this.products = products
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  beforeUpdate: function () {
    this.showDetail = this.$route.params.id !== undefined
  },
  created () {
    console.log(search)
    search(0, '')
      .then(res => res.json())
      .then(data => {
        let products = []
        for (let i = 0; i < data.length; i++) {
          const product = data[i]
          console.log(product)
          products.push({
            id: product.id,
            name: product.name,
            price: product.price,
            url: product.photoURL
          })
        }
        this.products = products
      }).catch((err) => {
        console.log(err)
      })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  $color1: gray;
  $color2: #f5f5f5;
  $color3: #0077d8;
  $color4: #258bde;

  * {
    margin: 0;
    padding: 0;
  }

  h1 {
    font-weight: normal;
  }

  $product-width: 267px;

  .product {
    display: inline-block;
    width: 29%;
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

  .product-detail {
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 600px;
    border: 1px solid $color2;
    border-radius: 4px;
    padding: 20px 30px;
    z-index: 90;
    background: white;
    box-shadow: 4px 4px 20px $color1;
  }

  .box-top-bar {
    color: gray;
    height: 30px;
    line-height: 30px;
    span {
      font-size: 30px;
      float: right;
    }
    a {
      color: gray;
    }
  }

  .shade {
    z-index: 89;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.4;
    background-color: black;
  }

  a {
    text-decoration: none;
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

  .wrapper {
    width: 90%;
    min-width: 1000px;
    margin: 0 auto;
  }

.wrapper{
  width:90%;
  min-width:1000px;
  margin:0 auto;
}
.product-list{
  width:72%;
  box-sizing:border-box;
  display:inline-block;
  vertical-align:top;
}

.catalog{
  width:24%;
  margin-right:3%;
  min-height:60px;
  background:white;
  box-sizing:border-box;
  border:1px solid $color2;
  border-radius:4px;
  display:inline-block;
  vertical-align:top;
  position:relative;
  top:30px;
  box-shadow:4px 4px 20px $color1;
  padding:30px 0;

  p:first-child{
    color:$color1;
    padding-left:40px;
    margin-bottom:5px;
    font-size: 14px;
  }

  li {
    list-style: none;
  }
}

.catalog-item{
  font-weight:bold;
  font-size:16px;
  line-height:40px;
  padding-left:40px;
  cursor:pointer;
}

</style>
