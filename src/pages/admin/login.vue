<template>
  <div class="admin-login">
    <div class="login-panel">
      <div class="panel-header">
        <img src="../../assets/logo.png" alt="">
        <div class="panel-content">
          <p class="panel-title">Log in</p>
          <p class="panel-prompt">Log in to manage as administrator </p>
        </div>
      </div>

      <div class="">
        <form class="login-form">
          <p>
            <label for="username">Username</label>
            <br />
            <input class="input-textfield" type="text" id="username" v-model="username" />
          </p>
          <p>
            <label for="password">Password</label>
            <br />
            <input class="input-textfield"type="password" id="password" v-model="password" />
          </p>
          <p>
            <input type="checkbox" id="expire" />
            <label for="expire">Remember Me</label>
          </p>
          <input @click='handleSubmitLoginForm()' class="submit-button" type="button" value="Let me in !" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../routes'
import Vue from 'vue'
export default {
  name: 'admin-login',
  data () {
    return {
    }
  },
  methods: {
    handleSubmitLoginForm () {
      Vue.http.post('/admin/login', {
        'name': this.username,
        'password': this.password
      }).then(res => {
        return res.json()
      }).then(json => {
        if (json.status === 1) {
          router.push('/admin/navigation/dashboard')
        } else {
          window.alert(json.message)
        }
      }).then(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  font-weight: normal;
}

.login-panel {
  width: 650px;
  height: 600px;
  border: 1px solid #E4E4E4;
  margin: 200px auto;
  box-shadow: 0px 4px 14px rgba(121, 121, 121, 0.1);

  .panel-header {
    margin: 80px 100px;
    position: relative;

    img {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .panel-content {
      display: inline-block;
      margin-left: 125px;

      .panel-title {
        margin: 0 auto;
        font-size: 40px;
        font-weight: bolder;
      }

      .panel-prompt {
        margin: 0 auto;
        font-size: 16px;
      }
    }
  }

  .login-form {
    margin: 80px 100px;

    label {
      font-size: 14px;
      color: #2B2B2B;
      font-weight: bold;
      padding-left: 8px;
    }

    .input-textfield {
      border: 1px solid #D7D7D7;
      border-radius: 4px;
      height: 40px;
      width: 440px;
      margin-top: 5px;
      font-size: 16px;
      padding-left: 10px;
    }

    .submit-button {
      height: 56px;
      width: 440px;
      background-color: #0077D8;
      border:none;
      border-radius: 28px;
      color: white;
      font-size: 20px;
      cursor: pointer;
      outline: none;
    }

    #expire {
      height: 20px;
      width: 20px;
      appearance: radio;
      vertical-align: middle;
      margin-right: 0px;
    }
  }
}


</style>
