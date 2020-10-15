<template>
  <div class="margin: 0 0 20px 0;">
    <div class="heading">My Profile</div>
    <div
      style="
        display: flex;
        align-items: center;
        padding: 12px;
        justify-content: center;
      "
    >
      <div style="width: 20%">
        <img
          :src="`${staticUrl}users/${photo}`"
          :alt="photo"
          class="profile-image"
        />
      </div>
      <div class="wrapper">
        <div class="info-box">
          <div style="margin-bottom: 5px">{{ firstName + ' ' + lastName }}</div>
        </div>
        <div class="info-box">
          <div style="margin-bottom: 5px">{{ userName }}</div>
        </div>
        <div class="info-box">
          <div style="margin-bottom: 5px">{{ email }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Constant from '../../constant/Constant';

export default {
  name: 'GetUser',
  props: ['firstName', 'lastName', 'userName', 'email', 'photo'],
  computed: {
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

.heading {
  margin: 20px 0px;
  text-align: center;
  text-transform: uppercase;
  font-size: 2rem;
  position: relative;

  &::after {
    content: '';
    border-bottom: 2px solid $color_primary;
    position: absolute;
    width: 20%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}

.profile-image {
  height: 200px;
  width: 200px;
  border-radius: 50%;
}

.wrapper {
  margin: 0px 2rem;
  font-size: 2rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-box {
  display: flex;
  width: 50%;
  align-items: center;
}
</style>
