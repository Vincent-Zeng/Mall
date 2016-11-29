<template>
  <div id="home">
    <div class="nav-header">
      <header>
        <div class="nav-topbar">
          <div class="user-action">
            <a v-on:click="showRegisterForm()">SIGN UP</a>
            <a @click="showLoginForm()">SIGN IN</a>
          </div>
        </div>
        <div class="navbar">
          <div id="logo">
            <img src="./logo.png" />
          </div>
          <div class="top-nav">
              <nav>
                <span id="nav-home" ><router-link :to="{path:'/'}">HOME</router-link></span>
                <span id="nav-products"><router-link :to="{path:'/products'}">PRODUCTS</router-link></span>
              </nav>
          </div>
          <div class="search-box">
            <button>2</button>
          </div>
        </div>
      </header>

      <div class="registerBox" v-show="showRegister">
        <section>
          <p class="close"><span v-on:click="showRegisterForm()">×</span></p>
          <div class="registerBox_left">
              <div class="registerBox_title">
                <h1>Sign Up</h1>
                <p>Create your account by filling the form bellow.</p>
              </div>
              <form class="register_form">
                <p>
                  <label for="telephone">Telephone</label>
                  <br />
                  <input type="text" id="telephone" v-model="telephone" />
                </p>
                <p>
                  <label for="name">Name</label>
                  <br />
                  <input type="text" id="name" v-model="name" />
                </p>
                <p>
                  <label for="password">Password</label>
                  <br />
                  <input type="password" id="password" v-model="password" />
                </p>
                <p>
                  <input type="checkbox" id="expire" :checked="expire" />
                  <label for="expire">Remember Me</label>
                </p>
                <input type="button" value="Let me in!" @click="handleSignUpClick()"/>
              </form>
          </div><div class="registerBox_right">
            <div>
              <p>Do you already</p>
              <p>have</p>
              <p>an account?</p>
            </div>
            <div>
              <p>That's awesome!You can login by</p>
              <p>clicking on</p>
              <p>the button below.</p>
            </div>
            <button @click="showLoginForm(),showRegisterForm()">Login</button>
          </div>
        </section>
      </div>


    <div class="shade" v-show="showRegister || showLogin"></div>

    <div class="login-box" v-show="showLogin">
        <section>
          <p class="close"><span v-on:click="showLoginForm()">×</span></p>
          <div class="login-main">
              <div class="registerBox_title">
                <h1>Sign in</h1>
              </div>
              <form class="register_form">
                <p>
                  <label for="login-telephone">Telephone</label>
                  <br />
                  <input type="text" id="login-telephone" v-model="telephone" />
                </p>
                <p>
                  <label for="login-password">Password</label>
                  <br />
                  <input type="password" id="login-password" v-model="password" />
                </p>
                <p>
                  <input type="checkbox" id="login-expire" :checked="expire"  />
                  <label for="login-expire">Remember Me</label>
                </p>
                <input type="button" value="Let me in!" @click="handleSignInClick()"/>
              </form>
          </div>
        </section>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import { signup } from '../services/customer/signup'
import { login } from '../services/customer/login'
import { setCookie } from './customer/util/cookie'
export default {
  name: 'home',
  data () {
    return {
      showRegister: false,
      showLogin: false
    }
  },
  methods: {
    showRegisterForm () {
      this.showRegister = !this.showRegister
    },
    showLoginForm () {
      this.showLogin = !this.showLogin
    },
    handleSignUpClick () {
      signup(this.telephone, this.name, this.password).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
    },
    handleSignInClick () {
      login(this.telephone, this.password).then(function (response) {
        if (this.expire === 'checked') {
          setCookie('username', 'password', 7)
        }
        console.log(response)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

$color1:gray;
$color2:#f5f5f5;
$color3:#0077d8;
$color4:#258bde;


*{
  margin:0;
  padding:0;
}
#home{
  width:100%;
}
.nav-header {
  width: 90%;
  min-width: 1000px;
  margin: 0 auto;
  margin: 40px auto 0px auto;
}

#dollars{
  float:left;
}

.user-action {
  float: right;

  a:first-child {
    color: red;
    margin-right: 10px;
    cursor:pointer;
  }

  a:last-child {
    color: $color1;
    cursor:pointer;
  }

}

.nav-topbar {
  height: 20px;
}

.navbar {
  margin-bottom: 5px;
  font-size: 20px;
  position: relative;
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

    a{
      color:black;
      text-decoration:none;
    }

    #nav-home a{
      color: $color1;
    }

    #nav-products {
      border-bottom: 3px solid $color3;
    }

    #nav-sale a{
      color: red;
    }

  }
}

:focus{
  outline: none;
}

.search-box {
  display: inline-block;
  width: 50%;
  text-align: right;
  position: absolute;
  right: 0px;
  bottom: 15px;

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

.login-box{
  z-index:100;
  position:fixed;
  border:1px solid $color2;
  width:500px;
  margin:0 auto;
  left:0;
  right:0;
  top:120px;
  padding:6px 12px 30px 12px;
  border-radius:5px;
  box-shadow:4px 4px 20px $color1;
  background:white;
}

.login-main{
  width:300px;
  margin:0 auto;
}

.registerBox{
  z-index:100;
  position:fixed;
  border:1px solid $color2;
  width:700px;
  margin:0 auto;
  left:0;
  right:0;
  top:60px;
  padding:6px 12px 30px 12px;
  border-radius:5px;
  box-shadow:4px 4px 20px $color1;
  background:white;
}
.close{
  text-align:right;
  font-size:30px;
  margin:0;
  color:lightgray;
  line-height:30px;
}

.close span{
  cursor:pointer;
}
.registerBox_left{
  display:inline-block;
  box-sizing:border-box;
  margin-left:50px;
  width:350px;
  padding:10px 20px;
  border-right:1px solid lightgray;
  vertical-align:middle;
}
.registerBox_right{
  display:inline-block;
  width:250px;
  vertical-align:middle;
  box-sizing:border-box;
  padding:10px 40px;
}
.registerBox_title h1{
  font-size:36px;
}
.registerBox_title p{
  font-size:12px;
  color:$color1;
  margin:10px 0;
}

.register_form{
  margin:30px 0 0 0;
}

.register_form label{
  font-weight:bold;
}

%form_input{
  width:270px;
  height:30px;
  border-radius:4px;
  border:1px solid lightgray;
  padding-left:10px;
}
#telephone,#password,#name,#login-telephone,#login-password{
    @extend %form_input;
    margin-bottom:10px;
}

.register_form label{
  line-height:30px;
}

#expire,#login-expire{
  height:16px;
  width:16px;
  appearance:radio;
  vertical-align:middle;
  margin-right:10px;
}

#expire~label{
  color:$color1;
  font-size:14px;
}

.register_form input[type="button"]{
  width:270px;
  height:40px;
  background:$color3;
  border:none;
  border-radius:24px;
  margin-top:30px;
  color:white;
  cursor:pointer;
}

.registerBox_right div:first-child{
  font-size:20px;
  font-weight:bold;
  margin-bottom:20px;
}

.registerBox_right div:nth-of-type(2){
  font-size:10px;
  line-height:20px;
  color:$color1;
  margin-bottom:20px;
}

.registerBox_right button{
  border:1px solid $color3;
  color:$color3;
  border-radius:4px;
  height:26px;
  width:80px;
  cursor:pointer;
  background-color:white;
}
.shade{
  z-index:99;
  position:fixed;
  width:100%;
  height:100%;
  top:0;
  left:0;
  opacity:0.4;
  background-color:black;
}

</style>
