<template>
  <div class="admin-owner">
    <div class="owner-header">
      <img src="./images/owner.png" alt="">
      <span>Customer</span>

      <div class="search-box">
        <input type="text" placeholder="Search" @keyup.enter="searchItems()" v-model="searchkey" />
      </div>
    </div>

    <div class="owner-list">
      <div class="owner-item" v-for="customer in customers">
        <router-link :to="{path:'/admin/navigation/customer_detail'}" >
          <span class="owner-item-owner">{{ customer.name }}</span>
        </router-link>
        <div class="function-button" >
          <div @click="changeStatus(customer, 0)" class="suspend-button">{{customer.status === 0 ? "Suspend" : "nomalize"}}</div>
          <div @click="changeStatus(customer, 1)" class="delete-button">{{customer.status !== 2 ? "Delete" : "resume"}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'admin-owner',
  data () {
    return {
      customers: [],
      searchkey: null
    }
  },
  methods: {
    searchItems () {
      Vue.http.post('/adminCustomer/searchCustomer', {
        'email': null,
        'status': null,
        'keyWord': this.searchkey,
        'telephone': null
      }).then((response) => {
        var customers = []
        console.log(customers)
        response.json().then(function (data) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                 response.status)
            return
          }
          for (let i = 0; i < data.length; i++) {
            const customer = data[i]
            customers.push({
              id: customer.id,
              status: customer.status,
              email: customer.email,
              telephone: customer.telephone,
              name: customer.name,
              password: customer.password,
              is_email_verified: customer.is_email_verified
            })
          }
        })
        this.customers = customers
        console.log(customers)
      }, (response) => {
        console.log('Looks like there was a problem. Status Code: ' +
             response.status)
      })
    },
    changeStatus (item, whichbutton) {
      var newStatus = item.status
      if (whichbutton === 0) {
        newStatus = item.status === 0 ? 1 : 0
      } else {
        newStatus = item.status === 2 ? 0 : 2
      }
      if (newStatus === 0) {
        this.$http.get(`/adminCustomer/whitelist?id=${item.id}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 1) {
            item.status = newStatus
          } else {
            window.alert(json.message)
          }
        })
      }
      if (newStatus === 1) {
        this.$http.get(`/adminCustomer/blacklist?id=${item.id}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 1) {
            item.status = newStatus
          } else {
            window.alert(json.message)
          }
        })
      }
      if (newStatus === 2) {
        this.$http.get(`/adminCustomer/delete?id=${item.id}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 1) {
            item.status = newStatus
          } else {
            window.alert(json.message)
          }
        })
      }
    }
  },
  created () {
    Vue.http.post('/adminCustomer/searchCustomer', {
      'email': null,
      'status': null,
      'keyWord': null,
      'telephone': null
    }).then((response) => {
      var customers = this.customers
      console.log(customers)
      response.json().then(function (data) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
               response.status)
          return
        }
        for (let i = 0; i < data.length; i++) {
          const customer = data[i]
          customers.push({
            id: customer.id,
            status: customer.status,
            email: customer.email,
            telephone: customer.telephone,
            name: customer.name,
            password: customer.password,
            is_email_verified: customer.is_email_verified
          })
        }
      })
      this.customers = customers
      console.log(customers)
    }, (response) => {
      console.log('Looks like there was a problem. Status Code: ' +
           response.status)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.admin-owner {
  min-width:1000px;
  width:80%;
  position: absolute;
  margin: 56px 0px;
  left: 172px;
  right: 172px;
  border: 1px solid #E4E4E4;
}

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
    margin-left: 65px;
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

.owner-list {
  margin-left: 28px;
  margin-right: 28px;

  .owner-item {
    height: 88px;
    position: relative;
    border-top: 1px solid #EEEEEE;

    .owner-item-avatar {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .owner-item-owner {
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
