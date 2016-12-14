<template>
  <div class="cart">
    <div class="cart-item" v-for="item in items">

      <div class="cart-item-image">
        <img :src="item.url" alt="">
      </div>
      <div class="cart-item-info">
        <p class="cart-item-name">{{ item.name }}</p>
        <p class="cart-item-price">HK $ {{ item.price }}</p>
      </div>

      <div class="function-btn">
        <div class="quantity-control-btn">
          <span @click="reduceItem(item.id)">-</span>
          <span class="quantity-label">{{ item.quantity }}</span>
          <span @click="increaseItem(item.id)">+</span>
        </div>
        <p class="delete-btn" @click="removeItem(item.id)">Delete</p>
      </div>
    </div>
  </div>
</template>

<script>
// import router from '../../routes'
import pic from './images/product.png'

export default {
  name: 'cart',
  data () {
    let items = []
    for (var i = 0; i < 10; i++) {
      items.push({
        id: i,
        url: pic,
        name: 'iPhone 7 16G Jet Black',
        price: '649.00',
        quantity: 1
      })
    }
    return {
      items: items
    }
  },
  methods: {
    reduceItem (id) {
      let item = this.items[id]
      if (item.quantity <= 0) {
        return
      }
      item.quantity -= 1
    },
    increaseItem (id) {
      let item = this.items[id]
      item.quantity += 1
    },
    removeItem (id) {
      console.log(id)
      this.items = this.items.filter((item) => {
        return item.id !== id
      })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.cart {
  // border: 1px solid #E4E4E4;
  margin: 50px 100px;

  .cart-item {
    display: inline-block;
    margin: 30px;
    height: 112px;
    width: 444px;
    border: 1px solid #E4E4E4;
    border-radius: 4px;
    border-color: #D7D7D7;
    position: relative;

    .cart-item-image {
      width: 80px;
      height: 80px;
      overflow: hidden;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 14px;

      img {
        display: block;
        vertical-align: middle;
      }
    }

    .cart-item-info {
      margin-left: 110px;
      display: inline-block;

      .cart-item-name {
        font-size: 15px;
        width: 120px;
        margin-bottom: 0px;
        margin-top: 23px;
      }

      .cart-item-price {
        color: #FF3F13;
        font-size: 14px;
        margin-top: 7px;
      }
    }

    .function-btn {
      position: absolute;
      right: 27px;
      top: 23px;
      bottom: 23px;

      .quantity-control-btn {
        border: 1px solid #D7D7D7;
        border-radius: 16px;;
        width: 110px;
        height: 32px;
        box-sizing: border-box;

        span {
          display: inline-block;
          height: 32px;
          width: 33px;
          line-height: 32px;
          text-align: center;
          font-size: 25px;
        }

        span:first-child {
          line-height: 20px;
          transform: translateY(-3px);
          cursor: pointer;
        }

        span:nth-child(2) {
          font-size: 16px;
          font-weight: bold;
          transform: translateY(-2px);
        }

        span:last-child {
          cursor: pointer;
        }
      }

      .delete-btn {
        text-align: right;
        cursor: pointer;
        color: #ACACAC;
        font-size: 14px;
      }
    }
  }
}

</style>
