<template>
  <router-view :key="$route.fullpath" />
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  font-family: 'Raleway', sans-serif;
  box-sizing: border-box;
  width: 100%;
}

body {
  height: 100%;
}
</style>
