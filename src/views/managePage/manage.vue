<template>
  <div>
    <el-container>
      <!-- <el-header height="60px" style="background-color:#303133;">
        <el-row>
          <el-col :span="8" :offset="8">
            <div class="header-text">
              仲恺农业工程学院综合测评管理系统
              <el-button size="mini" type="warning" disabled>beat</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>-->

      <el-container>
        <el-aside width="120px">
          <el-row class="tac">
            <el-col>
              <el-menu default-active="3" class="el-menu-vertical-demo">
                <router-link to="/manage/home">
                  <el-menu-item index="0">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                  </el-menu-item>
                </router-link>

                <router-link to="/manage/info">
                  <el-menu-item index="1">
                    <i class="el-icon-view"></i>
                    <span slot="title">个人信息</span>
                  </el-menu-item>
                </router-link>

                <router-link to="/manage/class">
                  <el-menu-item index="2">
                    <i class="el-icon-sort"></i>
                    <span slot="title">班级审核</span>
                  </el-menu-item>
                </router-link>

                <router-link to="/manage/comprehensive">
                  <el-menu-item index="3">
                    <i class="el-icon-edit"></i>
                    <span slot="title">综合测评</span>
                  </el-menu-item>
                </router-link>

                <!-- <router-link to="/manage/review">
                  <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">学院审核</span>
                  </el-menu-item>
                </router-link>-->

                <router-link to="/manage/setting">
                  <el-menu-item index="5">
                    <i class="el-icon-setting"></i>
                    <span slot="title">全局设置</span>
                  </el-menu-item>
                </router-link>

                <router-link to="/student/home/">
                  <el-menu-item index="6">
                    <i class="el-icon-back"></i>
                    <span slot="title">学生综测</span>
                  </el-menu-item>
                </router-link>
                <!-- <el-menu-item index="6">
                  <i class="el-icon-setting"></i>
                  <span slot="title">数据查询</span>
                </el-menu-item>-->
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// export default {
// name: "app",
//   components: {
//     persionInfo
//   },
//   methods: {
//     handleOpen(key, keyPath) {
//       console.log(key, keyPath);
//     },
//     handleClose(key, keyPath) {
//       console.log(key, keyPath);
//     },
//     handleViewClick(e) {
//       console.log(e);
//       console.log(e.index);

//       console.log(e.active);
//       console.log(e.route);
//     }
//   }
// };
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
