<template>
  <div class="app-container calendar-list-container">
    <!-- tab框 -->
    <tab :tabMessage="tabMessage"></tab>
    <!-- 主体内容 -->
    <el-form :model="addForm" :rules="addRule" ref="addForm">
      <div class="img-block">
        <div class="img-content">
          <el-form-item label="个人照片">
            <el-upload
              :file-list="fileList"
              ref="uploadImg"
              action="111"
              accept=".jpg, .jpeg, .png, .gif"
              :beforeUpload="beforeUploadPicture"
              list-type="picture-card"
              names="files"
              :limit="1"
              :on-remove="handleRemove"
              :on-change="onChange"
              :auto-upload="false"
              :show-file-list="true"
              :class="{disabled:isShow}"
              :disabled="showFlag"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </div>
        <div class="img-main">
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="工号" label-width="80px" prop="code">
                <el-input size="mini" v-model="addForm.code" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名" label-width="70px" prop="name">
                <el-input size="mini" v-model="addForm.name" :disabled="showFlag"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别" label-width="80px" prop="sex">
                <el-select size="mini" v-model="addForm.sex" :disabled="showFlag">
                  <el-option
                    v-for="(item,index) in sexOption"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="证件号" label-width="80px" prop="idCard">
                <el-input
                  size="mini"
                  v-model="addForm.idCard"
                  @change="idCardBlur"
                  :disabled="showFlag"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号" label-width="70px" prop="phone">
                <el-input size="mini" v-model="addForm.phone" :disabled="showFlag"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="生日" label-width="80px" prop="brith">
                <el-input size="mini" :disabled="true" v-model="brith"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="年龄" label-width="80px" prop="age">
                <el-input size="mini" v-model="addForm.age" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学历" label-width="70px" prop="education">
                <el-select size="mini" v-model="addForm.education" clearable :disabled="showFlag">
                  <el-option
                    v-for="(item,index) in educationOption"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="职能" label-width="80px" prop="functionName">
                <el-select
                  size="mini"
                  v-model="addForm.functionName"
                  @change="changeFunction"
                  :disabled="showFlag"
                >
                  <el-option
                    v-for="(item,index) in functionNameOption"
                    :key="index"
                    :label="item.parentName"
                    :value="item.parentCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="岗位" label-width="70px" prop="roleCodes">
                <el-select
                  size="mini"
                  v-model="addForm.roleCodes"
                  multiple
                  clearable
                  :disabled="showFlag"
                >
                  <el-option
                    v-for="(item,index) in roleCodesOption"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="showFlag">
              <el-form-item label="状态" label-width="80px" prop="">
                <el-select size="mini" clearable v-model="addForm.state" :disabled="showFlag">
                  <el-option
                    v-for="(item,index) in stateOption"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="所属项目" label-width="80px" prop="projectUuid">
                <el-select
                  size="mini"
                  v-model="addForm.projectUuid"
                  @change="changePro(addForm.projectUuid)"
                  :disabled="showFlag"
                >
                  <el-option
                    v-for="(item,index) in projectUuidOption"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供应商" label-width="70px" prop="supplierCode">
                <el-select
                  size="mini"
                  v-model="addForm.supplierCode"
                  @change="changesupplierCode"
                  :disabled="showFlag"
                >
                  <el-option
                    v-for="(item,index) in supplierCodeOption"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="服务合同"
                label-width="80px"
                prop="contractCode"
                :disabled="showFlag"
              >
                <el-select size="mini" v-model="addForm.contractCode" :disabled="showFlag">
                  <el-option
                    v-for="(item,index) in contractCodeOption"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="入职操作人" label-width="80px">
                <el-input size="mini" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入职时间" label-width="70px">
                <el-date-picker
                  :disabled="true"
                  size="mini"
                  v-model="addForm.entryTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="离职操作人" label-width="80px">
                <el-input size="mini" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="离职时间" label-width="80px">
                <el-date-picker
                  :disabled="true"
                  size="mini"
                  v-model="addForm.departureTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-row :gutter="24">
        <el-form-item label="资料" label-width="60px">
          <el-table border style="width: 100%" height="150px" :data="addForm.sontableData">
            <el-table-column width="200" label="项" prop="item" align="center"></el-table-column>
            <el-table-column label="文件" prop="file" align="center">
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.flag"
                  type="success"
                  @close="closeTag(scope.row)"
                  closable
                >{{ scope.row.file }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column width="200" label="操作" prop="getDo" align="center">
              <template slot-scope="scope">
                <el-upload
                  action="111"
                  ref="uploadOne"
                  :file-list="fileListAgain"
                  :show-file-list="false"
                  :on-change="(file,fileList) => {
                            return onChangeAgain(file,fileList, scope.row)
                        }"
                  :beforeUpload="(file) => {
                            return beforeUploadOne(file, scope.row)
                        }"
                  :auto-upload="false"
                  :disabled="showFlag"
                >
                  <el-button @click="uploadClick(scope.row)" :disabled="showFlag">上传</el-button>
                </el-upload>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注" label-width="50px" prop="remark">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="addForm.remark"
            :disabled="showFlag"
          ></el-input>
        </el-form-item>
      </el-row>
      <el-row v-if="this.$route.query.addressFrom == '审批' || this.$route.query.addressFrom == '审批查看'">
        <el-form-item label="审批历史" label-width="60px">
          <el-table :data="historyTableData" border height="200px" style="width: 100%">
            <el-table-column prop label="用户" width="300" align="center"></el-table-column>
            <el-table-column prop label="用户" width="400" align="center"></el-table-column>
            <el-table-column prop label="用户" align="center"></el-table-column>
          </el-table>
        </el-form-item>
      </el-row>
      <el-row
        style="margin: 0 auto;text-align: center"
        v-if="this.$route.query.addressFrom != '审批'"
      >
        <el-button size="mini" type="primary" @click="save" v-if="!showFlag">暂存</el-button>
        <el-button size="mini" type="primary" v-if="!showFlag" @click="submit">提交</el-button>
        <el-button size="mini" type="primary" @click="back">返回</el-button>
      </el-row>
      <el-row
        style="margin: 0 auto;text-align: center"
        v-if="this.$route.query.addressFrom == '审批'"
      >
        <el-button size="mini" type="primary" @click="getApp">审批</el-button>
        <el-button size="mini" type="primary" @click="back">返回</el-button>
      </el-row>
    </el-form>
    <!-- 审批弹框 -->
    <el-dialog title="请选择审批意见" :visible.sync="dialogVisible" width="60%">
      <el-form :model="optionForm" :rules="optionRule" label-width="70px" ref="optionForm">
        <el-form-item label="审批意见" prop="radio">
          <el-radio-group v-model="optionForm.radio">
            <el-radio :label="1">同意</el-radio>
            <el-radio :label="0">驳回</el-radio>
          </el-radio-group>
        </el-form-item>
        <div style="margin-top: 20px" v-if="optionForm.radio == '0'">
          <el-form-item label="意见" prop="opinion">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="请输入审批意见"
              v-model="optionForm.opinion"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="doApproval" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tab from "../common/tab.vue";
import { mixinProject } from "@/mixins/itemAndCon.js";
import { mixinWork } from "@/mixins/jobAndWork.js";
import {
  save,
  detail,
  submit,
  approval,
  getCode
} from "@/api/maintenance/peopleMessage.js";
// import { save } from "@/api/maintenance/message.js";
export default {
  mixins: [mixinProject, mixinWork],
  data() {
    var codeNum = (rule, value, callback) => {
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        callback(new Error("不能含有中文字符"));
      } else {
        callback();
      }
    };
    var verifyNum = (rule, value, callback) => {
      var regu = /[^\d^\.]+/g;
      var re = new RegExp(regu);
      if (re.test(value)) {
        callback(new Error("内容请输入数字"));
      } else {
        callback();
      }
    };
    return {
      id: 0,
      tabMessage: {
        text: "新增员工信息",
        color: "blue"
      },
      addForm: {
        code: "",
        name: "",
        sex: "",
        idCard: "",
        phone: "",
        brith: "",
        //   state: "",
        age: "",
        education: "",
        functionName: "",
        roleCodes: [],
        contractCode: "",
        projectUuid: "",
        supplierCode: "",
        remark: "",
        entryTime: "",
        departureTime: "",
        sontableData: [
          {
            item: "无犯罪证明",
            file: "",
            getDo: "上传",
            flag: false,
            uploadFile: ""
          },
          {
            item: "上岗证",
            file: "",
            getDo: "上传",
            flag: false,
            uploadFile: ""
          }
        ]
      },
      historyTableData: [],
      fileList: [],
      isShow: false,
      addRule: {
        code: [
          { validator: codeNum, trigger: "blur" },
          { required: true, message: "请填写工号", trigger: "blur" }
        ],
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        idCard: [
          { required: true, message: "请填写身份证号", trigger: "blur" },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "证件号码格式有误",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请填写手机号", trigger: "blur" },
          { validator: verifyNum, trigger: "blur" }
        ],
        //   brith: [{required: true, message: "请填写生日", trigger: "change"}],
        age: [{ required: true, message: "请填写年龄", trigger: "blur" }],
        education: [
          { required: true, message: "请选择学历", trigger: "change" }
        ],
        functionName: [
          { required: true, message: "请选择职能", trigger: "change" }
        ],
        roleCodes: [
          { required: true, message: "请选择岗位", trigger: "change" }
        ],
        contractCode: [
          { required: true, message: "请选择服务合同", trigger: "change" }
        ],
        projectUuid: [
          { required: true, message: "请选择所属项目", trigger: "change" }
        ],
        supplierCode: [
          { required: true, message: "请选择供应商", trigger: "change" }
        ],
        remark: [{ required: true, message: "请填写备注", trigger: "change" }],
        state: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      sexOption: [{ code: 0, name: "女" }, { code: 1, name: "男" }],
      educationOption: [
        { code: 1, name: "小学" },
        { code: 2, name: "初中" },
        { code: 3, name: "高中" },
        { code: 4, name: "专科" },
        { code: 5, name: "本科" },
        { code: 6, name: "硕士研究生" },
        { code: 7, name: "博士研究生" }
      ],
      functionNameOption: [],
      roleCodesOption: [],
      projectUuidOption: [],
      supplierCodeOption: [],
      contractCodeOption: [],
      stateOption: [
        { code: 0, name: "暂存" },
        { code: 1, name: "在职" },
        { code: 2, name: "离职" },
        { code: 3, name: "入职申请中" },
        { code: 4, name: "待上岗确认" },
        { code: 5, name: "离职申请中" },
        { code: 6, name: "待离职确认" }
      ],
      //
      fileListAgain: [],
      userImgTitle: [],
      showFlag: false,
      rzProcId: "",
      rzTaskId: "",
      lzProcId: "",
      lzTaskId: "",
      // 审批
      optionForm: {
        radio: 1,
        opinion: ""
      },
      optionRule: {
        radio: [{ required: true, message: "请选择意见", trigger: "blur" }],
        opinion: [
          { required: true, message: "请输入审批意见", trigger: "blur" }
        ]
      },
      dialogVisible: false
    };
  },
  components: {
    tab
  },
  computed: {
    brith() {
      if(!this.addForm.idCard){
        return ""
      }
      return `${this.addForm.idCard
        .slice(6, 14)
        .slice(0, 4)}年${this.addForm.idCard
        .slice(6, 14)
        .slice(4, 6)}月${this.addForm.idCard.slice(6, 14).slice(6, 8)}日`;
    }
  },
  methods: {
    getApp() {
      this.$nextTick(function() {
        this.$refs["optionForm"].resetFields();
      });
      this.dialogVisible = true;
    },
    doApproval() {
      // optionForm
      this.$refs["optionForm"].validate((valid) => {
        if (valid) {
          if (this.$route.query.flag == 0) {
            var obj = {
              procId: this.rzProcId,
              taskId: this.rzTaskId,
              state: this.optionForm.radio,
              remark: this.optionForm.opinion,
              flag: 0,
              id: this.id
            };
          } else if (this.$route.query.flag == 1) {
            var obj = {
              procId: this.lzProcId,
              taskId: this.lzTaskId,
              state: this.optionForm.radio,
              remark: this.optionForm.opinion,
              flag: 1,
              id: this.id
            };
          }
          var loading = this.$loading({
            lock: true,
            text: "审批中，请稍后...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          approval(obj).then(res => {
            loading.close();
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: "审批成功"
            });
            this.$router.go(-1);
          });
        }
      });
    },
    beforeUploadPicture(file) {
      this.userImgTitle = [];
      this.userImgTitle.push(file);
    },
    handleRemove() {
      setTimeout(() => {
        this.isShow = false;
      }, 700);
    },
    onChange(file, fileList) {
      this.isShow = fileList.length > 0;
    },
    changePro(data) {
      return new Promise((resolve, reject) => {
        this.getSupp(data).then(res => {
          this.supplierCodeOption = res;
          resolve(res);
        });
      });
    },
    changesupplierCode() {
      this.getCon(this.addForm.supplierCode).then(res => {
        this.contractCodeOption = res;
      });
    },
    uploadClick() {},
    onChangeAgain(file, fileList, data) {
      // 显示数据
      this.addForm.sontableData.forEach((item, index) => {
        if (item.item == data.item) {
          item.file = file.name;
          item.flag = true;
          item.uploadFile = file;
        }
      });
    },
    beforeUploadOne(file, data) {
      // alert(111)
      // console.log(data,"debugger")
      // console.log(file,"debugger")
      // var list = [];
      // var obj = {};
      // this.addForm.sontableData.forEach((item,index) => {
      //     if(item.item == data.item){
      //         item.uploadFile = file;
      //     }
      // })
      // console.log(this.addForm.sontableData);
    },
    closeTag(row) {
      console.log(row);
      this.addForm.sontableData.forEach((item, index) => {
        if (item.item == row.item) {
          // 假删除
          item.flag = false;
          // 逻辑删除
          item.file = "";
          item.uploadFile = "";
        }
      });
    },
    idCardBlur() {
      var data = this.addForm.idCard.slice(6, 10);
      var date = new Date();
      this.addForm.age = Number(date.getFullYear()) - Number(data);
    },
    save() {
      this.upFile(1); //1代表暂存按钮
    },
    submit() {
      this.upFile(2); //2代表提交按钮
    },
    newSave(fd) {
      fd.append("hzPersonnelUser", JSON.stringify(this.addForm));
      var loading = this.$loading({
        lock: true,
        text: "保存中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      save(fd).then(res => {
        this.$message({
          type: "success",
          message: "暂存成功"
        });
        loading.close();
        this.$router.go(-1);
      });
    },
    newSubmit(fd) {
      fd.append("hzPersonnelUser", JSON.stringify(this.addForm));
      fd.append("rzProcId", this.rzProcId);
      fd.append("rzTaskId", this.rzTaskId);
      var loading = this.$loading({
        lock: true,
        text: "保存中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      submit(fd).then(res => {
        loading.close();
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$router.go(-1);
      });
    },
    detailSave(fd) {
      this.addForm.id = this.id;
      fd.append("hzPersonnelUser", JSON.stringify(this.addForm));
      var loading = this.$loading({
        lock: true,
        text: "保存中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      save(fd).then(res => {
        this.$message({
          type: "success",
          message: "暂存成功"
        });
        loading.close();
        this.$router.go(-1);
      });
    },
    detailSubmit(fd) {
      this.addForm.id = this.id;
      fd.append("hzPersonnelUser", JSON.stringify(this.addForm));
      if (
        this.$route.query.state == "暂存" ||
        this.$route.query.state == "入职驳回"
      ) {
        fd.append("procId", this.rzProcId);
        fd.append("taskId", this.rzTaskId);
      }
      if (this.$route.query.state == "离职驳回") {
        fd.append("procId", this.lzProcId);
        fd.append("taskId", this.lzTaskId);
      }

      var loading = this.$loading({
        lock: true,
        text: "保存中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      submit(fd).then(res => {
        loading.close();
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$router.go(-1);
      });
    },
    upFile(num) {
      console.log(this.userImgTitle, "fileList");
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.$refs.uploadImg.submit();
          this.$refs.uploadOne.submit();
          if (
            !this.addForm.sontableData[0].uploadFile ||
            !this.addForm.sontableData[1].uploadFile ||
            !this.fileList
          ) {
            this.$message({
              type: "error",
              message: "请上传文件"
            });
            return false;
          }
          var fd = new FormData();
          if (this.userImgTitle[0]) {
            fd.append("userPicture", this.userImgTitle[0]);
          }
          if (this.addForm.sontableData[1].uploadFile.raw) {
            fd.append(
              "workingFile",
              this.addForm.sontableData[1].uploadFile.raw
            );
          }
          if (this.addForm.sontableData[0].uploadFile.raw) {
            fd.append(
              "innocenceFile",
              this.addForm.sontableData[0].uploadFile.raw
            );
          }
          fd.append("roleCodes", this.addForm.roleCodes);

          if (this.$route.query.addressFrom == "新增" && num == 1) {
            // 新增暂存
            this.newSave(fd);
          } else if (this.$route.query.addressFrom == "新增" && num == 2) {
            // 新增提交
            this.newSubmit(fd);
          } else if (this.$route.query.addressFrom == "详情" && num == 1) {
            // 详情暂存
            this.detailSave(fd);
          } else if (this.$route.query.addressFrom == "详情" && num == 2) {
            // 详情提交
            this.detailSubmit(fd);
          }
          // if(num == 1){

          // }else if(num == 2){
          //     // 提交按钮
          //     submit().then(res => {

          //     })
          // }
        }
      });
    },
    changeFunction() {
      this.getCode(this.addForm.functionName).then(res => {
        this.roleCodesOption = res;
      });
    },
    getDetail() {
      detail({ id: this.id }).then(res => {
        console.log(res, "年轻人");
        var data = res.data.data;
        this.addForm.code = data.code;
        this.addForm.name = data.name;
        this.addForm.sex = Number(data.sex);
        this.addForm.idCard = data.idCard; //获取生日
        this.addForm.phone = data.phone;
        this.addForm.age = data.age;
        this.addForm.education = Number(data.education);
        this.getCode(data.hzBasisRoles[0].parentCode).then(res => {
          this.roleCodesOption = res;
          this.addForm.functionName = data.hzBasisRoles[0].parentCode;
          this.addForm.roleCodes = data.hzBasisRoles.map(v => v.code);
        });
        this.addForm.state = Number(data.state);
        this.addForm.projectUuid = data.projectCode;
        this.getSupp(data.projectCode).then(res => {
          this.supplierCodeOption = res;
          this.addForm.supplierCode = data.supplierCode;
        });
        this.getCon(data.supplierCode).then(res => {
          this.contractCodeOption = res;
          this.addForm.contractCode = data.contractCode;
        });
        this.addForm.remark = data.remark;
        // 文件回滚
        this.addForm.sontableData[0].file = data.innocenceFileName;
        this.addForm.sontableData[0].uploadFile = data.innocenceFile;
        this.addForm.sontableData[1].file = data.workingFileName;
        this.addForm.sontableData[1].uploadFile = data.workingFile;
        this.addForm.sontableData[0].flag = true;
        this.addForm.sontableData[1].flag = true;
        console.log(this.addForm.sontableData, "12132323423434354");
        // 用户头像
        var obj = {};
        obj.url = data.userPicture;
        this.fileList.push(obj);
        this.isShow = true;
      });
    },
    back() {
      this.$router.go(-1);
    },
    // 获取工号
    code(){
      getCode().then(res => {
        this.addForm.code = res.data.data;
      })
    }
  },
  created() {
    this.getPro().then(res => {
      this.projectUuidOption = res;
    });
    this.getParentCode().then(res => {
      this.functionNameOption = res;
    });
    console.log(this.$route.query.addressFrom, "this.$route.query.addressFrom");
    if (this.$route.query.isState == 1) {
      this.showFlag = true;
    }
    if (
      this.$route.query.addressFrom == "详情" ||
      this.$route.query.addressFrom == "审批" ||
      this.$route.query.addressFrom == "审批查看"
    ) {
      this.id = this.$route.query.id;
      this.getDetail();
      this.tabMessage.text = "查看/修改员工信息";
      if (this.$route.query.rzTaskId && this.$route.query.rzProcId) {
        this.rzTaskId = this.$route.query.rzTaskId;
        this.rzProcId = this.$route.query.rzProcId;
      }
      if (this.$route.query.lzTaskId && this.$route.query.lzProcId) {
        this.lzTaskId = this.$route.query.lzTaskId;
        this.lzProcId = this.$route.query.lzProcId;
      }
    }
    if(this.$route.query.addressFrom == "新增"){
      this.code();
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("DEL_TAG", {
      value: "/maintenance/peopleMessage/message/add",
      close: true
    });
    next();
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  /deep/ .el-upload--picture-card {
    width: 220px !important;
    height: 280px !important;
    line-height: 280px !important;
  }
  /deep/ .el-upload-list__item-actions {
    width: 220px !important;
    height: 280px !important;
    line-height: 280px !important;
  }
  /deep/ .el-upload-list__item-thumbnail {
    width: 220px !important;
    height: 280px !important;
    line-height: 280px !important;
  }
  /deep/ .el-upload-list__item {
    width: 220px !important;
    height: 280px !important;
    line-height: 280px !important;
  }
  /deep/ .disabled .el-upload--picture-card {
    display: none;
  }
}
.img-block {
  display: flex;
  justify-content: space-between;
}
.img-content {
  width: 26%;
}
.img-main {
  width: 74%;
  height: 200px;
}
/deep/.el-form-item__content {
  margin-left: 0px !important;
}
.el-col {
  height: 42px;
}
.app-container {
  overflow: scroll;
}
</style>