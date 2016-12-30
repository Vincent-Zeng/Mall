<template>
  <div id="home">
    <div class="nav-header">
      <header>
        <div class="nav-topbar">
          <div class="user-action" >
            <a v-on:click="showRegisterForm()"  v-show="!isLogin">SIGN UP</a>
            <a @click="showLoginForm()" v-show="!isLogin">SIGN IN</a>
            <a @click="handleLogoutClicked()" v-show="isLogin">Log out</a>
          </div>
        </div>
        <div class="navbar">
          <div id="logo">
            <img src="./logo.png" />
          </div>
          <div class="top-nav">
              <nav>
                <span @click="handleTabClick(0)" :class="{'selected-item': now === 0}" id="nav-home" ><router-link :to="{path:'/'}">HOME</router-link></span>
                <span @click="handleTabClick(1)" :class="{'selected-item': now === 1}" id="nav-products"><router-link :to="{path:'/products'}">PRODUCTS</router-link></span>
                <span @click="handleTabClick(2)" :class="{'selected-item': now === 2}" id="nav-orders"><router-link :to="{path:'/orders'}" v-show="isLogin">ORDERS</router-link></span>
              </nav>
          </div>
          <div class="search-box">
            <router-link :to="{path:'/cart'}"><button>0</button></router-link>
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
                  <span class="error" v-show="errors.has('telephone')">
                    {{ errors.first('telephone') }}
                  </span>
                  <br />
                  <input type="text" id="telephone" v-model="telephone" v-validate data-vv-rules="required|numeric" name="telephone" />
                </p>
                <p>
                  <label for="email">Email</label>
                  <span class="error" v-show="errors.has('email')">
                    {{ errors.first('email') }}
                  </span>                  <br />
                  <input type="text" id="email" v-model="email" v-validate data-vv-rules="required|email" name="email" />

                </p>
                <p>
                  <label for="name">Name</label>
                  <span class="error" v-show="errors.has('username')">
                    {{ errors.first('username') }}
                  </span>
                  <br />
                  <input type="text" id="name" v-model="name" v-validate data-vv-rules="required|verify_password" name="username" />
                </p>
                <p>
                  <label for="password">Password</label>
                  <span class="error" v-show="errors.has('password')">
                    {{ errors.first('password') }}
                  </span>
                  <br />
                  <input type="password" id="password" v-model="password" v-validate data-vv-rules="required|verify_password" name="password"/>
                </p>
                <p>
                  <label for="password">Password Confirm</label>
                  <span class="error" v-show="errors.has('password again')">
                    {{ errors.first('password again') }}
                  </span>
                  <br />
                  <input type="password" id="password-confirm" v-validate data-vv-rules="required|confirmed:password" name="password again"/>
                </p>
                <p>
                  <input type="checkbox" id="expire" :checked="expire" />
                  <label for="expire">Remember Me</label>
                </p>
                <input type="button" value="Let me in!" @click="handleSignUpClick()" :disabled="fields.clean()" />
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
                  <label for="login-email">Email</label>
                  <span class="error" v-show="errors.has('email')">
                    {{ errors.first('email') }}
                  </span>
                  <br />
                  <input type="text" id="login-email" v-model="loginemail" v-validate data-vv-rules="required|email" name="email" />
                </p>
                <p>
                  <label for="login-password">Password</label>
                  <span class="error" v-show="errors.has('password')">
                    {{ errors.first('password') }}
                  </span>
                  <br />
                  <input type="password" id="login-password" v-model="password" v-validate data-vv-rules="required|verify_password" name="password"/>
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
import router from '../routes'

export default {
  name: 'home',
  data () {
    let now = null
    console.log(this.$route.name)
    console.log(this.$route.path)
    switch (this.$route.name) {
      case 'customer-home':
        now = 0
        break
      case 'customer-products':
        now = 1
        break
      case 'customer-orders':
        now = 2
        break
      default:
        now = null
        this.$route.path === '/' ? now = 0 : null
    }
    console.log(now)
    return {
      isLogin: false,
      showRegister: false,
      showLogin: false,
      now: now
    }
  },
  methods: {
    showRegisterForm () {
      this.showRegister = !this.showRegister
    },
    showLoginForm () {
      this.showLogin = !this.showLogin
    },
    handleTabClick (index) {
      this.now = index
    },
    handleSignUpClick () {
      router.push('/products')
      this.$cookie.set('customerId', 1)

      this.showRegister = false
      signup(this.telephone, this.name, this.password, this.email)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.status === 0) {
          this.$message({
            message: 'Success',
            type: 'success'
          })
        } else if (data.status === 1) {
          this.$cookie.set('customerId', 1)
          this.isLogin = true
          router.push('/products')
          this.$message({
            message: 'Login Successfully',
            type: 'success'
          })
        } else {
          this.$message({
            message: data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message({
          message: 'Networking Error',
          type: 'warning'
        })
      })
    },
    handleSignInClick () {
      this.showLogin = false
      this.$cookie.set('customerId', 1)
      this.isLogin = true

      login(this.email, this.password).then(function (response) {
        if (this.expire === 'checked') {
          setCookie('username', 'password', 7)
        }
        this.showLogin = false
        this.$message({
          message: 'Login Successfully',
          type: 'success'
        })
      }).catch(function (err) {
        console.log(err)
        this.$message({
          message: 'Networking Error',
          type: 'warning'
        })
      })
    },
    handleLogoutClicked () {
      this.$cookie.delete('customerId')
      this.isLogin = false
    }
  },
  created () {
    if (this.$cookie.get('customerId') !== null) {
      this.isLogin = true
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

  a:nth-child(2){
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
    min-width: 600px;

    span {
      margin: 0 20px;
      padding: 5px 0;
      font-weight: bold;
    }

    a{
      color:black;
      text-decoration:none;
    }

    a {
      color: $color1;
    }

    #nav-orders a {
      color: $color1;
    }

    .selected-item {
      font-weight: bolder;
      padding-bottom: 3px;
      border-bottom: 4px solid #0077D8;
      a{
        color: black;
      }
    }

    #nav-sale a {
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

  a {
    cursor: pointer;
  }

  button {
    border-radius: 100%;
    border: 2px solid $color4;
    height: 50px;
    width: 50px;
    background: white;
    margin-left: 30px;
    font-size: 15px;
    cursor: pointer;
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
  position:absolute;
  border:1px solid $color2;
  width:700px;
  margin:0 auto;
  left:0;
  right:0;
  top:20px;
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
#telephone,#password,#name,#login-email,#login-password,#email,#password-confirm{
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

.register_form p{
  position:relative;
}

.error{
  display: block;
  color: red;
  font-size: 13px;
  font-weight: bold;
  margin: 0px;
  margin-bottom: -20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

</style>
