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
        <router-link class="nav-profile-name" :to="{ name: 'Post' }">
          <div>{{ myData.username }}</div>
        </router-link>
        <router-link style="width: 20px; color: black" to="/settings"
          ><i class="fas fa-cog"></i
        ></router-link>
        <button @click="signOut()" class="sign-out-btn">Sign out</button>
      </div>
    </nav>
    <div class="flex-col-center" v-if="!load">
      <div class="card" v-for="(post,postIndex) in posts" :key="post._id">
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
            {{ `${roundToOnePlace(post.avgRatings)} stars` }}
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

        <h3 style="margin: 0 10px">Post comment</h3>
        <div
          class="comment-container"
        >
          <input v-model="ratingBox[postIndex]" class="comment-star" type="text" />
          <textarea
            v-model="commentBox[postIndex]"
            class="comment-txt-box"
            placeholder="Comment"
          ></textarea>
          <button
            @click="submitPost(post._id, postIndex)"
            class="comment-post-btn"
            :disabled="reviewLoading"
          >
            <div v-if="!reviewLoading">Post</div>
            <div v-else>
              <MiniLoader />
            </div>
          </button>
        </div>
        <div
          class="review-box"
          v-for="review in post.reviews"
          :key="review._id"
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
            <div v-show="myData._id === review.user._id" class="icons-card">
              <i
                style="cursor: pointer; color: #f75050"
                class="far fa-trash-alt"
                @click="delReview(review._id)"
              ></i>
              <!-- <i class="fas fa-pen-alt"></i> -->
            </div>
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
import { mapActions, mapState } from 'vuex';

import MiniLoader from '../Loader/Loader.vue';
import Loader from '../Loader/MediumLoader.vue';
import Constant from '../../constant/Constant';
import LocalStorage from '../../utils/localStoragePersist';
import { findByIndex } from '../../utils/factoryFunctions';

export default {
  name: 'Post',
  components: {
    Loader,
    MiniLoader,
  },
  data() {
    return {
      commentBox: [],
      ratingBox: [],
    };
  },
  methods: {
    ...mapActions({
      getAllPosts: 'getAllPosts',
      postReview: 'postReview',
      deleteReview: 'deleteReview',
      getMyData: 'getMyData',
    }),
    signOut() {
      LocalStorage.removeItemLocalStorage('token');
      this.$router.push('/signIn');
    },
    submitPost(post, postIndex) {
      const comments = findByIndex(this.commentBox, postIndex);
      const ratings = findByIndex(this.ratingBox, postIndex);
      const review = { post, rating: +ratings, comments };
      this.postReview(review);
    },
    delReview(id) {
      this.deleteReview(id);
    },
    roundToOnePlace(num) {
      return +num.toFixed(1);
    },
  },
  async created() {
    this.getAllPosts();
    this.getMyData();
  },
  computed: {
    ...mapState({
      load: (state) => state.post.loading,
      posts: (state) => state.post.posts,
      reviewLoading: (state) => state.review.reviewLoading,
      myData: (state) => state.user.myData,
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

.comment-container {
  margin: 4px 10px;
  display: flex;
  align-items: center;

  .comment-star {
    width: 30px;
    height: 50px;
    outline: none;
    border: 1px solid #499e97;
  }

  .comment-txt-box {
    margin: 8px;
    height: 50px;
    width: 430px;
    resize: none;
    padding: 5px;
    outline: none;
    border: 1px solid #499e97;
  }

  .comment-post-btn {
    width: 60px;
    border: none;
    padding: 8px;
    background: #499e97;
    color: #fff;
    height: 50px;
    outline: none;
    cursor: pointer;

    &:disabled {
    background: gray;
    cursor: not-allowed;
  }
  }
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
  position: relative;

  .icons-card {
    transform: translateX(95%);
    position: absolute;
  }
}

.review-image-content {
  height: 20px;
  width: 20px;
  border-radius: 50%;
}
</style>
