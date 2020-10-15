<template>
  <div class="container">
    <div class="pixata-heading">Pixata</div>
    <form class="form-container" @submit.prevent="signIn()">
      <div class="quarter-circle"></div>
      <div class="heading">
        <div class="heading-signUp">Sign In</div>
      </div>
      <div>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            v-model.trim.lazy="userName"
            placeholder="johndoe7"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model.trim.lazy="password"
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
          New to Pixata?
          <router-link to="/">SIGN UP</router-link>
        </p>
        <p class="forgot-password">
          Forgot password?
          <router-link to="/forgotPassword">Click here</router-link>
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
  name: 'SignUp',
  components: {
    Loader,
  },
  data() {
    return {
      userName: '',
      password: '',
    };
  },
  methods: {
    signIn() {
      if (this.userName === '' || this.password === '') {
        this.$vToastify.error('Username or password cannot be empty!');
        return;
      }
      if (this.password.length < 8) {
        this.$vToastify.error('Password length must be at least 8 characters!');
        return;
      }
      this.$store.dispatch('signIn', {
        username: this.userName,
        password: this.password,
      });
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

$camera-body: #81bcb7;

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
    background: $color_white;
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
      @include flexbox(row, space-evenly, center);
    }
  }

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
      color: $color_white;
      border-radius: 1.5rem;
      cursor: pointer;
      outline: none;

      &:disabled {
        background: gray;
        cursor: not-allowed;
      }
    }
  }

  .forgot-password {
    text-align: center;
    margin: 12px;
  }
  .camera-body {
    background: $camera-body;
    width: 15rem;
    position: relative;
    height: 9rem;
    top: 2.8rem;
    left: -1rem;
    border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;

    .camera-holder {
      background: $camera-body;
      width: 8rem;
      height: 8rem;
      position: absolute;
      top: -1.591rem;
      transform: translateX(3.8rem);
      clip-path: polygon(23% 0%, 78% 0%, 100% 20%, 0 20%);
    }

    .camera-flash {
      background: $color_white;
      width: 3rem;
      height: 1rem;
      position: absolute;
      margin: 0.8rem 1.3rem;
    }

    .camera-strip {
      background: $color_primary;
      width: 100%;
      height: 2.5rem;
      border-radius: 0.5rem 0.5rem 0 0;
    }

    .camera-lens {
      border: 1rem solid $color_primary;
      width: 6rem;
      height: 6rem;
      margin: 0.4rem auto;
      border-radius: 50%;
      background: $color_white;
    }
  }

  .quarter-circle {
    background: $color_primary;
    width: 14%;
    border-radius: 25%;
    height: 12%;
    position: absolute;
    top: 0px;
    left: 0px;
    clip-path: circle(78.2% at 0 0);
  }
}
</style>
