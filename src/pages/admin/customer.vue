<template>
  <div class="admin-customer">
    <div class="customer-header">
      <!-- <img src="./images/customer.png" alt=""> -->
      <img src="./images/ring.png" alt="">
      <span>Customers</span>

      <div class="search-box">
        <input type="text" placeholder="Search" @keyup.enter="searchItems"/>
      </div>
    </div>

    <div class="customer-list">
      <div class="customer-item" v-for="customer in customers">
        <img class="customer-item-avatar" :src="customer.avatar" alt="">
        <span class="customer-item-customer">{{ customer.name }}</span>
        <div class="function-button" >
          <div @click="suspendCustomer(customer.id)" class="suspend-button">Suspend</div>
          <div @click="deleteCustomer(customer.id)" class="delete-button">Delete</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pic from './images/avatar.png'

export default {
  name: 'admin-customer',
  data () {
    let customers = []
    for (var i = 0; i < 10; i++) {
      customers.push({
        id: i,
        avatar: pic,
        name: 'Shop Name'
      })
    }
    return {
      customers: customers
    }
  },
  methods: {
    searchItems () {
    },
    suspendCustomer (id) {
    },
    deleteCustomer (id) {
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.admin-customer {
  position: absolute;
  margin: 56px 0px;
  left: 172px;
  right: 172px;
  border: 1px solid #E4E4E4;
}

.customer-header {
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

  .customer-span {
    margin-left: 65px;
    cursor:pointer;
  }

  .shop-span {
    margin-left: 8px;
    cursor:pointer;
  }

  .highlight-span {
    color: #2B2B2B;
  }

  .normal-span {
    color: #ACACAC;
  }

  .search-box {
    display: inline-block;
    width: 500px;
    text-align: right;
    position: absolute;
    right: 28px;
    top: 50%;
    transform: translateY(-50%);

    input {
        background-image: url(./images/search_icon.png);
        background-repeat: no-repeat;
        background-position: 20px center;
        background-size: 36px 36px;
        width: 50%;
        height: 50px;
        border-radius: 100px;
        background-color: #f5f5f5;
        border: none;
        padding-left: 70px;
        font-size: 18px;
        outline: none;
    }
  }
}

.customer-list {
  margin-left: 28px;
  margin-right: 28px;

  .customer-item {
    height: 88px;
    position: relative;
    border-top: 1px solid #EEEEEE;

    .customer-item-avatar {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .customer-item-customer {
      color: #0077D8;
      margin-left: 50px;
      font-size: 18px;
      font-weight: normal;
      line-height: 88px;
      height: 88px;
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
    }
  }
}

</style>
