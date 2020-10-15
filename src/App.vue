<template>
  <router-view :key="$route.fullpath" />
</template>

<style lang="scss">
$font_primary: 'Raleway', sans-serif;

* {
  padding: 0;
  margin: 0;
  font-family: $font_primary;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}
</style>
