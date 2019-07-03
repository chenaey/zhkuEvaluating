<template>
  <div class="page-info">
    <el-input size="small" v-model="info.name" disabled>
      <template slot="prepend">姓名/ID</template>
    </el-input>
    <el-input size="small" v-model="info.degree" disabled>
      <template slot="prepend">登陆身份</template>
    </el-input>

    <el-input size="small" v-model="info.academe" disabled>
      <template slot="prepend">所属学院</template>
    </el-input>
    <el-input size="small" v-model="info.pro_class" disabled>
      <template slot="prepend">专业班级</template>
    </el-input>
    <el-input size="small" v-model="info.card_id" disabled>
      <template slot="prepend">身份证号码</template>
    </el-input>
    <el-input size="small" v-model="info.stu_id" disabled>
      <template slot="prepend">学号</template>
    </el-input>
    <el-input size="small" v-model="info.start_year" disabled>
      <template slot="prepend">入学年度</template>
    </el-input>
    <el-input size="small" v-model="info.phone" :disabled="disable">
      <template slot="prepend">手机号码</template>
    </el-input>
    <el-input size="small" v-model="info.email" :disabled="disable">
      <template slot="prepend">电子邮件</template>
    </el-input>

    <el-button size="small" type="primary" @click="isDisable">{{btntype}}</el-button>
  </div>
</template>
<style>
.page-info {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.el-input {
  margin-right: 40px;
  margin-bottom: 10px;
}
</style>

<script>
export default {


  data() {
    return {
      disable: true,
      btntype: "修改",
      info: {
        name: "占山",
        degree: "管理员",
        card_id: 441222211291019812,
        stu_id: 201721322221,
        academe: "计算科学学院",
        pro_class: "信计162",
        start_year: 2019,
        phone: 120202020202,
        email: "17273561@qq.com"
      }
    };
  },
  methods: {
    isDisable() {
      this.disable = !this.disable;
      if (!this.disable) {
        this.btntype = "完成";
      } else {
        this.btntype = "修改";
      }
    }
  }
};
</script>


