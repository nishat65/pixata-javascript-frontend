<template>
  <div>
    <div style="margin: 12px 0; text-align: center">My Profile</div>
    <div style="display: flex; align-items: center; padding: 12px">
      <img
        :src="`${staticUrl}users/${myData.photo}`"
        :alt="myData.photo"
        class="profile-image"
      />
      <div style="margin: 0 2rem; font-size: 1.1rem">
        <div style="display: flex; width: 50%; align-items: center">
          <div style="color: #268c83">First Name</div>
          <div>{{ myData.firstname }}</div>
        </div>
        <div style="display: flex; width: 50%; align-items: center">
          <div style="color: #268c83">Last Name</div>
          <div>{{ myData.lastname }}</div>
        </div>
        <div style="display: flex; width: 50%; align-items: center">
          <div style="color: #268c83">Username</div>
          <div>{{ myData.username }}</div>
        </div>
        <div style="display: flex; width: 50%; align-items: center">
          <div style="color: #268c83">Email</div>
          <div style="margin-left: 20px">{{ myData.email }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

import Constant from '../../constant/Constant';

export default {
  name: 'GetUser',
  data() {
    return {
      myData: {},
    };
  },
  async created() {
    try {
      const usr = await axios.get(`${Constant.baseUrl}user/me`);
      this.myData = { ...usr.data.data.user };
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    staticUrl() {
      return Constant.staticUrl;
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-image {
  height: 200px;
  width: 200px;
  border-radius: 50%;
}
</style>
