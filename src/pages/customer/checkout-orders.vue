<template>
  <div class="checkout-orders">
    <div class="order-product-list">
      <div class="order-header">
        <img src="./images/products.png" alt="">
        <span>Order</span>
      </div>
      <div class="product-list">
        <div class="product-item">
          <div class="product-image-wrapper">
            <div class="product-image">
              <img src="./images/product.png" alt="">
            </div>
          </div>
          <div class="product-info-wrapper">
            <div class="product-info">
              <p class="product-item-name">iPhone</p>
              <p class="product-count">x 1</p>
            </div>
            <div class="product-price">1.00 HK$</div>
          </div>
        </div>
      </div>

      <div class="order-summary">
        Total <span>1110.00 (Shipment: 10.00) HK $</span>
      </div>
    </div>

    <button class="confirm-order" type="button" name="button" @click="handleConfirmClicked()">Confirm Order <span>100 HK$</span></button>

  </div>
</template>

<script>
import router from '../../routes'

export default {
  name: 'checkout-orders',
  data () {
    return {
    }
  },
  methods: {
    handleConfirmClicked () {
      router.push('/pay')
    }
  },
  created () {
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.order-product-list {
  // position: absolute;
  margin: 100px 0px 28px 0px;
  margin-left: 172px;
  margin-right: 172px;
  border: 1px solid #E4E4E4;
  position: relative;
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
    height: 160px;
    border-top: 1px solid #EEEEEE;

    .product-image-wrapper {
      height: 160px;
      width: 160px;
      display: inline-block;
      position: relative;

      .product-image {
        margin-top: 0px;
        height: 125px;
        width: 125px;
        border: 1px solid #E4E4E4;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;

        img {
          position: absolute;
          margin: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          max-width: 80px;
          max-height: 80px;
        }
      }
    }

    .product-info-wrapper {
      display: inline-block;
      height: 160px;
      .product-info {
        position: absolute;
        display: flex;
        flex-direction: row;
        margin-left: 20px;
        height: 160px;

        p {
          display: inline-block;
          line-height: 160px;
          height: 160px;
          margin-top: 0px;
          margin-bottom: 0px;
        }

        .product-item-name {
          color: #2B2B2B;
          font-size: 18px;
          font-weight: normal;
          margin-left: 4px;
          font-size: 18px;
        }

        .product-count {
          color: #2B2B2B;
          font-size: 18px;
          margin-left: 10px;
        }
      }

      .product-price {
        margin-right: 59px;
        line-height: 160px;
        height: 160px;
        position: absolute;
        right: 20px;
        color: #FF3F13;
        font-size: 23px;
      }
    }
  }
}

.order-summary {
  height: 131px;
  line-height: 131px;
  font-size: 17px;
  color: #2B2B2B;
  text-align: right;
  padding-right: 59px;

  span {
    color: #FF3F13;
    font-size: 25px;
  }
}

.confirm-order {
  position: absolute;
  right: 182px;
  width: 444px;
  height: 58px;
  border-radius: 29px;
  background-color: #4A90E2;
  outline: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 20px;

  span {

  }
}

</style>
