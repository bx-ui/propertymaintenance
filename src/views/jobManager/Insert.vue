<!--创建人:蒋万鹏  创建时间: 2019-12-13 -->
<template>
  <div class="wrap">
    <CommonTitle title="新增职能信息"></CommonTitle>
    <el-form
      label-width="80px"
      style="padding:0 30px 0 30px"
      :rules="formRules"
      ref="form"
      :model="formData"
    >
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item label="新增类型" required>
            <el-radio-group v-model="formData.type" @change="handelChange">
              <el-radio label="1">职能</el-radio>
              <el-radio label="2">岗位</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40" v-if="!funIsShow">
        <el-col :span="12">
          <el-form-item label="职能编码" required prop="parentCode">
            <el-input size="mini" v-model="formData.parentCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职能名称" required prop="parentName">
            <el-input size="mini" v-model="formData.parentName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40" v-if="funIsShow">
        <el-col :span="12">
          <el-form-item label="职能名称" required>
            <!-- <el-input size="mini" v-model="formData.parentName"></el-input> -->
            <el-select v-model="formData.parentCode" filterable placeholder="请选择职能名称">
              <el-option
                v-for="item in jobOptions"
                :key="item.parentCode"
                :label="item.parentName"
                :value="item.parentCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40" v-if="jobIsShow">
        <el-col :span="12">
          <el-form-item label="岗位编码" required prop="code">
            <el-input size="mini" v-model="formData.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="岗位名称" required prop="name">
            <el-input size="mini" v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40" v-if="submitInfoIsShow">
        <el-col :span="12">
          <el-form-item label="提交人" required prop="createUser">
            <el-input size="mini" v-model="formData.createUser"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="提交时间" required prop="createTime">
            <el-input size="mini" v-model="formData.createTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="24">
          <el-form-item label="职能描述" prop="described">
            <el-input type="textarea" size="mini" v-model="formData.described"></el-input>
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
import { addNewJob, getJobList } from "@/api/job/job";

export default {
  name: "jobManagerDetail",
  components: {
    CommonTitle
  },
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
    return {
      name: "", //操作名称
      jobIsShow: false,
      funIsShow: false,
      formRules: {
        parentCode: [
          { required: true, message: "请输入职能编码", trigger: "blur" }
        ],
        parentName: [
          { required: true, message: "请输入职能名称", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入岗位编码", trigger: "blur" }],
        code: [{ required: true, message: "请输入岗位名称", trigger: "blur" }]
      },
      formData: {
        type: "1",
        parentCode: "",
        parentName: "",
        code: "",
        name: "",
        described: "",
        createUser: "",
        createTime: ""
      },
      jobOptions: [],
      submitInfoIsShow: false
    };
  },
  created() {
    this.getJobList();
  },
  methods: {
    getJobList() {
      getJobList().then(res => {
        this.jobOptions = res.data;
      });
    },
    save() {
      // this.$refs.
      this.$refs["form"].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          addNewJob(this.formData).then(res => {
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
      this.formData.parentCode = ""
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