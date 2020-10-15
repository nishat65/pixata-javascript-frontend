<template>
  <div>
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
    <div class="text-center" style="center; margin: 3rem 0px 1rem 0">
      Settings
    </div>
    <div style="margin: 1rem auto; width: 50%">
      <div class="flex-center">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="selected = tab.split(' ').join('')"
          :class="['tab-btn', { active: checkActiveTabs(selected, tab) }]"
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
    checkActiveTabs(selected, tab) {
      const selectedTab = selected.split('').map((el) => {
        if (el === 'P') {
          // eslint-disable-next-line no-param-reassign
          el = ',P';
        }
        return el;
      });
      return selectedTab.join('').split(',').join(' ') === tab;
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

.nav-bar {
  @include flexbox(row, space-between, center);
  border-bottom: 1px solid $gray_dark;
  box-shadow: 1px 1px 1px $gray_medium;

  .pixata-heading-link {
    text-decoration: none;
    color: black;

    .pixata-heading {
      padding: 0.8rem;
      font-size: 2rem;
      font-family: $font-secondary;
    }
  }

  .profile-container {
    width: 25%;
    @include flexbox(row, center, center);
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
    background: $color_primary;
    border: none;
    font-size: 0.9rem;
    outline: none;
    color: white;
    cursor: pointer;
  }
}
.text-center {
  @include text-position(center);
}

.flex-center {
  @include flexbox(row, center, center);

  .tab-btn {
    border: none;
    margin: 10px;
    font-size: 1.2rem;
    padding: 12px;
    background: $color_primary;
    outline: none;
    cursor: pointer;
    color: white;
  }

  .active {
    border: 1px solid $color_primary;
    background: $color_white;
    color: $color_primary;
  }
}

.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
