<!--创建人:蒋万鹏  创建时间:  -->
<template>
  <div id="wrap-only">
    <el-dialog
      :visible="dialogIsShow"
      width="500px"
      :before-close="modalClose"
      :close-on-click-modal="false"
    >
      <div slot="title">
        <span class="preTitle"></span>
        <span class="nextTitle">{{info}}信息</span>
      </div>
      <div class="main">
        <div>
          <el-form ref="form" label-width="80px" :model="form">
            <el-form-item :label="info + '原因'" prop="reason">
              <el-input type="textarea" :rows="7" placeholder="请输入内容" v-model="form.reason"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dialog",
  data() {
    return {
      form: {
        reason: ""
      }
    };
  },
  props: ["dialogIsShow", "info"],
  methods: {
    modalClose() {
      this.$emit("openDialog");
      this.$refs["form"].resetFields();
    },
    handleSave() {
      this.$emit("dialogSendMessage", this.form.reason);
      this.$refs["form"].resetFields();
    },
    handleCancel() {
      this.$emit("openDialog");
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
