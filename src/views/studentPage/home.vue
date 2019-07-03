<template>
  <div>
    <div class="info-stu" v-if="stu_info">
      <p>学院：{{stu_info.academy}}</p>
      <p>专业班级：{{stu_info.class_name}}</p>
      <p>姓名：{{stu_info.stuent_name}}</p>
      <p>学号：{{stu_info.stuent_id}}</p>
      <p style="color:#409EFF">当前状态：{{status}}</p>
      <p>截止时间：5月17日 22:00</p>
      <el-button size="mini" type="primary" @click="seeMySubmit">{{typeText}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this._global.username = window.localStorage.getItem("username");
    var that = this;
    this.stu_info = this._global.stu_info;
    axios
      .get("/api/getstatus", {
        params: {
          username: this._global.username
        }
      })
      .then(res => {
        console.log(this._global.username);
        console.log(res.data.msg);
        var is_finish = res.data.msg.is_finish;
        var is_pass = res.data.msg.is_pass;
        var is_submit = res.data.msg.is_submit;

        that._global.status = res.data.msg; //提交状态
        if (is_submit === "0") this.status = "已提交";
        else {
          this.status = "未填写/提交";
          this.typeText = "立即填写";
        }
      })
      .catch(err => {
        this.$message.info({
          title: "消息",
          message: err,
          duration: 3000
        });
      });
  },
  data() {
    return {
      status: "-1",
      typeText: "查看我的提交",
      time: new Date(),
      data: undefined,
      stu_info: undefined
    };
  },
  methods: {
    seeMySubmit() {
      this.$router.push("/student/comprehensive");
    }
  }
};
</script>


<style>
.info-stu {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  margin-left: 400px;
  width: 280px;
  padding: 30px;
  border: 1px solid #ededed;
}
</style>

