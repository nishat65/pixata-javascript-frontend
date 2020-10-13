<template>
  <div>
    <div class="heading">Update Profile</div>
    <form class="form" @submit.prevent="submitProfileData()">
    <div class="form-group">
      <label for="file" style="width: 40%;">
        Photo
      </label>
      <input id="file" type="file" accept="image/*" ref="file" @change="fileUpload"/>
      </div>
    <div class="form-group">
      <label for="username" style="width: 40%;">Username</label>
    <input id="username" type="text" class="txt-box" v-model="username"/>
    </div>
    <div class="form-group">
      <label for="firstname" style="width: 40%;">First Name</label>
    <input id="firstname" type="text" class="txt-box" v-model="firstname"/>
    </div>
    <div class="form-group">
      <label for="lastname" style="width: 40%;">Last Name</label>
    <input id="lastname" type="text" class="txt-box" v-model="lastname"/>
    </div>
    <div class="form-group">
      <label for="email" style="width: 40%;">Email</label>
      <input id="email" type="text" class="txt-box" v-model="email"/>
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
.heading {
    text-align: center;
    margin: 20px 0;
    font-size: 1rem;
    text-transform: uppercase;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-group { display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
}

.txt-box {
        margin: 8px 0;
    padding: 5px;
    outline: none;
    border: 1px solid #499e97;
    width: 100%;
}

.btn-submit {
    padding: 10px;
    font-size: 1rem;
    border: none;
    background: #268c83;
    color: white;
    cursor: pointer;
    width: 100%;
    margin: 20px 0;
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
