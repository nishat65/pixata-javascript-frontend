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
          ><i style="font-size: 1.5rem" class="fas fa-cog"></i
        ></router-link>
        <button @click="signOut()" class="sign-out-btn">Sign out</button>
      </div>
    </nav>
    <!-- body of the post -->
    <div class="container">
      <div class="image-container">
        <div class="image-card">
          <i v-if="!url" style="font-size: 20rem" class="fas fa-camera"></i>
          <img v-else :src="url" :alt="file[0].name" />
        </div>
      </div>
      <div class="form-container">
        <form class="form" @submit.prevent="submitPostData()">
          <input
            type="file"
            ref="file"
            @input="inputFileHandler"
            accept="image/*"
          />
          <textarea
            rows="6"
            v-model="description"
            placeholder="Description"
          ></textarea>
          <input type="text" v-model="tags" placeholder="Hashtags" />
          <button class="submit-btn" type="submit" :disabled="postLoading">
            <div v-if="!postLoading">Update</div>
            <div v-else>
              <MiniLoader />
            </div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

import Constant from '../../constant/Constant';
import LocalStorage from '../../utils/localStoragePersist';
import MiniLoader from '../Loader/Loader.vue';

export default {
  name: 'Create-Post',
  components: {
    MiniLoader,
  },
  data() {
    return {
      description: '',
      file: null,
      tags: '',
      url: null,
    };
  },
  methods: {
    ...mapActions({
      getMyData: 'getMyData',
      createPost: 'createPost',
    }),
    signOut() {
      LocalStorage.removeItemLocalStorage('token');
      this.$router.push('/signIn');
    },
    inputFileHandler(e) {
      const { files } = e.target;
      this.file = this.$refs.file.files;
      const imageUrl = URL.createObjectURL(files[0]);
      this.url = imageUrl;
    },
    submitPostData() {
      const formData = new FormData();
      formData.append('photo', this.file[0]);
      formData.append('hashtags', this.tags);
      formData.append('description', this.description);
      this.createPost(formData);
    },
  },
  async created() {
    this.getMyData();
  },
  computed: {
    ...mapState({
      myData: (state) => state.user.myData,
      postLoading: (state) => state.post.loading,
    }),
    staticUrl() {
      return Constant.staticUrl;
    },
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
    color: $color_black;
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
    color: $color_white;
    cursor: pointer;
  }
}

.container {
  @include flexbox(row, center, center);
  margin: 5rem 0;

  .image-container {
    @include flexbox(row, center, center);
    width: 35rem;
    height: 40rem;
    box-shadow: -7px 7px 8px 0px $gray_medium;
    border-radius: 1.5rem 0 0 1.5rem;

    .image-card {
      @include flexbox(row, center, center);
      width: 30rem;
      height: 35rem;
      margin: 2rem;

      img {
        width: inherit;
        height: inherit;
      }
    }
  }

  .form-container {
    width: 35rem;
    height: 40rem;
    box-shadow: 4px 7px 8px 0 $gray_medium;
    border-radius: 0 1.5rem 1.5rem 0;

    .form {
      @include flexbox(column, space-evenly, inherit);
      height: inherit;
      width: inherit;
      padding: 2rem;

      input[type='text'] {
        margin: 0 1rem;
        border: 1px solid $color_primary;
        outline: none;
        padding: 0.8rem;
        border-radius: 1.5rem;
      }

      input[type='file'] {
        margin: 0 1rem;
        align-self: center;
        border: 1px solid $color_primary;
        outline: none;
        padding: 0.8rem;
        border-radius: 1.5rem;
      }

      textarea {
        margin: 0 1rem;
        resize: none;
        border: 1px solid $color_primary;
        outline: none;
        padding: 0.8rem;
        border-radius: 1.5rem;
      }

      .submit-btn {
        align-self: center;
        width: 15rem;
        padding: 1.3rem;
        margin: 0 1.4rem;
        background: $color_primary;
        border: none;
        font-size: 1.5rem;
        outline: none;
        color: $color_white;
        text-transform: uppercase;
        cursor: pointer;

        &:disabled {
          background: gray;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
