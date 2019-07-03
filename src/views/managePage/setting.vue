<template>
  <div>
    <i class="el-icon-setting">年级审核安排</i>
    <el-transfer :titles="[ '班级1','班级2',]" v-model="value1" :data="data"></el-transfer>
    <el-button @click="quicklyset" size="small">快速设置</el-button>
    <el-button type="primary" @click="submit" size="small">提交</el-button>
  </div>
</template>

<style>
.el-icon-setting {
  margin-bottom: 10px;
}
.el-button {
  margin-top: 120px;
}
</style>

<script>
export default {
  data() {
    return {
      data: [
        {
          key: 1,
          label: "信计151"
        },
        {
          key: 2,
          label: "信计152"
        },
        {
          key: 3,
          label: "信计153"
        },
        {
          key: 4,
          label: "信计154"
        },
        {
          key: 5,
          label: "统计151"
        },
        {
          key: 6,
          label: "统计152"
        }
      ],
      value1: []
    };
  },
  methods: {
    submit() {
      console.log(this.value1);
    },
    quicklyset() {
      this.value1 = [1, 3, 5];
    }
  }
};
</script>
