<template>
  <div class="admin-approve">
    <div class="approve-header">
      <img src="./images/ring.png" alt="">
      <span>New shop Owner Request</span>
    </div>

    <div class="approve-list">
      <foldinglist  v-for="shop in shops">
        <div slot="summary" class="approve-shop">
          <img class="approve-shop-avatar" :src="shop.idPhotoUrl" alt="">
          <span class="approve-word approve-shop-owner">{{ shop.owner }}</span>
          <span class="approve-word approve-shop-created">Created Shop</span>
          <span class="approve-word approve-shop-name">{{ shop.name }}</span>
          <div class="function-button">
            <div class="approve-button" @click="handleApproveButtonClicked($event, id)">Approve</div>
            <div class="reject-button">Reject</div>
          </div>
        </div>
        <div slot="detail" class="approve-shop-detail" >
          <img class="owner-photo" :src="shop.idPhotoUrl" alt=""><div class="detail-right">
            <p class="owner-email">Email: {{ shop.email }}</p>
            <p class="owner-telephone">Telephone: {{ shop.telephone }}</p>
          </div>
        </div>
      </foldinglist>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import foldinglist from './components/folding_list'
export default {
  name: 'admin-approve',
  data () {
    return {
      shops: []
    }
  },
  components: {
    foldinglist: foldinglist
  },
  methods: {
    handleApproveButtonClicked (event, id) {
      event.preventDefault()
      console.log('approve')
      Vue.http.post(`/shop/changeStatus?id=${id}&status=${0}`)
        .then((res) => res.json())
        .then(json => {
          console.log(json)
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  created () {
    Vue.http.get('/shop/searchByStatus?status=3&page=1&count=10').then((response) => {
      let shops = this.shops
      response.json().then(function (data) {
        for (let i = 0; i < data.length; i++) {
          const shop = data[i]
          shops.push({
            id: shop.id,
            idPhotoUrl: shop.idPhotoUrl,
            owner: shop.contact,
            name: shop.name,
            email: shop.email,
            telephone: shop.telephone
          })
        }
      })
      this.shops = shops
    }, (response) => {
      console.log('Looks like there was a problem. Status Code: ' +
           response.status)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color1: gray;
$color2: #f5f5f5;
$color3: #0077d8;
$color4: #258bde;
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

  .approve-shop-detail{
    border-bottom:1px solid lightgray;
    margin-bottom: 20px;
    padding-bottom:20px;
  }
  .owner-photo{
    width:45%;
    display: inline-block;
    vertical-align: middle;
  }

  .detail-right{
    display:inline-block;
    width:55%;
    vertical-align: middle;
    box-sizing: border-box;
    padding-left:10%;
    font-size:30px;
  }
}

</style>
