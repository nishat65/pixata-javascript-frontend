<template>
  <div>
    <div class="heading">Update Password</div>
    <form class="form" @submit.prevent="submitPasswordData()">
      <div class="form-group">
        <label for="current-password" style="width: 40%">
          Current Password
        </label>
        <input
          id="current-password"
          type="text"
          class="txt-box"
          v-model="currentPassword"
        />
      </div>
      <div class="form-group">
        <label for="new-password" style="width: 40%"> New Password </label>
        <input
          id="new-password"
          type="text"
          class="txt-box"
          v-model="password"
        />
      </div>
      <div class="form-group">
        <label for="confirm-password" style="width: 40%">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          type="text"
          class="txt-box"
          v-model="confirmPassword"
        />
      </div>
      <div class="form-group">
        <button class="btn-submit" type="submit" :disabled="userLoading">
          <div v-if="!userLoading">Update</div>
          <div v-else>
            <MiniLoader />
          </div>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

import MiniLoader from '../Loader/Loader.vue';

export default {
  name: 'UpdatePassword',
  components: {
    MiniLoader,
  },
  data() {
    return {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    ...mapActions({ updatePassword: 'updatePassword' }),
    submitPasswordData() {
      const passwordData = {
        currentPassword: this.currentPassword,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      this.updatePassword(passwordData);
    },
  },
  computed: {
    ...mapState({
      userLoading: (state) => state.user.loading,
    }),
  },
};
</script>
<style lang="scss" scoped>
$color_primary: #268c83;
$color_secondary: #81bcb7;
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

.heading {
  @include text-position(center);
  margin: 20px 0;
  font-size: 1rem;
  text-transform: uppercase;
}

.form {
  @include flexbox(column, center, center);

  .form-group {
    @include flexbox(row, center, center);
    width: 80%;
  }

  .txt-box {
    margin: 8px 0;
    padding: 5px;
    outline: none;
    border: 1px solid $color_primary;
    width: 100%;
  }

  .btn-submit {
    padding: 10px;
    font-size: 1rem;
    border: none;
    background: $color_primary;
    color: $color_white;
    cursor: pointer;
    width: 60%;
    margin: 20px 0;
    outline: none;

    &:disabled {
      background: $gray_dark;
      cursor: not-allowed;
    }
  }
}
</style>
