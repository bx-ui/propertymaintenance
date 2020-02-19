<!--创建人:蒋万鹏  创建时间:  -->
<!-- 第三方维修方案 -->
<template>
  <div class="wrap">
    <common-title title="基本信息"></common-title>
    <RepairInformModule :data="thirdData" />
    <common-title title="第三方供应商信息"></common-title>

    <div class="pane_bottom">
      <el-form label-width="120px">
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <el-form-item label="第三方合同供应商" :required="true">
                <el-select
                  v-model="sendData.contractCode"
                  placeholder="请选择"
                  @change="handleChange"
                  size="mini"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.contractCode"
                    :label="item.name"
                    :value="item.contractCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input disabled size="mini" v-model="chooseData.createUser"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input disabled size="mini" v-model="chooseData.createPhone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编码">
                <el-input disabled v-model="chooseData.contractCode" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <el-form-item label="合同有效期">
                <el-input disabled :value="chooseData.time" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同名称">
                <el-input disabled v-model="chooseData.contractName" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="20">
              <el-form-item label="方案描述" :required="true">
                <el-input
                  type="textarea"
                  v-model="sendData.planDescribe"
                  size="mini"
                  :disabled="isDisabled"
                  maxlength="100"
                  resize="none"
                  show-word-limit
                  rows="3"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="20">
              <el-form-item label="方案附件" v-if="!isDisabled" :required="true">
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  action="123"
                  multiple
                  :file-list="fileList"
                  :auto-upload="false"
                  :on-change="handleFileChange"
                >
                  <el-button size="mini" type="primary">选择附件</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">单个文件大小不能超过500kb</div> -->
                </el-upload>
              </el-form-item>
              <el-form-item label="方案附件" v-if="isDisabled">
                <el-row v-for="(item,key) in fileList" :key="key">
                  <div>
                    <i class="el-icon-document"></i>
                    <a
                      :href="item.url"
                      style="line-height:20px;"
                      :download="item.name"
                      target="_blank"
                    >{{item.name}}</a>
                  </div>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row style="text-align:center;">
          <!-- <el-button type="primary" size="mini" @click="handleSubmit" v-if="!isDisabled">保存方案</el-button> -->
          <el-button
            type="primary"
            size="mini"
            @click="handleSubmit"
            v-if="!isDisabled"
            v-loading.fullscreen.lock="fullscreenLoading"
          >保存方案</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import RepairInformModule from "./RepairInformModule";
import { getProviders, sendThirdRepair } from "@/api/repair/repair";
export default {
  name: "ThirdPartyRepair",
  props: ["thirdData", "totalData", "state"],
  components: {
    RepairInformModule
  },
  filters: {
    dateFilter(date) {
      return !date ? "" : date.split(" ")[0];
    }
  },
  watch: {
    state(newDate, oldDate) {
      console.log(newDate);
      if (newDate == 3) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    totalData(newData, oldData) {
      if (!!newData) {
        console.log(newData, "watch");
        this.init(newData);
      }
    }
  },
  created() {
    this.getProvider();
  },
  data() {
    return {
      isDisabled: true,
      fullscreenLoading: false,
      fileList: [],
      chooseData: {
        contractName: "",
        contractCode: "",
        contractStartTime: "",
        contractEndTime: "",
        time: "",
        createUser: "",
        createPhone: ""
      },
      sendData: {
        contractCode: "",
        maintenanceId: "",
        planDescribe: "",
        calculateFiles: ""
      },
      options: []
    };
  },
  methods: {
    init(data) {
      console.log(data.hzPropertyMaintenancePlanVO, "init参数");
      Object.keys(this.chooseData).forEach(item => {
        this.chooseData[item] = data.hzPropertyMaintenancePlanVO[item];
      });
      this.sendData.contractCode =
        data.hzPropertyMaintenancePlanVO.contractCode;
      console.warn(this.sendData.contractCode);
      this.sendData.planDescribe =
        data.hzPropertyMaintenancePlanVO.planDescribe;
      data.hzPropertyMaintenancePlanVO.sysAttachmentList.forEach(element => {
        this.fileList.push({
          name: element.attViewName,
          url: element.attUrl
        });
      });
      this.chooseData.time =
        this.chooseData.contractStartTime.split(" ")[0] +
        " ~ " +
        this.chooseData.contractEndTime.split(" ")[0];
      // console.log(this.fileList, "fileList");
      // console.log(this.chooseData, "chooseData");
      // console.log(this.sendData, "sendData");
    },
    handleFileChange(file, fileList) {
      console.log(file);
      console.log(file, fileList);
      // this.fileList.push(file);
      this.fileList = fileList;
    },
    handleSubmit() {
      if (!this.sendData.contractCode) {
        this.$message.warning("请选择第三方供应商");
        return;
      } else if (!this.sendData.planDescribe) {
        this.$message.warning("请填写方案描述");
        return;
      } else if (this.fileList.length == 0) {
        this.$message.warning("请选择方案附件");
        return;
      }
      let formDatas = new FormData();
      formDatas.append("contractCode", this.sendData.contractCode);
      formDatas.append("planDescribe", this.sendData.planDescribe);
      formDatas.append("maintenanceId", this.$route.query.id);
      this.fileList.forEach(element => {
        formDatas.append("calculateFiles", element.raw);
      });

      this.fullscreenLoading = true;
      sendThirdRepair(formDatas).then(res => {
        this.fullscreenLoading = false;
        console.log(res.data);
        if (res.data.code == 0) {
          this.$message.success("提交成功");
          let a = setTimeout(() => {
            this.$router.go(-1);
            clearTimeout(a);
          }, 300);
        } else {
          this.$message.error("提交失败");
        }
      });
    },
    getProvider() {
      getProviders({ projectUuid: this.$route.query.projectUuid }).then(res => {
        console.log(res.data, "供应商选项");
        this.options = res.data;
      });
    },
    handleChange(val) {
      console.log(data);
      let data = this.options.filter(item => item.contractCode == val);
      // console.log(data, "change");
      Object.keys(this.chooseData).forEach(item => {
        this.chooseData[item] = data[0][item];
        if (item == "contractStartTime") {
          this.chooseData[item] = data[0].constactStartTime;
        }
        if (item == "contractEndTime") {
          this.chooseData[item] = data[0].constactEndTime;
        }
      });
      // console.log(this.chooseData);
      this.chooseData.time =
        this.chooseData.contractStartTime.split(" ")[0] +
        " ~ " +
        this.chooseData.contractEndTime.split(" ")[0];
      console.log(this.chooseData);
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
}
</style>