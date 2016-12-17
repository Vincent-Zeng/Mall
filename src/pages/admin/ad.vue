<template>
  <div class="wrapper">
    <div class="products-ad">
      <div class="create-shop-panel">
        <div class="create-shop-header">
          <img src="./images/products.png" alt="">
          <span>Shops Top5</span>
        </div>
        <div class="product-ad-list" v-for="product in productsReviewing">
          <div class="product-ad" :style="{ backgroundImage:'url(' + product.productUrl + ')'}" v-show="product.show">
            <span class="remove-photo-btn" @click="handleRemoveProductAdClicked(product)">×</span>
          </div>
        </div>
        <div class="product-image" :style="{ backgroundImage:'url(' + certificatephoto + ')' }" @click="showRegisterForm()" ></div>
      </div>
    </div>

    <div class="wrapper">
      <div class="products-ad">
        <div class="create-shop-panel">
          <div class="create-shop-header">
            <img src="./images/products.png" alt="">
            <span>Products Top10</span>
          </div>
          <div class="product-ad-list" v-for="product in productsReviewing">
            <div class="product-ad" :style="{ backgroundImage:'url(' + product.productUrl + ')'}" v-show="product.show">
              <span class="remove-photo-btn" @click="handleRemoveProductAdClicked(product)">×</span>
            </div>
          </div>
          <div class="product-image" :style="{ backgroundImage:'url(' + certificatephoto + ')' }" @click="showRegisterForm()" ></div>
        </div>
      </div>

    <div class="registerBox" v-show="showAddAd">
      <section>
        <p class="close"><span v-on:click="showRegisterForm()">×</span></p>
        <div class="owner-products">
          <div class="owner-product-list">
            <div class="owner-header">
              <img src="./images/products.png" alt="">
              <span>Products</span>
            </div>
            <div class="product-list">
              <div class="product-item" v-for="optionalProduct in optionalProducts" v-show="optionalProduct.show">
                <span class="product-item-name">{{ optionalProduct.name }}</span>

                <div class="function-button">
                  <div class="remove-button" @click=addProductAd(optionalProduct)>Add</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="shade" v-show="showAddAd"></div>
  </div>
</template>

<script>
import photoaddbutton from './images/add-photo.png'
export default {
  name: 'owner-create-shop',
  data () {
    return {
      certificatephoto: photoaddbutton,
      closebutton: false,
      shop: {
        name: null,
        telephone: null,
        contact: null
      },
      productsReviewing: [],
      productsPassed: [],
      showAddAd: false,
      oldScrollTop: null,
      optionalProducts: [],
      loaded: false,
      shopAd: 1
    }
  },
  created () {
    this.$http.get(`/shopAd/status`)
    .then((res) => res.json())
    .then((json) => {
      this.shopAd = json.status
    })
    this.$http.get(`/productAd/getUnverified?page=1&pageNum=10`)
    .then((res) => res.json())
    .then((json) => {
      for (let i = 0; i < json.length; i++) {
        let data = json[i]
        this.productsReviewing.push({
          productUrl: data.photoURL,
          show: true,
          id: data.id
        })
      }
    })
    this.$http.get(`/productAd/getVerified`)
    .then((res) => res.json())
    .then((json) => {
      for (let i = 0; i < json.length; i++) {
        let data = json[i]
        this.productsPassed.push({
          productUrl: data.photoURL,
          show: true
        })
      }
    })
  },
  methods: {
    handleRemovePhotoClicked (event) {
      event.stopPropagation()
      this.certificatephoto = photoaddbutton
      this.closebutton = false
    },
    handleRemoveProductAdClicked (item) {
      this.$http.get(`/productAd/delete?productAdId=${item.id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 1) {
          item.show = false
        } else {
          window.alert(json.message)
        }
      })
    },
    changeShopAdStatus () {
      if (this.shopAd === 1) {
        this.$http.get(`/shopAd/delete`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 0) {
            window.alert(json.message)
          } else {
            this.shopAd = 3
          }
        })
      } else {
        this.$http.get(`/shopAd/add?photoUrl=${this.certificatephoto}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 0) {
            window.alert(json.message)
          } else {
            this.shopAd = 0
          }
        })
      }
    },
    addProductAd (item) {
      this.$http.get(`/productAd/add?productId=${item.id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 0) {
          window.alert(json.message)
        } else {
          item.show = false
        }
      })
    },
    showRegisterForm () {
      if (!this.showAddAd) {
        this.oldScrollTop = document.body.scrollTop
        document.body.scrollTop = 0
      } else {
        document.body.scrollTop = this.oldScrollTop
      }
      this.showAddAd = !this.showAddAd
      if (!this.loaded) {
        this.$http.get('/product/searchByOwn')
        .then(res => res.json())
        .then(data => {
          console.log(data)
          let optionalProducts = []
          for (let i = 0; i < data.length; i++) {
            const product = data[i]
            console.log(product)
            optionalProducts.push({
              id: product.id,
              name: product.name,
              show: true
            })
          }
          this.optionalProducts = optionalProducts
          console.log(111)
          console.log(this.optionalProducts)
          console.log(optionalProducts)
          this.loaded = true
        })
      }
    }
  },
  mounted () {
    var file = document.getElementById('uploadbutton')
    var that = this
    file.onchange = function () {
      var _files = this.files
      console.log(_files)
      console.log(file.value)
      var filePath = file.value
      if (!_files.length) return
      if (_files.length === 1) {
        window.fetch('http://106.14.70.91:8000/upload', {
          method: 'POST',
          headers: {
            'file-name': filePath.substring(filePath.lastIndexOf('\\') + 1)
          },
          body: _files[0]
        }).then(function (res) {
          return res.json()
        }).then(function (data) {
          console.log(data.fileurl)
          that.certificatephoto = data.fileurl
          if (that.product !== photoaddbutton) {
            that.closebutton = true
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color1:gray;
$color2:#f5f5f5;
$color3:#0077d8;
$color4:#258bde;

.create-shop-panel {
  margin: 20px 0px 0px 0px;
  left: 172px;
  right: 172px;
  border: 1px solid #E4E4E4;
  min-width:1000px;
  box-shadow: 0px 4px 14px rgba(121, 121, 121, 0.1);
  padding-bottom:40px;
  .create-shop-header {
    position: relative;

    img {
      margin-left: 28px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    span {
      color: #2B2B2B;
      font-size: 20px;
      margin-left: 65px;
      height: 80px;
      line-height: 80px;
    }
  }
}

.shop-apply{
    display:inline-block;
    margin-left:40px;
}

button{
  padding:10px 30px;
  border-radius:3px;
  cursor:pointer;
}
.whitebutton{
  background:white;
  border:1px solid $color4;
  color:$color4;
}
.bluebutton{
  background:$color4;
  border:1px solid $color4;
  color:white;
}

.product-image {
  margin-left: 28px;
  height: 200px;
  width: 200px;
  border: 1px solid #E4E4E4;
  overflow: hidden;
  position:relative;
  top:10px;
  left:40px;
  box-shadow: 0px 4px 14px 7px rgba(121, 121, 121, 0.05);
  background-repeat: no-repeat;
  background-size: auto;
  background-image: url('./images/add-photo.png');
  background-size:contain;
  background-position:center center;
  .product-photo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .uploadbutton{
    opacity:0;
    left:0;
    top:0;
    width:200px;
    height:200px;
  }

  .remove-photo-btn {
    cursor:pointer;
    font-size:40px;
    z-index: 100;
    position: absolute;
    top: 0px;
    right: 10px;
    color:gray;
  }
}

.product-ad-list{
  min-width: 1000px;
  .product-ad{
    margin-left: 28px;
    height: 200px;
    width: 200px;
    border: 1px solid #E4E4E4;
    overflow: hidden;
    float:left;
    top:10px;
    left:10px;
    box-shadow: 0px 4px 14px 7px rgba(121, 121, 121, 0.05);
    background-repeat: no-repeat;
    background-size: auto;
    background-size:contain;
    background-position:center center;
    margin-bottom: 40px;
    position:relative;
    .remove-photo-btn {
      cursor:pointer;
      font-size:40px;
      z-index: 100;
      position: absolute;
      right:4px;
      top:-8px;
      color:gray;
    }
  }
}
.clear{
  clear:both;
}
.shop-ad{
  height:350px;
  min-width:1000px;
  width:90%;
  margin:0 auto;
}

.products-ad{
  min-width:1000px;
  width:90%;
  margin:0 auto;
}

.products-ad-passed{
  min-width:1000px;
  width:90%;
  margin:0 auto;
}


.registerBox{
  z-index:100;
  position:absolute;
  border:1px solid $color2;
  width:700px;
  margin:0 auto;
  left:0;
  right:0;
  top:20px;
  padding:6px 12px 30px 12px;
  border-radius:5px;
  box-shadow:4px 4px 20px $color1;
  background:white;
}
.close{
  text-align:right;
  font-size:30px;
  margin:0;
  color:lightgray;
  line-height:30px;
}

.close span{
  cursor:pointer;
}

.shade{
  z-index:99;
  position:fixed;
  width:100%;
  height:100%;
  top:0;
  left:0;
  opacity:0.4;
  background-color:black;
}

.register_form p{
  position:relative;
}

.error{
  display: block;
  color: red;
  font-size: 13px;
  font-weight: bold;
  margin: 0px;
  margin-bottom: -20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}


.owner-product-list {
  left: 172px;
  right: 172px;
}

.owner-header {
  position: relative;
  img {
    margin-left: 28px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  span {
    color: #2B2B2B;
    font-size: 20px;
    margin-left: 65px;
    height: 80px;
    line-height: 80px;
  }
}

.product-list {
  margin-left: 28px;
  margin-right: 28px;

  .product-item {
    height: 88px;
    position: relative;
    border-top: 1px solid #EEEEEE;

    .product-item-name {
      color: #2B2B2B;
      font-size: 18px;
      font-weight: normal;
      margin-left: 4px;
      line-height: 88px;
    }

    .function-button {
      display: inline-block;
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);

      div {
        width: 114px;
        height: 42px;
        display: inline-block;
        line-height: 42px;
        text-align: center;
        border-radius: 4px;
        box-sizing: border-box;
      }

      .edit-button {
        background-color: #0077D8;
        color: white;
        margin-right: 16px;
        cursor: pointer;
      }

      .remove-button {
        background-color: white;
        border: 1px solid #0077D8;
        color: #0077D8;
        cursor: pointer;
      }
    }
  }
}

.btn-list {
  position: absolute;
  margin: 28px 0px;
  left: 172px;
  right: 172px;
}

.add-product-button {
  // position: absolute;
  // left: 172px;
  // top: 28px;

  width: 114px;
  height: 42px;
  display: inline-block;
  line-height: 42px;
  text-align: center;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #0077D8;
  color: white;
  margin-right: 16px;
  cursor: pointer;
}
</style>
