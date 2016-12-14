<template>
  <div class="owner-products">

    <div class="btn-list">
      <div class="add-product-button"><router-link :to="{path:'/owner/navigation/products/new'}">Add</router-link></div>
    </div>

    <div class="owner-product-list">
      <div class="owner-header">
        <img src="./images/products.png" alt="">
        <span>Products</span>
      </div>
      <div class="product-list">
        <div class="product-item" v-for="product in products" v-show="product.show">
          <span class="product-item-name">{{ product.name }}</span>

          <div class="function-button">
            <div class="edit-button"><router-link :to="{path:`/owner/navigation/products/${product.id}`}">Edit</router-link></div>
            <div class="remove-button" @click=deleteproduct(product.id,product)>Remove</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'owner-products',
  data () {
    this.$http.get('/product/searchByOwn')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        let products = []
        for (let i = 0; i < data.length; i++) {
          const product = data[i]
          products.push({
            id: product.id,
            name: product.name,
            show: true
          })
        }
        this.products = products
      })
    return {
      products: null
    }
  },
  methods: {
    deleteproduct (productid, product) {
      console.log(productid)
      this.$http.get(`/product/delete?id=${productid}`).then(function (res) {
        return res.json()
      }).then(function (json) {
        if (json.status === 1) {
          product.show = false
        } else {
          window.alert(json.message)
        }
      })
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.owner-product-list {
  position: absolute;
  margin: 100px 0px 28px 0px;
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
