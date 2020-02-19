<!--创建人:蒋万鹏  创建时间: 2019-12-13 -->
<template>
  <div class="wrap">
    <CommonTitle title="新增职能编制"></CommonTitle>
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
            <el-select v-model="formData.projectUuid" filterable placeholder="请选择职能名称" size="mini">
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
            <el-input size="mini" v-model="formData.planNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" size="mini" v-model="formData.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="text-align:center;">
      <el-col>
        <el-button type="primary" size="mini" @click="save">保存</el-button>
        <el-button size="mini">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CommonTitle from "@/components/common/CommonTitle";
import { getJobList, getStationOptions, addWeaveInfo } from "@/api/job/job";
import { mixinText } from "@/mixins/getProjectAndstage.js";

export default {
  name: "jobManagerDetail",
  components: {
    CommonTitle
  },
  mixins: [mixinText],
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(vm.$route.params);
      vm.name = vm.$route.params.name;
      switch (vm.name) {
        case "编辑":
          vm.submitInfoIsShow = true;
          break;
        case "查看":
          vm.submitInfoIsShow = true;
          break;
        default:
          break;
      }
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
      formRules: {
        projectUuid: [
          { required: true, message: "请选择项目编码", trigger: "change" }
        ],
        code: [
          { required: true, message: "请选择职能名称", trigger: "change" }
        ],
        planNum: [
          { required: true, message: "请输入计划人数", trigger: "blur" },
          { message: "请输入数字", validator: checkNum, trigger: "blur" }
        ]
      },
      formData: {
        projectUuid: "",
        code: "",
        remark: "",
        planNum: "",
        parentCode: ""
      },
      submitInfoIsShow: false
    };
  },
  created() {
    this.getJobList();
    this.getProjectList();
    this.getStationOptions();
  },
  methods: {
    getStationOptions() {
      getStationOptions().then(res => {
        console.log("职位", res.data);
        this.stationOptions = res.data;
      });
    },
    getProjectList() {
      this.getPro().then(res => {
        console.log("项目options", res);
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
          addWeaveInfo(this.formData).then(res => {
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