<template>
  <div>
    <div class="info-page">
      <div class="my-menu">
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleNavigation">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">个人资料</el-menu-item>
          <el-menu-item index="3">综合测评</el-menu-item>
          <el-submenu index="4">
            <template slot="title">加分证明</template>
            <el-menu-item index="4-1">校级</el-menu-item>
            <el-submenu index="4-2">
              <template slot="title">院级</template>
              <el-menu-item index="4-2-1">院学生会</el-menu-item>
              <el-menu-item index="4-2-2">院青协</el-menu-item>
              <el-menu-item index="4-2-3">院团委</el-menu-item>
              <el-menu-item index="4-2-4">其它</el-menu-item>
            </el-submenu>
          </el-submenu>
          <!-- <el-menu-item index="5">消息通知</el-menu-item> -->

          <el-menu-item index="6">评选办法</el-menu-item>

          <el-menu-item index="7" disabled>综测结果</el-menu-item>
          <el-menu-item v-if="isAdmin" index="8">后台管理</el-menu-item>
          <!-- <el-menu-item index="8">后台管理</el-menu-item> -->

          <el-menu-item index="9">退出登录</el-menu-item>
        </el-menu>
      </div>

      <div class="my-main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "2",
      isAdmin: this._global.isAdmin
    };
  },

  created() {
    this._global.username = window.localStorage.getItem("username");
    console.log(this._global.username)
    if (this._global.username === "201721314106") {
      this.isAdmin = true;
    }
    this.activeIndex = this._global.activeIndex;
    // this.isAdmin = this._global.isAdmin;
  },

  methods: {
    //导航处理
    handleNavigation(key, keyPath) {
      console.log(key);
      switch (key) {
        case "1":
          this.activeIndex = "1";
          this._global.activeIndex = "1";
          this.$router.push("/student/home");
          break;
        case "2":
          this.activeIndex = "2";
          this._global.activeIndex = "2";

          this.$router.push("/student/info");
          break;
        case "3":
          this.activeIndex = "3";
          this._global.activeIndex = "3";

          this.$router.push("/student/comprehensive");
          break;
        case "8":
          this.activeIndex = "8";
          this._global.activeIndex = "8";

          this.$router.push("/manage/comprehensive");
          break;
        case "9":
          this._global.activeIndex = "1";
          this.activeIndex = "1";
          this.$router.push("/login");
          break;
        case "6":
          this._global.activeIndex = "1";
          this.activeIndex = "1";
          this.$router.push("/student/home");

          // var href=""
          window.open(
            "http://cdn.i7code.cn/%E4%BB%B2%E5%AD%A6%E5%AD%97%E3%80%942013%E3%80%9522%E5%8F%B7%EF%BC%8C%E5%85%B3%E4%BA%8E%E5%8D%B0%E5%8F%91%E3%80%8A%E4%BB%B2%E6%81%BA%E5%86%9C%E4%B8%9A%E5%B7%A5%E7%A8%8B%E5%AD%A6%E9%99%A2%E5%AD%A6%E7%94%9F%E7%BB%BC%E5%90%88%E6%B5%8B%E8%AF%84%E7%AE%A1%E7%90%86%E5%8A%9E%E6%B3%95%E3%80%8B%E7%9A%84%E9%80%9A%E7%9F%A5.pdf",
            "_blank"
          ); // 新窗口打开外链接

          // const { href } = this.$router.resolve({
          //   name: "pageLayoutEditor",
          //   query: {}
          // });
          // window.open(href, "_blank");
          // this.$router.push("/student/comprehensive");
          break;
        default:
          break;
      }
    }
  }
};
</script>


<style>
.info-page {
  margin-left: 7%;
  margin-right: 7%;
}
.my-main {
  padding-top: 10px;
}
</style>