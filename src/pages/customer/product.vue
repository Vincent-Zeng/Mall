<template>
  <div>
    <div class="product">

      <div class="product-info">
        <div class="product-img">
          <img class="product-image" :src="product.url" alt="">
        </div>
        <div class="product-detail">
          <div class="peach" @click="handleAddToFavouriteClicked(product.id)">
            <div>
            </div>
          </div>
          <p class="product-name">{{ product.name }}</p>
          <p class="product-price">HK ${{ product.price.toFixed(2) }}</p>
          <p class="product-left-amount">{{ product.amount }} left</p>

          <div class="product-add-to-cart" @click="handleAddToCartClicked(product.id)">
            Add to cart
          </div>

          <p class="product-description">{{ product.description }}</p>
        </div>
      </div>

      <div class="product-shop">
        <img class="product-shop-icon" src="./images/shop-name.png" alt="">
        <div class="product-shop-name"><router-link :to="{path:'/shops/' + shop.id}">{{ shop.name }}</router-link></div>
        <div class="product-shop-favourite" @click="handleAddToFavouriteShopClicked(shop.id)">Add to Favourite</div>
      </div>

      <div class="product-comments">
        <div class="product-review">
          REVIEWS
        </div>

        <div class="product-comment" v-for="comment in comments">
          <div class="product-comment-avatar">
            {{ comment.name.substring(0,2).toUpperCase() }}
          </div>
          <div class="product-comment-detail">
            <div class="product-comment-name">
              {{ comment.name }}
            </div>
            <div class="product-comment-content">
              {{ comment.content }}
            </div>
            <div class="product-comment-rate">
              <el-rate v-model="comment.rate" disabled></el-rate>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchProduct } from '../../services/customer/product'

export default {
  name: 'product',
  data () {
    fetchProduct(this.$route.params.id)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.product = {
          id: data.id,
          name: data.name,
          price: data.price,
          url: data.photoURL,
          description: data.detail,
          amount: data.amount
        }
        this.$http.get(`/shop/searchById?id=${data.shopId}`)
        .then(res => res.json())
        .then(data => {
          this.shop = {
            id: data.id,
            name: data.name
          }
        })
      })
    return {
      color: 'blue',
      product: {
        id: null,
        name: null,
        price: 0,
        url: null,
        description: null
      },
      shop: {
      },
      comments: [
        {
          name: 'Julia Peterson',
          content: 'My skin has always been soft. But now it feels like a babies bottom. I love it and the smell is pleasent and not strong',
          rate: 5
        }
      ]
    }
  },
  created () {
    this.$http.get(`/product/getComments?id=${this.$route.params.id}&page=1&count=1000`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        let comments = []
        for (var i = 0; i < data.length; i++) {
          comments.push({
            content: data[i].comment,
            name: data[i].customerName,
            rate: data[i].rate
          })
        }
        this.comments = comments
      })
  },
  methods: {
    handleAddToCartClicked (id) {
      this.$http.get(`/cart/addCart?id=${id}&amount=1`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 1) {
            this.$message({
              message: 'Success',
              type: 'success'
            })
          } else {
            this.$message({
              message: data.message,
              type: 'warning'
            })
          }
        }).catch((err) => {
          console.log(err)
          this.$message({
            message: 'Networking Error',
            type: 'warning'
          })
        })
    },
    handleAddToFavouriteClicked (id) {
      this.$http.get(`/Favorite/addProduct?id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 1) {
            this.$message({
              message: 'Success',
              type: 'success'
            })
          } else {
            this.$message({
              message: data.message,
              type: 'warning'
            })
          }
        }).catch((err) => {
          console.log(err)
          this.$message({
            message: 'Networking Error',
            type: 'warning'
          })
        })
    },
    handleAddToFavouriteShopClicked (shopId) {
      this.$http.get(`/Favorite/addShop?id=${shopId}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 0) {
            this.$message({
              message: 'Success',
              type: 'success'
            })
          } else {
            this.$message({
              message: data.message,
              type: 'warning'
            })
          }
        }).catch((err) => {
          console.log(err)
          this.$message({
            message: 'Networking Error',
            type: 'warning'
          })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color5: tomato;
$color6: #ccc;
h1 {
  font-weight: normal;
}

.product {
  width: 800px;
  margin: 100px auto;
}

.product-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position:relative;
  height: 400px;
}

.product-img {
  width: 50%;
  position:relative;

  .product-image {
    display: block;
    margin: auto;
    position: absolute;
    width:80%;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    max-height: 300px;
    max-width: 300px;
  }
}

.product-shop {
  margin-left: -30px;
  margin-right: -30px;
  height: 70px;
  background-color: #F5F5F5;
  position: relative;

  .product-shop-icon {
    float: left;
    display: block;
    margin: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 28px;
  }

  .product-shop-name {
    display: inline-block;
    color: black;
    font-size: 16px;
    padding-left: 14px;
    height: 70px;
    line-height: 70px;
    padding-top: 2px;
    float: left;
  }

  .product-shop-favourite {
    display: inline-block;
    height: 70px;
    line-height: 70px;
    font-size: 16px;
    color: #0077D8;
    padding-right: 20px;
    float: right;
    cursor: pointer;
  }
}

.product-detail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  margin-top:40px;
  .product-summary p {
    text-align: left;
    font-size: 14px;
    color: #ACACAC;
  }
  .peach{
    cursor: pointer;
    height:30px;
    width:30px;
    position: absolute;
    right:0;
    top:50px;
    div{
       background-color:$color5;
       width:10px;
       height:10px;
       position:relative;
       top:10px;
       left:50%;
       transform: rotate(-45deg);
     }


  div:before{
    content:"";
    width:10px;
    height:10px;
    border-radius:50%;
    background-color:$color5;
    position:absolute;
    top:-5px;
    left:0;
  }

  div:after{
    z-index:-1;
    content:"";
    width:10px;
    height:10px;
    border-radius:50%;
    background:$color5;
    position:absolute;
    top:0px;
    left:5px;
    }
  }

  .product-name {
    font-size: 28px;
    color: #2B2B2B;
    margin-top: 7px;
    margin-bottom: 7px;
  }

  .product-price {
    font-size: 23px;
    color: #FF3F13;
    margin-top: 7px;
    margin-bottom: 7px;
  }

  .product-left-amount {
    margin-top: 7px;
    margin-bottom: 7px;
    font-size: 13px;
    font-weight: lighter;
  }

  .product-add-to-cart {
    width: 100%;
    background-color: #0077D8;
    font-size: 20px;
    color: white;
    height: 56px;
    line-height: 56px;
    border-radius: 28px;
    font-weight: bolder;
    text-align: center;
    margin-top: 21px;
    margin-bottom: 21px;
    cursor: pointer;
  }

  .product-description {
    text-align: left;
    font-size: 16px;
    color: #2B2B2B;
    font-weight: lighter;
    margin-top: 7px;
    margin-bottom: 7px;
  }
}

.product-comments {
  margin-top: 28px;
  .product-review {
    color: #ACACAC;
    font-size: 16px;
    margin-bottom: 28px;
  }

  .product-comment {
    position: relative;
    margin-bottom: 14px;
    .product-comment-avatar {
      position: absolute;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      left: 0px;
      top: 0px;
      color: white;
      background-color: #A2A6E0;
      border-radius: 30px;
    }

    .product-comment-detail {
      margin-left: 80px;
      font-size: 16px;

      .product-comment-name {
        color: #2B2B2B;
        font-weight: bolder;
      }

      .product-comment-content {
        margin-top: 14px;
        margin-bottom: 14px;
      }
    }
  }
}

</style>
