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
      <div class="product-image" :style="{ backgroundImage:'url(' + product.photo + ')' }">
        <input type="file" accept="image/*" @change="upload(file, $event)"  class="uploadbutton" id="uploadbutton" />
        <!-- <img class="product-photo" :src="product.photo" alt=""> -->
        <span class="remove-photo-btn" @click="handleRemovePhotoClicked($event)" v-show='closebutton'>×</span>
      </div>
      <form class="product-detail-form">
        <p>
          <label for="detail-name">Name</label>
          <input type="text" v-model="product.name" v-validate data-vv-rules="required" name="name" placeholder="Name of product"/>
        </p>
        <p>
          <label for="detail-description">Description</label>
          <input type="text" v-model="product.description" v-validate data-vv-rules="required" name="description" placeholder="Description of product"/>
        </p>
        <p class="detail-price">
          <label for="detail-price">Price</label>
          <span>HK$</span>
          <input class="price-input" type="text" v-model="product.price" v-validate data-vv-rules="required" name="description" placeholder=""/>
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
import photoaddbutton from './images/add-photo.png'
import router from '../../routes'

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
    let productId = this.$route.params.id
    console.log(productId)
    this.$http.get(`/product/id?id=${productId}`).then((res) => res.json())
      .then(json => {
        this.product.id = productId
        this.product.photo = json.photoURL
        this.product.categoryId = json.categoryId
        this.product.price = json.price
        this.product.description = json.detail
        this.product.name = json.name
      }).catch((err) => {
        console.log(err)
      })

    console.log(categories)
    return {
      showclose: false,
      product: {
        id: null,
        photo: photoaddbutton,
        description: null,
        name: null,
        price: null,
        categoryId: 1
      },
      categories: categories
    }
  },
  methods: {
    // categoryId: this.product.categoryId,
    // photoURL: this.product.photo,
    // detail: this.product.description,
    // name: this.product.name,
    // price: parseInt(this.product.price)
    handleSaveProductDetailClicked (id) {
      if (id === null) {
        this.$http.get(`/product/add?categoryId=${this.product.categoryId}&photoURL=${this.product.photo}&detail=${this.product.description}&name=${this.product.name}&price=${parseInt(this.product.price)}`)
          .then((res) => res.json())
          .then((json) => {
            router.push('/owner/navigation/products')
            console.log(json)
          }).catch((err) => {
            console.log(`/product/add?categoryId=${this.product.categoryId}&photoURL=${this.product.photo}&detail=${this.product.description}&name=${this.product.name}&price=${parseInt(this.product.price)}`)
            router.push('/owner/navigation/products')
            console.log(err)
          })
      } else {
        this.$http.post(`/product/update`, {
          categoryId: this.product.categoryId,
          photoURL: this.product.photo,
          detail: this.product.description,
          name: this.product.name,
          price: parseInt(this.product.price)
        })
        .then((res) => res.json())
        .then((json) => {
          router.push('/owner/navigation/products')
          console.log(json)
        }).catch((err) => {
          router.push('/owner/navigation/products')
          console.log(err)
        })
      }
    },
    handleRemovePhotoClicked (event) {
      event.stopPropagation()
      this.product.photo = photoaddbutton
      this.closebutton = false
    },
    handleAddPhotoClicked () {
    }
  },
  mounted () {
    var file = document.getElementById('uploadbutton')
    var that = this
    file.onchange = function () {
      var _files = this.files
      console.log(_files)
      console.log(file.value)
      var filePath = file.value
      if (!_files.length) return
      if (_files.length === 1) {
        window.fetch('http://106.14.70.91:8000/upload', {
          method: 'POST',
          headers: {
            'file-name': filePath.substring(filePath.lastIndexOf('\\') + 1)
          },
          mode: 'cors',
          body: _files[0]
        }).then(function (res) {
          return res.json()
        }).then(function (data) {
          console.log(data.fileurl)
          that.product.photo = data.fileurl
          if (that.product !== photoaddbutton) {
            that.closebutton = true
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
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
  background-size:contain;
  background-position:center center;

  .product-photo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .uploadbutton{
    opacity:0;
    width:200px;
    height:200px;
  }

  .remove-photo-btn {
    cursor:pointer;
    font-size:40px;
    z-index: 100;
    position: absolute;
    top: 0px;
    right: 10px;
    color:gray;
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
