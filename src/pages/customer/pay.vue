<template>
  <div class="checkout-orders">

    <div class="delivery-detail">
      <div class="order-header">
        <img src="./images/products.png" alt="">
        <span>Delivery</span>
      </div>

      <div class="delivery-info">
        <div v-for="(recipient,index) in recipients" class='recipient-item'>
          <el-radio class="radio" v-model="whichRecipient" :label="recipient.id">Address{{index+1}}</el-radio>
          <div class="name">
            <p>Name</p>
            <span v-text="recipient.name"></span>
          </div>
          <div class="address">
            <p>Address</p>
            <span v-text="recipient.address"></span>
          </div>
          <div class="phone">
            <p>Phone</p>
            <span v-text="recipient.telephone"></span>
          </div>
        </div>
        <div class="add-another">
          <router-link :to="{path:'/me'}"><button class="bluebutton">Add Another</button></router-link>
        </div>
      </div>
    </div>

    <div class="btn-panel">
      <button class="alipay" type="button" @click="handleConfirmClicked()" name="button">Pay with Alipay</button>
      <button class="wechat" type="button" @click="handleConfirmClicked()" name="button">Pay with Wechat</button>
    </div>

    <el-dialog title="Pay" v-model="dialogVisible" size="tiny">
      <img src="./images/qrcode.jpg" class="qrcode"></img>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancle</el-button>
        <el-button type="primary" @click="handlePayClick()">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'checkout-orders',
  data () {
    let recipients = []
    this.$http.get(`/customerAddress/search`)
    .then(res => res.json())
    .then(json => {
      for (let i = 0; i < json.length; i++) {
        let recipient = {
          name: json[i].name,
          address: json[i].address,
          telephone: json[i].telephone,
          id: json[i].id
        }
        recipients.push(recipient)
      }
    })
    return {
      dialogVisible: false,
      recipients: recipients,
      whichRecipient: 0
    }
  },
  methods: {
    handleConfirmClicked () {
      let orderIds = this.$route.query.orderId
      for (let i = 0; i < orderIds.length; i++) {
        let orderId = orderIds[i]
        this.$http.get(`/order/changeStatus?status=0&addressId=${this.whichRecipient}&id=${orderId}`)
        .then(res => res.json())
        .then(json => {
          if (json.status === 0) {
            this.$message(json.message)
            return
          }
        })
      }
      this.dialogVisible = true
    },
    handlePayClick () {
      let orderIds = this.$route.query.orderId
      for (let i = 0; i < orderIds.length; i++) {
        let orderId = orderIds[i]
        this.$http.get(`/order/changeStatus?status=1&id=${orderId}`)
        .then(res => res.json())
        .then(json => {
          if (json.status === 0) {
            this.$message(json.message)
            return
          }
        })
      }
      this.dialogVisible = false
    }
  },
  created () {

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color1:gray;
$color2:#f5f5f5;
$color3:#0077d8;
$color4:#258bde;
.qrcode{
  width:100%;
}
.delivery-detail {
  // position: absolute;
  margin: 100px auto 28px auto;
  border: 1px solid #E4E4E4;
  position: relative;
  min-width:1000px;
  width:80%;

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
  margin-left: 28px;
  margin-bottom: 20px;
  .add-another{
    text-align: right;
    button{
      padding:10px 30px;
      border-radius:3px;
      cursor:pointer;
    }
    .bluebutton{
      background:$color4;
      border:1px solid $color4;
      color:white;
    }
  }
  .recipient-item{
    div {
      position: relative;
      p {
        display: inline-block;
        margin-top: 0px;
        margin-bottom: 0px;
        margin-left: 28px;
        width:200px;
        color:gray;
      }
      span{
      }
    }
  }

  input {
    position: absolute;
    height: 40px;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 100px;
    width: 80%;
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
  right: 172px;
  min-width:1000px;
  width: 80%;
  margin:0 auto;
  text-align:center;
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
