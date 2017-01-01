<template>
  <div>
    <div class="search-box">
      <input type="text" placeholder="Enter Order Id to search" v-model="keyword" @keyup.enter="searchProducts()"/>
    </div>
    <div class="owner-order-list">
      <div class="owner-header">
        <img src="./images/products.png" alt="">
        <span>Orders</span>
        <el-dropdown @command="handleCommand" class="dropDownMenu">
          <span class="el-dropdown-link" hide-on-click>
            {{dropDownMenu}} <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="history" disabled>history</el-dropdown-item>
            <el-dropdown-item command="Daily">&nbsp&nbspDaily</el-dropdown-item>
            <el-dropdown-item command="Weekly">&nbsp&nbspWeekly</el-dropdown-item>
            <el-dropdown-item command="Monthly">&nbsp&nbspMonthly</el-dropdown-item>
            <el-dropdown-item command="Yearly">&nbsp&nbspYearly</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="date-picker" v-show="menuId !== -1">
          <el-date-picker v-model="timetemp.time0" @change="handleTimeChangeClick0" type="date" v-show="dateType==='date'" placeholder="Select Time"></el-date-picker>
          <el-date-picker v-model="timetemp.time1" @change="handleTimeChangeClick1" type="week" v-show="dateType==='week'" placeholder="Select Time" :picker-options="pickerOptions0"></el-date-picker>
          <el-date-picker v-model="timetemp.time2" @change="handleTimeChangeClick2" type="month" v-show="dateType==='month'" placeholder="Select Time"></el-date-picker>
          <el-date-picker v-model="timetemp.time3" @change="handleTimeChangeClick3" type="year" v-show="dateType==='year'" placeholder="Select Time"></el-date-picker>
          <button class="bluebutton" @click="handleSearchByTimeClick()">Search</button>
        </div>
      </div>
      <div class="order-list" v-for="order in orders" >
        <foldinglist class="order-item" v-show="order.show">
          <div slot="summary">
            <span  class="order-item-name">Created by {{ order.customerName }} At {{ order.createdAt }}</span>
          </div>
          <div slot="detail" class="detail">
            <div class="order-item-detail">
              <div class="detail-products-list">
                <div v-for="product in order.products" class="detail-product" >
                  <img :src="product.photoURL" />
                  <div>
                    <p>{{product.name}}</p>
                    <p>Amount: {{product.amount}}</p>
                    <p>Total: $ {{product.price}}</p>
                  </div>
                </div>
              </div>
              <div class="detail-order-info">
                <p>
                  <span>Order Id</span>
                  <span>{{order.id}}</span>
                </p>
                <p>
                  <span>Customer Email</span>
                  <span>{{order.customerEmail}}</span>
                </p>
                <p>
                  <span>Amount</span>
                  <span>{{order.amount}}</span>
                </p>
                <p>
                  <span>Total</span>
                  <span>$ {{order.price}}</span>
                </p>
                <p v-show="menuId !== 2 && menuId !== 3 && menuId !== 4 && menuId !== 5">
                  <span>Status</span>
                  <span>{{order.processStatusMes}}</span>
                </p>
                <p>
                  <span>Recipient Name</span>
                  <span>{{order.customerName}}</span>
                </p>
                <p>
                  <span>Recipient Address</span>
                  <span>{{order.address}}</span>
                </p>
                <p>
                  <span>Recipient Telephone</span>
                  <span>{{order.telephone}}</span>
                </p>
                <p>
                  <span>Express Company</span>
                  <span>{{order.expressCompany}}</span>
                </p>
                <p>
                  <span>Express Number</span>
                  <span>{{order.number}}</span>
                </p>
              </div>
            </div>
          </div>
        </foldinglist>
      </div>
    </div>

  </div>
</template>
<script>
  import foldinglist from './components/folding_list'
  export default {
    name: 'owner-order',
    data () {
      return {
        orders: [],
        dropDownMenu: 'Daily',
        menuId: 2,
        dateType: 'date',
        time0: '',
        time1: '',
        time2: '',
        time3: '',
        timetemp: {
          time0: '',
          time1: '',
          time2: '',
          time3: ''
        },
        pickerOptions0: {
          firstDayOfWeek: 1
        },
        keyword: ''
      }
    },
    mounted () {
    },
    created () {
      let orders = []
      this.$http.post(`/order/listByTime?`, {
        id: 0,
        page: 1,
        count: 10
      })
      .then((res) => res.json())
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          let expressCompany
          switch (json[i].expressId) {
            case 1:
              expressCompany = 'Yunda Express'
              break
            case 2:
              expressCompany = 'Yuantong Express'
              break
            case 3:
              expressCompany = 'SF Express'
              break
            case 4:
              expressCompany = 'EMS'
              break
            case 5:
              expressCompany = 'STO Express'
              break
            default:
              console.log(json[i].expressId)
          }
          let order = {
            id: json[i].id,
            customerName: json[i].customerName === '' ? 'Anonym' : json[i].customerName,
            customerEmail: json[i].customerEmail,
            amount: json[i].amount,
            address: json[i].address,
            telephone: json[i].telephone,
            expressId: json[i].expressId,
            expressCompany: expressCompany,
            products: json[i].products,
            number: json[i].number,
            price: json[i].price,
            createdAt: json[i].createdAt,
            status: 1,
            show: true
          }
          orders.push(order)
        }
      })
      this.orders = orders
    },
    components: {
      foldinglist: foldinglist
    },
    methods: {
      searchProducts () {
        this.menuId = -1
        this.dropDownMenu = ''
        let orders = []
        this.$http.get(`/order/getById?id=${this.keyword}`)
        .then(res => res.json())
        .then(json => {
          if (json.id === null) {
            return
          }
          let expressCompany
          switch (json.expressId) {
            case 1:
              expressCompany = 'Yunda Express'
              break
            case 2:
              expressCompany = 'Yuantong Express'
              break
            case 3:
              expressCompany = 'SF Express'
              break
            case 4:
              expressCompany = 'EMS'
              break
            case 5:
              expressCompany = 'STO Express'
              break
            default:
              console.log(json.expressId)
          }
          let processStatusMes = ''
          switch (json.processStatus) {
            case -1:
              processStatusMes = 'Unconfirmed'
              break
            case 0:
              processStatusMes = 'Unpaid'
              break
            case 1:
              processStatusMes = 'Processing Order'
              break
            case 2:
              processStatusMes = 'Preparing for shipment'
              break
            case 3:
              processStatusMes = 'Shipped'
              break
            case 4:
              processStatusMes = 'Complete'
              break
            default:
              console.log(json.processStatus)
          }
          let order = {
            id: json.id,
            customerName: json.customerName === null ? 'Anonym' : json.customerName,
            customerEmail: json.customerEmail,
            amount: json.amount,
            address: json.address,
            telephone: json.telephone,
            expressId: json.expressId,
            expressCompany: expressCompany,
            products: json.products,
            number: json.number,
            price: json.price,
            createdAt: json.createdAt,
            status: json.processStatus,
            show: true,
            processStatusMes: processStatusMes
          }
          orders.push(order)
        })
        this.orders = orders
      },
      handleCommand (command) {
        // 下拉菜单名称更改
        this.dropDownMenu = command
        switch (command) {
          case 'Daily':
            this.menuId = 2
            this.dateType = 'date'
            this.timetemp = {
              time0: '',
              time1: '',
              time2: '',
              time3: ''
            }
            break
          case 'Weekly':
            this.menuId = 3
            this.dateType = 'week'
            this.timetemp = {
              time0: '',
              time1: '',
              time2: '',
              time3: ''
            }
            break
          case 'Monthly':
            this.menuId = 4
            this.dateType = 'month'
            this.timetemp = {
              time0: '',
              time1: '',
              time2: '',
              time3: ''
            }
            break
          case 'Yearly':
            this.menuId = 5
            this.dateType = 'year'
            this.timetemp = {
              time0: '',
              time1: '',
              time2: '',
              time3: ''
            }
            break
          default:
            break
        }
        // 请求不同的下拉菜单项下的数据 start
        let id = 0
        switch (this.menuId) {
          case 2:
            id = 0
            break
          case 3:
            id = 1
            break
          case 4:
            id = 2
            break
          case 5:
            id = 3
            break
          default:
            console.log(this.menuId)
        }
        let orders = []
        this.$http.post(`/order/listByTime`, {
          id: id,
          page: 1,
          count: 10
        })
        .then((res) => res.json())
        .then((json) => {
          for (let i = 0; i < json.length; i++) {
            let expressCompany
            switch (json[i].expressId) {
              case 1:
                expressCompany = 'Yunda Express'
                break
              case 2:
                expressCompany = 'Yuantong Express'
                break
              case 3:
                expressCompany = 'SF Express'
                break
              case 4:
                expressCompany = 'EMS'
                break
              case 5:
                expressCompany = 'STO Express'
                break
              default:
                console.log(json[i].expressId)
            }
            let order = {
              id: json[i].id,
              customerName: json[i].customerName === '' ? 'Anonym' : json[i].customerName,
              customerEmail: json[i].customerEmail,
              amount: json[i].amount,
              address: json[i].address,
              telephone: json[i].telephone,
              expressId: json[i].expressId,
              expressCompany: expressCompany,
              products: json[i].products,
              number: json[i].number,
              price: json[i].price,
              createdAt: json[i].createdAt,
              status: json[i].processStatus,
              show: true
            }
            orders.push(order)
          }
        })
        this.orders = orders
        // 请求不同的下拉菜单项下的数据 end
      },
      handleSearchByTimeClick () {
        let id = 0
        let year = null
        let month = null
        let week = null
        let day = null
        switch (this.menuId) {
          case 2:
            id = 0
            break
          case 3:
            id = 1
            break
          case 4:
            id = 2
            break
          case 5:
            id = 3
            break
          default:
            console.log(this.menuId)
        }
        if (id === 0) {
          year = this.time0.substring(0, this.time0.indexOf('-'))
          let temp = this.time0.substring(this.time0.indexOf('-') + 1)
          month = temp.substring(0, temp.indexOf('-'))
          day = temp.substring(temp.indexOf('-') + 1)
        } else if (id === 1) {
          year = this.time1.substring(0, this.time1.indexOf('w'))
          week = this.time1.substring(this.time1.indexOf('w') + 1)
        } else if (id === 2) {
          year = this.time2.substring(0, this.time2.indexOf('-'))
          month = this.time2.substring(this.time2.indexOf('-') + 1)
        } else {
          year = this.time3
        }
        let orders = []
        this.$http.post(`/order/listByTime`, {
          id: id,
          day: day,
          week: week,
          month: month,
          year: year,
          page: 1,
          count: 10
        })
        .then((res) => res.json())
        .then((json) => {
          for (let i = 0; i < json.length; i++) {
            let expressCompany
            switch (json[i].expressId) {
              case 1:
                expressCompany = 'Yunda Express'
                break
              case 2:
                expressCompany = 'Yuantong Express'
                break
              case 3:
                expressCompany = 'SF Express'
                break
              case 4:
                expressCompany = 'EMS'
                break
              case 5:
                expressCompany = 'STO Express'
                break
              default:
                console.log(json[i].expressId)
            }
            let order = {
              id: json[i].id,
              customerName: json[i].customerName === '' ? 'Anonym' : json[i].customerName,
              customerEmail: json[i].customerEmail,
              amount: json[i].amount,
              address: json[i].address,
              telephone: json[i].telephone,
              expressId: json[i].expressId,
              expressCompany: expressCompany,
              products: json[i].products,
              number: json[i].number,
              price: json[i].price,
              createdAt: json[i].createdAt,
              status: json[i].processStatus,
              show: true
            }
            orders.push(order)
          }
        })
        this.orders = orders
      },
      handleTimeChangeClick0 (time) {
        this.time0 = time
      },
      handleTimeChangeClick1 (time) {
        this.time1 = time
      },
      handleTimeChangeClick2 (time) {
        this.time2 = time
      },
      handleTimeChangeClick3 (time) {
        this.time3 = time
      }
    }
  }
</script>
<style lang="scss" scoped>
$color1:gray;
$color2:#f5f5f5;
$color3:#0077d8;
$color4:#258bde;

.search-box {
  margin:40px 70px 25px 172px;
  min-width:800px;
  width:70%;
  input {
    width: 100%;
    background-image: url(./images/search_icon.png);
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 36px 36px;
    height: 50px;
    border-radius: 100px;
    background-color: $color2;
    border: none;
    padding-left: 70px;
    font-size: 20px;
    outline: none;
  }
}

.owner-order-list {
  position: absolute;
  margin: 10px 0px 28px 172px;
  min-width:800px;
  width:80%;
  border: 1px solid #E4E4E4;
  .owner-header {
    position: relative;

    .date-picker{
      display: inline-block;
      float:right;
      line-height:80px;
      .bluebutton{
        margin-left:20px;
        padding:10px 20px;
        border-radius:3px;
        cursor:pointer;
        background:$color4;
        border:1px solid $color4;
        color:white;
      }
    }

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

    .dropDownMenu{
      float:right;
      margin-right:30px;
      .el-dropdown-link{
        cursor: pointer;
      }
    }
  }
  .order-list {
    margin-left: 28px;
    margin-right: 28px;
    .detail{
      padding:20px;
      padding-bottom:0;
      background:#eee;
      .order-item-detail{
        .detail-products-list{
          .detail-product{
            width:200px;
            border:1px solid lightgray;
            background:white;
            display:inline-block;
            vertical-align: middle;
            text-align:center;
            height: 300px;
            img{
              height:140px;
              max-width:80%;
              padding:20px 0;
            }
            div{
              p{
                margin:0 auto;
                text-align:center;
                width:100px;
                color:red;
              }
              padding-bottom:20px;
            }
          }
        }
        .detail-order-info{
          p:last-child{
            border-bottom:none;
          }
          p{
            border-bottom:1px solid lightgray;
            padding-bottom:16px;
            span:first-child,label{
              padding-left:20px;
              color:gray;
              display:inline-block;
              width:200px;
            }
            input {
              border:1px solid lightgray;
              width:200px;
              height:30px;
              padding:0 10px;
              outline: none;
            }
            button {
              float:right;
            }
            .bluebutton{
              padding:6px 20px;
              border-radius:3px;
              cursor:pointer;
              background:$color4;
              border:1px solid $color4;
              color:white;
            }
          }
        }
      }
    }
    .order-item {
      position: relative;
      border-top: 1px solid #EEEEEE;

      .order-item-name {
        color: #2B2B2B;
        font-size: 18px;
        font-weight: normal;
        margin-left: 4px;
      }

      .function-button {
        float: right;
        margin-top: -8px;
        .suspend-button {
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
        div {
          width: 114px;
          height: 42px;
          display: inline-block;
          line-height: 42px;
          text-align: center;
          border-radius: 4px;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
