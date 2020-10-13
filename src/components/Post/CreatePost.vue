<template>
  <nav class="nav-bar">
    <div class="pixata-heading">Pixata</div>
    <div class="profile-container">
      <img
        :src="`${staticUrl}users/${myData.photo}`"
        :alt="myData.photo"
        class="nav-profile-image"
      />
      <router-link class="nav-profile-name" :to="{ name: 'Post' }">
        <div>{{ myData.username }}</div>
      </router-link>
      <router-link style="width: 20px; color: black" to="/settings"
        ><i class="fas fa-cog"></i
      ></router-link>
      <button @click="signOut()" class="sign-out-btn">Sign out</button>
    </div>
  </nav>
</template>
<script>
import { mapActions, mapState } from 'vuex';

import Constant from '../../constant/Constant';
import LocalStorage from '../../utils/localStoragePersist';

export default {
  name: 'Create-Post',
  methods: {
    ...mapActions({
      getMyData: 'getMyData',
    }),
    signOut() {
      LocalStorage.removeItemLocalStorage('token');
      this.$router.push('/signIn');
    },
  },
  async created() {
    this.getMyData();
  },
  computed: {
    ...mapState({
      myData: (state) => state.user.myData,
    }),
    staticUrl() {
      return Constant.staticUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ababab;
  box-shadow: 1px 1px 1px #eee;
}

.pixata-heading {
  padding: 0.8rem;
  font-size: 2rem;
  font-family: 'Dancing Script', cursive;
}

.profile-container {
  width: 25%;
  display: flex;
  align-items: center;
}

.nav-profile-image {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}

.nav-profile-name {
  text-decoration: none;
  color: black;
  width: 25%;
  margin: 0 12px;
}

.sign-out-btn {
  width: 6rem;
  padding: 13px;
  margin: 0 1.4rem;
  background: #268c839e;
  border: none;
  font-size: 0.9rem;
  outline: none;
  color: white;
  cursor: pointer;
}
</style>
