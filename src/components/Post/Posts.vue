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
        <router-link style="width: 2rem; color: black" to="/settings"
          ><i style="font-size: 1.5rem" class="fas fa-cog"></i
        ></router-link>
        <button @click="signOut()" class="sign-out-btn">Sign out</button>
      </div>
    </nav>
    <div class="flex-col-center">
      <div class="card" v-for="(post, postIndex) in posts" :key="post._id">
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
        <div class="comment-container">
          <input
            v-model="ratingBox[postIndex]"
            class="comment-star"
            type="text"
          />
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
    <div v-show="posts.length !== 0" ref="divAsTarget" id="lastpage">
      <div v-if="load">
        <Loader />
      </div>
      <div v-else></div>
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
      observer: null,
      page: 1,
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
    handleIntersect(entries) {
      if (this.posts.length === 0) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.page += 1;
        }
      });
      this.paginationTriggers();
    },
    paginationTriggers() {
      return this.pagination;
    },
  },
  created() {
    this.getAllPosts(this.page);
    this.getMyData();
  },
  mounted() {
    const options = {
      root: null,
      rootMargin: '0px',
    };
    this.observer = new IntersectionObserver(this.handleIntersect, options);
    this.observer.observe(this.$refs.divAsTarget);
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
    pagination() {
      return this.getAllPosts(this.page);
    },
  },
  beforeDestroy() {
    this.observer.unobserve(this.$refs.divAsTarget);
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

.margin-5-0 {
  margin: 0.5rem 0rem;
}

.margin-5 {
  margin: 0.5rem;
}

.nav-bar {
  @include flexbox(row, space-between, center);
  border-bottom: 1px solid $gray_dark;
  box-shadow: 1px 1px 1px $gray_medium;

  .pixata-heading {
    padding: 0.8rem;
    font-size: 3.5rem;
    font-family: $font-secondary;
  }

  .profile-container {
    width: 25%;
    @include flexbox(row, center, center);
  }

  .nav-profile-image {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }

  .nav-profile-name {
    text-decoration: none;
    color: black;
    width: 25%;
    margin: 0 1.2rem;
    font-size: 1.7rem;
  }

  .sign-out-btn {
    width: 10rem;
    padding: 1.3rem;
    margin: 0 1.4rem;
    background: $color_primary;
    border: none;
    font-size: 1.5rem;
    outline: none;
    color: white;
    cursor: pointer;
  }
}

.flex-col-center {
  @include flexbox(column, center, center);

  .card {
    margin: 2rem 0;
    width: 60rem;
    border: 1px solid #969595;
    box-shadow: 3px 2px 5px 1px #c5c5c5;
    font-size: 1.65rem;

    .card-image-content {
      display: flex;
      padding: 0.8rem;

      .container-profile-image {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
      }
    }

    .container-post-image {
      padding: 0.8rem;
      height: 34rem;
    }

    .comment-container {
      margin: 0.4rem 1rem;
      @include flexbox(row, flex-start, center);

      .comment-star {
        width: 3rem;
        height: 5rem;
        outline: none;
        border: 1px solid $color_primary;
      }

      .comment-txt-box {
        margin: 0.8rem;
        height: 5rem;
        width: 43rem;
        resize: none;
        padding: 0.5rem;
        outline: none;
        border: 1px solid $color_primary;
      }

      .comment-post-btn {
        width: 6rem;
        border: none;
        padding: 0.8rem;
        background: $color_primary;
        color: #fff;
        height: 5rem;
        outline: none;
        cursor: pointer;

        &:disabled {
          background: gray;
          cursor: not-allowed;
        }
      }
    }

    .review-box {
      @include flexbox(column, center, self-end);
      margin: 0.5rem;
      background: $color_sky_blue;
      padding: 0.2rem 1rem;
      width: 90%;
      position: relative;

      .icons-card {
        position: absolute;
        right: 0;
        transform: translateX(-0.8rem);
      }

      .flex-center {
        @include flexbox(row, center, center);

        .review-image-content {
          height: 20px;
          width: 20px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
