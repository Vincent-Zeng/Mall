<template>
  <div id="home">
    <div class="nav-header">
      <header>
        <div class="nav-topbar">
          <div class="user-action">
            <a>SIGN UP</a>
            <a>SIGN IN</a>
          </div>
        </div>
        <div class="navbar">
          <div id="logo">
            <img src="./logo.png" />
          </div>
          <div class="top-nav">
              <nav>
                <span id="nav-home">HOME</span>
                <span id="nav-catalog">CATALOG</span>
                <span id="nav-sale">SALE</span>
              </nav>
          </div>
          <div class="search-box">
            <div>
              <input type="text" placeholder="Search here" />
              <button>2</button>
            </div>
          </div>
        </div>
      </header>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

$color1: gray;
$color2: #f5f5f5;
$color3: #0077d8;
$color4: #258bde;

#home {
  width: 100%;
}
.nav-header {
  width: 90%;
  min-width: 1000px;
  margin: 0 auto;
  margin: 40px auto 0px auto;
}

.user-action {
  float: right;

  a:first-child {
    color: red;
    margin-right: 10px;
  }

  a:last-child {
    color: $color1;
  }

}

.nav-topbar {
  margin-bottom: 10px;
  height: 20px;
}

.navbar {
  margin-bottom: 5px;
  font-size: 20px;
}

#logo {
  display: inline-block;
  width: 10%;
  vertical-align: middle;
}

.top-nav {
  display: inline-block;
  width: 30%;

  nav {
    min-width: 300px;

    span {
      margin: 0 20px;
      padding: 5px 0;
      font-weight: bold;
    }

    #nav-home {
      color: $color1;
    }

    #nav-catalog {
      border-bottom: 3px solid $color3;
    }

    #nav-sale {
      color: red;
    }

  }
}

:focus{
  outline: none;
}

.search-box {
  display: inline-block;
  width: 59%;
  text-align: right;

  input {
      background-image: url(./search_icon.png);
      background-repeat: no-repeat;
      background-position: 20px center;
      background-size: 36px 36px;
      width: 50%;
      height: 50px;
      border-radius: 100px;
      background-color: $color2;
      border: none;
      padding-left: 70px;
      font-size: 20px;
  }

  button {
    border-radius: 100%;
    border: 2px solid $color4;
    height: 50px;
    width: 50px;
    background: white;
    margin-left: 30px;
    font-size: 15px;
  }
}
</style>
