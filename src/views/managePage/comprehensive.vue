<template>
  <div>
    <!-- <el-button type="primary" size="mini" @click="showTableAll = !showTableAll;">展示全部数据</el-button> -->
    <!-- <el-row>
      <el-col :span="3">
        <el-input v-model="stu_num" size="mini">
          <template slot="prepend">总人数</template>
        </el-input>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-input v-model="good_student_pacesetter" size="mini">
          <template slot="prepend">三好学生标兵</template>
        </el-input>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-input v-model="good_student" size="mini">
          <template slot="prepend">三好学生</template>
        </el-input>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-input v-model="good_activate" size="mini">
          <template slot="prepend">单项积极分子</template>
        </el-input>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button type="success" size="mini" @click="chooseGooodStu">一键评选</el-button>
      </el-col>
    </el-row>-->
    <!-- <el-col :span="3">
        <el-button type="success" size="mini" @click="showTableAll = !showTableAll;">导出Excel</el-button>
    </el-col>-->

    <!-- <el-input style="width:170px;margin-right:20px;" v-model="good_student_pacesetter" size="mini">
      <template slot="prepend">三好学生标兵</template>
    </el-input>

    <el-input style="width:150px;margin-right:20px;" v-model="good_student" size="mini">
      <template slot="prepend">三好学生</template>
    </el-input>
    <el-input style="width:170px;margin-right:20px;" v-model="good_activate" size="mini">
      <template slot="prepend">单项积极分子</template>
    </el-input>-->

    <el-button disabled size="mini">三好学生标兵{{good_student_pacesetter}}人</el-button>
    <el-button disabled size="mini">三好学生{{good_student}}</el-button>
    <el-button disabled size="mini">单项积极分子{{good_activate}}</el-button>
    <el-button type="success" size="mini" @click="chooseGooodStu">一键评选</el-button>
    <el-input
      style="width:200px;margin-left:520px;"
      v-model="filename"
      size="mini"
      placeholder="输入文件名，默认为 fileName"
    ></el-input>
    <el-select v-model="exporeType" size="mini">
      <el-option v-for="item in ['xlsx','txt']" :key="item" :label="item.label" :value="item"></el-option>
    </el-select>
    <el-button type="success" size="mini" @click="exportExcel">导出文件</el-button>

    <div style="margin-top:10px;margin-bottom:10px;">
      <el-button size="mini" data-id="0" @click="showWhat(1)">显示全部{{showTableData.length}}</el-button>
      <el-button size="mini" data-id="1" @click="showWhat(2)">优秀学生</el-button>
      <el-button size="mini" data-id="2" @click="showWhat(3)">三好学生</el-button>
      <el-button size="mini" data-id="3" @click="showWhat(4)">单项积极分子</el-button>
      <el-button size="mini" data-id="4" @click="showWhat(5)">优秀学生干部</el-button>
      <el-button size="mini" data-id="5" @click="showWhat(6)">学习积极分子</el-button>
      <el-button size="mini" data-id="6" @click="showWhat(7)">文体积极分子</el-button>
    </div>

    <el-table
      id="tablei"
      v-if="!showTableAll"
      :data="showTableData"
      border
      highlight-current-row
      stripe
      size="mini"
      style="width:100%"
      height="620"
      header-align="center"
      :default-expand-all="expandAll"
      v-loading="tableData.length===0"
    >
      <!-- <el-table-column type="expand" v-if="!showAll">
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
            <el-form-item label="专业班级">
              <span>{{ props.row.pro_class }}</span>
            </el-form-item>
            <el-form-item label="入学年度">
              <span>{{ props.row.start_year }}</span>
            </el-form-item>
            <el-form-item label="干部名称">
              <span>{{ props.row.is_cadre}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>-->
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column type="index" :index="indexMethod" label="#" width="45"></el-table-column>

      <el-table-column prop="name" label="姓名" width="60"></el-table-column>
      <el-table-column sortable prop="stu_id" label="学号" width="110"></el-table-column>

      <!-- <el-table-column v-if="showAll" prop="gender" label="性别" width="50"></el-table-column>
      <el-table-column v-if="showAll" prop="card_id" label="身份证号码" width="180"></el-table-column>
      <el-table-column v-if="showAll" prop="phone" label="电话号码" width="120"></el-table-column>
      <el-table-column v-if="showAll" prop="academe" label="学院" width="120"></el-table-column>-->
      <el-table-column prop="pro_class" label="专业班级" width="70"></el-table-column>
      <!-- <el-table-column v-if="showAll" prop="start_year" label="入学年度" width="80"></el-table-column> -->

      <el-table-column prop="is_cadre" label="是否干部" width="70"></el-table-column>
      <!-- <el-table-column v-if="showAll" fixed="right" prop="is_cadre" label="干部名称" width="80"></el-table-column> -->

      <el-table-column prop="academic_score" label="学业分" width="60">
        <template slot-scope="{row,$index}">
          <el-input
            size="mini"
            :autofocus="isautofocus"
            v-if="showEdit[$index]"
            v-model="row.academic_score"
          ></el-input>
          <span v-if="!showEdit[$index]">{{row.academic_score}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="academic_rank" label="排名" width="70"></el-table-column>

      <el-table-column prop="thought_score" label="思想分" width="60">
        <template slot-scope="{row,$index}">
          <el-input size="mini" v-if="showEdit[$index]" v-model="row.thought_score"></el-input>
          <span v-if="!showEdit[$index]">{{row.thought_score}}</span>
        </template>
      </el-table-column>

      <el-table-column sortable prop="thought_rank" label="排名" width="70"></el-table-column>

      <el-table-column prop="stylistic_score" label="文体分" width="60">
        <template slot-scope="{row,$index}">
          <el-input size="mini" v-if="showEdit[$index]" v-model="row.stylistic_score"></el-input>
          <span v-if="!showEdit[$index]">{{row.stylistic_score}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="stylistic_rank" label="排名" width="70"></el-table-column>

      <el-table-column prop="comprehensive_score" label="综合分" width="60"></el-table-column>
      <el-table-column sortable prop="comprehensive_rank" label="排名" width="70"></el-table-column>
      <el-table-column prop="category" label="评优类别" width="95"></el-table-column>

      <el-table-column align="right" width="260">
        <template
          slot="header"
          slot-scope="scope"
          @click.native="handleSearch(scope.$index, scope.row)"
        >
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <div style="display:flex;flexdirection:row;">
            <el-button
              size="mini"
              @click.native="handleEdit(scope.$index, scope.row)"
              v-if="!showBtn[scope.$index]"
            >编辑</el-button>
            <!-- <el-button size="mini" type="danger">驳回审核</el-button>
            <el-button size="mini" type="success">通过审核</el-button>  v-if="!showBtn[scope.$index]"-->
            <el-button
              type="success"
              size="small"
              @click.native="handleCancel(scope.$index, scope.row)"
              v-if="showBtn[scope.$index]"
            >完成</el-button>
            <el-button size="mini" @click="lookMark" type="info">查看成绩</el-button>

            <el-button size="mini" @click="lookSubmit" type="success">加分证明</el-button>

            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" width="80%" :before-close="lookMark">
      <img style="width:50%;height:50%;" :src="this._global.img0" alt="成绩图片1">
      <img style="width:50%;height:50%;" :src="this._global.img1" alt="成绩图片2">

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  name: "persionInfo",
  beforeCreate() {
    axios
      .get("/api/getdata")
      .then(res => {
        var list = res.data.message;
        //第一次排序 + 综合分计算
        list.sort((a, b) => {
          return b.academic_score - a.academic_score;
        });
        var list = list.map((obj, index) => ({
          //学业分
          academic_rank: index + 1,
          academic_score: obj.academic_score,
          //思想分
          thought_score: obj.thought_score,
          thought_rank: obj.thought_rank,
          //文体分
          stylistic_score: obj.stylistic_score,
          stylistic_rank: obj.stylistic_rank,
          //综合分
          comprehensive_score: (
            obj.stylistic_score * 0.1 +
            obj.thought_score * 0.2 +
            obj.academic_score * 0.7
          ).toFixed(2),
          comprehensive_rank: obj.comprehensive_rank,

          category: obj.category,
          phone: obj.phone,
          academe: obj.academe,
          start_year: obj.start_year,
          pro_class: obj.pro_class,
          gender: obj.gender,
          cadre_name: obj.cadre_name,
          name: obj.name,
          stu_id: obj.stu_id,
          card_id: obj.card_id,
          is_cadre: obj.is_cadre,
          isHand: obj.isHand
        }));
        // 第二次排序 思想分
        list.sort((a, b) => {
          return b.thought_score - a.thought_score;
        });

        var list = list.map((obj, index) => ({
          thought_rank: index + 1,
          thought_score: obj.thought_score,

          stylistic_score: obj.stylistic_score,
          stylistic_rank: obj.stylistic_rank,

          academic_rank: obj.academic_rank,
          academic_score: obj.academic_score,
          comprehensive_score: obj.comprehensive_score,
          comprehensive_rank: obj.comprehensive_rank,

          category: obj.category,
          phone: obj.phone,
          academe: obj.academe,
          start_year: obj.start_year,
          pro_class: obj.pro_class,
          gender: obj.gender,
          cadre_name: obj.cadre_name,
          name: obj.name,
          stu_id: obj.stu_id,
          card_id: obj.card_id,
          is_cadre: obj.is_cadre,
          isHand: obj.isHand
        }));

        //第三次排序 文体分
        list.sort((a, b) => {
          return b.stylistic_score - a.stylistic_score;
        });

        var list = list.map((obj, index) => ({
          thought_score: obj.thought_score,
          thought_rank: obj.thought_rank,

          stylistic_score: obj.stylistic_score,
          stylistic_rank: index + 1,

          academic_rank: obj.academic_rank,
          academic_score: obj.academic_score,

          comprehensive_score: obj.comprehensive_score,
          comprehensive_rank: obj.comprehensive_rank,

          category: obj.category,
          phone: obj.phone,
          academe: obj.academe,
          start_year: obj.start_year,
          pro_class: obj.pro_class,
          gender: obj.gender,
          cadre_name: obj.cadre_name,
          name: obj.name,
          stu_id: obj.stu_id,
          card_id: obj.card_id,
          is_cadre: obj.is_cadre,
          isHand: obj.isHand
        }));

        //最后一次排序 综合分
        list.sort((a, b) => {
          return b.comprehensive_score - a.comprehensive_score;
        });

        var list = list.map((obj, index) => ({
          thought_score: obj.thought_score,
          thought_rank: obj.thought_rank,

          stylistic_score: obj.stylistic_score,
          stylistic_rank: obj.stylistic_rank,

          academic_rank: obj.academic_rank,
          academic_score: obj.academic_score,
          comprehensive_score: obj.comprehensive_score,
          comprehensive_rank: index + 1,

          category: obj.category,
          phone: obj.phone,
          academe: obj.academe,
          start_year: obj.start_year,
          pro_class: obj.pro_class,
          gender: obj.gender,
          cadre_name: obj.cadre_name,
          name: obj.name,
          stu_id: obj.stu_id,
          card_id: obj.card_id,
          is_cadre: obj.is_cadre,
          isHand: obj.isHand
        }));

        this.tableData = this.showTableData = list;
        this.stu_num = list.length;
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    search: function(search) {
      this.showTableData = this.tableData.filter(
        data =>
          data.pro_class.toString().includes(search) ||
          data.name.toString().includes(search) ||
          data.stu_id.toString().includes(search)
      );
    }
  },
  methods: {
    //查看学生提交的加分证明

    
    lookSubmit() {
      window.open(
        "http://cdn.i7code.cn/zc_2017_信计171_201721314106.docx",
        "_blank"
      );
    },
    lookMark() {
      this.dialogVisible = !this.dialogVisible;
    },
    exportExcel() {
      /* 创建worksheet */
      // var ws = XLSX.utils.json_to_sheet(this.tableData);

      // /* 新建空workbook，然后加入worksheet */
      // var wb = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(wb, ws, "People");

      // /* 生成xlsx文件 */
      // XLSX.writeFile(wb, "sheetjs.xlsx");

      var wb = XLSX.utils.table_to_book(document.querySelector("#tablei"));
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },

    //三好学生标兵 return 0
    //三好学生 return 1
    //优秀学生干部 return 2-0
    //学习积极分子 return 2-1
    //文体积极分子 return 2-2
    //其它 return -1
    is_good_student(obj) {
      var per10 = Math.round(this.stu_num * 0.1);
      var per20 = Math.round(this.stu_num * 0.2);
      var per30 = Math.round(this.stu_num * 0.3);
      var per40 = Math.round(this.stu_num * 0.4);
      if (
        !obj.isHand &&
        typeof obj.category !== "string" &&
        obj.comprehensive_rank <= per10 &&
        obj.academic_rank <= per10 &&
        obj.thought_rank <= per10 &&
        obj.stylistic_rank < per20
      )
        return 0;
      else if (
        !obj.isHand &&
        typeof obj.category !== "string" &&
        obj.comprehensive_rank <= per30 &&
        obj.academic_rank <= per30 &&
        obj.thought_rank <= per30 &&
        obj.stylistic_rank <= per40
      )
        return 1;
      else if (
        !obj.isHand &&
        typeof obj.category !== "string" &&
        obj.is_cadre === "是" &&
        obj.comprehensive_rank <= per30 &&
        obj.thought_rank <= per20
      )
        return 20;
      else if (
        !obj.isHand &&
        typeof obj.category !== "string" &&
        obj.academic_rank <= per20
      )
        return 21;
      else if (
        !obj.isHand &&
        typeof obj.category !== "string" &&
        obj.stylistic_rank <= per20
      )
        return 22;
      else return -1;
    },

    chooseGooodStu() {
      var that = this;
      var pacesetter_num = Math.round((143 + 71) * 0.01);
      var student_num = Math.round(this.stu_num * 0.07);
      var activate_num = Math.round(this.stu_num * 0.1);
      this.good_student_pacesetter = pacesetter_num;
      this.good_student = student_num;
      this.good_activate = activate_num;

      var data = this.tableData;
      for (var i = 0; i < data.length; i++) {
        var status = that.is_good_student(data[i]);

        switch (status) {
          case 0:
            if (pacesetter_num > 0) {
              this.tableData[i].category = "三好学生标兵";
              data[i].category = "三好学生标兵";
              pacesetter_num--;
            }
            break;
          case 1:
            if (student_num > 0) {
              this.tableData[i].category = "三好学生";
              data[i].category = "三好学生";
              student_num--;
            }
            break;
          case 20:
            if (activate_num > 0) {
              this.tableData[i].category = "优秀学生干部";
              data[i].category = "优秀学生干部";
              activate_num--;
            }
            break;
          case 21:
            if (activate_num > 0) {
              this.tableData[i].category = "学习积极分子";
              data[i].category = "学习积极分子";
              activate_num--;
            }
            break;
          case 22:
            if (activate_num > 0) {
              this.tableData[i].category = "文体积极分子";
              data[i].category = "文体积极分子";
              activate_num--;
            }
            break;
          default:
            break;
        }
      }

      this.$message({
        message: "评选完成",
        type: "success"
      });
    },

    formatter(row, column) {
      console.log(row, column);
      return row.$index;
    },
    indexMethod(index) {
      return index + 1;
    },
    showWhat(id) {
      console.log(id);
      switch (id) {
        case 1:
          this.showTableData = this.tableData;

          break;
        case 2:
          this.showTableData = this.tableData.filter(data => {
            return (
              data.category === "三好学生标兵" ||
              data.category === "三好学生" ||
              data.category === "学习积极分子" ||
              data.category === "文体积极分子" ||
              data.category === "优秀学生干部"
            );
          });
          break;
        case 3:
          this.showTableData = this.tableData.filter(data => {
            return data.category === "三好学生";
          });
          break;
        case 4:
          this.showTableData = this.tableData.filter(data => {
            return (
              data.category === "学习积极分子" ||
              data.category === "文体积极分子" ||
              data.category === "优秀学生干部"
            );
          });
          break;
        case 5:
          this.showTableData = this.tableData.filter(data => {
            return data.category === "优秀学生干部";
          });
          break;
        case 6:
          this.showTableData = this.tableData.filter(data => {
            return data.category === "学习积极分子";
          });
          break;
        case 7:
          this.showTableData = this.tableData.filter(data => {
            return data.category === "文体积极分子";
          });
          break;
        default:
          break;
      }
    },
    //切换是否显示全部数据

    //没有用到的方法 临时解决报错问题

    handleSearch() {
      console.log("S");
    },
    //点击编辑
    handleEdit(index, row) {
      this.isautofocus = true;
      this.showEdit[index] = true;
      this.showBtn[index] = true;
      this.$set(this.showEdit, row, true);
      this.$set(this.showBtn, row, true);
      this.$message({
        message: "警告：请确保正确的情况下修改综测数据",
        type: "warning"
      });
    },
    showExpand() {
      this.expandAll = !this.expandAll;
      console.log(this.expandAll);
    },
    //取消编辑
    handleCancel(index, row) {
      // this.getContentList();
      this.showEdit[index] = false;
      this.showBtn[index] = false;
      this.$set(this.showEdit, row, false);
      this.$set(this.showBtn, row, false);
      this.$message({
        message: "提示：完成修改",
        type: "success"
      });
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
      dialogVisible: false,
      stu_num: undefined,
      good_student_pacesetter: undefined,
      good_student: undefined,
      good_activate: undefined,

      good_activate_cader: undefined,
      good_activate_study: undefined,
      good_activate_stylistic: undefined,
      filename: undefined,
      exporeType: "xlsx",
      search: "",
      isautofocus: false,
      showTableAll: false,

      expandAll: false,
      editText: "",
      isEdit: false,
      showAll: false,
      showEdit: [], //显示编辑框
      showBtn: [],
      showBtnOrdinary: true,

      tableData: [],
      showTableData: []
    };
  }
};
</script>
<style>
.el-row {
  margin-bottom: 20px;
}

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

