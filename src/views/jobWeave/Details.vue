<!--创建人:蒋万鹏  创建时间: 2019-12-13 -->
<template>
  <div class="wrap">
    <CommonTitle :title="'职能编制'+name"></CommonTitle>
    <el-form
      label-width="80px"
      style="padding:0 30px 0 30px"
      :rules="formRules"
      ref="form"
      :model="formData"
    >
      <el-row :gutter="40" v-if="!funIsShow">
        <el-col :span="12">
          <el-form-item label="项目名称" required prop="projectUuid">
            <el-select
              v-model="formData.projectUuid"
              filterable
              placeholder="请选择项目名称"
              :disabled="true"
              size="mini"
            >
              <el-option
                v-for="item in projectOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职能名称">
            <el-input v-model="formData.parentName" :disabled="true" size="mini"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="岗位名称" required prop="code">
            <el-select
              :disabled="true"
              v-model="formData.code"
              filterable
              placeholder="请选择岗位名称"
              @change="handleStationChange"
              size="mini"
            >
              <el-option
                v-for="item in stationOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计划人数" required prop="planNum">
            <el-input size="mini" v-model="formData.planNum" maxlength="10" :disabled="!infoIsShow"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="实际人数">
            <el-input :disabled="true" v-model="realNum" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="提交人">
            <el-input size="mini" v-model="formData.createUser" maxlength="10" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="提交时间">
            <el-input :disabled="true" v-model="formData.createTime" size="mini"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" size="mini" v-model="formData.remark" :disabled="!infoIsShow"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="text-align:center;" v-if="infoIsShow">
      <el-col>
        <el-button type="primary" size="mini" @click="save">保存</el-button>
        <el-button size="mini" @click="cancel">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CommonTitle from "@/components/common/CommonTitle";
import {
  getJobList,
  getStationOptions,
  getWeaveInfo,
  editWeaveInfo
} from "@/api/job/job";
import { mixinText } from "@/mixins/getProjectAndstage.js";

export default {
  name: "jobManagerDetail",
  components: {
    CommonTitle
  },
  mixins: [mixinText],
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log("router", vm.$route.query.name);
      vm.name = vm.$route.query.name;
      vm.realNum = vm.$route.query.realNum;
      switch (vm.name) {
        case "编辑":
          vm.infoIsShow = true;
          break;
        case "详情":
          vm.infoIsShow = false;
          break;
        default:
          break;
      }
      console.log(vm.infoIsShow);
    });
  },
  data() {
    const checkNum = function checkNum(rule, value, cb) {
      const reg = new RegExp(/^\d*$/);
      if (reg.test(value)) {
        cb();
      } else {
        cb(new Error("请输入数字"));
      }
    };
    return {
      name: "", //操作名称
      jobIsShow: false,
      funIsShow: false,
      projectOptions: [], //项目选项
      stationOptions: [], //岗位选项
      jobOptions: [], //职能选项
      realNum: "",
      formRules: {
        planNum: [
          { required: true, message: "请输入计划人数", trigger: "blur" },
          { message: "请输入数字", validator: checkNum, trigger: "blur" }
        ]
      },
      formData: {
        id: "",
        projectUuid: "",
        code: "",
        remark: "",
        planNum: "",
        parentCode: "",
        createUser: "",
        createTime: ""
      },
      infoIsShow: false
    };
  },
  created() {
    this.getJobList();
    this.getProjectList();
    this.getStationOptions();
    this.getWeaveDetails();
  },
  methods: {
    getWeaveDetails() {
      getWeaveInfo({ id: this.$route.query.id }).then(res => {
        console.log(res.data);
        Object.keys(this.formData).forEach(item => {
          this.formData[item] = res.data[item];
        });
        this.formData.parentName = res.data.parentName;
        this.formData.createTime = res.data.createTime.split(" ")[0];
      });
    },
    getStationOptions() {
      getStationOptions().then(res => {
        // console.log("职位", res.data);
        this.stationOptions = res.data;
      });
    },
    getProjectList() {
      this.getPro().then(res => {
        // console.log("项目options", res);
        this.projectOptions = res;
      });
    },
    getJobList() {
      getJobList().then(res => {
        this.jobOptions = res.data;
      });
    },
    handleStationChange(data) {
      // console.log(data);
      this.formData.parentName = this.stationOptions.filter(
        item => item.code == data
      )[0].parentName;
      this.formData.parentCode = this.stationOptions.filter(
        item => item.code == data
      )[0].parentCode;
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          this.formData.createTime = "";
          editWeaveInfo(this.formData).then(res => {
            if (res.data.data) {
              loading.close();
              this.$message.success("添加成功");
              this.$router.go(-1);
            } else {
              loading.close();
              this.$message.warning(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    handelChange(label) {
      this.formData.parentCode = "";
      if (label == "1") {
        this.jobIsShow = false;
        this.funIsShow = false;
      } else {
        this.jobIsShow = true;
        this.funIsShow = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  padding: 10px;
}
</style>