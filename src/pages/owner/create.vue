<template>
  <div class="owner-create-shop">
    <div class="btn-list">
      <div class="function-btn cancel-product-button"><router-link :to="{path:'/owner/navigation/shop'}">Cancel</router-link></div>
      <div class="function-btn save-product-button" @click="handleSaveProductDetailClicked(product.id)">Save</div>
    </div>

    <div class="create-shop-panel">
      <div class="create-shop-header">
        <img src="./images/products.png" alt="">
        <span>Shop Detail</span>
      </div>

      <form class="product-detail-form">
        <p>
          <label for="shop-name">Name</label>
          <input type="text" v-model="shop.name" v-validate data-vv-rules="required" name="name" placeholder="Shop name"/>
        </p>
        <p>
          <label for="shop-contact">Contact</label>
          <input type="text" v-model="shop.contact" v-validate data-vv-rules="required" name="contact" placeholder="Contact address"/>
        </p>
        <p>
          <label for="shop-certificate">Certificate</label>
          <input type="file" accept="image/*" @change="upload(file, $event)"  class="uploadbutton" id="uploadbutton" />
        </p>
      </form>

    </div>

  </div>
</template>

<script>
export default {
  name: 'owner-create-shop',
  data () {
    return {
      shop: {
      }
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.create-shop-panel {
  position: absolute;
  margin: 100px 0px 28px 0px;
  left: 172px;
  right: 172px;
  border: 1px solid #E4E4E4;
  height: 600px;
  box-shadow: 0px 4px 14px rgba(121, 121, 121, 0.1);

  .create-shop-header {
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

}

.btn-list {
  position: absolute;
  margin: 28px 0px;
  left: 172px;
  right: 172px;

  .function-btn {
    width: 114px;
    height: 42px;
    display: inline-block;
    line-height: 42px;
    text-align: center;
    border-radius: 4px;
    box-sizing:border-box;
    cursor: pointer;
    margin-right: 16px;
    border: 1px solid #0077D8;
  }

  .cancel-product-button {
    color: #0077D8;
  }

  .save-product-button {
    background-color: #0077D8;
    color: white;
  }

}

.product-detail-form {

  p {
    position: relative;
    margin-left: 28px;
    height: 88px;
    margin: 0 28px;
  }

  label {
    color: #ACACAC;
    height: 88px;
    line-height: 88px;
    font-size: 20px;
  }

  input {
    position: absolute;
    left: 172px;
    display: inline-block;
    border: none;
    font-size: 20px;
    top: 30px;
    width: 80%;
    outline: none;
    border-bottom: 1px solid #DEDEDE;
    padding-bottom: 20px;
  }
}

</style>
