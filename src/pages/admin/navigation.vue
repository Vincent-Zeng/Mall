<template>
  <div class="admin-navigation">
    <header>
      <div>
        <span class="logout" @click='handleLogoutClicked()'>LOG OUT</span>
      </div>
      <nav>
        <ul class="navigation">
          <li class="selected-item"><router-link :to="{path:'/admin/navigation/dashboard'}">DASHBOARD</router-link></li>
          <li><router-link :to="{path:'/admin/navigation/approve'}">WAITING QUEUE</router-link></li>
          <li>OWNER</li>
          <li>CUSTOMER</li>
          <li>AD</li>
          <li>COMMISSION</li>
          <li>ORDER</li>
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
    return {

    }
  },
  methods: {
    handleLogoutClicked () {
      router.push('/admin')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
