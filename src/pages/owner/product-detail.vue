<template>
  <div class="owner-product-detail">
    <div class="btn-list">
      <div class="function-btn cancel-product-button"><router-link :to="{path:'/owner/navigation/products'}">Cancel</router-link></div>
      <div class="function-btn save-product-button" @click="handleSaveProductDetailClicked(product.id)">Save</div>
    </div>

    <div class="owner-product-detail-panel">
      <div class="owner-header">
        <img src="./images/products.png" alt="">
        <span>Product Detail</span>
      </div>
      <div class="product-image">
        <input type="file" accept="image/*" @change="upload(file, $event)">
        <!-- <img class="product-photo" :src="product.photo" alt=""> -->
        <img class="remove-photo-btn" src="./images/remove-photo-btn.png" alt="" @click="handleRemovePhotoClicked($event)">
      </div>
      <form class="product-detail-form">
        <p>
          <label for="detail-name">Email</label>
          <input type="text" v-model="product.name" v-validate data-vv-rules="required" name="name" />
        </p>
        <p>
          <label for="detail-description">Description</label>
          <input type="text" v-model="product.description" v-validate data-vv-rules="required" name="description"/>
        </p>
        <p class="detail-price">
          <label for="detail-price">Price</label>
          <span>HK$</span>
          <input class="price-input" type="text" v-model="product.price" v-validate data-vv-rules="required" name="description"/>
        </p>
        <p>
          <label for="detail-category">Category</label>
          <select v-model="product.categoryId">
            <option v-for="category in categories" v-bind:value="category.value">
              {{ category.text }}
            </option>
          </select>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'owner-product-detail',
  data () {
    let categories = []
    let categoryNames = [
      'TV & Home Theater',
      'Computers & Tablets',
      'Cell Phones',
      'Cameras & Camcorders',
      'Audio',
      'Car Electronics & GPS',
      'Video, Games, Movies & Music',
      'Health, Fitness & Sports',
      'Home & Office'
    ]
    for (let i = 0; i < 10; i++) {
      categories.push({
        value: i + 1,
        text: categoryNames[i]
      })
    }
    console.log(categories)
    return {
      product: {
        id: 1,
        photo: 'http://ohcabv7e3.bkt.clouddn.com/iPhone.png',
        description: 'There is no denying the fact that the success of an advertisement lies mostly in the headline. The headline should attract the reader and make him read the rest of the advertisement. The headline should be simply catchy and various key points should be embedded when deciding on the headline ',
        name: 'This is product name',
        price: '78',
        categoryId: 1
      },
      categories: categories
    }
  },
  methods: {
    handleSaveProductDetailClicked (id) {
    },
    handleRemovePhotoClicked (event) {
      event.stopPropagation()
      this.product.photo = null
    },
    handleAddPhotoClicked () {
    },
    upload (file, e) {
      let f = e.target.files[0]
      file.name = f.name
      file.size = f.size
      this.product.photo = file
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.owner-product-detail-panel {
  position: absolute;
  margin: 100px 0px 28px 0px;
  left: 172px;
  right: 172px;
  border: 1px solid #E4E4E4;
  height: 1000px;
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
    margin-left: 65px;
    height: 80px;
    line-height: 80px;
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

.product-image {
  margin-left: 28px;
  height: 200px;
  width: 200px;
  border: 1px solid #E4E4E4;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 4px 14px 7px rgba(121, 121, 121, 0.05);
  background-repeat: no-repeat;
  background-size: auto;
  background-image: url('./images/add-photo.png');

  .product-photo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .remove-photo-btn {
    z-index: 100;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 14px;
    height: 14px;
  }
}

.product-photo {
  height: 200px;
  width: 200px;
  display: block;
  margin: 0px;
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
  }

  .price-input {
    color: #FF3F13;
    font-size: 40px;
  }

  select {
    position: absolute;
    left: 172px;
    top: 50%;
    transform: translateY(-50%);
    appearance: none;
    width: 575px;
    height: 60px;
    border: 1px solid #E4E4E4;
    outline: none;
    font-size: 20px;
    padding-left: 15px;
  }
}

.detail-price {
  span {
    color: #FF3F13;
    font-size: 40px;
    position: absolute;
    display: inline-block;
    top: 30px;
    left: 172px;
  }

  input {
    left: 250px;
  }
}

</style>
