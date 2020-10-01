<template>
  <div class="container">
    <div v-if="!loadingState">
      <p
        :class="{
          success: !$store.state.auth.error,
          error: $store.state.auth.error,
        }"
      >
        {{ confirmQuery }}
      </p>
    </div>
    <div style="margin: 2rem 0" v-else>
      <Loader />
    </div>
    <router-link to="/signIn">Back to Sign In</router-link>
  </div>
</template>

<script>
import Loader from '@/components/Loader/Loader.vue';

export default {
  name: 'ConfirmEmail',
  components: {
    Loader,
  },
  created() {
    this.$store.dispatch('confirmEmail', this.$route.params.token);
  },
  computed: {
    confirmQuery() {
      return this.$store.state.auth.error
        ? 'There is no user with that email address'
        : 'Email confirmed';
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  text-align: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(45deg, #ffffff, #c1dedc);

  p {
    font-size: 3rem;
    margin: 2rem 0;
  }

  .success {
    color: #268c8394;
  }

  .error {
    color: red;
  }
}
</style>
