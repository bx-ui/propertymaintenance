<template>
  <div class="wrap app-container">
    <!-- <common-title title="基本信息"></common-title> -->
    <div style="height:100%;overflow:auto;padding:40px">
      <el-form label-width="100px" :model="form" ref="form">
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <el-form-item label="项目">
                <el-input disabled v-model="projectName" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分期">
                <el-input disabled v-model="fenqi" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <el-form-item label="报修标题">
                <el-input disabled v-model="topic" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="下单编号">
                <el-input disabled v-model="code" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <el-form-item label="维保项">
                <el-input disabled v-model="position" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维保位置">
                <el-input disabled v-model="buildNum" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <el-form-item label="维保编号">
                <el-input disabled v-model="elevNum" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计划结束">
                <el-input disabled v-model="endtime" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <el-form-item label="实际结束" prop="starttimeend">
                <el-date-picker
                  size="small"
                  v-model="form.starttimeend"
                  type="datetime"
                  placeholder="选择结束时间"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :disabled="true"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
                            <el-form-item label="考核标准">
                            <el-select size="mini" v-model="standard" placeholder="请选择"
                            @change="standarChange">
                                <el-option
                                v-for="item in standardArr"
                                :key="item"
                                :label="item"
                                :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
            </el-col>-->
            <el-col :span="8">
              <el-form-item label="扣款合同">
                <el-input disabled v-model="contract" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <!-- <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="考核说明">
                             <el-select size="mini" v-model="shuoming" placeholder="请选择"
                             @change="shuomingChange">
                                <el-option
                                v-for="item in shuomingArr"
                                :key="item.checkExplain"
                                :label="item.checkExplain"
                                :value="item.checkExplain">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="扣款金额">
                             <el-input disabled  v-model="money" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
        </el-row>-->
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <!-- <el-col :span="8">
                            <el-form-item label="扣款合同">
                            <el-input disabled v-model="contract" size="mini"></el-input>
                        </el-form-item>
            </el-col>-->
            <el-col :span="8">
              <el-form-item label="责任方">
                <el-input disabled v-model="zeren" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="闭单时间">
                <el-input disabled v-model="endordertime" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <!-- <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                         <el-col :span="8">
                             <el-form-item label="闭单时间">
                             <el-input disabled  v-model="endordertime" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="">
                        </el-form-item>
                        </el-col>
                    </el-row>
        </el-row>-->
      </el-form>
      <!-- <div v-if="type=='查看'&&urls.length!=0"> -->
      <div>
        <div class="logo">
          <div class="logoBlock"></div>
          <p>评价图片</p>
        </div>
        <div v-if="urls.length!=0">
          <div class="demo-image__preview">
            <el-image
              v-for="(item,index) in urls"
              :key="index"
              style="width: 100px; height: 100px;margin-right:10px"
              :src="item.url"
              :preview-src-list="aurl"
              @click="changeImg(item,index)"
            ></el-image>
          </div>
        </div>
        <div v-else>暂无图片</div>
      </div>

      <div class="logo">
        <div class="logoBlock"></div>
        <p>考核内容</p>
      </div>
      <el-button
        v-if="type=='操作'"
        @click="addOneitem"
        style="margin-bottom:10px"
        type="primary"
        size="mini"
      >增加</el-button>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-row :gutter="0" style="display: flex">
          <el-table
            :data="ruleForm.sontableData"
            border
            style="width: 100%"
            tooltip-effect="dark"
            @cell-click="cell"
          >
            <el-table-column label="考核标准/考核说明" prop="model" align="center" width="400">
              <template slot-scope="scope">
                <el-form-item
                  label-width="0px"
                  :rules="moreRules.moreMode"
                  style="margin-top: 15px"
                >
                  <el-cascader
                    :disabled="type=='查看'"
                    placeholder="请选择考核标准和考核说明"
                    :options="standardArr"
                    filterable
                    @change="selected(scope.row)"
                    v-model="scope.row.model"
                  ></el-cascader>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column label="扣款金额" align="center" width="80">
              <template slot-scope="scope">
                <span>{{scope.row.money}}</span>
              </template>
            </el-table-column>
            <el-table-column label="附件" prop="files" align="center">
              <template slot-scope="scope" v-if="scope.row.flag">
                <div v-if="type == '操作'">
                  <el-tag
                  v-for="(item, index) in scope.row.files"
                  :key="index"
                  closable
                  @close="closeTag(scope.row, item, index)"
                >{{ item.name }}</el-tag>
                </div>
                <div v-if="type == '查看'">
                  <el-tag
                  v-for="(item, index) in scope.row.files"
                  :key="index"
                  @close="closeTag(scope.row, item, index)"
                >{{ item.name }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="explanation" align="center" width="100">
              <template slot-scope="scope">
                <el-upload
                  action="111"
                  ref="upload"
                  :file-list="fileList"
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-change="(file,fileList) => {
                                        return onChangeAgain(file,fileList, scope.row)
                                    }"
                  :multiple="true"
                >
                  <el-button size="mini">上传</el-button>
                </el-upload>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-form>

      <div class="btn-box" style="margin-top:10px">
        <div class="btn">
          <el-button type="primary" size="small" @click="closeOrders">复审</el-button>
          <el-button type="success" size="small" @click="backClose">驳回</el-button>
          <el-button type="warning" size="small" @click="back">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getDetail,
  getCheck,
  closeOrder,
  getmoney,
  reCheck,
  checkContent,
  backCloses
} from "@/api/maintenaceCenter/orderManage.js";
export default {
  data() {
    return {
      urls: [],
      srcList: [],
      aurl: [],
      projectName: "",
      fenqi: "",
      topic: "",
      code: "",
      position: "",
      //positionDesc:'',
      buildNum: "",
      elevNum: "",
      endtime: "",
      form: {
        starttimeend: ""
      },
      rules: {
        starttimeend: [
          { required: true, message: "请选择实际结束时间", trigger: "change" }
        ]
      },
      standardArr: [],
      standard: "",
      contract: "",
      money: "",
      shuoming: "",
      zeren: "",
      endordertime: "",
      itemId: null,
      shuomingArr: [],
      moreRules: {
        moreMode: [
          { required: true, message: "请选择用户问题", trigger: "change" }
        ],
        explain: [
          { required: true, message: "请选择考核说明", trigger: "change" }
        ],
        moreExplanation: [
          { required: true, message: "请输入说明", trigger: "blur" }
        ]
      },
      modelOption: [],
      ruleForm: {
        sontableData: [
        //   {
        //     model: [],
        //     explain: "",
        //     money: "",
        //     index: 0,
        //     files: [],
        //     uploadFile: [],
        //     flag: false
        //   }
        ]
      },
      index: -1, 
      selectIndex: null,
      checkList: [],
      type: "",
      //
      fileList: []
    };
  },
  methods: {
    getList() {
      var data = {
        id: this.itemId
      };
      console.log(data, "datasss");
      var dataList = {};
      getDetail(data).then(res => {
        console.log(res, "详情");
        if (res.data.code == 0) {
          dataList = res.data.data;
          this.projectName = dataList.project;
          this.fenqi = dataList.projectTimes;
          this.topic = dataList.title;
          this.code = dataList.orderNumber; //下单编号
          this.position = dataList.place;
          //this.positionDesc = dataList.placeDescribe;
          this.buildNum = dataList.buildNum;
          this.elevNum = dataList.elevNum;
          this.endtime = this.toSwitch(dataList.planndeEndTime); //计划结束
          //this.starttimeend = dataList.actualEndTime//实际结束
          this.zeren = dataList.responsibleParty; //责任方
          this.contract = dataList.deductionContract; //扣款合同
          this.endordertime = !!dataList.closeTime ? dataList.closeTime.split(" ")[0] : "";//闭单实际
          this.form.starttimeend = this.toSwitch(dataList.actualEndTime); //实际结束时间
          //var picArr = [];
          //"http://114.116.233.143/group1/M00/00/03/wKgB0l3oi3uAbNVZAAHoNVUpQjo293.jpg,http://114.116.233.143/group1/M00/00/03/wKgB0l3oi3uAetb4AAGv4Wc9nPA198.jpg,http://114.116.233.143/group1/M00/00/03/wKgB0l3oi3uAIHVlAAIrtZ06C_o811.jpg,http://114.116.233.143/group1/M00/00/03/wKgB0l3oi3uAFpZ0AAJ3tBYxRAg490.jpg,http://114.116.233.143/group1/M00/00/03/wKgB0l3oi3uAC7mIAAIYyU4bRkU244.jpg"
          // dataList.closePicture != null && dataList.closePicture != ""
          if (!!dataList.closePicture) {
            this.srcList = dataList.closePicture.split(",");
            for (var i = 0; i < this.srcList.length; i++) {
              let obj = {};
              obj.url = this.srcList[i];
              this.urls.push(obj);
              this.aurl = this.urls.map(v => v.url);
            }
            console.log(this.urls,"111111111111");
          }
          if (this.type == "查看") {
            this.checkContents();
          }
        }
      });
    },
    closeOrders() {
      var fd = new FormData();
      this.ruleForm.sontableData.forEach((item, index) => {
        let obj = {};
        obj.checkTitle = item.model.length ? item.model[0] : "";
        obj.checkExplain = item.model.length ? item.model[1] : "";
        // obj.checkTitle =  item.model[0];
        // obj.checkExplain = item.model[1];
        obj.amount = item.money;
        obj.index = item.index;
        this.checkList.push(obj);
      });
    console.log(this.checkList,"1111111111111111")
      var totalPrice = this.checkList.reduce((pre, item) => {
        return pre + item.amount;
      }, 0);
      console.log(this.ruleForm.sontableData)
      // 文件
      for (var i = 0; i < this.ruleForm.sontableData.length; i++) {
        for (var j = 0; j < this.ruleForm.sontableData[i].uploadFile.length; j++) {
          var arr = this.ruleForm.sontableData[i].uploadFile[j].name.split(".");
          arr[arr.length - 2] += i;
          var df=new File([this.ruleForm.sontableData[i].uploadFile[j]],arr.join("."),{type:this.ruleForm.sontableData[i].uploadFile[j].type})
          this.ruleForm.sontableData[i].uploadFile[j] = df;
          fd.append("files",this.ruleForm.sontableData[i].uploadFile[j]);
        }
      }
      fd.append("id", this.itemId);
      if(this.checkList.length){
         fd.append("checkList", JSON.stringify(this.checkList));
      }
      fd.append("amount", totalPrice);
      fd.append("orderNumber", this.code);
      // exit();
      // console.log(this.ruleForm.sontableData, "aaa");
      // //var checkList = [];
      // for (var i = 0; i < this.ruleForm.sontableData.length; i++) {
      //   if (this.ruleForm.sontableData[i].model.length != 0) {
      //     let obj = {};
      //     obj.checkTitle = this.ruleForm.sontableData[i].model[0];
      //     obj.checkExplain = this.ruleForm.sontableData[i].model[1];
      //     obj.amount = this.ruleForm.sontableData[i].money;
      //     this.checkList.push(obj);
      //   }
      // }
      // console.log(this.checkList, "bbbb");
      // var totalPrice = 0;
      // for (var j = 0; j < this.checkList.length; j++) {
      //   console.log(this.checkList[j].amount);
      //   totalPrice += parseInt(this.checkList[j].amount);
      // }
      // //console.log(totalPrice,"总金额")
      // var data = {
      //   id: this.itemId,
      //   checkList: this.checkList,
      //   amount: totalPrice,
      //   orderNumber: this.code,
      //   //this.code = dataList.
      // };
      reCheck(fd).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "复审成功"
          });
          this.$router.push({
            path: "/protectCenter/ordermanage"
          });
        } else {
          this.$message({
            type: "warning",
            message: res.data.msg
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toSwitch(str) {
      if (str != null) {
        var strSwitch = str.trim().split(" ");
        return strSwitch[0];
      } else {
        return str;
      }
    },
    init() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hh = date.getHours();
      var mm = date.getMinutes();
      var ss = date.getSeconds();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      if (hh < 10) hh = "0" + hour;
      if (mm < 10) mm = "0" + minu;
      if (ss < 10) ss = "0" + sec;
      var rq = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
      return rq;
    },
    //kaohe
    getChecks() {
      var data = {};
      getCheck(data).then(res => {
        console.log(res, "考核标准");
        // if(res.data.code==0){
        //     this.standardArr = res.data.data;
        // }
        console.log(this.standardArr, "考核标准");
        var arr = [];
        for (var i = 0; i < res.data.data.length; i++) {
          let obj = {};
          obj.label = res.data.data[i].checkTitle;
          obj.value = res.data.data[i].checkTitle;
          obj.children = [];
          for (var j = 0; j < res.data.data[i].describe.length; j++) {
            let obj1 = {};
            obj1.label = res.data.data[i].describe[j].checkExplain;
            obj1.value = res.data.data[i].describe[j].checkExplain;
            obj.children.push(obj1);
          }

          this.standardArr.push(obj);
        }
        console.log(this.standardArr, "arrr");
      });
    },
    selected(val) {
      var loading = this.$loading({lock: true,text: '获取数据中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
      console.log(val, "xuanwanyihou ");
      console.log(this.selectIndex, "aaa");
      var data = {
        checkTitle: val.model[0],
        checkExplain: val.model[1]
      };
      getmoney(data).then(res => {
        console.log(res, "qian");
        //for(var i=0;i<this.ruleForm.sontableData[i].length;i++){
        //if(this.selectIndex==this.ruleForm.sontableData[i])
        // this.ruleForm.sontableData[this.selectIndex].money = res.data;
        //}
        //console.log( this.ruleForm.sontableData,"data")
        this.ruleForm.sontableData.forEach((item,index) => {
          if(item.index == val.index){
            item.money = res.data;
          }
        })
        loading.close();
      });
    },

    //标准选完以后改变的
    standarChange(val) {
      // console.log(val,"valllll")
      var data = {
        checkTitle: val
      };
      //this.shuoming = '';
      //this.money = ''
      getCheck(data).then(res => {
        console.log(res, "考核说明");
        if (res.data.code == 0) {
          this.shuomingArr = res.data.data;
          //this.standardArr = res.data.data;
        }
      });
    },
    shuomingChange(val) {
      var value = val;
      console.log(val, "bbb");
      var item = {};
      for (var i = 0; i < this.shuomingArr.length; i++) {
        if (val == this.shuomingArr[i].checkExplain) {
          item = this.shuomingArr[i];
        }
      }
      this.money = item.amount;

      //console.log(item,"itemmmmm")
      //this.shuoming = item.checkExplain;
      for (var i = 0; i < this.ruleForm.sontableData.length; i++) {
        if (val == this.ruleForm.sontableData[i].explain) {
          this.ruleForm.sontableData[i].money = this.money;
        }
      }
      console.log(this.money, "moneymoney");
      // this.ruleForm.sontableData[]
    },
    addOneitem() {
      if(!!this.ruleForm.sontableData.length && this.ruleForm.sontableData.map(v => v.money).indexOf("") != -1){
        this.$message.warning('请填写内容');
        return false;
      }
      this.index += 1;
      var obj = {
        model: [],
        explain: "",
        money: "",
        index: this.index,
        files: [],
        uploadFile: [],
        flag: false
      };
      this.ruleForm.sontableData.push(obj);
      console.log(this.ruleForm.sontableData);
    },
    cell(val) {
      // console.log(aaa)
      // console.log( row, column,cell)
      console.log("aaa");
      console.log(val, "valll");
      this.selectIndex = val.index;
    },
    back() {
      this.$router.push({
        path: "/protectCenter/ordermanage"
      });
    },
    checkContents() {
      var data = {
        orderNumber: this.code
      };
      console.log(data, this.code, "data");
      checkContent(data).then(res => {
        console.log(res, "查询评价的接口");
        this.ruleForm.sontableData = [];
        if(!res.data.length){
          this.ruleForm.sontableData = [];
          return false;
        }
        
        for(var i = 0; i < res.data.length; i++){
          let obj = {
            money: res.data[i].amount,
            model: [],
            files: [],
            flag: true,
          };
          obj.model.push(res.data[i].checkTitle)
          obj.model.push(res.data[i].checkExplain)
          var urls = res.data[i].picture.split(",")
          var names = res.data[i].name.split(",")
          for(var j = 0; j<urls.length;j++){
            var news = {};
            news.url = urls[j];
            news.name = names[j];
            obj.files.push(news);
          }
          this.ruleForm.sontableData.push(obj);
        }
        console.log(this.ruleForm.sontableData,"this.ruleForm.sontableData")
      });
    },
    //驳回
    backClose() {
      var data = {
        id: this.itemId
      };
      backCloses(data).then(res => {
        console.log(res, "res");
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "驳回成功"
          });
          this.$router.push({
            path: "/protectCenter/ordermanage"
          });
        } else {
          this.$message({
            type: "warning",
            message: res.data.msg
          });
        }
      });
    },

    onChangeAgain(file, fileList, row) {
      this.ruleForm.sontableData.forEach((item, index) => {
        if (item.index == row.index) {
          item.files.push({name: file.name, url: ""});
          item.uploadFile.push(file.raw);
          item.flag = true;
        }
      });
    },
    closeTag(row, file, id) {
      this.ruleForm.sontableData.forEach((item, index) => {
        if (item.index == row.index) {
          // 删除
          item.files.splice(id, 1);
          item.uploadFile.splice(id, 1);
        }
      });
    },
    changeImg(item,index){
      this.aurl.unshift(this.aurl.splice(index , 1)[0]);
    }
  },
  mounted() {
    this.itemId = this.$route.query.id;
    this.type = this.$route.query.type;
    console.log(this.itemId);
    this.getList();
    this.getChecks();
  }
};
</script>
<style lang="scss">
.wrap {
  overflow: auto;
}
.btn-box {
  width: 100%;
  position: relative;
  height: 50px;
}
.btn {
  width: 25%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
}
.logo {
  width: 70px;
  height: 24px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  line-height: 25px;
  margin-bottom: 10px;
}
.logoBlock {
  width: 8px;
  height: 14px;
  background-color: blue;
  margin-top: 5px;
}
</style>


