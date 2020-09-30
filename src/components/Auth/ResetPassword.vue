<template>
  <div class="container">
    <div class="pixata-heading">Pixata</div>
    <form class="form-container" @submit.prevent="forgotPassword()">
      <div class="quarter-circle"></div>
      <div class="heading">
        <div class="heading-signUp">Reset Password</div>
      </div>
      <div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="text" v-model="password" placeholder="example123" />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            placeholder="*******"
          />
        </div>
      </div>

      <div class="flex-col-center">
        <button class="btn-submit" type="submit" :disabled="loadingState === true">
          <div v-if="!loadingState">
            Reset Password
          </div>
          <div v-else>
            <Loader />
          </div>
        </button>
        <p class="text-center" v-if="!$store.state.auth.message.includes('successfully')">
          <router-link to="/">Back to Sign Up</router-link>
        </p>
        <p class="text-center" v-else>
          <router-link to="/signIn">Back to Sign In</router-link>
        </p>
      </div>
      <div class="camera-body">
        <div class="camera-holder"></div>
        <div class="camera-flash"></div>
        <div class="camera-strip"></div>
        <div class="camera-lens"></div>
      </div>
    </form>
  </div>
</template>

<script>
import Loader from '@/components/Loader/Loader.vue';

export default {
  name: 'ResetPassword',
  components: {
    Loader,
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    async forgotPassword() {
      if (this.password === '' || this.confirmPassword === '') {
        this.$vToastify.error('Please check password or confirm password!');
        return;
      }
      const userData = {
        password: this.password,
        confirmPassword: this.confirmPassword,
        token: this.$route.params.token,
      };
      this.$store.dispatch('resetPassword', userData);
    },
  },
  computed: {
    loadingState() {
      return this.$store.state.auth.loading;
    },
  },
};
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-col-center {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 1rem 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(45deg, #ffffff, #c1dedc);
}

.pixata-heading {
  text-align: center;
  margin: 1rem;
  font-size: 4rem;
  font-family: 'Dancing Script', cursive;
}

.forgot-password {
  text-align: center;
  margin: 12px;
}

.camera-body {
  background: #81bcb7;
  height: 83px;
  width: 60%;
  position: relative;
  top: 21px;
  left: -32px;
  border-radius: 15px 15px 0px 15px;
}

.camera-holder {
  background: #268c8394;
  width: 100px;
  height: 110px;
  position: absolute;
  top: -20px;
  transform: translateX(55px);
  clip-path: polygon(23% 0%, 78% 0%, 100% 20%, 0 20%);
}

.camera-flash {
  background: white;
  width: 30px;
  height: 12px;
  position: absolute;
  margin: 5px 10px;
}

.camera-strip {
  background: #268c83;
  width: 100%;
  height: 25px;
  border-radius: 15px 15px 0 0;
}

.camera-lens {
  border: 15px solid #268c83;
  width: 80px;
  height: 80px;
  margin: 0.6rem auto;
  border-radius: 50%;
  background: white;
}

.quarter-circle {
  background: #268c83;
  width: 9%;
  border-radius: 25%;
  height: 9%;
  position: absolute;
  top: 0px;
  left: 0px;
  -webkit-clip-path: circle(78.2% at 0 0);
  clip-path: circle(82.2% at 0 0);
}

.flower-circle {
  background: #268c8370;
  height: 40vh;
  width: 23vw;
  border-radius: 50% 0 5% 50%;
  position: absolute;
  right: 0px;
  clip-path: circle(50.6% at 99% 99%);
  bottom: 0px;
}

.leaf-one {
  background: #268c83;
  width: 75%;
  border-radius: 60%;
  height: 25%;
  position: absolute;
  bottom: 0px;
  -webkit-clip-path: circle(40% at 50% 100%);
  clip-path: circle(63% at 10% 177%);
}

.leaf-two {
  background: #268c83;
  width: 75%;
  border-radius: 60%;
  height: 25%;
  position: absolute;
  bottom: 0px;
  right: -35px;
  -webkit-clip-path: circle(40% at 50% 100%);
  clip-path: circle(61% at 10% 177%);
}

.heading {
  margin: 0.8rem 0;
  text-align: center;

  &-signUp {
    font-family: 'Dancing Script', cursive;
    text-align: center;
    color: #268c83;
    padding: 0px;
    font-weight: 800;
    font-size: 2.5rem;
  }
}

.form-container {
  width: 30%;
  padding: 2rem;
  position: relative;
  background-size: cover;
  background-position: center;
  height: 25rem;
  background: white;
  border-radius: 15px;
  box-shadow: 3px 3px 12px 2px #5a5858;

  label {
    width: 7rem;
    font-size: 0.9rem;
  }

  input[type='text'] {
    border: 1px solid #66bfb7;
    outline: none;
    padding: 8px;
    border-radius: 15px;
  }

  input[type='email'] {
    border: 1px solid #66bfb7;
    outline: none;
    padding: 8px;
    border-radius: 15px;
  }

  input[type='password'] {
    border: 1px solid #66bfb7;
    outline: none;
    padding: 8px;
    border-radius: 15px;
  }
}

.form-group {
  margin: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-submit {
  padding: 10px;
  font-size: 1rem;
  margin: 12px;
  border: none;
  background: #268c83;
  color: white;
  border-radius: 15px;
  cursor: pointer;
  outline: none;

  &:disabled {
    background: gray;
    cursor: not-allowed;
  }

  // &:hover {
  //     background: white;
  //     color: #268c83;
  //     border: 1px solid #268c83;
  // }
}
</style>
