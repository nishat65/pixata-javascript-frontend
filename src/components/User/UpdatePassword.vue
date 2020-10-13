<template>
  <div>
    <div class="heading">Update Password</div>
    <form class="form" @submit.prevent="submitPasswordData()">
      <div class="form-group">
      <label for="current-password" style="width: 40%;">
        Current Password
      </label>
      <input id="current-password" type="text" class="txt-box" v-model="currentPassword"/>
      </div>
      <div class="form-group">
      <label for="new-password" style="width: 40%;">
        New Password
      </label>
      <input id="new-password" type="text" class="txt-box" v-model="password"/>
      </div>
      <div class="form-group">
      <label for="confirm-password" style="width: 40%;">
        Confirm Password
      </label>
      <input id="confirm-password" type="text" class="txt-box" v-model="confirmPassword"/>
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
      // eslint-disable-next-line no-trailing-spaces
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
    width: 80%;
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
    width: 60%;
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
