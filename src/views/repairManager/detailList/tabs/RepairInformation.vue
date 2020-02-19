<!--创建人:蒋万鹏  创建时间: 2019-10-29 -->
//报修信息模块
<template>
  <div class="wrap">
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
            <el-form-item label="报修单元">
              <el-input disabled v-model="data.unitName" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="报修房号">
              <el-input disabled v-model="data.roomName " size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="报修业主">
              <el-input disabled v-model="data.ownerName " size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话">
              <el-input disabled v-model="data.ownerTep " size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="报修时间">
              <el-input disabled v-model="data.repairTime" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="期望解决时间">
              <el-input disabled v-model="data.solveTime" size="mini"></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-row>
      <el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="维修单提交时间">
              <el-input disabled v-model="data.appInvalidTime " size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="确认时间">
              <el-input disabled v-model="data.gcqrTime" size="mini"></el-input>
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
      <el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
          </el-col>
          <el-col :span="8">
            <el-form-item label="责任供应商">
              <el-input disabled v-model="data.supplierName " size="mini"></el-input>
            </el-form-item>
          </el-col>
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
</template>
<script>
export default {
  name: "RepairInformation",
  props: ["data"],
  mounted() {
    console.log(this.data);
  },
  data() {
    return {
      // data: {
      // activeName: "",
      // id: "",
      // code: "",
      // repairTitle: "",
      // projectName: "",
      // projectStageName: "",
      // buildName: "",
      // unitName: "",
      // roomName: "",
      // ownerName: "",
      // ownerTep: "",
      // repairTime: "",
      // solveTime: "",
      // appInvalidTime: "",
      // gcqrTime: "",
      // moduleName: "",
      // bigClassName: "",
      // supplierName: "",
      // requirement: "",
      // fileIds: "",
      // firstSendLetterTime: "",
      // secondSendLetterTime: "",
      // sysAttachmentList: []
      // }
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.wrap {
}
</style>