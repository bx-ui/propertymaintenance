<!--创建人:蒋万鹏  创建时间: 2019-10-29 -->
// 报修信息公共模块
<template>
  <div class="wrap">
    <div class="pane_top">
      <el-form label-width="100px">
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <el-form-item label="报修标题">
                <el-input disabled v-model="data.repairTitle" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报修项目">
                <el-input disabled v-model="data.projectName" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <el-form-item label="报修分期">
                <el-input disabled v-model="data.projectStageName " size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报修楼栋">
                <el-input disabled v-model="data.buildName" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <el-form-item label="报修房号">
                <el-input disabled v-model="data.roomName " size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报修业主">
                <el-input disabled v-model="data.ownerName " size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input disabled v-model="data.ownerTep " size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报修时间">
                <el-input disabled :value="data.repairTime | dateFilter" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <el-form-item label="维修单提交时间">
                <el-input disabled :value="data.appInvalidTime | dateFilter " size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="确认时间">
                <el-input disabled :value="data.gcqrTime | dateFilter" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <el-form-item label="所属模块">
                <el-input disabled v-model="data.moduleName" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="问题大类">
                <el-input disabled v-model="data.bigClassName" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>

        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="一次发函时间">
              <el-input disabled :value="data.firstSendLetterTime | dateFilter" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="二次发函时间">
              <el-input disabled :value="data.secondSendLetterTime | dateFilter" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <el-form-item label="责任供应商">
                <el-input disabled v-model="data.supplierName " size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="20">
              <el-form-item label="问题详细描述">
                <el-input
                  type="textarea"
                  disabled
                  v-model="data.requirement"
                  size="mini"
                  :rows="3"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="20">
              <el-form-item label="问题附件">
                <!-- <el-input disabled v-model="bigClassName" size="mini"></el-input> -->
                <el-image
                  style="width: 100px; height: 100px; margin-right:15px;"
                  :src="item.attUrl"
                  fit="contain"
                  v-for="(item,index) in data.sysAttachmentList"
                  :key="index"
                  :preview-src-list="[item.attUrl]"
                  :z-index="2000"
                ></el-image>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "RepairInformModule",
  props: ["data"],
  filters: {
    dateFilter(date) {
      return !date ? "" : date.split(" ")[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
}
</style>  