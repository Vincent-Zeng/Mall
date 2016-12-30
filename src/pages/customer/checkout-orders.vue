<template>
  <div class="checkout-orders">

    <div class="checkout-order-panel">
      <div class="checkout-order">
      </div>
    </div>

    <div class="order-product-list">
      <div class="order-header">
        <img src="./images/products.png" alt="">
        <span>Order</span>
      </div>
      <div class="product-list">
        <div class="product-item">
          <div class="product-image">
            <img src="./images/product.png" alt="">
          </div>
          <div class="product-info">
            <span class="product-item-name">iPhone</span>
            <span class="product-count">1</span>
            <span class="product-price">1.00 HK$</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'checkout-orders',
  data () {
    return {
    }
  },
  methods: {
    handleConfirmClicked () {
    }
  },
  created () {
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.order-product-list {
  position: absolute;
  margin: 100px 0px 28px 0px;
  left: 172px;
  right: 172px;
  border: 1px solid #E4E4E4;
}

.order-header {
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
    height: 150px;
    border-top: 1px solid #EEEEEE;

    .product-image {
      margin-top: 17px;
      height: 125px;
      width: 125px;
      position: relative;
      border: 1px solid #E4E4E4;
      display: inline-block;

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 80px;
        max-height: 80px;
      }
    }

    .product-info {
      display: inline-block;
      height: 125px;
      span {
        line-height: 125px;
        height: 125px;
      }

      .product-item-name {
        color: #2B2B2B;
        font-size: 18px;
        font-weight: normal;
        margin-left: 4px;
        line-height: 88px;
      }
    }
  }
}

</style>
