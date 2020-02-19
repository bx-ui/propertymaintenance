<template>
     <div class="wrap app-container ">
        <!-- <common-title title="基本信息"></common-title> -->
        <div style="height:100%;overflow:auto">
            <el-form label-width="100px" :model="form" :rules="rules" ref="forms">
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="项目名称" prop="project">
                            <el-select :disabled="confirmFlag==1" size="mini" v-model="form.project" placeholder="请选择"
                           @change="selectProject">
                                <el-option
                                v-for="item in projectArr"
                                :key="item.project"
                                :label="item.project"
                                :value="item.project">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="分期" >
                            <!-- <el-input disabled v-model="fenqi" size="mini"></el-input> -->
                            <el-select  :disabled="confirmFlag==1||periodDisabled" size="mini"  v-model="form.period" placeholder="请选择"
                           >
                                <el-option
                                v-for="item in periodArr"
                                :key="item.project"
                                :label="item.project"
                                :value="item.project">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="报修标题" prop="title">
                            <el-input :disabled="confirmFlag==1" v-model="form.title" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="维保项" prop="like">
                                <el-select :disabled="confirmFlag==1||placeDisabled" size="mini"  v-model="form.like" placeholder="请选择"
                                @change="getBuildNums">
                                    <el-option
                                    v-for="item in likeArr"
                                    :key="item.place"
                                    :label="item.place"
                                    :value="item.place">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around" > 
                        <el-col :span="8">
                        <el-form-item label="维保位置" prop="place">
                            <el-select :disabled="confirmFlag==1||buildDisbled" size="mini"  v-model="form.place" placeholder="请选择"
                                @change="getCodes">
                                    <el-option
                                    v-for="item in placeArr"
                                    :key="item.buildNum"
                                    :label="item.buildNum"
                                    :value="item.buildNum">
                                    </el-option>
                                </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                         <el-form-item label="维保编号" prop="code">
                            <el-select size="mini" :disabled="confirmFlag==1||eleDisabled" v-model="form.code" placeholder="请选择" @change="getPoeples"
                               >
                                    <el-option
                                    v-for="item in codeArr"
                                    :key="item.elevNum"
                                    :label="item.elevNum"
                                    :value="item.elevNum">
                                    </el-option>
                                </el-select>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around" >
                        <el-col :span="8">
                        <el-form-item label="计划结束" prop="planEndTime">
                            <el-date-picker
                            size="small"
                            v-model="form.planEndTime"
                            type="date"
                            placeholder="选择结束时间"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="年份" prop="year">
                            <el-select size="mini" :disabled="confirmFlag==1" v-model="form.year" placeholder="请选择"
                           >
                                <el-option
                                v-for="item in yearArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="月份" prop="month">
                            <el-select size="mini" :disabled="confirmFlag==1" v-model="form.month" placeholder="请选择"
                            >
                                <el-option
                                v-for="item in monthArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="周期" prop="circle">
                            <el-select size="mini" :disabled="confirmFlag==1" v-model="form.circle" placeholder="请选择"
                            >
                                <el-option
                                v-for="item in circleArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="维保模块" prop="moudle">
                            <el-select size="mini" :disabled="confirmFlag==1" v-model="form.moudle" placeholder="请选择"
                            @change="selectModul">
                                <el-option
                                v-for="item in moudleArr"
                                :key="item.modules"
                                :label="item.modules"
                                :value="item.modules">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                             <el-form-item label="维保大类"  prop="bigClass" >
                            <el-select size="mini" :disabled="confirmFlag==1||bclassDisable" v-model="form.bigClass" placeholder="请选择">
                                <el-option
                                v-for="item in bigClassArr"
                                :key="item.bclass"
                                :label="item.bclass"
                                :value="item.bclass">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="责任方" prop="people" >
                            <el-select size="mini" :disabled="confirmFlag==1||peopleDisabled" v-model="form.people" placeholder="请选择">
                                <el-option
                                v-for="item in peopleArr"
                                :key="item.supplierName"
                                :label="item.supplierName"
                                :value="item.supplierName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="">
                            <!-- <el-input disabled v-model="zeren" size="mini"></el-input> -->
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
               
            </el-form>
            <div class="btn-box">
                <div class="btn">
                    <el-button v-if="confirmFlag==0"  type="primary" size="small" @click.native="submit">修改</el-button>
                    <el-button v-if="confirmFlag==1"  type="primary" size="small" @click.native="submit1">修改</el-button>
                    <el-button type="warning" size="small" @click.native="back">返回</el-button>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import {
  getType,
  getProjectName,
  addSubmit,
  getProjectTimes,
  getPlace
} from "@/api/maintenaceCenter/planManage.js";
import {
  getPlaceDesc,
  getCmodul,
  getBclass,
  getSclass
} from "../../../api/maintenaceCenter/planManage";
import {
  getBuildNum,
  getCode,
  saveAdd,
  saveAddMore,
  getDetail,
  getPeople,
  update
} from "../../../api/maintenaceCenter/confirm";
export default {
  data() {
    return {
      // planEndTime:"2019-01-01",
      confirmFlag: "",
      type: "",
      form: {
        project: "",
        period: "",
        title: "",
        like: "",
        place: "",
        code: "",
        planEndTime: "",
        year: "",
        month: "",
        circle: "", //周期
        moudle: "",
        bigClass: "",
        people: ""
      },
      rules: {
        project: [{ required: true, message: "请选择项目", trigger: "change" }],
        period: [{ required: true, message: "请选择分期", trigger: "change" }],
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        like: [{ required: true, message: "请选择维保项", trigger: "change" }],
        place: [
          { required: true, message: "请选择维保位置", trigger: "change" }
        ],
        code: [
          { required: true, message: "请选择维保编号", trigger: "change" }
        ],
        planEndTime: [
          { required: true, message: "请选择计划结束时间", trigger: "change" }
        ],
        year: [{ required: true, message: "请选择年份", trigger: "change" }],
        month: [{ required: true, message: "请选择月份", trigger: "change" }],
        circle: [{ required: true, message: "请选择周期", trigger: "change" }],
        moudle: [
          { required: true, message: "请选择维保模块", trigger: "change" }
        ],
        bigClass: [
          { required: true, message: "请选择维保大类", trigger: "change" }
        ],
        people: [{ required: true, message: "请选择责任方", trigger: "change" }]
      },
      projectArr: [],
      periodArr: [],
      placeArr: [],
      likeArr: [],
      codeArr: [],
      yearArr: [
        {
          value: "2018",
          label: "2018"
        },
        { value: "2019", label: "2019" },
        { value: "2020", label: "2020" },
        { value: "2021", label: "2021" },
        { value: "2022", label: "2022" },
        { value: "2023", label: "2023" },
        { value: "2024", label: "2024" },
        { value: "2025", label: "2025" },
        { value: "2026", label: "2026" },
        { value: "2027", label: "2027" },
        { value: "2028", label: "2028" },
        { value: "2029", label: "2029" },
        { value: "2030", label: "2030" },
        { value: "2031", label: "2031" },
        { value: "2032", label: "2032" },
        { value: "2033", label: "2033" },
        {
          value: "2034",
          label: "2034"
        },
        { value: "2035", label: "2035" },
        { value: "2036", label: "2036" },
        { value: "2037", label: "2037" },
        { value: "2038", label: "2038" }
      ],
      monthArr: [
        { label: "一月", value: "01" },
        { label: "二月", value: "02" },
        { label: "三月", value: "03" },
        { label: "四月", value: "04" },
        { label: "五月", value: "05" },
        { label: "六月", value: "06" },
        { label: "七月", value: "07" },
        { label: "八月", value: "08" },
        { label: "九月", value: "09" },
        { label: "十月", value: "10" },
        { label: "十一月", value: "11" },
        { label: "十二月", value: "12" }
      ],
      circleArr: [
        {
          //状态
          value: "年度",
          label: "年度"
        },
        {
          //状态
          value: "季度",
          label: "季度"
        },
        {
          //状态
          value: "月",
          label: "月"
        },
        {
          //状态
          value: "周",
          label: "周"
        }
      ],
      moudleArr: [],
      bigClassArr: [],
      peopleArr: [],
      excelList: [], //文件
      periodDisabled: true, //分期的
      placeDisabled: true, //维保项
      buildDisbled: true, //维保位置
      eleDisabled: true, //维保编号
      peopleDisabled: true, //责任方
      bclassDisable: true, //维保大类
      itemId: null,
      projectCode :null,
      periodCode:null,
      placeCode:null,
      likeCode:null,
      phone:"",
      vcode:'',
      projectCode1 :null,
      periodCode1:null,
      placeCode1:null,
      likeCode1:null,
      resPerson1:'',
      buildNum1:'',
      change:true,
      phone1:'',
      vcode1:'',
      updatenum:null,
    };
  },
  methods: {
    submit() {
      //console.log("aaaa")
      this.$refs["forms"].validate(valid => {
        if (valid) {
         
        if(!this.change){
             for (var i = 0; i < this.projectArr.length; i++) {
                if (this.form.project == this.projectArr[i].project) {
                this.projectCode = this.projectArr[i].projectCode;
                }
            }
            for (var i = 0; i < this.periodArr.length; i++) {
                if (this.form.period == this.periodArr[i].project) {
                this.periodCode = this.periodArr[i].projectCode;
                }
            }
            //console.log(this.form.like,"维保项目百纳好")
            for (var i = 0; i < this.likeArr.length; i++) {
                if (this.form.like == this.likeArr[i].place) {
                this.likeCode = this.likeArr[i].placeCode;
                }
            }
            var resPerson = "";
            console.log(this.peopleArr,"this.people")
            for (var i = 0; i < this.peopleArr.length; i++) {
                if (this.form.people == this.peopleArr[i].supplierName) {
                    resPerson = this.peopleArr[i].resPerson;
                    this.phone = this.peopleArr[i].phone;
                    this.vcode = this.peopleArr[i].supplierCode;
                }
            }
          var data = {
            id:this.itemId,
            projectCode: this.projectCode, //项目名称
            project: this.form.project, //项目编码
            projectTimesCode: this.periodCode, //分期编码
            projectTimes: this.form.period, //分期名称
            title: this.form.title,
            placeCode: this.likeCode, //维保项编号
            place: this.form.like , //维保项名称
            buildNum: this.form.place, //维保位置
            elevNum: this.form.code, //维保编号
            planndeEndTime: this.form.planEndTime, //计划结束
            year: this.form.year,
            month: this.form.month,
            cycle: this.form.circle,
            cmodul: this.form.moudle,
            bclass: this.form.bigClass,
            responsibleParty: this.form.people,
            resPerson: resPerson,
            add1:this.vcode,
            add2:this.phone,
            confirmFlag:this.confirmFlag
          };
          update(data).then(res=>{
              console.log(res,"修改")
              if(res.data.code==0){
                  this.$message({
                      type:"success",
                      message:"修改成功"
                  });
                 // this.resetForm("forms")
                  this.$router.push({
                      path: "/protectCenter/confirm",
                  })
              }
          })
          console.log(data, "datafalse");
         }else{
             console.log(this.change)
            var data = {
                id:this.itemId,
                projectCode: this.projectCode1, //项目名称
                project: this.form.project, //项目编码
                projectTimesCode: this.periodCode1, //分期编码
                projectTimes: this.form.period, //分期名称
                title: this.form.title,
                placeCode: this.likeCode1, //维保项编号
                place: this.form.like , //维保项名称
                buildNum: this.form.place, //维保位置
                elevNum: this.form.code, //维保编号
                planndeEndTime: this.form.planEndTime, //计划结束
                year: this.form.year,
                month: this.form.month,
                cycle: this.form.circle,
                cmodul: this.form.moudle,
                bclass: this.form.bigClass,
                responsibleParty: this.form.people,
                resPerson: this.resPerson1,
                add1:this.vcode1,
                add2:this.phone1,
                confirmFlag:this.confirmFlag
            };
            console.log(data, "data");
            update(data).then(res=>{
              console.log(res,"修改")
              if(res.data.code==0){
                  this.$message({
                      type:"success",
                      message:"修改成功"
                  });
                  //this.resetForm("forms")
                  this.$router.push({
                      path: "/protectCenter/confirm",
                  })
              }
          })
         }
          
         
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submit1(){
        this.$refs["forms"].validate(valid => {
        if (valid) {
            var data = {
                id:this.itemId,
                projectCode: this.projectCode1, //项目名称
                project: this.form.project, //项目编码
                projectTimesCode: this.periodCode1, //分期编码
                projectTimes: this.form.period, //分期名称
                title: this.form.title,
                placeCode: this.likeCode1, //维保项编号
                place: this.form.like , //维保项名称
                buildNum: this.form.place, //维保位置
                elevNum: this.form.code, //维保编号
                planndeEndTime: this.form.planEndTime, //计划结束
                year: this.form.year,
                month: this.form.month,
                cycle: this.form.circle,
                cmodul: this.form.moudle,
                bclass: this.form.bigClass,
                responsibleParty: this.form.people,
                resPerson: this.resPerson1,
                add1:this.vcode1,
                add2:this.phone1,
                confirmFlag:this.confirmFlag,
                updatenum:this.updatenum
            };
            console.log(data, "data");
            update(data).then(res=>{
              console.log(res,"修改")
              if(res.data.code==0){
                  this.$message({
                      type:"success",
                      message:"修改成功"
                  });
                  //this.resetForm("forms")
                  this.$router.push({
                      path: "/protectCenter/confirm",
                  })
              }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    back() {
      this.$router.push({
        path: "/protectCenter/confirm"
      });
    },
   
    //获取项目
    getProjectNames() {
      var data = {};
      getProjectName(data).then(res => {
        console.log(res, "项目");
        this.projectArr = res.data;
      });
    },
    //根据id查详情
    getDetails() {
      var data = {
        id: this.itemId
      };
      getDetail(data).then(res => {
        console.log(res, "详情");
        if (res.data.code == 0) {

          var dataList = res.data.data;
          this.form.project = dataList.project;
          this.form.period = dataList.projectTimes;
          this.form.title = dataList.title;
          this.form.like = dataList.place;
          this.form.place = dataList.buildNum;
          this.form.code = dataList.elevNum;
          this.form.planEndTime = this.strToSwitch(dataList.planndeEndTime);
          // dataList.planndeEndTime
          this.form.year = dataList.year;
          this.form.circle = dataList.cycle;
          this.form.moudle = dataList.cmodul;
          this.form.bigClass = dataList.bclass;
          this.form.people = dataList.responsibleParty;
          this.form.month = dataList.month; 
    
            this.projectCode1 = dataList.projectCode;
            this.periodCode1 = dataList.projectTimesCode;
            this.likeCode1 = dataList.placeCode;
            this.resPerson1 = dataList.resPerson;
            this.buildNum1 = dataList.buildNum;
            //this.responsibleParty1 = dataList.responsibleParty;
            this.phone1 = dataList.add2;
            this.vcode1 = dataList.add1;
            this.updatenum = dataList.updatenum;
            
         // console.log(this.form.planndeEndTime, "s");
        } else {
          this.$message({
            type: "warning",
            message: "查询失败"
          });
        }
      });
    },
    //获取分期
    selectProject(val) {
      console.log(val, "选择的项目");
      this.periodDisabled = false;
      this.placeDisabled = false;
      this.change = false;
      //var code = null
      //this.projectCode
      for(var i=0;i<this.projectArr.length;i++){
          if(val == this.projectArr[i].project){
             this.projectCode  = this.projectArr[i].projectCode;
          }
      }
      var data = {
        projectCode: this.projectCode
      };
      this.form.period = "";
      this.form.like = "",
      this.form.place = "",
      this.form.code = "",
      this.form.people = "";
      getProjectTimes(data).then(res => {
        console.log(res, "项目带出来的");
        this.periodArr = res.data;
        //this.positionArr = res.data;
        //this.projectNameArr=res.data
      });
      var data = {
        projectCode: this.projectCode
      };
      getPlace(data).then(res => {
        this.likeArr = res.data; //维保项
      });
    },
    //获取维保项
    fenqiChange(val) {
      this.placeDisabled = false;
      var data = {
        projectCode: val
        // projectTimes:val
      };
      getPlace(data).then(res => {
        console.log(res, "分期带出来的");
        //this.fenqiArr = res.data;
        // this.positionArr = res.data;
        //this.projectNameArr=res.data
        this.likeArr = res.data; //维保项
      });
    },
    //获取维保位置
    getBuildNums(val) {
      this.buildDisbled = false;
      for(var i=0;i<this.likeArr.length;i++){
          if(val==this.likeArr[i].place){
              this.likeCode = this.likeArr[i].placeCode
          }
      }
      var data = {
        projectCode: this.projectCode,
        placeCode: this.likeCode
      };
      getBuildNum(data).then(res => {
        console.log(res, "维保位置");
        this.placeArr = res.data; //维保项
      });
    },
    //获取维保编号
    getCodes(val) {
      this.eleDisabled = false;
      var data = {
        projectCode: this.projectCode,
        placeCode: this.likeCode,
        buildNum: val
      };
      getCode(data).then(res => {
        console.log(res,"获取维保编号")
        this.codeArr = res.data; 
        this.peopleArr = res.data;
      });
    },
    //获取责任方
    getPoeples(val){
        this.peopleDisabled = false;
        var data = {
            projectCode: this.projectCode,
            placeCode: this.likeCode,
            buildNum: this.form.place,
            elevNum:val
        };
        getPeople(data).then(res => {
            this.peopleArr = res.data;
        });
    },
    //获取模块
    getMoudle() {
      var data = {};
      getCmodul(data).then(res => {
        console.log(res, "维保模块");
        this.moudleArr = res.data;
      });
    },
    //获取大类
    selectModul(val) {
      console.log(val, "选完模块以后");
      this.bclassDisable = false;
      var data = {
        modules: val
      };
      this.form.bclass = "";
      getBclass(data).then(res => {
        console.log(res, "大类");
        this.bigClassArr = res.data;
      });
    },
    strToSwitch(str){
        var strs  = str.trim().split(" ")
        return strs[0]
    }
  },
  mounted() {
    this.getProjectNames(); //获取项目
    this.getMoudle(); //获取模块
    this.confirmFlag = this.$route.query.confirmFlag;
    this.itemId = this.$route.query.id;
    this.getDetails();
   // this.getPhone()
  },
  activated() {
    this.getProjectNames(); //获取项目
    this.getMoudle(); //获取模块
    this.confirmFlag = this.$route.query.confirmFlag;
    this.itemId = this.$route.query.id;
    // this.getDetails();
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  overflow: auto;
}
.btn-box {
  width: 100%;
  position: relative;
  height: 50px;
}
.btn {
  width: 15%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
}
.row-bg >>> .el-upload-dragger {
  width: 180px !important;
}
</style>