<template>
  <div class="admin-owner">
    <div class="owner-header">
      <img src="./images/owner.png" alt="">
      <span @click="handleSpanClicked('owner')" class="owner-span" v-bind:class="{ 'highlight-span': isOwner, 'normal-span': !isOwner }">Owner</span>
      <span @click="handleSpanClicked('shop')" class="shop-span" v-bind:class="{ 'highlight-span': !isOwner, 'normal-span': isOwner }">Shop</span>

      <div class="search-box">
        <input type="text" placeholder="Search" @keyup.enter="searchItems"/>
      </div>
    </div>

    <div class="owner-list">
      <div class="owner-item" v-for="shop in shops" v-show="!isOwner">
        <router-link :to="{path:'/admin/navigation/shopdetail'}" >
          <img class="owner-item-avatar" :src="shop.avatar" alt="">
          <span class="owner-item-owner">{{ shop.name }}</span>
        </router-link>
        <div class="function-button" >
          <div @click="changeStatus(shop, 0, 1)" class="suspend-button">{{shop.status === 0 ? "Suspend" : "nomalize"}}</div>
          <div @click="changeStatus(shop, 1, 1)" class="delete-button">{{shop.status !== 2 ? "Delete" : "resume"}}</div>
        </div>
      </div>
    </div>

    <div class="owner-list">
      <div class="owner-item" v-for="owner in owners" v-show="isOwner">
        <span class="owner-item-owner">{{ owner.name }}</span>

        <div class="function-button">
          <div @click="changeStatus(owner, 0, 0)" class="suspend-button" >{{owner.status === 0? "suspend" : "normalize"}}</div>
          <div @click="changeStatus(owner, 1, 0)" class="delete-button" >{{owner.status !== 2? "delete" : "resume"}}</div>
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
    let isOwner = true
    return {
      shops: [],
      owners: [],
      isOwner: isOwner
    }
  },
  methods: {
    handleSpanClicked (type) {
      this.isOwner = type === 'owner'
    },
    searchItems () {
    },
    changeStatus (item, whichbutton, whichsection) {
      var newStatus = item.status
      if (whichsection === 0) {
        if (whichbutton === 0) {
          newStatus = item.status === 0 ? 1 : 0
        } else {
          newStatus = item.status === 2 ? 0 : 2
        }
        this.$http.post(`/owner/update`, {
          'status': newStatus,
          'email': item.email,
          'name': item.name,
          'password': item.password,
          'isEmailVerified': item.isEmailVerified
        })
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 1) {
            item.status = newStatus
          } else {
            window.alert(item.message)
          }
        })
      } else {
        if (whichbutton === 0) {
          newStatus = item.status === 0 ? 1 : 0
        } else {
          newStatus = item.status === 2 ? 0 : 2
        }
        this.$http.get(`/shop/changeStatus?status=${newStatus}&id=${item.id}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 1) {
            item.status = newStatus
          } else {
            window.alert(item.message)
          }
        })
      }
    }
  },
  created () {
    Vue.http.get('/shop/searchAll?page=1&count=10').then((response) => {
      let shops = this.shops
      response.json().then(function (data) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
               response.status)
          return
        }
        for (let i = 0; i < data.length; i++) {
          const shop = data[i]
          shops.push({
            id: shop.id,
            status: shop.status,
            avatar: shop.idPhotoUrl,
            owner: shop.contact,
            name: shop.name,
            show: true
          })
        }
      })
      this.shops = shops
    }, (response) => {
      console.log('Looks like there was a problem. Status Code: ' +
           response.status)
    })

    Vue.http.get('/owner/getAllOwner?page=1&pageNum=10').then((response) => {
      let owners = this.owners
      response.json().then(function (data) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
               response.status)
          return
        }
        for (let i = 0; i < data.length; i++) {
          const owner = data[i]
          owners.push({
            id: owner.id,
            name: owner.name,
            email: owner.email,
            status: owner.status,
            password: owner.password,
            isEmailVerified: owner.isEmailVerified
          })
        }
      })
      this.owners = owners
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
  }

  .owner-span {
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
