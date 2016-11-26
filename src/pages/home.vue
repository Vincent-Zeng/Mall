<template>
  <div id="home">
    <div id="header">
      <header>
        <div id="topBar">
          <div id="dollars">DOLLARS <span class="invertedTriangle">v</span></div>
          <div id="userAction">
            <a>SIGN UP</a>
            <a>SIGN IN</a>
          </div>
        </div>
        <div id="navBar">
          <div id="logo">
            <img src="./logo.png" />
          </div>
          <div id="topNav">
              <nav>
                <span id="nav_home">HOME</span>
                <span id="nav_catalog">CATALOG</span>
                <span id="nav_sale">SALE</span>
              </nav>
          </div>
          <div class="searchBox">
            <div>
              <input type="text" placeholder="search here" />
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
$color1:gray;
$color2:#f5f5f5;
$color3:#0077d8;
$color4:#258bde;

#home{
  width:100%;
  font-family: Calibri;
}
#header{
  width:90%;
  min-width: 1000px;
  margin:0 auto;
}
#dollars{
  float:left;
  color:$color1;
}
#userAction a:first-child{
  color:red;
  margin-right:10px;
}

#userAction a:last-child{
  color:$color1;
}
#userAction{
  float:right;
}
#topBar{
  margin-bottom:10px;
  height:20px;
}

#navBar{
  margin-bottom:5px;
  font-size:20px;

}

#logo{
  display:inline-block;
  width:10%;
  vertical-align: middle;
}
#topNav{
  display:inline-block;
  width:30%;
}

#topNav nav{
  min-width: 300px;
}
:focus{
  outline: none;
}
#topNav nav span{
  margin: 0 20px;
  padding:5px 0;
  font-weight:bold;
}

.searchBox{
  display:inline-block;
  width:59%;
  text-align: right;
}

.searchBox input{
    background-image:url(./search_icon.png);
    background-repeat:no-repeat;
    background-position:20px center;
    background-size:36px 36px;
    width:50%;
    height:50px;
    border-radius:100px;
    background-color:$color2;
    border:none;
    padding-left:70px;
    font-size: 20px;

}
.searchBox button{
  border-radius: 100%;
  border:2px solid $color4;
  height:50px;
  width:50px;
  background:white;
  margin-left: 30px;
}
.invertedTriangle{
  display:inline-block;
  color:black;
  transform:scale(1.5,0.5);
}
#nav_home{
  color:$color1;
}
#nav_catalog{
  border-bottom:3px solid $color3;
}
#nav_sale{
  color:red;
}
</style>
