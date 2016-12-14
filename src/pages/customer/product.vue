<template>
  <div>
    <div class="product">
      <div class="product-info">
        <div class="product-img">
          <img class="product-image" :src="product.url" alt="">
        </div>
        <div class="product-detail">
          <div class="product-summary">
            <img src="./images/rating.png" alt="">
            <p>21 reviews</p>
          </div>

          <p class="product-name">{{ product.name }}</p>
          <p class="product-price">${{ product.price.toFixed(2) }}</p>

          <div class="product-add-to-cart">
            Add to cart
          </div>

          <p class="product-description">{{ product.description}}</p>
        </div>
      </div>

      <div class="product-shop">
        <img class="product-shop-icon" src="./images/shop-name.png" alt="">
        <div class="product-shop-name">BestBuy Digital Shop</div>
        <div class="product-shop-favourite">Add to Favourite</div>
      </div>

      <div class="product-comments">

      </div>
    </div>
  </div>
</template>

<script>
import { fetchProduct } from '../../services/customer/product'

export default {
  name: 'product',
  data () {
    fetchProduct(this.$route.params.id)
      .then(res => res.json())
      .then(data => {
        this.product = {
          id: data.id,
          name: data.name,
          price: data.price,
          url: data.photoURL,
          description: data.detail
        }
      })
    return {
      product: {
        id: null,
        name: null,
        price: null,
        url: null,
        description: null
      }
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  font-weight: normal;
}

.product-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position:relative;
}

.product-img {
  width: 50%;
  position:relative;

  .product-image {
    display: block;
    margin: auto;
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
}

.product-shop {
  margin-left: -30px;
  margin-right: -30px;
  height: 70px;
  background-color: #F5F5F5;
  position: relative;

  .product-shop-icon {
    float: left;
    display: block;
    margin: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 28px;
  }

  .product-shop-name {
    display: inline-block;
    color: black;
    font-size: 16px;
    padding-left: 14px;
    height: 70px;
    line-height: 70px;
    padding-top: 2px;
    float: left;
  }

  .product-shop-favourite {
    display: inline-block;
    height: 70px;
    line-height: 70px;
    font-size: 16px;
    color: #0077D8;
    padding-right: 20px;
    float: right;
  }
}

.product-detail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;

  .product-summary p {
    text-align: left;
    font-size: 14px;
    color: #ACACAC;
  }

  .product-name {
    font-size: 28px;
    color: #2B2B2B;
    margin-top: 7px;
    margin-bottom: 7px;
  }

  .product-price {
    font-size: 23px;
    color: #FF3F13;
    margin-top: 7px;
    margin-bottom: 7px;
  }

  .product-add-to-cart {
    width: 100%;
    background-color: #0077D8;
    font-size: 20px;
    color: white;
    height: 56px;
    line-height: 56px;
    border-radius: 28px;
    font-weight: bolder;
    text-align: center;
    margin-top: 21px;
    margin-bottom: 21px;
  }

  .product-description {
    text-align: left;
    font-size: 16px;
    color: #2B2B2B;
    font-weight: lighter;
    margin-top: 7px;
    margin-bottom: 7px;
  }
}


</style>
