<template>
  <div id="home">
    <div id="header">
      <header>
        <div id="topBar">
          <div id="dollars">DOLLARS v</div>
          <div id="userAction">
            <a>SIGN UP</a>
            <a>SIGN IN</a>
          </div>
        </div>
        <div id="navBar">
          <div id="logo">
            <img src="/" />
          </div>
          <div id="topNav">
              <nav>
                <span>HOME</span>
                <span>CATALOG</span>
                <span>SALE</span>
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
<style scoped>

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
  color:gray;
}
#userAction a:first-child{
  color:red;
  margin-right:10px;
}

#userAction a:last-child{
  color:gray;
}
#userAction{
  float:right;
}
#topBar{
  margin-bottom:5px;
  height:20px;
}

#navBar{
  margin-bottom:5px;


}

#logo{
  display:inline-block;
  width:10%;
  vertical-align: middle;
}

#logo img{
  height:100px;
  width:100px;
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
  padding: 0 20px;
}

.searchBox{
  display:inline-block;
  width:59%;
  text-align: right;
}

.searchBox input{
    width:50%;
    height:50px;
    border-radius:100px;
    background: #eee;
    border:none;
    padding-left:80px;
    font-size: 20px;

}
.searchBox button{
  border-radius: 100%;
  border:2px solid blue;
  height:50px;
  width:50px;
  background:white;
  margin-left: 30px;
}
</style>
