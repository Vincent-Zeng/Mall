<template>
  <div class="admin-navigation">
    <header>
      <div>
        <span class="logout" @click='handleLogoutClicked()'>LOG OUT</span>
      </div>
      <nav>
        <ul class="navigation">
          <li @click="handleTabClick(0)" :class="{'selected-item': now === 0}"><router-link :to="{path:'/admin/navigation/dashboard'}">DASHBOARD</router-link></li>
          <li @click="handleTabClick(1)" :class="{'selected-item': now === 1}"><router-link :to="{path:'/admin/navigation/approve'}">WAITING QUEUE</router-link></li>
          <li @click="handleTabClick(2)" :class="{'selected-item': now === 2}"><router-link :to="{path:'/admin/navigation/owner'}">OWNER & SHOP</router-link></li>
          <li @click="handleTabClick(3)" :class="{'selected-item': now === 3}"><router-link :to="{path:'/admin/navigation/customer'}">CUSTOMER</router-link></li>
          <li @click="handleTabClick(4)" :class="{'selected-item': now === 4}"><router-link :to="{path:'/admin/navigation/ad'}">AD</router-link></li>
          <li @click="handleTabClick(5)" :class="{'selected-item': now === 5}">COMMISSION</li>
          <li @click="handleTabClick(6)" :class="{'selected-item': now === 6}">ORDER</li>
        </ul>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import router from '../../routes'

export default {
  name: 'admin-navigation',
  data () {
    let now = null
    switch (this.$route.name) {
      case 'admin-navigation':
        now = null
        break
      case 'admin-approve':
        now = 1
        break
      case 'admin-owner':
        now = 2
        break
      case 'admin-customer':
        now = 3
        break
      case 'admin-ad':
        now = 4
        break
      case 'admin-dashboard':
        now = 0
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
      router.push('/admin')
    },
    handleTabClick (index) {
      this.now = index
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.admin-navigation{
  min-width:1300px;
}
.logout {
  position: absolute;
  top: 13px;
  right: 145px;
  color: #ACACAC;
  font-size: 14px;
}

.navigation {
  margin: 40px 0px 0px 0px;
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
