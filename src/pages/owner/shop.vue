<template>
  <div class="owner-shop">

    <div class="owner-panel">
      <div class="owner-panel-info">
        <div class="owner-panel-info-left">
          <img src="./images/avatar.png" alt="">
          <div class="owner-name">{{ ownerName }}</div>
        </div>
        <div class="owner-panel-info-right">
          <div class="owner-panel-income">
            <p class="normal">{{ products }}</p>
            <p class="prompt">PRODUCTS</p>
          </div>
          <div class="owner-panel-sales">
            <p class="normal">{{ sales }}</p>
            <p class="prompt">SALES</p>
          </div>
          <div class="owner-panel-products">
            <p class="dollar">HK$ {{ income }}</p>
            <p class="prompt">INCOME</p>
          </div>
        </div>
      </div>
      <div class="owner-shop">
        <!-- <span>Own</span>
        <span>{{ shopName }}</span> -->
        <div class="create-shop-button"><router-link :to="{path:'/owner/navigation/shop/create'}">Create</router-link></div>
      </div>
    </div>

    <div class="info-panel" v-show="shop.id !== null">
      <div class="info-header">
        <img src="./images/products.png" alt="">
        <span>Information</span>
        <section class="command-button">
          <button v-show=disabled class="whitebutton" @click=editShop(true)>Edit</button>
          <button v-show=!disabled class="whitebutton" @click=editShop(false)>Cancel</button>
          <button v-show=!disabled class="bluebutton" @click=saveEdit()>Save</button>
        </section>
      </div>
      <div class = "info-content">
        <section class="shop-name">
          <label>Shop Name</label>
          <input v-model="shop.name" disabled v-if=disabled />
          <input v-model="shop.name" v-else />
        </section>
        <section class="shop-contact">
          <label>Shop Contact</label>
          <input v-model="shop.contact" disabled v-if=disabled />
          <input v-model="shop.contact"  v-else />
        </section>
        <section class="shop-telephone">
          <label>Shop Telephone</label>
          <input v-model="shop.telephone" disabled v-if=disabled />
          <input v-model="shop.telephone" v-else />
        </section>
        <section class="shop-email">
          <label>Shop Email</label>
          <input v-model="shop.email" disabled v-if=disabled />
          <input v-model="shop.email" v-else />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'owner-shop',
  data () {
    var shop = {}
    this.$http.get(`/shop/searchByOwner?id=${Vue.cookie.get('ownerId')}`)
    .then((res) => res.json())
    .then((json) => {
      shop.id = json.id
      shop.email = json.email
      shop.idPhotoUrl = json.idPhotoUrl
      shop.name = json.name
      shop.contact = json.contact
      shop.telephone = json.telephone
      console.log(shop)
    })
    return {
      disabled: true,
      products: 0,
      sales: 0,
      income: 0,
      ownerName: null,
      shopName: 'Nothing',
      shop: shop
    }
  },
  methods: {
    editShop (edit) {
      this.disabled = !edit
    },
    saveEdit () {
      this.$http.post(`/shop/update`, {
        'contact': this.shop.contact,
        'email': this.shop.email,
        'telephone': this.shop.telephone,
        'idPhotoUrl': this.shop.idPhotoUrl,
        'name': this.shop.name
      })
      this.editShop(false)
    }
  },
  created () {
    let ownerId = Vue.cookie.get('ownerId')
    Vue.http.get(`/owner/getById?id=${ownerId}`)
      .then((res) => res.json())
      .then(json => {
        this.ownerName = json.name
      })
    Vue.http.get(`/product/getNum`)
    .then((res) => res.json())
    .then((json) => {
      this.products = json.message
      console.log(json)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color1:gray;
$color2:#f5f5f5;
$color3:#0077d8;
$color4:#258bde;
:focus{
  outline:none;
}
.owner-panel {
  position: absolute;
  margin: 56px 0px 28px 0px;
  left: 172px;
  right: 172px;
  border: 1px solid #E4E4E4;
  height: 260px;
  min-width:800px;
  box-shadow: 0px 4px 14px rgba(121, 121, 121, 0.1);

  .owner-panel-info {
    height: 120px;
    margin: 28px;

    .owner-panel-info-left {
      display: inline-block;
      position: relative;
      img {
        width: 120px;
        height: 120px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      .owner-name {
        display: inline-block;
        height: 120px;
        line-height: 120px;
        font-size: 30px;
        color: #2B2B2B;
        margin-left: 136px;
      }
    }

    .owner-panel-info-right {
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;
      height: 120px;

      div {
        display: inline-block;
        margin: auto 28px;

        p {
          text-align: center;
          margin: 0px;
        }

        .normal {
          font-size: 40px;
          font-weight: lighter;
          color: #0077D8;
        }

        .dollar {
          font-size: 40px;
          font-weight: lighter;
          color: #FF3F13;
        }

        .prompt {
          color: #ACACAC;
          font-size: 18px;
        }
      }
    }
  }

  .owner-shop {
    height: 82px;
    line-height: 82px;
    padding-left: 28px;
    border-top: 1px solid #EEEEEE;

    span:last-child {
      color: #2B2B2B;
      font-weight: bold;
    }

    .create-shop-button {
      width: 114px;
      height: 42px;
      display: inline-block;
      line-height: 42px;
      text-align: center;
      border-radius: 4px;
      box-sizing:border-box;
      cursor: pointer;
      margin-top: 20px;
      margin-right: 28px;
      border: 1px solid #0077D8;
      background-color: #0077D8;
      color: white;
      float: right;
    }
  }
}

.info-panel {
  position: absolute;
  margin: 372px 0px 28px 0px;
  left: 172px;
  right: 172px;
  min-width:800px;
  border: 1px solid #E4E4E4;
  box-shadow: 0px 4px 14px rgba(121, 121, 121, 0.1);
  padding-bottom:20px;
}

.info-header {
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

  .command-button{
    float:right;
    height:80px;
    line-height:80px;
    padding:0 20px;
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
  }
}

.info-content{
  padding:0 28px;
  font-size:16px;
  line-height:50px;
  label{
    color:gray;
  }
  label::after{
    content:" : ";
  }
  input{
    border:none;
    width:80%;
    font-size:16px;
  }
  :focus{
    outline:none;
  }
}

</style>
