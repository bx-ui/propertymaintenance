<!--创建人:蒋万鹏  创建时间: 2019-12-13 -->
<template>
  <div class="wrap">
    <CommonTitle :title="'职能信息'+name"></CommonTitle>
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
            <el-radio-group v-model="formData.type" :disabled="true">
              <el-radio label="1">职能</el-radio>
              <el-radio label="2">岗位</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="职能编码" required prop="parentCode">
            <el-input size="mini" v-model="formData.parentCode" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职能名称" required prop="parentName">
            <el-input size="mini" v-model="formData.parentName" :disabled="!isDetailsShow"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40" v-if="jobIsShow">
        <el-col :span="12">
          <el-form-item label="岗位编码" required>
            <el-input size="mini" v-model="formData.code" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="岗位名称" required>
            <el-input size="mini" v-model="formData.name" :disabled="!isDetailsShow"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="提交人">
            <el-input size="mini" v-model="formData.createUser" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="提交时间">
            <el-input size="mini" v-model="formData.createTime" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="24">
          <el-form-item label="职能描述" prop="described">
            <el-input
              type="textarea"
              size="mini"
              v-model="formData.described"
              :disabled="!isDetailsShow"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="text-align:center;" v-if="isDetailsShow">
      <el-col>
        <el-button type="primary" size="mini" @click="save">保存</el-button>
        <el-button size="mini">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CommonTitle from "@/components/common/CommonTitle";
import { getJobDetails, editJob } from "@/api/job/job";

export default {
  name: "jobManagerDetail",
  components: {
    CommonTitle
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.name = vm.$route.query.name;
      vm.getDetails();
      if (vm.name == "详情") {
        vm.isDetailsShow = false;
      } else {
        vm.isDetailsShow = true;
      }
    });
  },
  data() {
    return {
      isDetailsShow: false, //是否是详情页
      name: "", //操作名称
      jobIsShow: false,
      // parentNameIsShow: false,
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
      }
    };
  },
  methods: {
    getDetails() {
      getJobDetails({ id: this.$route.query.id }).then(res => {
        console.log(res.data);
        Object.keys(this.formData).forEach(key => {
          this.formData[key] = res.data[key];
        });
        if (this.formData.type == 1) {
          this.formData.parentCode = this.formData.code;
          this.formData.parentName = this.formData.name;
        } else {
          this.jobIsShow = true;
          this.nameIsShow = true;
        }
      });
    },
    save() {
      let result = JSON.parse(JSON.stringify(this.formData));
      result.id = this.$route.query.id;
      if (this.formData.type == 1) {
        result.name = result.parentName;
        result.code = result.parentCode;
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      editJob(result).then(res => {
        if (res.data) {
          loading.close();
          this.$message.success("添加成功");
          this.$router.go(-1);
        } else {
          loading.close();
          this.$message.warning(res.data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  padding: 10px;
}
</style>