<template>
  <div>
    <div class="info-stu" v-if="stu_info">
      <p>学院：{{stu_info.academy}}</p>
      <p>专业班级：{{stu_info.class_name}}</p>
      <p>姓名：{{stu_info.stuent_name}}</p>
      <p>学号：{{stu_info.stuent_id}}</p>

    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.stu_info = this._global.stu_info;
  },
  data() {
    return {
      status: "已提交",
      time: new Date(),
      stu_info: undefined,
    };
  },
  methods: {
  }
};
</script>


<style>
.info-stu {
  display: flex;
  margin-top: 40px;
  flex-direction: column;
  margin-left: 400px;
  width: 280px;
  padding: 30px;
  border: 1px solid #ededed;
}

</style>

