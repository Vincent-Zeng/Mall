<template>
  <div class="orders">
    <div class="order-header">
      <img src="./images/shop-name.png" alt="">
      <span>ORDER</span>

      <!-- <div class="search-box">
        <input type="text" placeholder="Search" @keyup.enter="searchItems"/>
      </div> -->
    </div>

    <div class="order-list">
      <div class="order" v-for="order in orders">

        <div class="order-item">
          <div class="order-img" v-for="product in order.products" >
            <img class="order-item-avatar" :src="product.url" alt="">
          </div>
          <div class="function-button">
            <div class="review-button" v-show="order.status !== 4">Review</div>
          </div>
          <div class="order-created-at">
            {{ order.createdAt }}
          </div>
        </div>

        <div class="order-detail-collapse" v-if="order.status < 1">
          <div class="order-status order-info">
            <span class="prompt">Status</span>
            <span class="value">Preparing</span>
          </div>
        </div>
        <div class="order-detail" v-if="order.status >= 1">
          <div class="order-shipment-company order-info">
            <span class="prompt">Shipment Company</span>
            <span class="value">{{ order.shipment.company }}</span>
          </div>
          <div class="order-shipment-number order-info">
            <span class="prompt">Shipment Number</span>
            <span class="value">{{ order.shipment.number }}</span>
          </div>
          <div class="order-status order-info">
            <span class="prompt">Status</span>
            <span class="value">{{ translateStatus(order.status) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pic from './images/product.png'

export default {
  name: 'orders',
  data () {
    let orders = []
    for (var i = 0; i < 10; i++) {
      orders.push({
        id: i,
        avatar: pic,
        name: 'Shop Name',
        products: [
          {
            id: i,
            url: pic,
            name: 'iPhone 7 16G Jet Black',
            price: 649.00,
            quantity: 1
          },
          {
            id: i + 1,
            url: pic,
            name: 'iPhone 7 16G Jet Black',
            price: 649.00,
            quantity: 1
          }
        ],
        status: i % 3,
        shipment: {
          company: 'EMS',
          number: 32198401741
        },
        collapse: i < 1,
        createdAt: '2016-1-1 12:00:09'
      })
    }
    return {
      orders: orders
    }
  },
  methods: {
    searchItems () {
    },
    translateStatus (status) {
      switch (status) {
        case 0:
          return 'Unpaied'
        case 1:
          return 'Preparing'
        case 2:
          return 'Shipping'
        case 3:
          return 'Received'
        case 4:
          return 'Done'
        default:
          return 'Waiting for Confirmation'
      }
    }
  },
  created () {
    let body = JSON.stringify({
      page: 1,
      count: 2000
    })
    this.$http.post('/order/search', body)
      .then((res) => res.json())
      .then((json) => {
        let orders = []
        for (var i = 0; i < json.length; i++) {
          let order = json[i]
          console.log(order)
          let products = []
          for (var j = 0; j < order.products.length; j++) {
            let product = order.products[j]
            products.push({
              id: product.productId,
              url: product.photoURL,
              price: product.price,
              quantity: product.amount
            })
          }
          orders.push({
            id: order.id,
            products: products,
            createdAt: order.createdAt,
            status: order.processStatus,
            shipment: {
              company: order.expressId,
              number: order.expressId
            }
          })
          console.log(order.processStatus)
        }
        this.orders = orders
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.orders {
  position: absolute;
  margin: 56px 0px;
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
    font-weight: bold;
    margin-left: 65px;
    height: 80px;
    line-height: 80px;
  }

  // .search-box {
  //   display: inline-block;
  //   width: 500px;
  //   text-align: right;
  //   position: absolute;
  //   right: 28px;
  //   top: 50%;
  //   transform: translateY(-50%);
  //
  //   input {
  //       background-image: url(./images/search_icon.png);
  //       background-repeat: no-repeat;
  //       background-position: 20px center;
  //       background-size: 36px 36px;
  //       width: 50%;
  //       height: 50px;
  //       border-radius: 100px;
  //       background-color: #f5f5f5;
  //       border: none;
  //       padding-left: 70px;
  //       font-size: 18px;
  //       outline: none;
  //   }
  // }
}

.order-list {
  margin-left: 28px;
  margin-right: 28px;

  .order {
    .order-item {
      height: 150px;
      position: relative;
      border-top: 1px solid #EEEEEE;
      border-bottom: 1px solid #EEEEEE;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .order-img {
        width: 100px;
        height: 100px;
        border: 1px solid #E4E4E4;
        position: relative;
        margin-right: 20px;
        img {
          display: inline-block;
          margin-right: 20px;
          max-width: 85px;
          max-height: 85px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .order-created-at {
        position: absolute;
        right: 20px;
      }
      // .order-item-order {
      //   color: #0077D8;
      //   margin-left: 50px;
      //   font-size: 18px;
      //   font-weight: normal;
      //   line-height: 88px;
      //   height: 88px;
      // }
    }

    .order-detail,
    .order-detail-collapse {
      background-color: #fafafa;
      height: 240px;

      .order-shipment-company {
        border-bottom: 1px solid #EEEEEE;
      }

      .order-shipment-number {
        border-bottom: 1px solid #EEEEEE;
      }

      .order-info {
        height: 80px;
        position: relative;
        margin-left: 27px;
        margin-right: 27px;

        .prompt {
          color: #ACACAC;
          font-size: 20px;
          height: 80px;
          line-height: 80px;
        }

        .value {
          position: absolute;
          left: 200px;
          color: #2B2B2B;
          font-size: 20px;
          height: 80px;
          line-height: 80px;
        }
      }
    }

    .order-detail-collapse {
      height: 80px;
    }
  }
}

.review-btn {
  cursor: pointer;
  background-color: white;
  border: 1px solid #0077D8;
  color: #0077D8;
  margin-right: 16px;
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

  .review-button {
    cursor: pointer;
    background-color: white;
    border: 1px solid #0077D8;
    color: #0077D8;
    margin-right: 140px;
  }
}

</style>
