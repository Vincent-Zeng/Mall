<template>
  <div class="owner-navigation">
    <header>
      <nav>
        <ul class="navigation">
          <li class="selected-item">DASHBOARD</li>
          <li>OWNER & SHOP</li>
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
export default {
  name: 'owner-navigation',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  font-weight: normal;
}

.owner-navigation {
  margin-top: 40px;
}

.navigation {
  margin: 0px;
  padding: 0px 144px;
  border-top: 1px solid #EEEEEE;
  border-bottom: 1px solid #EEEEEE;
  height: 101px;
  line-height: 101px;

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
