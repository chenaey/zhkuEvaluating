<template>
  <div id="app">
    <div>
      <router-view/>
    </div>
  </div>
</template>
                      
<script>
import Home from "./views/managePage/Home.vue";
import About from "./views/About.vue";
import Footer from "./views/footer/footer.vue";
export default {
  name: "app",
  components: { Home, Footer },
  methods: {}
};
</script>


<style>
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
