<!--创建人:蒋万鹏  创建时间: 2019-11-19 -->
<template>
  <div id="wrap-only">
    <el-dialog
      :visible="heavyDialogIsShow"
      width="500px"
      :before-close="modalClose"
      :close-on-click-modal="false"
    >
      <div slot="title">
        <span class="preTitle"></span>
        <span class="nextTitle">重派</span>
      </div>
      <div class="main">
        <el-form ref="form" label-width="80px" :model="form">
          <el-form-item label="用户问题" prop="problemIds">
            <el-cascader
              :options="modelOption"
              clearable
              @change="handleChange"
              v-model="form.problemIds"
              :props="defaultParams"
              size="mini"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="供应商" prop="supplierCode">
            <el-select v-model="form.supplierCode" placeholder="请选择" size="mini">
              <el-option
                v-for="item in options"
                :key="item.supplierCode"
                :label="item.supplierName"
                :value="item.supplierCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="重派原因" prop="explanation">
            <el-input v-model="form.explanation" type="textarea" size="mini" :rows="4"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleSave" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getSupperData } from "@/api/maintenance/hzpropertyrepair";

export default {
  name: "dialog",
  data() {
    return {
      form: {
        explanation: "",
        problemIds: "",
        supplierCode:"",
      },
      options: {},
      defaultParams: {
        label: "name",
        value: "id",
        children: "children"
      }
    };
  },
  created() {},

  props: ["heavyDialogIsShow", "modelOption", "buildUuid"],
  methods: {
    handleChange(data) {
      getSupperData({ problemId: data[1], buildUuid: this.buildUuid }).then(
        res => {
          console.log(res.data);
          this.options = res.data;
        }
      );
    },
    modalClose() {
      this.$refs["form"].resetFields();
      this.$emit("openHeavyDialog");
    },
    handleSave() {
      this.$emit("heavyDialogSendMessage", this.form);
      this.$emit("openHeavyDialog");
      this.$refs["form"].resetFields();
    },
    handleCancel() {
      this.$emit("openHeavyDialog");
      this.$refs["form"].resetFields();
    }
  },
  created() {}
};
</script>
<style lang="scss">
#wrap-only {
  .main {
    padding: 15px 20px;
  }
}
</style>

<style lang="scss" scoped>
.preTitle {
  height: 16px;
  width: 5px;
  background-color: #3a8ee6;
  display: block;
  float: left;
  text-align: center;
  margin: 4px 0;
}

.nextTitle {
  float: left;
  padding: 0 0 0 5px;
  line-height: 24px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #666;
}
</style>
