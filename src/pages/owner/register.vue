<template>
  <div class="owner-register">
    <div class="register-panel">
      <div class="panel-header">
        <img src="../../assets/logo.png" alt="">
        <div class="panel-content">
          <p class="panel-title">Register</p>
          <p class="panel-prompt">Sign up to manage as shop owner.</p>
        </div>
      </div>

      <div class="">
        <form class="register-form">
          <p>
            <label for="email">Email</label>
            <br />
            <input class="input-textfield" type="text" id="email" v-model="email"/>
          </p>
          <p>
            <label for="name">Name</label>
            <br />
            <input class="input-textfield" type="text" id="name" v-model="name"/>
          </p>
          <p>
            <label for="password">Password</label>
            <br />
            <input class="input-textfield" type="password" id="password" v-model="password"/>
          </p>
          <p>
            <label for="cofirmation-password">Password Confirmation</label>
            <br />
            <input class="input-textfield" type="password" id="password" v-model="confirmation"/>
          </p>
          <p>
            <input type="checkbox" id="expire" />
            <label for="expire">Remember Me</label>
          </p>
          <input @click='handleSubmitRegisterForm()' class="submit-button" type="button" value="Let me in !" />
        </form>
      </div>
    </div>

    <div class="prompt" v-show="prompt">
      {{prompt_message}}
    </div>
  </div>
</template>

<script>
import router from '../../routes'

export default {
  name: 'owner-register',
  data () {
    return {
      prompt: false,
      prompt_message: ''
    }
  },
  methods: {
    handleSubmitRegisterForm () {
      this.$http.post('/owner/register', {
        'email': this.email,
        'password': this.password,
        'name': this.name
      }).then(res => res.json())
        .then(json => {
          if (json.status === 1) {
            this.$cookie.set('ownerId', json.message)
            console.log(this.$cookie.get('ownerId'))
            router.push('/owner')
          } else {
            this.prompt_message = json.message
            this.prompt = true
            var that = this
            setTimeout(function () {
              that.prompt = false
            }, 2000)
          }
        }).catch((err) => {
          console.log(err)
          this.alert(err)
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

.register-panel {
  width: 650px;
  height: 800px;
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

  .register-form {
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
      cursor:pointer;
      outline:none;
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

.prompt{
  background:gray;
  border-radius:5px;
  color:white;
  position:fixed;
  margin:auto;
  left:0;
  right:0;
  top:0;
  bottom:0;
  height:40px;
  width: 500px;
  text-align: center;
  font-size:20px;
  line-height:40px;
  padding:10px 20px;
}
</style>
