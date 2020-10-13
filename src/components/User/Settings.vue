<template>
  <div style="height: 100vh">
    <nav class="nav-bar">
      <router-link class="pixata-heading-link" :to="{ name: 'Posts' }">
        <div class="pixata-heading">Pixata</div>
      </router-link>
      <div class="profile-container">
        <img
          :src="`${staticUrl}users/${myData.photo}`"
          :alt="myData.photo"
          class="nav-profile-image"
        />
        <router-link class="nav-profile-name" :to="{ name: 'Post' }">
          <div>{{ myData.username }}</div>
        </router-link>
        <button @click="signOut()" class="sign-out-btn">Sign out</button>
      </div>
    </nav>
    <div style="text-align: center; margin: 3rem 0px 1rem 0">Settings</div>
    <div style="margin: 1rem auto; width: 50%">
      <div style="display: flex; flex-direction: row">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="selected = tab.split(' ').join('')"
          :class="['tab-btn', { active: selected === tab }]"
        >
          {{ tab }}
        </button>
      </div>
      <div>
        <component :is="selected" class="tab"></component>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import UpdateProfile from './UpdateProfile.vue';
import UpdatePassword from './UpdatePassword.vue';
import Constant from '../../constant/Constant';
import LocalStorage from '../../utils/localStoragePersist';

export default {
  name: 'Settings',
  components: {
    UpdateProfile,
    UpdatePassword,
  },
  data() {
    return {
      tabs: ['Update Profile', 'Update Password'],
      selected: 'UpdateProfile',
      myData: {},
    };
  },
  methods: {
    signOut() {
      LocalStorage.removeItemLocalStorage('token');
      this.$router.push('/signIn');
    },
  },
  computed: {
    staticUrl() {
      return Constant.staticUrl;
    },
  },
  async created() {
    try {
      const usr = await axios.get(`${Constant.baseUrl}user/me`);
      this.myData = { ...usr.data.data.user };
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style>
.nav-bar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ababab;
  box-shadow: 1px 1px 1px #eee;
}

.pixata-heading-link {
  text-decoration: none;
  color: black;
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

.tab-btn {
  border: none;
  margin: 10px;
  font-size: 1.2rem;
  padding: 12px;
  background: #499e97;
  outline: none;
  cursor: pointer;
  color: white;
}

.active {
  border: 1px solid #499e97;
  background: #fffefe;
  color: #499e97;
}

.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
