<template>
  <div class="wrapper">
    <div class="products-ad">
      <div class="create-shop-panel">
        <div class="create-shop-header">
          <img src="./images/products.png" alt="">
          <span>Shops Top5</span>
        </div>
        <div class="product-ad-list" v-for="shop in shopsPassed">
          <div class="product-ad" :style="{ backgroundImage:'url(' + shop.photoUrl + ')'}" v-show="shop.show">
            <span class="remove-photo-btn" @click="handleRemoveShopAdPassedClick(shop)">×</span>
          </div>
        </div>
        <div class="product-image" :style="{ backgroundImage:'url(' + certificatephoto + ')' }" @click="showWaitingList(1)" ></div>
      </div>
    </div>

    <div class="wrapper">
      <div class="products-ad">
        <div class="create-shop-panel">
          <div class="create-shop-header">
            <img src="./images/products.png" alt="">
            <span>Products Top10</span>
          </div>
          <div class="product-ad-list" v-for="product in productsPassed">
            <div class="product-ad" :style="{ backgroundImage:'url(' + product.productUrl + ')'}" v-show="product.show">
              <span class="remove-photo-btn" @click="handleRemoveProductPassedAdClick(product)">×</span>
            </div>
          </div>
          <div class="product-image" :style="{ backgroundImage:'url(' + certificatephoto + ')' }" @click="showWaitingList(0)" ></div>
        </div>
      </div>

    <div class="registerBox" v-show="showAddAd">
      <section>
        <p class="close"><span v-on:click="showWaitingList()">×</span></p>
        <div class="owner-products">
          <div class="owner-product-list">
            <div class="owner-header">
              <img src="./images/products.png" alt="">
              <span>Waiting Queue</span>
            </div>
            <div class="product-list">
              <div class="product-item" v-for="optionalProduct in optionalProducts" v-show="optionalProduct.show">
                <span class="product-item-name">{{ optionalProduct.name }}</span>
                <span class="product-item-price">{{optionalProduct.price}}</span>
                <div class="function-button">
                  <div class="bluebutton" @click="changeAdStatus(0,optionalProduct)">Approve</div>
                  <div class="whitebutton" @click="changeAdStatus(1,optionalProduct)">Reject</div>
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
      shopsPassed: []
    }
  },
  created () {
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
          show: true,
          id: data.id
        })
      }
    })
    this.$http.get(`/shopAd/verified?page=1&count=1000`)
    .then((res) => res.json())
    .then((json) => {
      for (let i = 0; i < json.length; i++) {
        let data = json[i]
        this.shopsPassed.push({
          photoUrl: data.photoUrl,
          show: true,
          shopId: data.shopId,
          adId: data.id
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
    handleRemoveProductPassedAdClick (item) {
      this.$http.get(`/productAd/update?pAdId=${item.id}&status=3`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 0) {
            window.alert(json.message)
          } else {
            item.show = false
          }
        })
    },
    handleRemoveShopAdPassedClick (item) {
      this.$http.get(`/shopAd/changeStatus?shopId=${item.shopId}&status=3`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 0) {
            window.alert(json.message)
          } else {
            item.show = false
          }
        })
    },
    changeAdStatus (operation, item) {
      if (item.type === 0) {
        let status = operation === 0 ? 1 : 2
        this.$http.get(`/productAd/update?pAdId=${item.id}&status=${status}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 0) {
            window.alert(json.message)
          } else {
            item.show = false
            this.$http.get(`/productAd/getVerified`)
            .then((res) => res.json())
            .then((json) => {
              this.productsPassed = []
              for (let i = 0; i < json.length; i++) {
                let data = json[i]
                this.productsPassed.push({
                  productUrl: data.photoURL,
                  show: true,
                  id: data.id
                })
              }
            })
          }
        })
      } else {
        let status = operation === 0 ? 1 : 2
        this.$http.get(`/shopAd/changeStatus?shopId=${item.shopId}&status=${status}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 0) {
            window.alert(json.message)
          } else {
            item.show = false
            this.$http.get(`/shopAd/verified?page=1&count=1000`)
            .then((res) => res.json())
            .then((json) => {
              this.shopsPassed = []
              for (let i = 0; i < json.length; i++) {
                let data = json[i]
                this.shopsPassed.push({
                  photoUrl: data.photoUrl,
                  show: true,
                  shopId: data.shopId,
                  adId: data.id
                })
              }
            })
          }
        })
      }
    },
    showWaitingList (type) {
      if (!this.showAddAd) {
        this.oldScrollTop = document.body.scrollTop
        document.body.scrollTop = 0
        if (type === 0) {
          this.$http.get(`/productAd/getUnverified?page=1&pageNum=20`)
          .then((res) => res.json())
          .then((json) => {
            var optionalProducts = []
            for (let i = 0; i < json.length; i++) {
              let data = json[i]
              optionalProducts.push({
                productUrl: data.photoURL,
                show: true,
                type: 0,
                id: data.id,
                name: data.name,
                price: data.price
              })
            }
            this.optionalProducts = optionalProducts
          })
        } else {
          this.$http.get(`/shopAd/unverified?page=1&count=1000`)
          .then((res) => res.json())
          .then((json) => {
            var optionalProducts = []
            for (let i = 0; i < json.length; i++) {
              let data = json[i]
              optionalProducts.push({
                photoURL: data.photoUrl,
                show: true,
                type: 1,
                shopId: data.shopId,
                adId: data.id,
                name: data.name,
                price: data.price
              })
            }
            this.optionalProducts = optionalProducts
          })
        }
      } else {
        document.body.scrollTop = this.oldScrollTop
      }
      this.showAddAd = !this.showAddAd
    }
  },
  mounted () {
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
  cursor:pointer;
}
.bluebutton{
  background:$color4;
  border:1px solid $color4;
  color:white;
  cursor:pointer;
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

    .product-item-price{
      position: absolute;
      left: 270px;
      line-height: 88px;
      color: red;
    }

    .product-item-price::after{
      content: " / day"
    }

    .product-item-price::before{
      content: "HK $ "
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
