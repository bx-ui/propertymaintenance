<template>
  <!-- 新增需求页面 -->
  <div class="add">
    <div class="title">物业费定价测算系统</div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/property/index' }">物业费测算</el-breadcrumb-item>
      <el-breadcrumb-item>新增</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <button @click="handlePush">返回</button> -->
    <div class="bgcolor">
      <div class="title2">
        <span></span>新增物业费定价测算
        <div></div>
      </div>
      <hr />
      <el-form :inline="true" size="small" :model='form1' ref="form1" :rules="rules2">
          <el-form-item label="标题" class="font" prop="title">
            <el-input v-model="form1.title" style="width:200px;" size="mini" maxlength="20"></el-input>
          </el-form-item>
         <el-form-item label="项目" class="font" prop="projectCode" >
            <el-select v-model="form1.projectCode" style="width:200px;" @change='changeArea(form1.projectCode)' filterable placeholder="请选择">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.projectName"
                  :value="item.projectCode">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="区域" class="font">
          <el-input disabled v-model="areaName" style="width:200px;margin-bottom:20px;" size="mini"></el-input>
        </el-form-item>
        <el-button
          class="basic_button"
          @click="handleAdd"
          style="margin-right: 0px;margin-bottom:15px;float: right"
          icon="edit"
          size="small"
        >新增</el-button>
      </el-form>

      
      <div class="tableList">
        <el-table
          border
          @selection-change="handleSelectionChange"
          :data="tableData"
          v-loading="tableLoading"
          element-loading-text="给我一点时间"
          fit
          height="100%"
          size="mini"
          tooltip-effect="dark"
          :cell-style="{fontWeight: '600'}"
          style="width: 100%;font-size: 12px;margin-bottom:15px;border-radius:3px;"
          :header-cell-style="tableHeaderColor"
        >
          <!--索引列-->
          <el-table-column align="center" label="序号" type="index" show-overflow-tooltip min-width="50"></el-table-column>
          <el-table-column min-width="65" align="center" prop="format" label="业态"></el-table-column>

          <el-table-column align="center" label="成本支出列项">
            <el-table-column align="center" label="①人工成本">
              <el-table-column min-width="65" align="center" prop="empNum" label="人员数"></el-table-column>
              <el-table-column align="center" prop="salaryPerYear" min-width="80" label="年均工资"></el-table-column>
              <el-table-column align="center" prop="salaryYearSum" min-width="70" label="年合计"></el-table-column>
            </el-table-column>
            <el-table-column align="center" prop="equipmentCost" label="②设备设施维保费及能耗成本"></el-table-column>
            <el-table-column min-width="100" align="center" prop="environmentCost" label="③环境、秩序维护成本"></el-table-column>
            <el-table-column min-width="70" align="center" prop="officeCost" label="④办公室"></el-table-column>
            <el-table-column
              min-width="85"
              align="center"
              v-for="item in cost"
              :key="item.id"
              :prop="item.key"
              :label="item.label"
            >
              <template slot-scope="scope">{{ scope.row[item.key] }}</template>
            </el-table-column>

            <el-table-column min-width="60" align="center" prop="taxes" label="税金"></el-table-column>
          </el-table-column>

          <el-table-column
            min-width="78"
            align="center"
            v-for="item in defaultFormHead"
            :key="item.id"
            :prop="item.key"
            :label="item.label"
          >
            <template slot-scope="scope">{{ scope.row[item.key] }}</template>
          </el-table-column>
          <!--操作列-->
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                style="color: #F78989"
                @click="handleDel(scope.row,scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="upload">
        <el-form>
          <el-form-item label="上传附件">
            <el-upload
              class="upload-image"
              ref="upload"
              multiple
              action="111"
              list-type="text"
              :auto-upload="false"
              :before-upload="beforeFileUpload"
              :http-request="FileRequest"
             
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <!-- <div slot="tip">只能上传jpg、png、gif 格式，大小不超过500KB的图片</div> -->
            </el-upload>
          </el-form-item>
          <div class="center" style="text-align:center">
            <el-button :disabled='isshow' size="mini" type="primary" @click="submit('form1')">保存</el-button>
          </div>
        </el-form>
      </div>
      <!--新增或编辑修改弹出框-->
      <div class="dialog_mask_mine">
        <el-dialog :visible.sync="dialogFormVisible" width="50%">
          <div slot="title">
            <!-- <span class="preTitle"></span> -->
            <span class="nextTitle">新增物业费定价测算</span>
          </div>
          <el-form :model="form" :inline="true" :rules="rules" size="mini" ref="form" label-width="100px">
            <el-form-item label="业态" prop="format">
              <el-input v-model="form.format" placeholder maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="人员数" prop="empNum" >
              <el-input v-model.number="form.empNum" placeholder maxlength="10"></el-input>
            </el-form-item>

            <el-form-item label="年均工资" prop="salaryPerYear" >
              <el-input v-model.number="form.salaryPerYear" placeholder maxlength="10"></el-input>
            </el-form-item>

            <el-form-item label="年合计" prop="salaryYearSum">
              <el-input v-model.number="form.salaryYearSum" placeholder maxlength="10"></el-input>
            </el-form-item>

            <el-form-item label="设备设施维保费及能耗成本" prop="equipmentCost">
              <el-input v-model.number="form.equipmentCost" placeholder maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="环境、秩序维护成本" prop="environmentCost">
              <el-input v-model.number="form.environmentCost" placeholder maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="办公室" prop="officeCost">
              <el-input v-model.number="form.officeCost" placeholder maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="社区文化建设展" prop="communityCost">
              <el-input v-model.number="form.communityCost" placeholder maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="公众责任保险费" prop="publicLiabilityCost">
              <el-input v-model.number="form.publicLiabilityCost" placeholder maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="前6项支出小计" prop="costSum">
              <el-input v-model.number="form.costSum" placeholder maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="税金" prop="taxes">
              <el-input v-model.number="form.taxes" placeholder maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="利润率" prop="profitRate">
              <el-input v-model.number="form.profitRate" placeholder maxlength="6"></el-input>
            </el-form-item>
            <el-form-item label="总收入" prop="income">
              <el-input v-model.number="form.income" placeholder maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="可收费面积(m²)" prop="chargeableArea">
              <el-input v-model.number="form.chargeableArea" placeholder maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="单价(元/月,m²)" prop="unitPrice">
              <el-input v-model.number="form.unitPrice" placeholder maxlength="4"> </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="small" @click="create('form')" :disabled='isshow2'>新增</el-button>
            <el-button @click="cancel('form')" size="small">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {upLoadFile,Add,getPro} from  '@/api/property/property';
export default {
  
  data() {
    return {
      isshow:false,
      isshow2:false,
      form1:{
        title:"",
        projectCode:'',
      }, 
      options:'',
      project:'',
      areaName:'',
      projectId:'',
      projectName:'',
      defaultFormHead: [
        { id: 4, key: "profitRate", label: "利润率" },
        { id: 5, key: "income", label: "总收入" },
        { id: 6, key: "chargeableArea", label: "可收费面积(m²)" },
        { id: 7, key: "unitPrice", label: "单价(元/月,m²)" }
      ],
      cost: [
        { id: 5, key: "communityCost", label: "⑤社区文化建设展" },
        { id: 6, key: "publicLiabilityCost", label: "⑥公众责任保险费" },
        { id: 7, key: "costSum", label: "前6项支出小计" }
      ],
      tableData: [],
      tableLoading:false,
      fileList: [],
      fd:new FormData(),
      form: {
        format: "",
        empNum: "",
        salaryPerYear: "",
        salaryYearSum: "",
        equipmentCost: "",
        environmentCost: "",
        officeCost: "",
        communityCost: "",
        publicLiabilityCost: "",
        costSum: "",
        taxes: "",
        profitRate: "",
        income: "",
        chargeableArea: "",
        unitPrice: ""
      },
      dialogFormVisible: false,
      //上传的文件
      fileData: null,
      rules: {
        format: [{ required: true, message: "请输入", trigger: "blur" }],
        empNum: [
          {
            type: "number",
            required: true,
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        salaryPerYear: [
          {
            type: "number",
            required: true,
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        salaryYearSum: [
          {
            type: "number",
            required: true,
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        equipmentCost:[
          {
            type: "number",
            required: true,
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        environmentCost: [
          {
            type: "number",
            required: true,
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        officeCost: [
          {
            type: "number",
            required: true,
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        communityCost: [
          {
            type: "number",
            required: true,
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        publicLiabilityCost: [
          {
            type: "number",
            required: true,
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        costSum: [
          {
            type: "number",
            required: true,
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        taxes: [
          {
            type: "number",
            required: true,
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        profitRate: [
          {
            type: "number",
            required: true,
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        income: [
          {
            type: "number",
            required: true,
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        chargeableArea: [
          {
            type: "number",
            required: true,
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        unitPrice: [
          {
            type: "number",
            required: true,
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ]
      },
      rules2:{
        title:[
          {
            required: true, message: "请输入标题", trigger: "blur" 
          }
        ],
        projectCode:[{
           required: true, message: "请选择项目", trigger: "change"
        }]
      }
    };
  },
  created(){
    this.getProject();
  },
  methods: {
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #fafafa;color:#999; font-size:12px;";
      }
    },
    getProject(){
      getPro().then(res=>{
        this.options = res.data;
      })
    },
    changeArea(val){
      // console.log(val)
      this.options.forEach(item=>{
        if(item.projectCode ==val){
          this.areaName = item.areaName;
          this.projectId = item.projectId;
          this.projectName = item.projectName;
        }
      })
    },
    //新增一列
    handleAdd() {
      //重置表单
      if (this.$refs["form"]) {
        this.$refs["form"].resetFields();
      }
      this.dialogFormVisible = true;
      this.isshow2 = false;
    },
    handleSelectionChange(val) {
      // console.log(val);
    },
    //上传前检测文件大小
    beforeFileUpload(file) {
      this.fileList.push(file)
      // console.log('文件列表',this.fileList)
     
      return true;
    },
    close(){
      this.isshow=false;
      this.$store.commit("DEL_ALL_TAG");
      this.$router.push('/property/index')
    },
    submit(formName){
      
      const set = this.$refs;
      set[formName].validate(valid => {
        if(valid){
          let fd = new FormData();
          this.$refs.upload.submit();
          this.fileList.forEach((file,i)=>{
            fd.append('files',file)
          })
          let tableData = JSON.stringify(this.tableData);
          fd.append('hzPropertyDetailList',tableData);
          fd.append('title',this.form1.title);
          fd.append('areaName',this.areaName);
          fd.append('projectCode',this.form1.projectCode);
          fd.append('projectId',this.projectId);
          fd.append('projectName',this.projectName);

          this.axios.defaults.headers.post['Content-Type']='multipart/form-data;charse=UTF-8';
          //保存按钮不可用
          this.isshow = true;
          Add(fd).then(res=>{
            // console.log(res)
            if(res.data.code ===0){
                this.$notify({
                  title: "成功",
                  message: "新增成功",
                  type: "success",
                  duration: 2000,
                  onClose:this.close
                });
            }
            })
        }else{
          alert('请输入完整的信息');
          return false
        }
      })
     
    },
    //覆盖组件自己的上传方式
    FileRequest(file){
    },
    create(formName){
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.isshow2 = true;
          let form = JSON.parse(JSON.stringify(this.form))
          this.tableData.unshift(form)
          this.$notify({
            title: "成功",
            message: "创建成功",
            type: "success",
            duration: 2000
          });
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    cancel(formName){
      this.dialogFormVisible = false;
    },
    handleDel(row, index) {
      console.log(row, index);
      this.$confirm(
        "是否确认删除第" + (index + 1) + "条数据, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.tableData.splice(index, 1);
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.add {
  height: 100%;
  padding: 10px;
  padding-top: 10px;
  background-color: #edf2f5;
  overflow-y: scroll;
  .bgcolor {
    background: #fff;
    padding: 10px 15px;
    margin-top: 15px;
    // height:400px;
    .tableList {
      background: #fff;
      width: 100%;
      height: 280px;
    }
    .upload {
      width: 100%;
      height: auto;
      margin-top: 20px;
      background: #fff;
    }
  }
  .el-form-item--small .el-form-item__content,
  .el-form-item--small .el-form-item__label {
    color: #000 !important;
  }

  hr {
    width: 70%;
    color: #fcfcfc;
    margin-bottom: 20px;
  }
  .title {
    padding-left:5px;
    height: 40px;
    background: #fff;
    margin-bottom: 10px;
    font-size: 18px;
    color: #2b8ae6;
    font-weight: 600;
    line-height: 40px;
  }
  .title2 {
    height: 32px;
    background: #fff;
    color: #2b8ae6;
    font-weight: 600;
    margin-top: 20px;
    span {
      display: inline-block;
      width: 5px;
      height: 14px;
      background: #2b8ae6;
      vertical-align: middle;
      margin-right: 5px;
    }
    button {
      cursor: pointer;
      float: right;
      margin-right: 200px;
      width: 60px;
      height: 28px;
      background: #fff;
      border: 1px solid #2b8ae6;
      color: #2b8ae6;
      line-height: 28px;
      text-align: center;
      border-radius: 2px;
    }
  }
  .el-table::before {
    height: 0;
  }
  .el-table {
    border: 1px solid #e5e5e5;
  }
  .button_edit {
    padding: 0;
    border: none;
    color: #66b1ff;
  }
  .button_delete {
    padding: 0;
    border: none;
    color: #f78989;
    background-color: #fff;
  }
  .button_delete:hover {
    color: #f78989;
  }
}
</style>