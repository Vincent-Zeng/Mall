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
      <div class="owner-item" v-for="shop in shops">
        <img class="owner-item-avatar" :src="shop.avatar" alt="">
        <span class="owner-item-owner">{{ shop.owner }}</span>

        <div class="function-button">
          <div @click="suspend(shop.id)" class="suspend-button">Suspend</div>
          <div class="delete-button">Delete</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pic from './images/avatar.png'

export default {
  name: 'admin-owner',
  data () {
    let shops = []
    for (var i = 0; i < 20; i++) {
      shops.push({
        id: 1,
        avatar: pic,
        owner: 'MARY V. ROBINSON',
        name: 'Gucci Official'
      })
    }

    let isOwner = true
    return {
      shops: shops,
      isOwner: isOwner
    }
  },
  methods: {
    handleSpanClicked (type) {
      this.isOwner = type === 'owner'
    },
    searchItems () {
    },
    suspend (id) {
      console.log(id)
    }
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
  }

  .shop-span {
    margin-left: 8px;
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
