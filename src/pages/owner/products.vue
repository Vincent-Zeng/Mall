<template>
  <div class="owner-products">
    <div class="owner-header">
      <img src="./images/ring.png" alt="">
      <span>Products list</span>
    </div>

    <div class="product-list">
      <div class="product-item" v-for="product in products">
        <img class="product-item-img" :src="product.avatar" alt="">
        <span class="product-item-name">iPhone</span>

        <div class="function-button">
          <div class="edit-button">Edit</div>
          <div class="remove-button">Remove</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pic from './images/product.png'

export default {
  name: 'owner-products',
  data () {
    let products = []
    for (var i = 0; i < 20; i++) {
      products.push({
        avatar: pic,
        owner: 'MARY V. ROBINSON',
        name: 'Gucci Official'
      })
    }

    return {
      products: products
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.owner-products {
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
    color: #2B2B2B;
    font-size: 20px;
    font-weight: bold;
    margin-left: 65px;
    height: 80px;
    line-height: 80px;
  }
}

.product-list {
  margin-left: 28px;
  margin-right: 28px;

  .product-item {
    height: 88px;
    position: relative;
    border-top: 1px solid #EEEEEE;

    .product-item-img {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .product-item-name {
      color: #2B2B2B;
      font-weight: bold;
      margin-left: 43px;
      line-height: 88px;
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

      .edit-button {
        background-color: #0077D8;
        color: white;
        margin-right: 16px;
        cursor: pointer;
      }

      .remove-button {
        background-color: white;
        border: 1px solid #0077D8;
        color: #0077D8;
        cursor: pointer;
      }
    }
  }
}

</style>
