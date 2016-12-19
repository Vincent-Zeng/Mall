<template>
  <div class="checkout">

    <div class="checkout-panel">
      <div class="checkout-amount">
        <span class="prompt">Amount</span>
        <span class="checkout-money value">HK$ {{ amount.toFixed(2) }}</span>
      </div>
      <div class="checkout-via">
        <span class="prompt">Via</span>
        <span class="value">Alipay</span>
      </div>
      <div class="checkout-img">
        <img src="./images/qrcode.jpg" alt="">
      </div>
      <button type="button" class="checkout-btn" @click="handleConfirmClicked">Confirm</button>
    </div>

  </div>
</template>

<script>
import pic from './images/product.png'

export default {
  name: 'cart',
  data () {
    this.amount = this.$route.params.amount
    console.log(this.$route.params.amount)
    let items = []
    for (var i = 0; i < 20; i++) {
      items.push({
        id: i,
        url: pic,
        name: 'iPhone 7 16G Jet Black',
        price: 649.00,
        quantity: 1
      })
    }

    return {
      items: items,
      amount: 5800
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

.checkout-panel {
  margin: auto;
  margin-top: 50px;
  width: 500px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .checkout-amount {
    margin-top: 15px;
  }

  .checkout-amount,
  .checkout-via {
    width: 300px;
    margin-bottom: 15px;
    position: relative;
    font-size: 20px;

    .prompt {
      position: absolute;
      margin-left: 40px;
    }

    .value {
      float: right;
      margin-right: 40px;
      color: gray;
    }

    .checkout-money {
      color: #FF3F13;
    }
  }

  .checkout-img {
    width: 200px;
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 200px;
      max-height: 200px;
    }
  }

  .checkout-btn {
    margin-top: 20px;
    color: white;
    background-color: #0077D8;
    width: 250px;
    height: 46px;
    border: none;
    border-radius: 28px;
    font-size: 20px;
    cursor: pointer;
    outline: none;
  }
}

</style>
