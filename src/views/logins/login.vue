<template>
  <div class="body">
    <div class="box">
      <div class="login" v-loading="loading">
        <div id="tt">
          <img id="logo" src="@/assets/image/logo.png">
          <p>仲恺农业工程学院综合测评管理系统</p>
        </div>

        <!-- <p id="tt1">登陆</p> -->
        <p id="tt2">使用你的教务系统账号登陆</p>

        <el-input
          style=" margin-bottom: 10px;"
          v-model="username"
          autofocus
          placeholder="请输入学号或账号"
          maxlength="12"
          onkeyup="value=value.replace(/[^\d]/g,'')"
        ></el-input>

        <el-input v-model="password" show-password placeholder="请输入密码"></el-input>
        <el-button style="width:100%;" type="primary" @click="toLogin">登陆</el-button>
      </div>
    </div>
  </div>
</template>

<style>
.dody {
  background: #fff;
  direction: ltr;
  font-size: 15px;
  line-height: 1.4286;
  margin: 0;
  padding: 0;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 130px;
}

.login {
  padding: 30px;
  height: auto;
  min-height: 280px;
  width: 460px;
  border: 1px solid #ececec;
}

#logo {
  width: 50px;
  height: 50px;
}

#tt {
  display: flex;
  margin-left: -20px;
  justify-content: center;
  align-content: center;
  align-items: center;
}
#tt p {
  margin-top: 10px;
  display: flex;
  font-size: 20px;
  justify-content: center;
  align-content: center;
  align-items: center;
}

#tt1 {
  display: flex;
  font-size: 18px;
  justify-content: center;
}

#tt2 {
  display: flex;

  font-size: 15px;
  justify-content: center;
}
</style>

<script>
export default {
  // let storage = window.localStorage;
  //     storage.setItem("username", this.username);
  //     storage.setItem("password", btoa(this.password));
  // console.log(typeof storage["c"]);
  //             //第三种方法读取
  //             var c=storage.getItem("c");
  //            console.log(c);
  //  storage.clear();
  //  storage.removeItem("a");
  //          console.log(storage.a);

  methods: {
    toLogin() {
      this.loading = true;
      // if (this.password === "admin" && this.username === "admin") {
      //   this.$router.push("/manage/home");
      // }
      if (this.username === undefined || this.username.length < 11) {
        this.$message({
          message: "请输入正确的学号",
          type: "error"
        });
        this.loading = false;

        return;
      }
      if (this.password === undefined) {
        this.$message({
          message: "请输入密码",
          type: "error"
        });
        this.loading = false;

        return;
      }

      axios
        .post("api/login", {
          username: this.username,
          password: this.password,
          _year: this._global._year
        })
        .then(res => {
          console.log(res);
          if (res.data.result === "success") {
            let storage = window.localStorage;
            storage.setItem("username", this.username);
            storage.setItem("token", this.username);
            storage.setItem("password", btoa(this.password));
            this._global.username = this.username; //学号
            // if (this.username == "201721314106") {
            //   this._global.isAdmin = this.true; //学号
            // }

            this._global.img0 = res.data.msg.img[0];
            this._global.img1 = res.data.msg.img[1];
            this._global.stu_info = res.data.msg.stu_info[0];
            this._global.originalScore = res.data.msg.stu_score;

            //学生
            if (res.data.code === "-1" || res.data.code === "0") {
              this.$router.push("/student/home");
            }
            //班委
            else if (res.data.code === "1") {
              this.$router.push("/manage/home");
            }
            //管理员
            else if (res.data.code === "2") {
              this.$router.push("/manage/home");
            }
          } else {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          }
          this.loading = false;
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
          this.loading = false;
        });
    }
  },

  data: function() {
    return {
      username: undefined,
      password: undefined,
      loading: false
    };
  }
};
</script>
