<template>
  <div>
    <el-steps :active="active" simple style="margin-top:30px;margin-bottom:20px;">
      <el-step title="填写学业分(70%)" :icon="icontype0"></el-step>
      <el-step title="填写思想分(20%)" :icon="icontype1"></el-step>
      <el-step title="填写文体分(10%)" :icon="icontype2"></el-step>
      <el-step title="上传加分证明" :icon="icontype3"></el-step>
    </el-steps>

    <!-- <div class="info-stu">
      <p>{{stu_info.academy}}</p>
      <p>专业班级：{{stu_info.class_name}}</p>
      <p>姓名：{{stu_info.stuent_name}}</p>
      <p>学号：{{stu_info.stuent_id}}</p>
    </div>-->
    <!--学业分-->
    <div v-if="active===0">
      <div v-if="!showFillStudy">
        <div>
          <p>系统已检索出上一学年你的成绩数据，请在下方选择你在上一学年挂科/重修的科目，如无请选择未挂科。</p>
          <el-select
            size="mini"
            class="my-select"
            v-model="valueGK"
            multiple
            placeholder="请选择挂科/重修科目"
          >
            <el-option v-for="item in optionsGK" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <!-- <el-button @click="showvalue" size="mini">确认</el-button> -->
        </div>

        <div class="imgdiv" v-if="valueGK.length===0">
          <img class="img" :src="img0">
          <img class="img" :src="img1">
        </div>

        <p
          v-if="valueGK.length>0"
        >上一学年您的学习成绩为{{study_score}}分，选修课达良好或80分以上的有{{study_good_num}}门，下方表格是具体成绩数据，若数据有误，请联系学院综测负责人。</p>
        <el-table
          v-if="valueGK.length>0"
          id="tablei"
          :data="tabledata"
          border
          height="370"
          stripe
          size="mini"
          header-align="center"
        >
          <el-table-column type="index" :index="indexMethod" label="#" width="40"></el-table-column>
          <el-table-column prop="class_team" label="学期" width="160"></el-table-column>
          <el-table-column prop="class_name" label="课程名称" width="230"></el-table-column>
          <el-table-column prop="class_credit" label="学分" width="50"></el-table-column>
          <el-table-column prop="class_rank" label="等级" width="80"></el-table-column>
          <el-table-column prop="class_type" label="类别" width="130"></el-table-column>
          <el-table-column prop="class_score" label="成绩" width="60"></el-table-column>
          <el-table-column prop="jd" label="绩点" width="50"></el-table-column>
          <el-table-column prop="score_jd" label="学分绩点" width="70"></el-table-column>
        </el-table>
      </div>
      <div class="my-table" v-if="showFillStudy">
        <div class="my-col">
          <p id="info-col-title">学业成绩分</p>
          <div class="my-row">
            <el-tooltip
              class="item"
              effect="light"
              content="计算公式：（必修课和专业选修课学分绩点之和÷相应学分之和+5）×9 "
              placement="top-start"
            >
              <p id="info-left-text">学习成绩（90分）</p>
            </el-tooltip>
            <p id="info-right-text">{{study_score}}分</p>
          </div>
          <el-button
            style="margin-top:40px;"
            size="mini"
            @click="showFillStudy=!showFillStudy"
          >查看我的成绩</el-button>
        </div>

        <div class="my-col">
          <p id="info-col-title">奖励分与扣分</p>
          <div class="my-row">
            <p id="info-left-text">奖分（10分）</p>
            <el-input-number
              v-model="study_add"
              size="mini"
              @change="handleChangeAdd"
              :min="0"
              :max="10"
              label="描述12文字"
            ></el-input-number>
          </div>
          <div class="my-row">
            <p id="info-left-text">扣分</p>
            <el-input-number
              size="mini"
              v-model="study_minus"
              @change="handleChangeMinus"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </div>
          <!--       :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"-->
          <!-- <el-upload
            class="upload"
            action
            :on-success="uploadSuccess"
            :on-error="uploadError"
            multiple
            :limit="1"
            :file-list="fileList0"
            :http-request="qiniuUpload"
          >
            <div slot="tip" class="el-upload__tip">上传学业分证明文件,只能是docx/doc文件,且不超过4M</div>
            <el-button
              style="width:290px;margin-left:-20px;"
              size="mini"
              type="warning"
              @click="uploadIndex=0"
            >点击上传</el-button>
          </el-upload>-->

          <div class="my-row">
            <el-button
              style="width:290px;margin-bottom:10px;"
              @click="studyDialogVisible=!studyDialogVisible"
              type="info"
              size="mini"
            >查看学业分奖/扣分细则</el-button>
          </div>
        </div>
        <div class="my-col">
          <p id="info-col-title">奖励分来源</p>
          <div v-for="item in addFromListOfStudy" :key="item.index">
            <div class="my-row">
              <el-input size="mini" v-model="item.value">
                <template slot="prepend">{{item.index+1}}</template>
              </el-input>
            </div>
          </div>

          <div class="my-row">
            <el-button
              style="width:200px;margin-bottom:10px;"
              @click="addNewFrom(0)"
              type="info"
              size="mini"
            >新增来源</el-button>
            <el-button
              style="width:200px;margin-bottom:10px;"
              @click="removeNewFrom(0)"
              type="info"
              size="mini"
            >移除</el-button>
          </div>
        </div>
      </div>
      <!-- <div class="imgdiv">
        <img class="img" :src="img0">
        <img class="img" :src="img1">
      </div>
      <el-table
        id="tablei"
        :data="tabledata"
        border
        height="200"
        stripe
        size="mini"
        header-align="center"
      >
        <el-table-column type="index" :index="indexMethod" label="#" width="40"></el-table-column>
        <el-table-column prop="class_team" label="学期" width="160"></el-table-column>
        <el-table-column prop="class_name" label="课程名称" width="230"></el-table-column>
        <el-table-column prop="class_credit" label="学分" width="50"></el-table-column>
        <el-table-column prop="class_rank" label="等级" width="50"></el-table-column>
        <el-table-column prop="class_type" label="类别" width="130"></el-table-column>
        <el-table-column prop="class_score" label="成绩" width="60"></el-table-column>
        <el-table-column prop="jd" label="绩点" width="50"></el-table-column>
        <el-table-column prop="score_jd" label="学分绩点" width="70"></el-table-column>
      </el-table>-->
    </div>
    <!--思想分-->
    <div class="my-table" v-if="active===1">
      <div class="my-col">
        <p id="info-col-title">自评分</p>
        <div class="my-row">
          <p id="info-left-text">思想政治观念（15分）</p>
          <el-select size="small" v-model="valueList[0]" placeholder="请选择">
            <el-option
              v-for="item in value1list"
              :key="item.value"
              :label="item.value+'分'"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span
                style="float: right;padding-left:30px; color: #8492a6; font-size: 13px"
              >{{ item.value }}分</span>
            </el-option>
          </el-select>
        </div>

        <div class="my-row">
          <p id="info-left-text">纪律观念（14分）</p>
          <el-select size="small" v-model="valueList[1]" placeholder="请选择">
            <el-option
              v-for="item in value2list"
              :key="item.value"
              :label="item.value+'分'"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span
                style="float: right;padding-left:30px; color: #8492a6; font-size: 13px"
              >{{ item.value }}分</span>
            </el-option>
          </el-select>
        </div>
        <div class="my-row">
          <p id="info-left-text">集体观念（13分）</p>
          <el-select size="small" v-model="valueList[2]" placeholder="请选择">
            <el-option
              v-for="item in value3list"
              :key="item.value"
              :label="item.value+'分'"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span
                style="float: right;padding-left:30px; color: #8492a6; font-size: 13px"
              >{{ item.value }}分</span>
            </el-option>
          </el-select>
        </div>
        <div class="my-row">
          <p id="info-left-text">基础文明修养（13分）</p>
          <el-select size="small" v-model="valueList[3]" placeholder="请选择">
            <el-option
              v-for="item in value4list"
              :key="item.value"
              :label="item.value+'分'"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span
                style="float: right;padding-left:30px; color: #8492a6; font-size: 13px"
              >{{ item.value }}分</span>
            </el-option>
          </el-select>
        </div>

        <div class="my-row">
          <p id="info-left-text">遵守宿舍制度（15分）</p>
          <el-select size="small" v-model="valueList[4]" placeholder="请选择">
            <el-option
              v-for="item in value5list"
              :key="item.value"
              :label="item.value+'分'"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span
                style="float: right;padding-left:30px; color: #8492a6; font-size: 13px"
              >{{ item.value }}分</span>
            </el-option>
          </el-select>
        </div>
        <div class="my-row">
          <p id="info-left-text">社会实践（15分）</p>
          <el-select size="small" v-model="valueList[5]" placeholder="请选择">
            <el-option
              v-for="item in value6list"
              :key="item.value"
              :label="item.value+'分'"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span
                style="float: right;padding-left:30px; color: #8492a6; font-size: 13px"
              >{{ item.value }}分</span>
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="my-col">
        <p id="info-col-title">奖励分与扣分</p>
        <div class="my-row">
          <p id="info-left-text">奖分（10分）</p>
          <el-input-number
            v-model="think_add"
            size="mini"
            @change="handleChangeAdd"
            :min="0"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </div>
        <div class="my-row">
          <p id="info-left-text">扣分（10分）</p>
          <el-input-number
            size="mini"
            v-model="think_minus"
            @change="handleChangeMinus"
            :min="0"
            :max="100"
            label="描述文字"
          ></el-input-number>
        </div>
        <!--       :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
        :on-exceed="handleExceed"
                  
        -->
        <!-- <el-upload
          class="upload"
          action
          :on-success="uploadSuccess"
          :on-error="uploadError"
          multiple
          :limit="1"
          :file-list="fileList1"
          :http-request="qiniuUpload"
        >
          <div slot="tip" class="el-upload__tip">上传思想分文件证明,只能是docx/doc文件,且不超过4M</div>
          <el-button
            style="width:290px; margin-left:-20px;"
            size="mini"
            type="warning"
            @click="uploadIndex=1"
          >点击上传</el-button>
        </el-upload>-->

        <div class="my-row">
          <el-button
            style="width:290px;margin-bottom:10px;"
            @click="thinkDialogVisible=!thinkDialogVisible"
            type="info"
            size="mini"
          >查看思想分奖励分/扣分细则</el-button>
        </div>
        <!-- <div class="my-row">
          <el-button style="width:290px;margin-bottom:10px;" type="info" size="mini">查看思想分扣分评定细则</el-button>
        </div>-->
      </div>

      <div class="my-col">
        <p id="info-col-title">奖励分来源</p>

        <div v-for="item in addFromListOfThink" :key="item.index">
          <div class="my-row">
            <el-input size="mini" v-model="item.value">
              <template slot="prepend">{{item.index+1}}</template>
            </el-input>
          </div>
        </div>

        <div class="my-row">
          <el-button
            style="width:200px;margin-bottom:10px;"
            @click="addNewFrom(1)"
            type="info"
            size="mini"
          >新增来源</el-button>
          <el-button
            style="width:200px;margin-bottom:10px;"
            @click="removeNewFrom(1)"
            type="info"
            size="mini"
          >移除</el-button>
        </div>
      </div>
    </div>

    <!--文体分-->
    <div class="my-table" v-if="active===2">
      <div class="my-col">
        <p id="info-col-title">文体表现的基本分</p>

        <div class="my-row">
          <el-tooltip class="item" effect="light" content="体测成绩*60%" placement="top-start">
            <p id="info-left-text">体育课分（60分）</p>
          </el-tooltip>
          <p id="info-right-text">{{style_score}}分</p>
        </div>

        <div class="my-row">
          <p id="info-left-text">文体活动分（10 分）</p>
          <el-select size="small" v-model="valueList[6]" placeholder="请选择">
            <el-option
              v-for="item in value7list"
              :key="item.value"
              :label="item.value+'分'"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span
                style="float: right;padding-left:30px; color: #8492a6; font-size: 13px"
              >{{ item.value }}分</span>
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="my-col">
        <p id="info-col-title">奖励分与扣分</p>
        <div class="my-row">
          <p id="info-left-text">奖分（10分）</p>
          <el-input-number
            v-model="style_add"
            size="mini"
            @change="handleChangeAdd"
            :min="0"
            :max="10"
            label="描述12文字"
          ></el-input-number>
        </div>
        <div class="my-row">
          <p id="info-left-text">扣分（10分）</p>
          <el-input-number
            size="mini"
            v-model="style_minus"
            @change="handleChangeMinus"
            :min="0"
            :max="100"
            label="描述文字"
          ></el-input-number>
        </div>
        <!--       :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
        :on-exceed="handleExceed"-->
        <!-- <el-upload
          class="upload"
          action
          :on-success="uploadSuccess"
          :on-error="uploadError"
          multiple
          :limit="1"
          :file-list="fileList2"
          :http-request="qiniuUpload"
        >
          <div slot="tip" class="el-upload__tip">上传文体分文件证明,只能是docx/doc文件,且不超过3m</div>
          <el-button
            style="width:290px;margin-left:-20px;"
            size="mini"
            type="warning"
            @click="uploadIndex=2"
          >点击上传</el-button>
        </el-upload>-->

        <div class="my-row">
          <el-button
            style="width:290px;margin-bottom:10px;"
            @click="styleDialogVisible=!styleDialogVisible"
            type="info"
            size="mini"
          >查看文体分奖励分/扣分细则</el-button>
        </div>
      </div>
      <div class="my-col">
        <p id="info-col-title">奖励分来源</p>

        <div v-for="item in addFromListOfStyle" :key="item.index">
          <div class="my-row">
            <el-input size="mini" v-model="item.value">
              <template slot="prepend">{{item.index+1}}</template>
            </el-input>
          </div>
        </div>

        <div class="my-row">
          <el-button
            style="width:200px;margin-bottom:10px;"
            @click="addNewFrom(2)"
            type="info"
            size="mini"
          >新增来源</el-button>
          <el-button
            style="width:200px;margin-bottom:10px;"
            @click="removeNewFrom(2)"
            type="info"
            size="mini"
          >移除</el-button>
        </div>
      </div>
    </div>
    <div v-if="active!==3" class="fbtn">
      <el-button
        type="primary"
        size="mini"
        @click="lastStep"
        v-if="active>=1&&active<=4&&active!==3"
      >上一步</el-button>
      <el-button type="success" size="mini" @click="nextStep" v-if="active!==3">{{btnNextName}}</el-button>
    </div>

    <!-- v-if='studentTable' -->
    <div v-if="active===3">
      <div class="uploadfile">
        <el-upload
          class="upload"
          action
          accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          multiple
          :limit="1"
          :file-list="fileList0"
          :http-request="qiniuUpload"
        >
          <i class="el-icon-upload bigicon"></i>
          <div class="el-upload__text">
            将学业分证明拖到此处，或
            <em style="color:#409EFF">点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能是docx/doc文件,不超过4m</div>
        </el-upload>
        <el-upload
          class="upload"
          action
          :on-success="uploadSuccess"
          :on-error="uploadError"
          multiple
          :limit="1"
          :file-list="fileList1"
          :http-request="qiniuUpload"
        >
          <i class="el-icon-upload bigicon"></i>
          <div class="el-upload__text">
            将思想分证明文件拖到此处，或
            <em style="color:#409EFF">点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能是docx/doc文件,不超过4m</div>
        </el-upload>
        <el-upload
          class="upload"
          action
          :on-success="uploadSuccess"
          :on-error="uploadError"
          multiple
          :limit="1"
          :file-list="fileList2"
          :http-request="qiniuUpload"
        >
          <i class="el-icon-upload bigicon"></i>
          <div class="el-upload__text">
            将文体分证明文件拖到此处，或
            <em style="color:#409EFF">点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能是docx/doc文件,不超过4m</div>
        </el-upload>

        <!-- <el-upload 
            class="upload"
            action
            
            :on-success="uploadSuccess"
            :on-error="uploadError"
            multiple
            :limit="3"
            :file-list="fileList"
            :http-request="qiniuUpload"
            >
            <div slot="tip" class="el-upload__tip">上传学业分/思想分/文体分加分文件证明,只能是docx/doc文件,且单文件不超过4m</div>
            <el-button
            v-if="fileList2.length===3"
                size="mini"
                type="success"
                @click="uploadIndex=2"
            >点击上传</el-button>
        </el-upload>-->
      </div>
      <div id="checklist">
        <div id="check">
          <p id="checktext">思想分</p>
          <p id="checktext">思想政治观念:{{studentTable.thought[0]["思想政治观念"]}}分</p>
          <p id="checktext">纪律观念:{{studentTable.thought[1]["纪律观念"]}}分</p>
          <p id="checktext">集体观念:{{studentTable.thought[2]["集体观念"]}}</p>
          <p id="checktext">基础文明修养:{{studentTable.thought[3]["基础文明修养"]}}分</p>
          <p id="checktext">遵守宿舍制度:{{studentTable.thought[4]["遵守宿舍制度"]}}分</p>
          <p id="checktext">社会实践:{{studentTable.thought[5]["社会实践"]}}分</p>
          <p id="checktext">奖分:{{studentTable.thought[6]["奖分"]}}分</p>
          <p id="checktext">扣分:{{studentTable.thought[7]["扣分"]}}分</p>
          <p id="checktext">小计:{{studentTable.thought[8]["小计"]}}分</p>
        </div>
        <div id="check">
          <p id="checktext">学业分</p>
          <p id="checktext">学习成绩:{{studentTable.academic[0]["学习成绩"]}}分</p>
          <p id="checktext">奖分:{{studentTable.academic[1]["奖分"]}}分</p>
          <p id="checktext">扣分:{{studentTable.academic[2]["扣分"]}}分</p>
          <p id="checktext">小计:{{studentTable.academic[3]["小计"]}}分</p>
        </div>

        <div id="check">
          <p id="checktext">文体分</p>
          <p id="checktext">体育课分:{{studentTable.stylistic[0]["体育课分"]}}分</p>
          <p id="checktext">文体活动分:{{studentTable.stylistic[1]["文体活动分"]}}分</p>
          <p id="checktext">奖分:{{studentTable.stylistic[2]["奖分"]}}分</p>
          <p id="checktext">扣分:{{studentTable.stylistic[3]["扣分"]}}分</p>
          <p id="checktext">小计:{{studentTable.stylistic[4]["小计"]}}分</p>
        </div>

        <div id="check">
          <p id="checktext">综合分</p>
          <p id="checktext">综合分:{{studentTable.comprehensive}}分</p>
        </div>
        <div id="sureBtn">
          <el-button size="mini" type="primary" @click="lastStep">上一步</el-button>
          <el-button size="mini" type="success" @click="sureSubmit">确认提交</el-button>
        </div>
      </div>
    </div>

    <!--学业分细则-->
    <el-dialog title="学业分细则" :visible.sync="studyDialogVisible" width="40%" center>
      <div v-for="(item,index) in study_add_message" :key="item">
        <p style="margin-bottom:10px;  border-bottom: 1px solid #ebebeb;">{{index+1}}.{{item}}</p>
        <!-- <span >{{index+1}}.{{item}}</span> -->
      </div>
      <span style="margin-bottom:10px;  border-bottom: 1px solid #ebebeb;">减分</span>
      <div v-for="(item,index) in study_minus_message" :key="item">
        <span>{{index+1}}.{{item}}</span>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>

    <!--思想分细则-->
    <el-dialog title="思想分细则" :visible.sync="thinkDialogVisible" width="40%" center>
      <div v-for="(item,index) in think_add_message" :key="item">
        <p style="margin-bottom:10px;  border-bottom: 1px solid #ebebeb;">{{index+1}}.{{item}}</p>
        <!-- <span >{{index+1}}.{{item}}</span> -->
      </div>
      <span style="margin-bottom:10px;  border-bottom: 1px solid #ebebeb;">减分</span>
      <div v-for="(item,index) in think_minus_message" :key="item">
        <span>{{index+1}}.{{item}}</span>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>

    <!--文体分细则-->
    <el-dialog title="学业分细则" :visible.sync="styleDialogVisible" width="40%" center>
      <div v-for="(item,index) in style_add_message" :key="item">
        <p style="margin-bottom:10px;  border-bottom: 1px solid #ebebeb;">{{index+1}}.{{item}}</p>
        <!-- <span >{{index+1}}.{{item}}</span> -->
      </div>
      <span style="margin-bottom:10px;  border-bottom: 1px solid #ebebeb;">减分</span>
      <div v-for="(item,index) in style_minus_message" :key="item">
        <span>{{index+1}}.{{item}}</span>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>
  </div>
</template>

<script>
var qiniu = require("qiniu-js");
export default {
  created() {
    console.log("comprhensive");
    this.stu_info = this._global.stu_info;
    this.tabledata = this._global.stu_score;
    this.optionsGK = this._global.stu_score.map(obj => {
      return obj.class_name;
    });
    this.optionsGK.unshift("未挂科/重修");
    this.img0 = this._global.img0;
    this.img1 = this._global.img1;

    // let config = {
    //   headers: {
    //     token: `http-test`
    //   }
    // };
    // axios
    //   .post(
    //     "/api/getscore",
    //     {
    //       username: "201721314106",
    //       password: "1q2w3e4rjw.",
    //       sel_xn: "2017"
    //     },
    //     config
    //   )
    //   .then(res => {
    //     console.log(res);
    //     this.data = res.data.message;
    //     this.stu_info = res.data.message.stu_info[0];
    //     this.tabledata = res.data.message.stu_score;
    //     // var list = this.getStudyScore(res.data.message.stu_score);
    //     // this.study_good_num = list.num;
    //     // this.study_score = list.score; //学习成绩分

    //     this.optionsGK = res.data.message.stu_score.map(obj => {
    //       return obj.class_name;
    //     });
    //     this.optionsGK.unshift("未挂科/重修");
    //     this.img0 = res.data.message.img[0];
    //     this.img1 = res.data.message.img[1];
    //     // console.log(res.data.message.img);
    //     this.$message.info({
    //       title: "消息",
    //       message: "检索成绩数据成功，若发现成绩数据有误，请及时联系管理员"
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    axios
      .get("/api/getaddminusscore")
      .then(res => {
        if (res.status === 200) {
          this.study_add_message = res.data.message.study_add;
          this.study_minus_message = res.data.message.study_minus;
          this.think_add_message = res.data.message.think_add;
          this.think_minus_message = res.data.message.think_minus;
          this.style_add_message = res.data.message.style_add;
          this.style_minus_message = res.data.message.style_minus;
          var list = res.data.message.standard_score;
          this.value1list = list[0][0];
          this.value2list = list[1][0];
          this.value3list = list[2][0];
          this.value4list = list[3][0];
          this.value5list = list[4][0];
          this.value6list = list[5][0];
          this.value7list = list[6][0];
        }
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      uploadIndex: 0, //指上传文件是学业分、思想分、文体分 0 1 2
      uploadData: { name: 201721314106, type: "思想分" }, //上传加分证明data
      btnNextName: "下一步",
      icontype0: "el-icon-loading",
      icontype1: "el-icon-edit",
      icontype2: "el-icon-edit",
      icontype3: "el-icon-edit",
      is_cadre: false, //是否干部
      cadre_name: "", //干部名称
      // studentTable: {}, //上传数据 学分等信息 json
      studentTable: {
        stu_id: undefined,
        is_cadre: undefined,
        cadre_name: undefined,
        addFromListOfStudy: undefined,
        addFromListOfThink: undefined,
        addFromListOfStyle: undefined,
        addFromListOfStudy_doc: undefined,
        addFromListOfThink_doc: undefined,
        addFromListOfStyle_doc: undefined,
        thought: [
          { 思想政治观念: undefined },
          { 纪律观念: undefined },
          { 集体观念: undefined },
          { 基础文明修养: undefined },
          { 遵守宿舍制度: undefined },
          { 社会实践: undefined },
          { 奖分: undefined },
          { 扣分: undefined },
          { 小计: undefined }
        ],
        academic: [
          { 学习成绩: undefined },
          { 奖分: undefined },
          { 扣分: undefined },
          { 小计: undefined }
        ],
        stylistic: [
          { 体育课分: 0 },
          { 文体活动分: undefined },
          { 奖分: undefined },
          { 扣分: undefined },
          { 小计: undefined }
        ],
        comprehensive: undefined
      },

      optionsGK: undefined, //挂科选项
      valueGK: [], //挂科值
      showFillStudy: false, //是否显示学业分的填写

      studyDialogVisible: false, //是否显示学业分加分细则
      thinkDialogVisible: false, //是否显示学业分加分细则
      styleDialogVisible: false, //是否显示学业分加分细则

      study_add_message: undefined, //学业分加分细则
      study_minus_message: undefined, //学业减分细则

      think_add_message: undefined, //思想分加分细则
      think_minus_message: undefined, //思想分减分细则

      style_add_message: undefined, //文体分加分细则
      style_minus_message: undefined, //文体分减分细则

      active: 0, //步骤条
      study_score: "获取数据失败", //学习成绩分
      style_score: 12, //体育课分

      study_good_num: 0, //选修达到良好以上

      addFromListOfStudy: [{ value: undefined, index: 0 }], //学分分加分列表
      study_add: 0, //学业分加分
      study_minus: 0, //学业分减分
      addFromListOfThink: [{ value: undefined, index: 0 }], //思想分加分列表
      think_add: 0, //思想分加分
      think_minus: 0, //思想分减分
      addFromListOfStyle: [{ value: undefined, index: 0 }], //文体分加分列表
      style_add: 0, //文体分加分
      style_minus: 0, //文体分减分
      addFromListOfStudy_doc: 123, //学业分证明
      addFromListOfThink_doc: 123,
      addFromListOfStyle_doc: 22,
      //服务器返回数据
      data: undefined, //??????
      img0: undefined,
      img1: undefined,

      stu_info: {},
      tabledata: [],

      fileList0: [],
      fileList1: [],
      fileList2: [],

      //自评分1-7
      valueList: [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      value1list: [],
      value2list: [],
      value3list: [],
      value4list: [],
      value5list: [],
      value6list: [],
      value7list: [],
      value_xy: [
        {
          value: 115,
          label: "123"
        },
        {
          value: -1,
          label: "若成绩统计有误，选这个。"
        }
      ],

      username: "201721314111",
      stuId: undefined,
      stuName: undefined,
      stuClass: undefined,
      //提交时间
      semester: `${new Date().getFullYear()}/${new Date().getMonth() +
        1}/${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      finishTime: new Date().getFullYear(),

      activeIndex: "1"
    };
  },
  watch: {
    valueGK: function() {
      var data = this.tabledata;
      for (var i = 0; i < data.length; i++) {
        if (this.valueGK.includes(data[i].class_name)) {
          data[i].score_jd = 0;
          data[i].jd = 0;
          data[i].class_rank = "挂科/重修";
          data[i].is_hand = true;
        }
      }
      this.getStudyScore(this.tabledata);

      //   this.tabledata = data;
      //   var a = this.getStudyScore(this.tabledata);
      //   console.log(a);
      console.log(this.tabledata);
    }
  },
  methods: {
    qiniuUpload(option) {
      console.log(this.uploadIndex);
      console.log(option.file.type);
      var name = option.file.name.match(/^.*(\.doc|\.docx)$/);
      var uploadname = option.file.name;
      var time = new Date().getTime();
      // if (name) {
      //   var type = name["1"];
      //   uploadname = "201721314106" + "_" + "2018_" + "学业分" + type;
      // }
      const isNeed =
        option.file.type === "application/msword" ||
        option.file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const isLt4M = option.file.size / 1024 / 1024 < 4;
      if (!isNeed) {
        this.$message.error("上传文件只能是doc/docx!");
        this.fileList1 = [];
        return;
      }
      if (!isLt4M) {
        this.$message.error("上传文件大小不能超过 4MB!");
        this.fileList0 = [];

        return;
      }
      if (isNeed && isLt4M) {
        var config = {
          useCdnDomain: true,
          region: qiniu.region.z2,
          useCdnDomain: true
        };
        var qnToken = null;
        var qnPutextra = { fname: "", params: {}, mimeType: null };
        axios
          .post("/api/gettoken", {
            username: 201721314106,
            timestamp: time
          })
          .then(res => {
            qnToken = res.data.message;
            const observable = qiniu.upload(
              option.file,
              uploadname,
              qnToken,
              qnPutextra,
              config
            );
            observable.subscribe({
              next: option.onProgress,
              error: option.onError,
              complete: option.onSuccess
            });
            // subscription.unsubscribe() // 上传取消
          })
          .catch(err => {
            console.log(err);
          });
        //   var observable = qiniu.upload(file, key, token, putExtra, config)
        //     var subscription = observable.subscribe(observer) // 上传开始
        // const fileName = this.changeFileName(option.file.name)
      }
    },

    beforeUpload(file) {
      console.log("BEFORE");
      console.log(file);
      console.log("BEFORE");

      // return isIMAGE && isLt1M;
    },

    uploadSuccess(response, file, fileList) {
      console.log(response);
      this.$message.info({
        title: "消息",
        message: "上传思想分加分证明成功。",
        duration: 10000
      });
    },

    uploadError() {
      this.$message.info({
        title: "消息",
        message: "上传失败，请重试。",
        duration: 10000
      });
    },
    // uploadProgress(event, file, fileList) {
    //   console.log("进行");
    //   this.$message.info({
    //     title: "消息",
    //     message: "正在上传，当前进度" + event.percent,
    //     duration: 10000
    //   });
    //   console.log(event);
    // },

    //添加新的分数来源
    addNewFrom(index) {
      if (index === 0) {
        var len = this.addFromListOfStudy.length;
        this.addFromListOfStudy.push({ value: "", index: len });
      }
      if (index === 1) {
        var len = this.addFromListOfThink.length;
        this.addFromListOfThink.push({ value: "", index: len });
      }
      if (index === 2) {
        var len = this.addFromListOfStyle.length;
        this.addFromListOfStyle.push({ value: "", index: len });
      }
    },
    removeNewFrom(index) {
      if (index === 0 && this.addFromListOfStudy.length > 1) {
        this.addFromListOfStudy.splice(-1, 1);
      }
      if (index === 1 && this.addFromListOfThink.length > 1) {
        this.addFromListOfThink.splice(-1, 1);
      }
      if (index === 2 && this.addFromListOfStyle.length > 1) {
        this.addFromListOfStyle.splice(-1, 1);
      }
    },
    lastStep() {
      if (this.active <= 4 && this.active >= 1) {
        this.active--;
        console.log(this.active);
        switch (this.active) {
          case 0:
            this.icontype0 = "el-icon-loading";
            this.icontype1 = "el-icon-edit";
            this.icontype2 = "el-icon-edit";
            this.icontype3 = "el-icon-edit";
            this.btnNextName = "下一步";

            break;
          case 1:
            this.icontype0 = "el-icon-success";
            this.icontype1 = "el-icon-loading";
            this.icontype2 = "el-icon-edit";
            this.icontype3 = "el-icon-edit";
            this.btnNextName = "下一步";

            break;
          case 2:
            this.icontype0 = "el-icon-success";
            this.icontype1 = "el-icon-success";
            this.icontype2 = "el-icon-loading";
            this.icontype3 = "el-icon-edit";
            this.btnNextName = "下一步";

            break;
          case 3:
            this.icontype0 = "el-icon-success";
            this.icontype1 = "el-icon-success";
            this.icontype2 = "el-icon-success";
            this.icontype3 = "el-icon-loading";
            this.btnNextName = "完成";

            break;
          case 4:
            this.icontype0 = "el-icon-success";
            this.icontype1 = "el-icon-success";
            this.icontype2 = "el-icon-success";
            this.icontype3 = "el-icon-success";
            break;
          default:
            break;
        }
      }
    },
    nextStep() {
      console.log(this.valueList);
      if (this.active < 4) {
        if (this.active === 0) {
          //判断是否选择了挂科科目
          if (this.valueGK.length === 0) {
            this.$message({
              title: "警告",
              message: "请选择挂科/重新科目，如未挂科/重修，请选择未挂科。",
              type: "warning"
            });
            return;
          }
          if (!this.showFillStudy && this.valueGK.length > 0) {
            this.showFillStudy = true;
            return;
          }
          if (this.study_add > 0 && !this.addFromListOfStudy[0]["value"]) {
            this.$message({
              title: "警告",
              message: "请填写加分来源",
              type: "warning"
            });
            return;
          }
        }

        if (this.active === 1) {
          for (var i = 0; i < 6; i++) {
            if (!this.valueList[i]) {
              this.$message({
                title: "警告",
                message: "思想分自评分未填写完成",
                type: "warning"
              });
              return;
            }
          }

          if (this.think_add > 0 && !this.addFromListOfThink[0]["value"]) {
            this.$message({
              title: "警告",
              message: "请填写加分来源",
              type: "warning"
            });
            return;
          }
        }
        if (this.active === 2) {
          if (!this.valueList[6]) {
            this.$message({
              title: "警告",
              message: "文体分自评分未填写完成",
              type: "warning"
            });
            return;
          }
          if (this.style_add > 0 && !this.addFromListOfStyle[0]["value"]) {
            this.$message({
              title: "警告",
              message: "请填写加分来源",
              type: "warning"
            });
            return;
          }
        }
        this.active++;
        switch (this.active) {
          case 0:
            this.icontype0 = "el-icon-loading";
            this.icontype1 = "el-icon-edit";
            this.icontype2 = "el-icon-edit";
            this.icontype3 = "el-icon-edit";
            this.btnNextName = "下一步";

            break;
          case 1:
            this.icontype0 = "el-icon-success";
            this.icontype1 = "el-icon-loading";
            this.icontype2 = "el-icon-edit";
            this.icontype3 = "el-icon-edit";
            this.btnNextName = "下一步";

            break;
          case 2:
            this.icontype0 = "el-icon-success";
            this.icontype1 = "el-icon-success";
            this.icontype2 = "el-icon-loading";
            this.icontype3 = "el-icon-edit";
            this.btnNextName = "下一步";

            break;
          case 3:
            this.icontype0 = "el-icon-success";
            this.icontype1 = "el-icon-success";
            this.icontype2 = "el-icon-success";
            this.icontype3 = "el-icon-loading";
            this.studentTable = this.getUpscore();
            this.btnNextName = "完成";

            break;
          case 4:
            this.icontype0 = "el-icon-success";
            this.icontype1 = "el-icon-success";
            this.icontype2 = "el-icon-success";
            this.icontype3 = "el-icon-success";
            this.btnNextName = "完成";
            break;
          default:
            break;
        }
      }
    },
    handleChangeMinus() {
      //  this.$message('请在右方填写加分来源');
    },
    handleChangeAdd() {
      this.$message("提示：请在右方填写加分来源");
    },

    //学习成绩计算方法
    getStudyScore(data) {
      var _study_score = 0; //学分绩点之和
      var study_good_num = 0; //选修课达良好 80分以上的数量
      var study_xuefen = 0; //学分之和
      var study_score = 0; //学习成绩分
      for (var i = 0; i < data.length; i++) {
        if (
          data[i]["class_type"].includes("任选课") &&
          data[i]["class_score"] >= 80
        ) {
          study_good_num++;
        }
        if (!data[i]["class_type"].includes("任选课")) {
          _study_score += parseFloat(data[i]["score_jd"]);
          study_xuefen += parseFloat(data[i]["class_credit"]);
        }
      }
      study_score = ((study_good_num / study_xuefen + 5) * 9).toFixed(2);
      if (study_good_num < 3) {
        study_score = _study_score + 0.5 * study_good_num;
      }
      if (study_good_num >= 3) {
        study_score = _study_score + 1;
      }

      this.study_score = study_score;
      this.study_good_num = study_good_num;

      return { score: study_score, num: study_good_num };
    },

    //需要上传到服务器的数据
    getUpscore() {
      var count1 =
        this.valueList[0] +
        this.valueList[1] +
        this.valueList[2] +
        this.valueList[3] +
        this.valueList[4] +
        this.valueList[5] +
        this.think_add -
        this.think_minus;
      var count2 = this.study_score + this.study_add - this.study_minus;
      var count3 = this.study_score + this.style_add - this.style_minus;

      var comprehensive = (count1 * 0.3 + count2 * 0.7 + count3 * 0.1).toFixed(
        2
      );
      //valueList 为选择器列表值
      var studentTable = {
        stu_id: 201721314106,
        is_cadre: this.is_cadre,
        cadre_name: this.cadre_name,
        addFromListOfStudy: this.addFromListOfStudy,
        addFromListOfThink: this.addFromListOfThink,
        addFromListOfStyle: this.addFromListOfStyle,
        addFromListOfStudy_doc: this.addFromListOfStudy_doc,
        addFromListOfThink_doc: this.addFromListOfThink_doc,
        addFromListOfStyle_doc: this.addFromListOfStyle_doc,
        thought: [
          { 思想政治观念: this.valueList[0] },
          { 纪律观念: this.valueList[1] },
          { 集体观念: this.valueList[2] },
          { 基础文明修养: this.valueList[3] },
          { 遵守宿舍制度: this.valueList[4] },
          { 社会实践: this.valueList[5] },
          { 奖分: this.think_add },
          { 扣分: this.think_minus },
          { 小计: count1 }
        ],
        academic: [
          { 学习成绩: this.study_score },
          { 奖分: this.study_add },
          { 扣分: this.study_minus },
          { 小计: count2 }
        ],
        stylistic: [
          { 体育课分: 0 },
          { 文体活动分: this.valueList[6] },
          { 奖分: this.style_add },
          { 扣分: this.style_minus },
          { 小计: count3 }
        ],
        comprehensive: comprehensive
      };
      return studentTable;
    },
    sureSubmit() {
      var data = this.studentTable;
      var originalScoreData = this.tabledata;
      var addFromListOfStudy = this.addFromListOfStudy;
      var addFromListOfThink = this.addFromListOfThink;
      var addFromListOfStyle = this.addFromListOfStyle;
      axios
        .post("/api/postscore", {
          username: 201721314106,
          scoredata: data,
          originalScoreData: originalScoreData
        })
        .then(res => {
          console.log(res);
          if (res.data.result === "success") {
            this.$router.push("/student/home");
            this.$message.success({
              title: "消息",
              message: "提交成功"
            });
          }
          if (res.data.result === "fail") {
            this.$message.info({
              title: "消息",
              message: "提交失败，可能原因是数据没有变动。"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    indexMethod(index) {
      return index + 1;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    onSubmit() {
      console.log("submit!");
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style>
.info-page {
  margin-left: 10%;
  margin-right: 10%;
  padding: 0;
}

.my-table {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  border: 1px solid #ebebeb;
  padding: 20px;
}

.my-col {
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid #ebebeb;

  margin-right: 20px;
  padding: 20px;
}

.my-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.my-row-btn {
  display: flex;
  flex-direction: row;
  width: 200px;
  background: #409eff;
  justify-content: center;
}
/* .info-table-thought {
  display: flex;
  flex-direction: column;

  width: 330px;
  border: 1px solid #ebebeb;
  padding: 30px;
  margin-right: 40px;

  margin-top: 10px;
}

.info-table-thought-title {
  background: #409eff;
  color: #fff;
  justify-content: center;
  display: flex;
  font-size: 16px;
  padding: 5px;
  border-radius: 4px;
} */

.imgdiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.img {
  margin-left: 0;
  height: 200px;
}

.info-stu {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.info-stu p {
  margin-right: 30px;
}

.el-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.el-select {
  border-radius: 4px;
  width: 100px;
}

#info-col-title {
  display: flex;
  justify-content: center;
  background: #67c23a;
  color: #fff;
  font-size: 13px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  padding: 5px;
}

#info-left-text {
  display: flex;
  justify-content: center;
  width: 150px;
  background: #409eff;
  color: #fff;
  font-size: 13px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  padding: 5px;
  margin-right: 10px;
}

#info-right-text {
  display: flex;
  justify-content: flex-start;
  width: 100px;
  font-size: 13px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  padding: 5px;
}
.fbtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
}

input[type="file"] {
  display: none !important;
}

#checklist {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ebebeb;
  justify-content: center;
}

#check {
  display: flex;
  flex-direction: row;
  padding: 20px;
  border: 1px solid #ebebeb;
  margin-bottom: 20px;
}

#checktext {
  margin-right: 20px;
  font-size: 13px;
  padding: 5px;
}

#sureBtn {
  margin-left: 500px;
}

.my-select {
  width: 600px;
  justify-content: center;
  margin-bottom: 10px;
}

.uploadfile {
  display: flex;
  flex-direction: row;
  border: 1px solid #ebebeb;
  height: 240px;
  padding: 20px;
}

.upload {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
}

.bigicon {
  font-size: 60px;
  color: #c0c4cc;
  margin-bottom: 10px;
}
</style>