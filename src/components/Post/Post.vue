<template>
  <div>
    <nav class="nav-bar">
      <div class="pixata-heading">Pixata</div>
      <div class="profile-container">
        <img
          :src="`${staticUrl}users/${myData.photo}`"
          :alt="myData.photo"
          class="nav-profile-image"
        />
        <div class="nav-profile-name">{{ myData.username }}</div>
        <button @click="signOut()" class="sign-out-btn">Sign out</button>
      </div>
    </nav>
    <div class="flex-col-center" v-if="!load">
      <div class="card" v-for="(post, index) in myPosts" :key="index">
        <div class="card-image-content" style="display: flex; padding: 8px">
          <img
            :src="`${staticUrl}users/${post.user.photo}`"
            :alt="post.user.photo"
            class="container-profile-image"
          />
          <!-- <div style="margin-left: 10px">{{ post.user.username }}</div> -->
        </div>
        <div>
          <img
            :src="`${staticUrl}posts/${post.photo}`"
            :alt="post.photo"
            class="container-post-image"
          />
        </div>
        <div style="margin: 0.5rem">
          <div class="margin-5-0">
            {{ `${post.avgRatings} stars` }}
          </div>
          <div class="margin-5-0">{{ post.description }}</div>
          <div class="margin-5-0" style="color: blue">
            {{
              post.hashtags
                .split(',')
                .map((el) => `#${el}`)
                .join('')
            }}
          </div>
        </div>
        <h3 style="margin: 0 10px">Comments</h3>
        <div
          class="review-box"
          v-for="(review, index) in post.reviews"
          :key="index"
        >
          <div class="flex-center">
            <img
              :src="`${staticUrl}users/${review.user.photo}`"
              :alt="review.user.photo"
              class="review-image-content"
            />
            <div style="margin: 0.5rem">{{ review.user.username }}</div>
          </div>
          <div class="flex-center">
            <div class="margin-5-0" style="width: 100px">
              {{ `${review.rating} stars` }}
            </div>
            <div class="margin-5-0">{{ review.comments }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <Loader />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex';

import Loader from '../Loader/MediumLoader.vue';
import Constant from '../../constant/Constant';
import LocalStorage from '../../utils/localStoragePersist';

export default {
  name: 'Post',
  components: {
    Loader,
  },
  data() {
    return {
      myData: {},
    };
  },
  methods: {
    ...mapActions({ getMyPost: 'getMyPosts' }),
    signOut() {
      LocalStorage.removeItemLocalStorage('token');
      this.$router.push('/signIn');
    },
  },
  async created() {
    try {
      this.getMyPost();
      const usr = await axios.get(`${Constant.baseUrl}user/me`);
      this.myData = { ...usr.data.data.user };
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    ...mapState({
      load: (state) => state.post.loading,
      myPosts: (state) => state.post.posts,
    }),
    staticUrl() {
      return Constant.staticUrl;
    },
  },
};
</script>
<style lang="scss" scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.margin-5-0 {
  margin: 0.5rem 0rem;
}

.margin-5 {
  margin: 0.5rem;
}

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
  width: 25%;
  margin: 0 12px;
}

.sign-out-btn {
  width: 6rem;
  padding: 13px;
  margin: 0 1.4rem;
  background: #268c83d6;
  border: none;
  border-radius: 15px;
  font-size: 0.9rem;
  outline: none;
  color: white;
  cursor: pointer;
}

.flex-col-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  margin: 2rem 0;
  // height: 600px;
  width: 600px;
  border: 1px solid #969595;
  box-shadow: 3px 2px 5px 1px #c5c5c5;
}

.card-image-content {
  display: flex;
  padding: 8px;
}

.container-profile-image {
  height: 20px;
  width: 20px;
  border-radius: 50%;
}

.container-post-image {
  padding: 8px;
  height: 340px;
}

.review-box {
  margin: 0.5rem;
  background: #499e9721;
  padding: 0.2rem 1rem;
  width: 90%;
}

.review-image-content {
  height: 20px;
  width: 20px;
  border-radius: 50%;
}
</style>
