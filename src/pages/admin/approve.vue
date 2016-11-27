<template>
  <div class="admin-approve">
    <div class="approve-header">
      <img src="./images/ring.png" alt="">
      <span>New shop Owner Request</span>
    </div>

    <div class="approve-list">
      <div class="approve-shop" v-for="shop in shops">
        <img class="approve-shop-avatar" :src="shop.avatar" alt="">
        <span class="approve-word approve-shop-owner">{{ shop.owner }}</span>
        <span class="approve-word approve-shop-created">Created Shop</span>
        <span class="approve-word approve-shop-name">{{ shop.name }}</span>

        <div class="function-button">
          <div class="approve-button">Approve</div>
          <div class="reject-button">Reject</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pic from './images/avatar.png'

export default {
  name: 'admin-approve',
  data () {
    let shops = []
    for (var i = 0; i < 20; i++) {
      shops.push({
        avatar: pic,
        owner: 'MARY V. ROBINSON',
        name: 'Gucci Official'
      })
    }

    return {
      shops: shops
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.admin-approve {
  position: absolute;
  margin: 56px 0px;
  left: 172px;
  right: 172px;
  border: 1px solid #E4E4E4;
}

.approve-header {
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
}

.approve-list {
  margin-left: 28px;
  margin-right: 28px;

  .approve-shop {
    height: 88px;
    position: relative;
    border-top: 1px solid #EEEEEE;

    .approve-shop-avatar {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .approve-word {
      font-size: 18px;
      font-weight: normal;
      line-height: 88px;
      height: 88px;
    }

    .approve-shop-owner {
      color: #0077D8;
      margin-left: 50px;
    }

    .approve-shop-created {
      color: #ACACAC;
      margin-left: 10px;
    }

    .approve-shop-name {
      color: #2B2B2B;
      font-weight: bold;
      margin-left: 10px;
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

      .approve-button {
        background-color: #0077D8;
        color: white;
        margin-right: 16px;
        cursor: pointer;
      }

      .reject-button {
        background-color: white;
        border: 1px solid #0077D8;
        color: #0077D8;
        cursor: pointer;
      }
    }
  }
}

</style>
