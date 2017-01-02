<template>
  <div class="owner-shop">

    <div class="owner-panel">
      <div class="owner-panel-info">
        <div class="owner-panel-info-left">
          <img src="./images/avatar.png" alt="">
          <div class="owner-name">{{ ownerName }}</div>
        </div>
        <div class="owner-panel-info-right">
          <div class="owner-panel-income">
            <p class="normal">{{ products }}</p>
            <p class="prompt">PRODUCTS</p>
          </div>
          <div class="owner-panel-sales">
            <p class="normal">{{ sales }}</p>
            <p class="prompt">SALES</p>
          </div>
          <div class="owner-panel-products">
            <p class="dollar">HK$ {{ income }}</p>
            <p class="prompt">INCOME</p>
          </div>
        </div>
      </div>
      <div class="owner-shop">
        <span>Own</span>
        <span>{{ shopName }}</span>
        <div class="function-button">
          <div @click="suspend(shop.id)" class="suspend-button">Suspend</div>
          <div class="delete-button">Delete</div>
        </div>
      </div>
    </div>

    <div class="info-panel">
      <div class="info-header">
        <img src="./images/products.png" alt="">
        <span>Products</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'owner-shop',
  data () {
    return {
      products: 0,
      sales: 0,
      income: 0,
      ownerName: 'Helen Crawford',
      shopName: 'BestBuy Digital Shop'
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.owner-panel {
  position: absolute;
  margin: 56px 0px 28px 0px;
  left: 172px;
  right: 172px;
  border: 1px solid #E4E4E4;
  height: 260px;
  min-width:1000px;
  width:80%;
  box-shadow: 0px 4px 14px rgba(121, 121, 121, 0.1);

  .owner-panel-info {
    height: 120px;
    margin: 28px;

    .owner-panel-info-left {
      display: inline-block;
      position: relative;
      img {
        width: 120px;
        height: 120px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      .owner-name {
        display: inline-block;
        height: 120px;
        line-height: 120px;
        font-size: 30px;
        color: #2B2B2B;
        margin-left: 136px;
      }
    }

    .owner-panel-info-right {
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;
      height: 120px;

      div {
        display: inline-block;
        margin: auto 28px;

        p {
          text-align: center;
          margin: 0px;
        }

        .normal {
          font-size: 40px;
          font-weight: lighter;
          color: #0077D8;
        }

        .dollar {
          font-size: 40px;
          font-weight: lighter;
          color: #FF3F13;
        }

        .prompt {
          color: #ACACAC;
          font-size: 18px;
        }
      }
    }
  }

  .owner-shop {
    height: 82px;
    line-height: 82px;
    padding-left: 28px;
    border-top: 1px solid #EEEEEE;

    span:last-child {
      color: #2B2B2B;
      font-weight: bold;
    }

    .function-button {
      display: inline-block;
      position: absolute;
      right: 0px;

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

.info-panel {
  position: absolute;
  margin: 372px 0px 28px 0px;
  left: 172px;
  right: 172px;
  border: 1px solid #E4E4E4;
  height: 1000px;
  box-shadow: 0px 4px 14px rgba(121, 121, 121, 0.1);
  width:1000px;
  min-width:80%;
}

.info-header {
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


</style>
