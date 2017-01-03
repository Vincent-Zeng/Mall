<template>
  <div class="admin-owner">
    <div class="owner-header">
      <img src="./images/products.png" alt="">
      <span @click="handleSpanClicked('product')" class="product-span" v-bind:class="{ 'highlight-span': isProduct, 'normal-span': !isProduct }">Product</span>
      <span @click="handleSpanClicked('shop')" class="shop-span" v-bind:class="{ 'highlight-span': !isProduct, 'normal-span': isProduct }">Shop</span>
    </div>

    <div class="owner-list" v-show="!isProduct">
      <div class="owner-item" v-for="shop in shops" v-show="shop.show">
        <a :href="'/shops/' + shop.id"  >
          <span class="owner-item-owner">{{ shop.name }}</span>
        </a>
        <div class="function-button">
          <div class="remove-button" @click="handleRemoveClicked('shop',shop)">Remove</div>
        </div>
      </div>
    </div>

    <div class="owner-list" v-show="isProduct">
      <div class="owner-item" v-for="product in products" v-show="product.show">
        <a :href="'/products/' + product.id" >
          <img class="owner-item-avatar" :src="product.avatar" alt="">
          <span class="owner-item-owner">{{ product.name }}</span>
        </router-link>
        <div class="function-button">
          <div class="remove-button" @click="handleRemoveClicked('product',product)">Remove</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin-owner',
  data () {
    let isProduct = true
    return {
      shops: [],
      products: [],
      isProduct: isProduct,
      searchkey: null
    }
  },
  methods: {
    handleRemoveClicked (whichButton, item) {
      if (whichButton === 'shop') {
        this.$http.get(`/Favorite/deleteShop?id=${item.id}`)
        .then(res => res.json())
        .then(json => {
          if (json.status === 1) {
            item.show = false
          } else {
            this.$message(json.message)
          }
        })
      } else {
        this.$http.get(`/Favorite/deleteProduct?id=${item.id}`)
        .then(res => res.json())
        .then(json => {
          if (json.status === 1) {
            item.show = false
          } else {
            this.$message(json.message)
          }
        })
      }
    },
    handleSpanClicked (type) {
      this.isProduct = type === 'product'
      if (this.isProduct === true) {
        this.$http.get(`/Favorite/searchFavoriteProduct`)
        .then(res => res.json())
        .then(json => {
          let products = []
          for (let i = 0; i < json.length; i++) {
            products.push({
              name: json[i].name,
              id: json[i].id,
              avatar: json[i].photoURL,
              show: true
            })
          }
          this.products = products
        })
      } else {
        this.$http.get(`/Favorite/searchFavoriteShop`)
        .then(res => res.json())
        .then(json => {
          let shops = []
          for (let i = 0; i < json.length; i++) {
            shops.push({
              name: json[i].name,
              id: json[i].id,
              show: true
            })
          }
          this.shops = shops
        })
      }
    }
  },
  created () {
    this.$http.get(`/Favorite/searchFavoriteProduct`)
    .then(res => res.json())
    .then(json => {
      let products = []
      for (let i = 0; i < json.length; i++) {
        products.push({
          name: json[i].name,
          id: json[i].id,
          show: true
        })
      }
      this.products = products
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.admin-owner {
  position: absolute;
  margin: 56px 0px;
  left: 172px;
  right: 172px;
  border: 1px solid #E4E4E4;
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
    font-size: 20px;
    font-weight: bold;
    height: 80px;
    line-height: 80px;
  }

  .product-span {
    margin-left: 65px;
    cursor:pointer;
  }

  .shop-span {
    margin-left: 8px;
    cursor:pointer;
  }

  .highlight-span {
    color: #2B2B2B;
  }

  .normal-span {
    color: #ACACAC;
  }
}

.owner-list {
  margin-left: 28px;
  margin-right: 28px;

  .owner-item {
    height: 88px;
    position: relative;
    border-top: 1px solid #EEEEEE;

    .owner-item-avatar {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .owner-item-owner {
      color: gray;
      margin-left: 50px;
      font-size: 18px;
      font-weight: normal;
      line-height: 88px;
      height: 88px;
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

      .remove-button {
        cursor: pointer;
        background-color: white;
        border: 1px solid #0077D8;
        color: #0077D8;
        margin-right: 16px;
      }

      .delete-button {
        cursor: pointer;
        background-color: white;
        color: #ACACAC;
      }
    }
  }
}

</style>
