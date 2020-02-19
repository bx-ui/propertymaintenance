<!--创建人:蒋万鹏  创建时间: 2019-10-23 -->
<!--详情页-->
<template>
  <div class="wrap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- <el-tab-pane label="报修信息" name="repair" id="repair">
        <RepairInformation :data="data" />
      </el-tab-pane>   -->
      <el-tab-pane label="第三方维修方案" name="third" id="third">
        <ThirdPartyRepair :thirdData="data" :totalData="totalData" :state="state" />
      </el-tab-pane>
      <el-tab-pane label="责任划分" name="response" id="response">
        <ResponsibilityDivide :resData="data" :totalData="totalData" :state="state" />
      </el-tab-pane>
      <el-tab-pane label="成本预算清单" name="task" id="task">
        <CostBudget :costData="data" :totalData="totalData" :state="state" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getDetail } from "@/api/repair/repair";
// import RepairInformation from "./tabs/RepairInformation";
import ThirdPartyRepair from "./tabs/ThirdPartyRepair";
import ResponsibilityDivide from "./tabs/ResponsibilityDivide";
import CostBudget from "./tabs/CostBudget";
// ThirdPartyReqair
export default {
  name: "Details",
  data() {
    return {
      activeName: "third",
      state:'',
      chooseImg: [],
      data: {
        activeName: "",
        id: "",
        code: "",
        repairTitle: "",
        projectName: "",
        projectStageName: "",
        buildName: "",
        unitName: "",
        roomName: "",
        ownerName: "",
        ownerTep: "",
        repairTime: "",
        solveTime: "",
        appInvalidTime: "",
        gcqrTime: "",
        moduleName: "",
        bigClassName: "",
        supplierName: "",
        requirement: "",
        fileIds: "",
        firstSendLetterTime: "",
        secondSendLetterTime: "",
        sysAttachmentList: []
      },
      totalData: {}
    };
  },
  components: {
    // RepairInformation,
    ThirdPartyRepair,
    ResponsibilityDivide,
    CostBudget
  },
  created() {
    this.init();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.handleIsShow();
    });
  },
  methods: {
    init() {
      console.warn('created 执行了init方法')
      console.log(this.$route.query.id);
      getDetail(this.$route.query.id).then(res => {
        this.totalData = res.data;
        Object.keys(this.data).forEach(item => {
          this.data[item] = res.data[item];
        });
      });
    },
    handleClick() {},
    handleIsShow() {
      this.state = this.$route.query.state;
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  padding: 15px;
  /deep/ .el-tabs {
    height: 100%;
  }
  /deep/ .el-tabs__item {
    font-size: 14px;
    font-weight: bold;
  }
  /deep/ .el-form-item {
    margin-bottom: 12px !important;
  }
  /deep/ .el-tabs__content {
    height: 88%;
    overflow: scroll;
  }
}
</style>