<template>
  <div>
    <div>
      <el-button type="primary" v-on:click="showExpand">展开所有</el-button>
    </div>
    <el-table
      :data="tableData.filter(data =>!search ||  data.name.toString().includes(search)||data.stu_id.toString().includes(search))"
      border
      stripe
      size="mini"
      style="width:100%"
      height="600"
      header-align="center"
      :default-expand-all="expandAll"
    >
      <el-table-column type="expand" v-if="!showAll">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="性别">
              <span>{{ props.row.gender }}</span>
            </el-form-item>
            <el-form-item label="身份证号码">
              <span>{{ props.row.card_id }}</span>
            </el-form-item>

            <el-form-item label="电话号码">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="学院">
              <span>{{ props.row.academe }}</span>
            </el-form-item>
            <!-- <el-form-item label="专业班级">
              <span>{{ props.row.pro_class }}</span>
            </el-form-item>-->
            <el-form-item label="入学年度">
              <span>{{ props.row.start_year }}</span>
            </el-form-item>
            <el-form-item label="干部名称">
              <span>{{ props.row.is_cadre}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column header-align="center" prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column prop="stu_id" label="学号" width="130"></el-table-column>

      <el-table-column v-if="showAll" prop="gender" label="性别" width="50"></el-table-column>
      <el-table-column v-if="showAll" prop="card_id" label="身份证号码" width="180"></el-table-column>
      <el-table-column v-if="showAll" prop="phone" label="电话号码" width="120"></el-table-column>
      <el-table-column v-if="showAll" prop="academe" label="学院" width="120"></el-table-column>
      <el-table-column prop="pro_class" label="专业班级" width="80"></el-table-column>
      <el-table-column v-if="showAll" prop="start_year" label="入学年度" width="80"></el-table-column>

      <el-table-column fixed="right" prop="is_cadre" label="是否干部" width="80"></el-table-column>
      <el-table-column v-if="showAll" fixed="right" prop="is_cadre" label="干部名称" width="80"></el-table-column>

      <el-table-column fixed="right" prop="academic_score" label="学业分" width="80">
        <template slot-scope="{row,$index}">
          <el-input size="mini" v-if="showEdit[$index]" v-model="row.academic_score"></el-input>
          <span v-if="!showEdit[$index]">{{row.academic_score}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" prop="academic_rank" label="排名" width="50"></el-table-column>

      <el-table-column fixed="right" prop="thought_score" label="思想分" width="80">
        <template slot-scope="{row,$index}">
          <el-input size="mini" v-if="showEdit[$index]" v-model="row.thought_score"></el-input>
          <span v-if="!showEdit[$index]">{{row.thought_score}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" prop="academic_rank" label="排名" width="50"></el-table-column>

      <el-table-column fixed="right" prop="stylistic_score" label="文体分" width="80">
        <template slot-scope="{row,$index}">
          <el-input size="mini" v-if="showEdit[$index]" v-model="row.stylistic_score"></el-input>
          <span v-if="!showEdit[$index]">{{row.stylistic_score}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" prop="stylistic_rank" label="排名" width="50"></el-table-column>

      <el-table-column fixed="right" prop="comprehensive_score" label="综合分" width="65"></el-table-column>
      <el-table-column
        type="index"
        :index="comprehensiveSort"
        fixed="right"
        prop="comprehensive_rank"
        label="排名"
        width="50"
      ></el-table-column>

      <el-table-column fixed="right" align="right" width="200">
        <template
          slot="header"
          slot-scope="scope"
          @click.native="handleSearch(scope.$index, scope.row)"
        >
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <div style="display:flex;flexdirection:row;">
            <el-button size="mini" @click.native="handleEdit(scope.$index, scope.row)">编辑</el-button>

            <!-- <el-button type="text" size="small"  @click.native="handleCancel(scope.$index, row)" v-if="!showBtn[$index]">完成</el-button> -->

            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>

      <!-- <el-table-column fixed="right" label="操作" width="280">
        <el-input width="50%" size="mini" placeholder="输入关键字搜索" v-model="search"></el-input>

        <template slot-scope="scope">
          <div style="display:flex;flexdirection:row;">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>-->

      <!-- <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
export default {
  name: "persionInfo",
  methods: {
    //没有用到的方法 临时解决报错问题

    handleSearch() {},
    //点击编辑
    handleEdit(index, row) {
      this.showEdit[index] = true;
      this.showBtn[index] = true;
      this.$set(this.showEdit, row, true);
      this.$set(this.showBtn, row, true);
    },
    showExpand() {
      this.expandAll = !this.expandAll;
      console.log(this.expandAll);
    },
    //取消编辑
    handelCancel(index, row) {
      this.getContentList();
      this.showEdit[index] = false;
      this.showBtn[index] = false;
    },
    //综合分排序 index索引 测试注意:这不是排序
    comprehensiveSort(index) {
      return index + 1;
    },

    // handleEdit(index, row) {
    //   this.handleEdit = !this.handleEdit;
    //   row.thought_score = 21312321321;
    //   console.log(index, row);
    // },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },

  data: function() {
    return {
      search: "",

      expandAll: false,
      editText: "",
      isEdit: false,
      showAll: false,
      showEdit: [], //显示编辑框
      showBtn: [],
      showBtnOrdinary: true,

      tableData: [
        {
          name: "张三四",
          stu_id: 201721314106,
          gender: "男",
          card_id: 441234199807182814,
          phone: 12345678910,
          academe: "计算科学学院",
          pro_class: "信计181",
          start_year: 2017,
          is_cadre: "否",
          academic_score: 30,
          thought_score: 32,
          stylistic_score: 90
        },
        {
          name: "张三四",
          stu_id: 201721314106,
          gender: "男",
          card_id: 441234199807182814,
          phone: 12345678910,
          academe: "计算科学学院",
          pro_class: "信计181",
          start_year: 2017,
          is_cadre: "否",
          academic_score: 30,
          thought_score: 32,
          stylistic_score: 90
        },
        {
          name: "张三四",
          stu_id: 201721314106,
          gender: "男",
          card_id: 441234199807182814,
          phone: 12345678910,
          academe: "计算科学学院",
          pro_class: "信计181",
          start_year: 2017,
          is_cadre: "否",
          academic_score: 30,
          thought_score: 32,
          stylistic_score: 90
        }
      ]
    };
  }
};
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

