<template>
  <div class="container">
    <div class="face-container">
      <div class="face">
        <div class="eye-container">
          <div class="left-eye"></div>
          <div class="right-eye"></div>
        </div>
        <div class="nose"></div>
        <div class="mouth"></div>
      </div>
    </div>
    <div class="align-text">
      <h1>Page not found</h1>
      <router-link to="/">SIGN UP</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color_primary: #268c83;
$color_sky_blue: #499e9721;
$gray_dark: #969595;
$gray_medium: #c5c5c5;

$camera-body: #81bcb7;

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

.container {
  height: 100vh;
  @include flexbox(column, center, center);
  background: linear-gradient(45deg, $color_white, $color_sky_blue);

  .face-container {
    .face {
      height: 20rem;
      width: 20rem;
      background: orangered;
      border-radius: 50%;
      margin: auto;
      position: relative;
      margin-bottom: 4rem;
    }

    .eye-container {
      @include flexbox(row, space-evenly, center);
      position: absolute;
      top: 3rem;
      width: 16rem;
      transform: translateX(2rem);
    }

    .left-eye {
      background: $color_white;
      height: 5rem;
      width: 5rem;
      border-radius: 50%;
      position: relative;
    }

    .left-eye::after {
      content: '';
      background: $color_black;
      height: 2rem;
      width: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }

    .right-eye {
      background: $color_white;
      height: 5rem;
      width: 5rem;
      border-radius: 50%;
      position: relative;
    }

    .right-eye::after {
      content: '';
      background: $color_black;
      height: 2rem;
      width: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }

    .nose {
      height: 3rem;
      width: 3rem;
      position: absolute;
      top: 45%;
      left: 41%;
      border-top: 0px solid transparent;
      border-right: 1.5rem solid transparent;
      border-left: 1.5rem solid transparent;
      border-bottom: 3rem solid $color_white;
    }

    .mouth {
      background: $color_white;
      width: 60%;
      bottom: 4rem;
      right: 4.2rem;
      height: 6%;
      position: absolute;
    }
  }

  .align-text {
    font-size: 2rem;
    @include text-position(center);
  }
}
</style>
