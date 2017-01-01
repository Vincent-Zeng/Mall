<template>
  <div class="">
    <div class="logout-panel">
      <span><router-link :to="{path:'/owner'}" @click="handleLogoutClicked()">LOG OUT </router-link></span>
    </div>
    <div class="owner-navigation">
      <header>
        <nav>
          <ul class="navigation">
            <li @click="handleTabClick(0)" :class="{'selected-item': now === 0}"><router-link :to="{path:'/owner/navigation/dashboard'}">DASHBOARD</router-link></li>
            <li @click="handleTabClick(1)" :class="{'selected-item': now === 1}"><router-link :to="{path:'/owner/navigation/shop'}">SHOP DETAIL</router-link></li>
            <li @click="handleTabClick(2)" :class="{'selected-item': now === 2}"><router-link :to="{path:'/owner/navigation/products'}">PRODUCTS</router-link></li>
            <li @click="handleTabClick(3)" :class="{'selected-item': now === 3}"><router-link :to="{path:'/owner/navigation/ad'}">AD</router-link></li>
            <li @click="handleTabClick(4)" :class="{'selected-item': now === 4}"><router-link :to="{path:'/owner/navigation/order'}">ORDER</router-link></li>
          </ul>
        </nav>
      </header>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'owner-navigation',

  data () {
    console.log(this.$cookie.get('OwnerEmail'))
    // Vue.http.get('/product/searchByOwn?pageNum=10&page=1', {
    //   headers: {
    //     'cookies': 'kljsdk=11111'
    //   }
    // }).then(response => {
    //   response.json().then(function (data) {
    //     console.log(data)
    //   })
    // }, (response) => {
    //   console.log('Looks like there was a problem. Status Code: ' +
    //   response.status)
    // })
    let now = null
    switch (this.$route.name) {
      case 'owner-dashboard':
        now = 0
        break
      case 'owner-shop':
        now = 1
        break
      case 'owner-products':
        now = 2
        break
      case 'owner-ad':
        now = 3
        break
      case 'owner-order':
        now = 4
        break
      default:
        now = null
    }
    return {
      now: now
    }
  },
  methods: {
    handleLogoutClicked () {
      this.$cookie.delete('OwnerEmail')
      this.$cookie.delete('OwnerPassword')
    },
    handleTabClick (index) {
      this.now = index
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
  min-width:1000px;
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
