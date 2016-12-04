<template>
  <div class="">
    <div class="logout-panel">
      <span><router-link :to="{path:'/owner'}" @click="handleLogoutClicked()">LOG OUT </router-link></span>
    </div>
    <div class="owner-navigation">
      <header>
        <nav>
          <ul class="navigation">
            <li class="selected-item"><router-link :to="{path:'/owner/navigation/dashboard'}">DASHBOARD</router-link></li>
            <li><router-link :to="{path:'/owner/navigation/shop'}">SHOP DETAIL</router-link></li>
            <li><router-link :to="{path:'/owner/navigation/products'}">PRODUCTS</router-link></li>
            <li>AD</li>
            <li>ORDER</li>
          </ul>
        </nav>
      </header>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'owner-navigation',

  data () {
    console.log(this.$cookie.get('OwnerEmail'))

    Vue.http.get('/product/searchByOwner?ownerId=1&pageNum=10&page=1', {
      headers: {
        'cookies': 'kljsdk=11111'
      }
    }).then(response => {
      response.json().then(function (data) {
        console.log(data)
      })
    }, (response) => {
      console.log('Looks like there was a problem. Status Code: ' +
      response.status)
    })
    return {

    }
  },
  methods: {
    handleLogoutClicked () {
      this.$cookie.delete('OwnerEmail')
      this.$cookie.delete('OwnerPassword')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  font-weight: normal;
}

.logout-panel {
  height: 40px;
  span {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #ACACAC;
    float: right;
    margin-right: 169px;
  }
}

.owner-navigation {
  margin-top: 0px;
}

.navigation {
  margin: 0px;
  padding: 0px 144px;
  border-top: 1px solid #EEEEEE;
  border-bottom: 1px solid #EEEEEE;
  height: 101px;
  line-height: 101px;

  a {
    text-decoration: none;
    color: inherit;
  }

  li {
    margin-left: 28px;
    margin-right: 28px;
    list-style-type: none;
    display: inline;
    color: #ACACAC;
    font-size: 15px;
  }

  .selected-item {
    color: black;
    font-weight: bolder;
    padding-bottom: 14px;
    border-bottom: 2px solid #0077D8;
  }
}

</style>
