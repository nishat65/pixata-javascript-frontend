<template>
  <div>
    <div class="heading">Update Profile</div>
    <form class="form" @submit.prevent="submitProfileData()">
      <div class="form-group">
        <label for="file" style="width: 40%"> Photo </label>
        <input
          id="file"
          type="file"
          accept="image/*"
          ref="file"
          @change="fileUpload"
        />
      </div>
      <div class="form-group">
        <label for="username" style="width: 40%">Username</label>
        <input id="username" type="text" class="txt-box" v-model="username" />
      </div>
      <div class="form-group">
        <label for="firstname" style="width: 40%">First Name</label>
        <input id="firstname" type="text" class="txt-box" v-model="firstname" />
      </div>
      <div class="form-group">
        <label for="lastname" style="width: 40%">Last Name</label>
        <input id="lastname" type="text" class="txt-box" v-model="lastname" />
      </div>
      <div class="form-group">
        <label for="email" style="width: 40%">Email</label>
        <input id="email" type="text" class="txt-box" v-model="email" />
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
  name: 'UpdateProfile',
  components: {
    MiniLoader,
  },
  data() {
    return {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      file: [],
    };
  },
  methods: {
    ...mapActions({ updateProfile: 'updateProfile' }),

    submitProfileData() {
      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('firstname', this.firstname);
      formData.append('lastname', this.lastname);
      formData.append('email', this.email);
      formData.append('photo', this.file[0]);
      this.updateProfile(formData);
    },

    fileUpload() {
      this.file = this.$refs.file.files;
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
    @include flexbox(row, flex-start, center);
    width: 80%;

    &:nth-of-type(6) {
      @include flexbox(row, center, center);
    }
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
