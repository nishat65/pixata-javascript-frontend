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

<style lang="scss" scoped>
$color_primary: #268c83;
$color_sky_blue: #499e9721;
$gray_dark: #969595;
$gray_medium: #c5c5c5;

$color_white: #ffffff;
$color_black: #000000;

$font_size: 62.5%;
$font_primary: 'Raleway', sans-serif;
$font-secondary: 'Dancing Script', cursive;

@mixin flexbox($direction, $j_cntnt, $a_items) {
  display: flex;
  flex-direction: $direction;
  justify-content: $j_cntnt;
  align-items: $a_items;
}

@mixin text-position($pos) {
  text-align: $pos;
}

.container {
  @include flexbox(column, center, center);
  height: 100vh;
  background: linear-gradient(45deg, $color_white, $color_sky_blue);

  .text-center {
    @include text-position(center);
  }

  .flex-center {
    @include flexbox(row, center, center);
  }

  .flex-col-center {
    @include flexbox(column, center, center);

    .btn-submit {
      width: 20rem;
      padding: 0.5rem;
      font-size: 1rem;
      margin: 0.5rem;
      border: none;
      background: $color_primary;
      color: white;
      border-radius: 1.5rem;
      cursor: pointer;
      outline: none;

      &:disabled {
        background: gray;
        cursor: not-allowed;
      }
    }
  }

  .pixata-heading {
    @include text-position(center);
    margin: 0.1rem;
    font-size: 4rem;
    font-family: $font-secondary;
  }

  .form-container {
    width: 22rem;
    padding: 1rem;
    position: relative;
    height: 30rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 3px 3px 12px 2px $gray_dark;

    label {
      width: 7rem;
      font-size: 0.9rem;
    }

    input[type='text'] {
      border: 1px solid $color_primary;
      outline: none;
      padding: 0.8rem;
      border-radius: 1.5rem;
    }

    input[type='email'] {
      border: 1px solid $color_primary;
      outline: none;
      padding: 0.8rem;
      border-radius: 1.5rem;
    }

    input[type='password'] {
      border: 1px solid $color_primary;
      outline: none;
      padding: 0.8rem;
      border-radius: 1.5rem;
    }

    .quarter-circle {
      background: $color_primary;
      width: 3.6rem;
      border-radius: 0.5rem;
      height: 12%;
      position: absolute;
      top: 0px;
      left: 0px;
      -webkit-clip-path: circle(78.2% at 0 0);
      clip-path: circle(78.2% at 0 0);
    }

    .heading {
      margin: 0.2rem 0;
      @include text-position(center);

      &-signUp {
        font-family: $font-secondary;
        @include text-position(center);
        color: $color_primary;
        font-weight: 800;
        font-size: 2.5rem;
      }
    }

    .form-group {
      margin: 0.5rem 0;
      @include flexbox(row, space-between, center);
    }
  }
}
</style>
