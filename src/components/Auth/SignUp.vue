<template>
  <div class="container">
    <div class="pixata-heading">Pixata</div>
    <form class="form-container" @submit.prevent="signUp()">
      <div class="quarter-circle"></div>
      <div class="heading">
        <div class="heading-signUp">Sign Up</div>
      </div>
      <div>
        <div class="form-group">
          <label for="first-name">First Name</label>
          <input
            id="first-name"
            type="text"
            v-model="firstName"
            placeholder="John"
          />
        </div>
        <div class="form-group">
          <label for="last-name">Last Name</label>
          <input
            id="last-name"
            type="text"
            v-model="lastName"
            placeholder="Doe"
          />
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            v-model="userName"
            placeholder="johndoe7"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="example@com"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="********"
          />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            v-model="confirmPassword"
            placeholder="********"
          />
        </div>
      </div>
      <div class="flex-col-center">
        <button class="btn-submit" type="submit" :disabled="loadingState">
          <div v-if="!loadingState">Sign In</div>
          <div v-else>
            <Loader />
          </div>
        </button>
        <p class="text-center">
          Already have an account?
          <router-link to="/signIn">SIGN IN</router-link>
        </p>
      </div>
    </form>
  </div>
</template>
<script>
/* eslint-disable operator-linebreak */
import Loader from '@/components/Loader/Loader.vue';

export default {
  name: 'SignUp',
  components: {
    Loader,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    signUp() {
      if (
        this.firstName === '' ||
        this.lastName === '' ||
        this.userName === '' ||
        this.email === '' ||
        this.password === '' ||
        this.confirmPassword === ''
      ) {
        this.$vToastify.error('Please fill all the details!');
      } else if (this.password.length < 8) {
        this.$vToastify.error('Password length must be at least 8 characters!');
      } else if (this.password !== this.confirmPassword) {
        this.$vToastify.error('Password should match!');
      } else {
        const data = {
          firstname: this.firstName,
          lastname: this.lastName,
          username: this.userName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        };
        this.$store.dispatch('signUp', {
          data,
        });
      }
    },
  },
  computed: {
    loadingState() {
      return this.$store.state.auth.loading;
    },
  },
};
</script>

<style lang="scss">
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

.quarter-circle {
  background: #268c83;
  width: 14%;
  border-radius: 25%;
  height: 12%;
  position: absolute;
  top: 0px;
  left: 0px;
  clip-path: circle(78.2% at 0 0);
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
  height: 30rem;
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
  //   background: white;
  //   color: #268c83;
  //   border: 1px solid #268c83;
  // }
}
</style>
