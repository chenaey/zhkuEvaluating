<template>
  <div>
    <div>
      <img src="./1.gif">
    </div>
  </div>
</template>

<script>
// import persionInfo from "./persionInfo.vue";

export default {
  // name: "app",
  // components: {
  //   persionInfo
  // },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleViewClick(e) {
      console.log(e);
      console.log(e.index);

      console.log(e.active);
      console.log(e.route);
    }
  }
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

img {
  margin-left: 20px;
  width: 660px;
  height: 660px;
}
.logo {
  height: 70px;
  background: #fbfef5;
}

.header-text {
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  font-size: 24px;
  margin-top: 15px;
  color: #fbfef5;
  letter-spacing: 2px;
}
</style>
