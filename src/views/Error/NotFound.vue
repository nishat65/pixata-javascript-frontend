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
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(45deg, #ffffff, #c1dedc);
}

.face-container {
  position: absolute;
  right: 10%;
  transform: translateX(-20%);
}

.face {
  height: 200px;
  width: 200px;
  background: orangered;
  border-radius: 50%;
  margin: auto;
  position: relative;
}

.eye-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: 35px;
}

.left-eye {
  background: white;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  position: relative;
}

.left-eye::after {
  content: '';
  background: black;
  height: 20px;
  width: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.right-eye {
  background: white;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  position: relative;
}

.right-eye::after {
  content: '';
  background: black;
  height: 20px;
  width: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.nose {
  height: 30px;
  width: 30px;
  position: absolute;
  top: 45%;
  left: 41%;
  border-top: 0px solid transparent;
  border-right: 15px solid transparent;
  border-left: 15px solid transparent;
  border-bottom: 30px solid white;
}

.mouth {
  background: white;
  width: 60%;
  bottom: 40px;
  right: 42px;
  height: 6%;
  position: absolute;
}

.align-text {
  font-size: 2rem;
  text-align: center;
}
</style>
