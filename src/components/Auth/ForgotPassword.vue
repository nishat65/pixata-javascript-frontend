<template>
  <div class="container">
    <div class="pixata-heading">Pixata</div>
    <form class="form-container" @submit.prevent="forgotPassword()">
      <div class="quarter-circle"></div>
      <div class="heading">
        <div class="heading-signUp">Forgot Password</div>
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
      <div class="flex-col-center">
        <button
          class="btn-submit"
          type="submit"
          :disabled="loadingState === true"
        >
          <div v-if="!loadingState">Submit</div>
          <div v-else>
            <Loader />
          </div>
        </button>
        <p class="text-center">
          <router-link to="/signIn">Back to Sign In</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import Loader from '@/components/Loader/Loader.vue';

export default {
  name: 'ForgotPassword',
  components: {
    Loader,
  },
  data() {
    return {
      email: '',
    };
  },
  methods: {
    forgotPassword() {
      if (this.email === '') {
        this.$vToastify.error('Please provide an email!');
        return;
      }
      this.$store.dispatch('forgotPassword', this.email);
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

  .form-container {
    width: 40rem;
    padding: 1rem;
    position: relative;
    height: 24rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 3px 3px 12px 2px $gray_dark;

    .form-group {
      margin: 1rem 0;
      @include flexbox(column, space-between, unset);

      label {
        font-size: 1.4rem;
        margin: 0.1rem 0;
      }

      input[type='email'] {
        border: 1px solid $color_primary;
        outline: none;
        padding: 0.8rem;
        border-radius: 1.5rem;
      }
    }

    .quarter-circle {
      background: $color_primary;
      width: 5rem;
      border-radius: 0.5rem;
      height: 4rem;
      position: absolute;
      top: 0px;
      left: 0px;
      -webkit-clip-path: circle(78.2% at 0 0);
      clip-path: circle(78.2% at 0 0);
    }

    .heading {
      margin: 1rem 0;
      @include text-position(center);

      &-signUp {
        font-family: $font-secondary;
        @include text-position(center);
        color: $color_primary;
        font-weight: 800;
        font-size: 3.6rem;
      }
    }
  }

  .pixata-heading {
    @include text-position(center);
    margin: 0.4rem;
    font-size: 4rem;
    font-family: $font-secondary;
  }

  .text-center {
    @include text-position(center);
    font-size: 1.4rem;
    margin: 1rem 0;
    color: $color_primary;
    font-weight: 500;
  }

  .flex-center {
    @include flexbox(row, center, center);
  }

  .flex-col-center {
    @include flexbox(column, center, center);

    .btn-submit {
      width: 20rem;
      padding: 0.5rem;
      font-size: 1.8rem;
      margin: 0.5rem;
      border: none;
      border-radius: 0.5rem;
      background: $color_primary;
      color: white;
      cursor: pointer;
      outline: none;

      &:disabled {
        background: gray;
        cursor: not-allowed;
      }
    }
  }
}
</style>
