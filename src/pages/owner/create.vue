<template>
  <div class="owner-create-shop">
    <div class="btn-list">
      <div class="function-btn cancel-product-button"><router-link :to="{path:'/owner/navigation/shop'}">Cancel</router-link></div>
      <div class="function-btn save-product-button" @click="handleSaveProductDetailClicked()">Save</div>
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
          <label for="shop-telephone">Telephone</label>
          <input type="text" v-model="shop.telephone" v-validate data-vv-rules="required" name="telephone" placeholder="Shop telephone"/>
        </p>
        <p>
          <label for="shop-contact">Contact</label>
          <input type="text" v-model="shop.contact" v-validate data-vv-rules="required" name="contact" placeholder="Contact address"/>
        </p>
        <p>
          <label for="shop-certificate">Certificate</label>
          <div class="product-image" :style="{ backgroundImage:'url(' + certificatephoto + ')' }">
            <input type="file" class="uploadbutton" id="uploadbutton" />
            <!-- <img class="product-photo" :src="product.photo" alt=""> -->
            <span class="remove-photo-btn" @click="handleRemovePhotoClicked($event)" v-show='closebutton'>×</span>
          </div>
        </p>
      </form>

    </div>

  </div>
</template>

<script>
import photoaddbutton from './images/add-photo.png'
import router from '../../routes'

export default {
  name: 'owner-create-shop',
  data () {
    return {
      certificatephoto: photoaddbutton,
      closebutton: false,
      shop: {
        name: null,
        telephone: null,
        contact: null
      }
    }
  },
  methods: {
    handleSaveProductDetailClicked () {
      let body = JSON.stringify({ 'name': this.shop.name, 'telephone': this.shop.telephone, 'contact': this.shop.contact, 'idPhotoUrl': this.certificatephoto })
      this.$http.post('/shop/add', body)
        .then((res) => res.json())
        .then(json => {
          if (json.status === 1) {
            router.push('/owner/navigation')
          } else {
            window.alert(json.message)
          }
        }).catch((err) => {
          console.log(err)
          router.push('/owner/navigation')
        })
    },
    handleRemovePhotoClicked (event) {
      event.stopPropagation()
      this.certificatephoto = photoaddbutton
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
          body: _files[0]
        }).then(function (res) {
          return res.json()
        }).then(function (data) {
          console.log(data.fileurl)
          that.certificatephoto = data.fileurl
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

.product-image {
  margin-left: 28px;
  height: 200px;
  width: 200px;
  border: 1px solid #E4E4E4;
  overflow: hidden;
  position:relative;
  top:-60px;
  left:170px;
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
    left:0;
    top:0;
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

</style>
