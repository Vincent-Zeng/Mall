<template>
  <div class="user-panel">
    <div class="user-info">
      <div>
        <div class="info-left">
           <span>{{userInfo.name}}</span>
        </div><div class="info-right">
            <span>HK ${{userInfo.balance}}</span>
            <span>BALANCE</span>
        </div>
      </div>
    </div>
    <div class="recharge-panel">
      <button class="whitebutton" @click="dialogVisible = true">Recharge</button>
    </div>

    <div class="recipient-list">
      <div class="owner-header">
        <img src="./images/products.png" alt="">
        <span>Recipients</span>
      </div>
      <div class="recipient-item">
        <div v-for="(recipient,index) in recipients" class='recipient-item' v-show="recipient.show">
          <div class="recipient-title">
            <div class="title-info">
              Address {{index+1}}
            </div><div class="function-button">
              <!-- <button class="bluebutton" v-show="!editable" @click="handleEditClicked()">Edit</button> -->
              <button class="whitebutton" @click="handleDeleteClicked(recipient)">Delete</button>
              <!-- <button class="bluebutton" v-show="editable" @click="handleSaveClicked()">Save</button> -->
              <!-- <button class="whitebutton" v-show="editable" @click="handleCancelClicked()">Cancel</button> -->
            </div>
          </div>
          <div class="name">
            <p>Name</p>
            <span v-text="recipient.name" v-show="!editable"></span>
          </div>
          <div class="address">
            <p>Address</p>
            <span v-text="recipient.address" v-show="!editable"></span>
          </div>
          <div class="phone">
            <p>Phone</p>
            <span v-text="recipient.telephone" v-show="!editable"></span>
          </div>
        </div>
        <div class="button-wrap">
          <button @click="addRecipientBox=true;" class="bluebutton">Add</button>
        </div>
      </div>
    </div>

    <el-dialog title="Recharge" v-model="addRecipientBox" size="small" class="recharge-box">
      <p>
        <label>Name</label>
        <input class="rechargeValue" v-model="newRecipient.name" />
      </p>
      <p>
        <label >Telephone</label>
        <input class="rechargeValue" v-model="newRecipient.telephone" />
      </p>
      <p>
        <label>Address</label>
        <input v-model="newRecipient.address" class="rechargeValue" />
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRecipientBox=false">Cancel</el-button>
        <el-button type="primary" @click="handleAddRecipientClick()">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Recharge" v-model="dialogVisible" size="tiny" class="recharge-box">
      <p>
        <label>Card Id</label>
        <input class="rechargeValue" />
      </p>
      <p>
        <label >Password</label>
        <input type="password" class="rechargeValue" />
      </p>
      <p>
        <label>HK $</label>
        <input v-model="rechargeValue" class="rechargeValue" />
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleRechargeConfirmClick()">Confirm</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  export default {
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
            id: json[i].id,
            show: true
          }
          recipients.push(recipient)
        }
      })
      return {
        userInfo: {
          name: '',
          balance: ''
        },
        dialogVisible: false,
        rechargeValue: null,
        recipients: recipients,
        editable: false,
        addRecipientBox: false,
        newRecipient: {
          name: null,
          address: null,
          telephone: null
        }
      }
    },
    methods: {
      handleAddRecipientClick () {
        this.$http.post(`/customerAddress/add`, this.newRecipient)
        .then(res => res.json())
        .then(json => {
          if (json.status === 1) {
            this.addRecipientBox = false
            window.location.reload()
          } else {
            this.$message('failed')
          }
        })
      },
      handleRechargeClick () {

      },
      handleDeleteClicked (item) {
        this.$http.get(`/customerAddress/delete?id=${item.id}`)
        .then(res => res.json())
        .then(json => {
          if (json.status === 1) {
            item.show = false
          } else {
            this.$message(json.message)
          }
        })
      },
      handleRechargeConfirmClick () {
        this.$http.get(`/adminCustomer/updateBalance?balance=${this.rechargeValue}`)
        .then(res => res.json())
        .then(json => {
          if (json.status === 1) {
            this.dialogVisible = false
            this.userInfo.balance = Number.parseInt(this.userInfo.balance) + Number.parseInt(this.rechargeValue)
          } else {
            this.$message(json.message)
          }
        })
      }
    },
    created () {
      this.$http.get(`/customer/info`)
      .then(res => res.json())
      .then(json => {
        let userInfo = {
          name: json.name,
          balance: json.balance
        }
        this.userInfo = userInfo
      })
    }
  }
</script>
<style lang="scss" scoped>
$color1:gray;
$color2:#f5f5f5;
$color3:#0077d8;
$color4:#258bde;
  .user-panel{
    min-width:800px;
    width:80%;
    margin:0 auto;
    .recharge-panel{
      margin-top:20px;
      width:100%;
      box-sizing: border-box;
      position: relative;
      text-align:right;
      .whitebutton{
        display: inline-block;
        background: white;
        border:1px solid $color4;
        padding:10px 20px;
        font-size:10px;
        border-radius: 3px;
      }
    }
    .recipient-list{
      margin-top:20px;
      width:100%;
      box-sizing: border-box;
      border:1px solid #eee;
      border-radius: 4px;
      position: relative;
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
          margin-left:80px;
        }
      }
      .recipient-item {
        margin-left:28px;
        padding-bottom:20px;
        border-bottom:1px solid #eee;
        input{
          height:30px;
          width:200px;
          margin-bottom:10px;
          border:1px solid #eee;
          border-radius:4px;
          padding-left:10px;
        }
        .button-wrap{
          margin:20px 0;
          text-align:right;
          button{
            padding:10px 30px;
            border-radius:3px;
            cursor:pointer;
            margin-right:30px;
          }
          .bluebutton{
            background:$color4;
            border:1px solid $color4;
            color:white;
          }
        }
      }
    }
    .user-info{
      width:100%;
      padding:20px;
      box-sizing: border-box;
      border:1px solid #eee;
      border-radius: 4px;
      position: relative;
      .info-left{
        display:inline-block;
        width:50%;
        span{
          padding-left:30px;
          line-height:80px;
          font-size: 30px;
        }
      }

      .info-right{
        display: inline-block;
        width:50%;
        text-align: right;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        right:20px;
        span:first-child{
          display: block;
          font-size: 20px;
          color:red;
        }
        span:last-child{
          display: block;
          font-size:12px;
          color:gray;
        }
      }
    }
  }
  .recharge-box{
    label{
      display:inline-block;
      width:30%;
    }
    .rechargeValue{
      margin:10px 0;
      width:67%;
      height:30px;
      padding-left:10px;
      box-sizing:border-box;
    }
  }


  .recipient-item{
    margin-bottom:20px;
    div {
      position: relative;
      .recipient-title {
        .title-info{
          display:inline-block;
          width:50%;
        }
        .function-button{
          display:inline-block;
          width:50%;
          text-align:right;
          button{
            padding:10px 30px;
            border-radius:3px;
            cursor:pointer;
            margin-right:30px;
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
</style>
