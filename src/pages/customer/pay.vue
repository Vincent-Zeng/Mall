<template>
  <div class="checkout-orders">

    <div class="delivery-detail">
      <div class="order-header">
        <img src="./images/products.png" alt="">
        <span>Delivery</span>
      </div>

      <div class="delivery-info">
        <div class="name">
          <p>Name</p>
          <input type="text" name="" value="" placeholder="Enter Name here...">
        </div>
        <div class="address">
          <p>Address</p>
          <input type="text" name="" value="" placeholder="Enter Address here...">
        </div>
        <div class="phone">
          <p>Phone</p>
          <input type="text" name="" value="" placeholder="Enter Phone here...">
        </div>
      </div>
    </div>

    <div class="btn-panel">
      <button class="alipay" type="button" name="button">Pay with Alipay</button>
      <button class="wechat" type="button" name="button">Pay with Wechat</button>
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

.delivery-detail {
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

.delivery-info {
  div {
    height: 73px;
    position: relative;
  }

  p {
    display: inline-block;
    height: 73px;
    line-height: 73px;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 28px;
  }

  input {
    position: absolute;
    height: 40px;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 100px;
    width: 90%;
    border: 1px solid #E4E4E4;
    border-radius: 4px;
    padding-left: 10px;
  }

  .name {

  }

  .address {

  }

  .phone {

  }
}

.btn-panel {
  position: absolute;
  right: 172px;

  button {
    outline: none;
    cursor: pointer;
    border: none;
    color: white;
    width: 444px;
    height: 58px;
    border-radius: 29px;
    font-size: 20px;
  }

  button:first-child {
    background-color: #39A2E6;
    margin-right: 20px;
  }

  button:last-child {
    background-color: #5BBB0A;
  }
}

</style>
