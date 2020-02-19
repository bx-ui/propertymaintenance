<!--创建人:蒋万鹏  创建时间: 2019-10-23 -->
<!-- 列表页面 -->
<template>
  <div class="app-container calendar-list-container">
    <!-- 弹框 -->
    <Dialogs
      :dialogIsShow="dialogIsShow"
      :info="info"
      @openDialog="openDialog"
      @dialogSendMessage="dialogSendMessage"
    ></Dialogs>
    <HeavyDialog
      :heavyDialogIsShow="heavyDialogIsShow"
      :modelOption="modelOption"
      :buildUuid="buildUuid"
      @heavyDialogSendMessage="heavyDialogSendMessage"
      @openHeavyDialog="openHeavyDialog"
    ></HeavyDialog>

    <!-- 查询 -->
    <queryModel
      @getQuery="getQuery"
      :stateOption="changedStateOption"
      :moState="moState"
      @sendState="sendState"
      ref="queryList"
    ></queryModel>

    <el-row :gutter="10" style="margin-top: 5px" v-if="buttonsIsShow">
      <el-button
        size="mini"
        type="primary"
        @click="handleButtons(1)"
        v-if="permissions.repairManagerButtons"
      >发函通知</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="handleButtons(0)"
        v-if="permissions.repairManagerButtons"
      >暂停发函</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="handleVerifyVIP(6)"
        v-if="permissions.repairManagerButtons"
      >保外维修确认</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="handleButtons(4)"
        v-if="permissions.repairManagerButtons"
      >申请通知第三方</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="handleVerifySendThird(5)"
        v-if="permissions.repairManagerVerify"
      >确认通知第三方</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="handleButtons(3)"
        v-if="permissions.repairManagerButtons"
      >跳单</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="clickSwitchForm"
        v-if="permissions.repairManagerButtons"
      >重派</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="clickDryer(7)"
        v-if="permissions.repairManagerButtons"
      >催单</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="handleButtons(2)"
        v-if="permissions.repairManagerButtons"
      >作废</el-button>
      <el-button size="mini" type="primary" @click="clickExport">导出</el-button>
    </el-row>
    <!-- 列表页 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      ref="multipleTable"
      height="calc(100% - 180px)"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="35" align="center"></el-table-column>
      <el-table-column
        fixed
        prop="code"
        label="维修单编号"
        width="160"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="repairTitle"
        label="问题标题"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="state" label="状态" width="120" align="center">
        <template slot-scope="scope">{{scope.row.state | stateFilter}}</template>
      </el-table-column>
      <el-table-column prop="state" label="是否保内" width="120" align="center">
        <template slot-scope="scope">{{scope.row.isBn | isBnilter}}</template>
      </el-table-column>
      <el-table-column
        prop="position"
        label="报修位置"
        min-width="300"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="question" label="问题分类" min-width="250" align="center"></el-table-column>
      <el-table-column prop="maintenanceCycle" label="维修周期 (/天)" min-width="110" align="center"></el-table-column>
      <el-table-column
        prop="supplierName"
        label="所属供应商"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>

      <el-table-column
        prop="ownerName"
        label="业主姓名"
        width="100"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="ownerTep"
        label="电话号码"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="repairTime" label="报修提报日期" width="120" align="center">
        <template slot-scope="scope">{{scope.row.repairTime | dateFilter}}</template>
      </el-table-column>
      <el-table-column label="催单记录" min-width="250" align="center">
        <template slot-scope="scope">
          <el-popover placement="right" width="400" trigger="click">
            <el-table :data="gridData" v-loading="gridLoading">
              <el-table-column min-width="100" property="createUserName" label="姓名"></el-table-column>
              <el-table-column min-width="150" property="createTime" label="日期">
                <template slot-scope="scope">{{scope.row.createTime | createUserName}}</template>
              </el-table-column>
            </el-table>
            <el-button
              slot="reference"
              @click="clickGetDryerList(scope.row.id)"
              type="text"
              size="mini"
            >催单记录</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="50" align="center">
        <template slot-scope="scope">
          <el-button
            @click="handleClickDetail(scope.row.id,scope.row.projectUuid,scope.row.budgetProcId,scope.row.state)"
            type="text"
            size="mini"
          >{{editName}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-row style="text-align:center;margin-top:15px">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.limit"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-row>
  </div>
</template>
    
<script>
import { getModelData } from "@/api/maintenance/hzpropertyrepair";
import { getProjects } from "@/api/maintenance/acceptance";
import queryModel from "@/components/common/query.vue";
import Dialogs from "./Dialog";
import HeavyDialog from "./HeavyDialog";
import { mapState, mapGetters } from "vuex";
import {
  getList,
  handleButtons,
  // noticeThird,
  handleResend,
  getRepairExcel,
  getDryerHistory //催单
} from "@/api/repair/repair";
export default {
  data() {
    return {
      gridLoading: false,
      gridData: [],
      tableHeader: [
        {
          prop: "code",
          label: "维修单编号"
        },
        {
          prop: "repairTitle",
          label: "问题标题"
        },
        {
          prop: "state",
          label: "状态"
        },
        {
          prop: "position",
          label: "报修位置"
        },
        {
          prop: "question",
          label: "问题分类"
        },
        {
          prop: "supplierName",
          label: "所属供应商"
        },
        {
          prop: "ownerName",
          label: "业主姓名"
        },
        {
          prop: "ownerTep",
          label: "电话号码"
        },
        {
          prop: "repairTime",
          label: "报修提报日期"
        },
        {
          prop: "isBn",
          label: "是否保内"
        }
      ],
      buildUuid: "",
      dialogIsShow: false,
      heavyDialogIsShow: false,
      modelOption: [], //重派弹框内容
      state: "",
      routeMapState: "",
      isRepairManageList: "",
      buttonsIsShow: false,
      editName: "编辑",
      info: "",
      listQuery: {
        page: 1,
        limit: 10,
        state: 1 //跳转详情页面的状态判断,必须要有,页面初始化加载需要state
      },
      changedStateOption: [],
      stateOption: [
        //维修单管理页面的options
        // "-1": "作废",
        // "0": "跳单",
        {
          name: "全部",
          id: -1
        },
        {
          name: "作废",
          id: -2
        },
        {
          name: "跳单",
          id: 0
        },
        {
          name: "待维修",
          id: 1
        },
        {
          name: "暂停发函",
          id: 2
        },
        {
          name: "第三方维修方案",
          id: 3
        },
        {
          name: "责任划分",
          id: 4
        },
        {
          name: "责任划分审批中",
          id: 5
        },
        {
          name: "成本预算清单",
          id: 6
        },
        {
          name: "成本预算清单审批中",
          id: 7
        },
        {
          name: "待通知第三方",
          id: 8
        },
        {
          name: "待负责人确认",
          id: 9
        },
        {
          name: "已通知第三方",
          id: 10
        },
        {
          name: "已维修",
          id: 99
        }
        // {
        //   name: "待负责人确认",
        //   id: 11
        // }
      ],
      costApproveStateOption: [
        {
          name: "待审",
          id: 7
        },
        {
          name: "已审",
          id: -7
        }
        // {
        //   name: "全部",
        //   id: -77
        // }
      ],
      resApproveStateOption: [
        {
          name: "待审",
          id: 5
        },
        {
          name: "已审",
          id: -5
        }
        // {
        //   name: "全部",
        //   id: -55
        // }
      ],
      moState: "",
      loading: true,
      multipleSelection: [], //选择框的选中数据
      itemOption: [], //搜索项目名称内容
      repairTime: [], //报修日期
      total: 10,
      Lander: JSON.parse(sessionStorage.getItem("userInfo")).content.userId,
      itemId: [], //存放所有项目得projectId
      tableData: [], //列表数据
      tableAllData: [] //列表所有数据（用于导出）
    };
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  components: {
    queryModel,
    Dialogs,
    HeavyDialog
  },
  created() {
    this.getPro();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.changedStateOption = [];
      vm.repairDetail();
      // 通过 `vm` 访问组件实例
      let routeMap = {
        "/repairManager/List": -1,
        "/repairManager/ThirdPartyRepairList": 3,
        "/repairManager/ResponsibilityDivideList": 4,
        "/repairManager/CostBudgetList": 6,
        "/repairManager/ResponseApprovalList": 5,
        "/repairManager/CostBudgetApprovalList": 7
      };
      let state = routeMap[vm.$route.fullPath];
      vm.routeMapState = state;
      vm.listQuery.state = state;

      switch (state) {
        case -1:
          vm.changedStateOption = vm.stateOption;
          vm.moState = 1;
          vm.listQuery.state = 1;
          break;
        case 3:
          vm.changedStateOption = [{ name: "第三方维修方案", id: 3 }];
          vm.moState = 3;
          break;
        case 4:
          vm.changedStateOption = [{ name: "责任划分", id: 4 }];
          vm.moState = 4;
          break;
        case 5:
          vm.changedStateOption = vm.resApproveStateOption;
          vm.moState = 5;
          break;
        case 6:
          vm.changedStateOption = [{ name: "成本预算清单", id: 6 }];
          vm.moState = 6;
          break;
        case 7:
          vm.changedStateOption = vm.costApproveStateOption;
          vm.moState = 7;
          break;
        default:
          break;
      }
      console.log(state, "列表页面state");

      // vm.moState = state;
      if (state == -1) {
        vm.isRepairManageList = true; //如果是维修单管理页面,跳转详情页面,只能为查看状态
        vm.buttonsIsShow = true;
        vm.editName = "查看";
      } else if (state == 5 || state == 7) {
        vm.buttonsIsShow = false;
        vm.editName = "审批";
        vm.isRepairManageList = false;
      } else if (state == -5 || state == -7) {
        vm.buttonsIsShow = false;
        vm.editName = "查看";
        vm.isRepairManageList = false;
      } else {
        vm.buttonsIsShow = false;
        vm.editName = "编辑";
        vm.isRepairManageList = false;
      }
      vm.getTableData();
    });
  },
  filters: {
    stateFilter(date) {
      let statusMap = {
        "-2": "作废",
        "0": "跳单",
        "1": "待维修",
        "2": "暂停发函",
        "3": "第三方维修方案",
        "4": "责任划分",
        "5": "责任划分审批中",
        "-5": "已审批",
        "6": "成本预算清单",
        "7": "成本预算清单审批中",
        "-7": "已审批",
        "8": "待通知第三方",
        "9": "待负责人确认",
        "10": "已通知第三方",
        "99": "已维修"
      };
      return statusMap[date];
    },
    isBnilter(date) {
      return date == 1 ? "保内" : "保外";
    },
    dateFilter(date) {
      return !date ? "" : date.split(" ")[0];
    },
    timeFilter(time) {
      parseInt;
      let date = new Date(parseInt(time));
      let fullDate = `${date.getFullYear()}-${date.getMonth + 1}-${
        date.getDate
      }`;
      return fullDate;
    }
  },
  methods: {
    clickGetDryerList(id) {
      this.gridLoading = true;
      getDryerHistory(id).then(res => {
        // console.log(res.data);
        this.gridLoading = false;
        this.gridData = res.data;
      });
    },
    handleVerifySendThird(value) {
      let state = value;
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      if (this.multipleSelection.some(item => item.state != 9)) {
        this.$message.warning(
          "只有状态为'待负责人确认'的数据可以确认通知第三方"
        );
        return;
      }
      let data = {
        list: this.multipleSelection.map(item => item.id),
        state: state
      };
      handleButtons(data).then(res => {
        console.log(res.data);
        if (res.data.code == 0) {
          this.$message.success("通知第三方成功");
          this.getTableData();
        }
      });
      F;
    },
    handleVerifyVIP(value) {
      let state = value;
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      if (this.multipleSelection.some(item => item.state != 1)) {
        this.$message.warning("只有状态为'待维修'的数据可以保外维修确认");
        return;
      }
      if (this.multipleSelection.some(item => item.isBn != 0)) {
        this.$message.warning("只有保外的数据可以保外维修确认");
        return;
      }
      let data = {
        list: this.multipleSelection.map(item => item.id),
        state: state
      };
      handleButtons(data).then(res => {
        console.log(res.data);
        if (res.data.code == 0) {
          this.$message.success("保外维修确认成功");
          this.getTableData();
        }
      });
    },
    sendState(state) {
      console.log(state);
    },
    openDialog() {
      this.dialogIsShow = false;
    },
    openHeavyDialog() {
      this.heavyDialogIsShow = false;
    },
    repairDetail() {
      getModelData().then(res => {
        // console.warn(res.data, "options");
        this.modelOption = res.data;
      });
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    handleButtons(state) {
      let stateMap = {
        0: "暂停发函",
        1: "发函通知",
        2: "作废",
        3: "跳单",
        4: "通知第三方"
      };
      switch (state) {
        case 0:
          this.stopSendMessage(state); //暂停发函
          break;
        case 1:
          this.sendMessage(state); //发函通知
          break;
        case 2:
          this.state = state;
          this.info = stateMap[state];
          this.blankOut(state); //作废
          break;
        case 3:
          this.state = state;
          this.info = stateMap[state];
          this.switchForm(state); //跳单
          break;
        case 4:
          this.informThird(state); //通知第三方
          break;
        default:
          break;
      }
    },
    stopSendMessage(state) {
      //暂停发函
      // console.warn(this.multipleSelection);
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      if (this.multipleSelection.some(item => item.state != 1)) {
        this.$message.warning("只有状态为'待维修'的数据可以暂停发函");
        return;
      }
      if (this.multipleSelection.some(item => item.isBn == 0)) {
        this.$message.warning("保外的数据不能暂停发函");
        return;
      }
      let data = {
        list: this.multipleSelection.map(item => item.id),
        state: state
      };
      handleButtons(data).then(res => {
        console.log(res.data);
        if (res.data.code == 0) {
          this.$message.success("暂停发函成功");
          this.getTableData();
        }
      });
    },
    sendMessage(state) {
      //发函通知
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      if (this.multipleSelection.some(item => item.state != 2)) {
        this.$message.warning("只有状态为'暂停发函'的数据可以发函通知");
        return;
      }
      if (this.multipleSelection.some(item => item.isBn == 0)) {
        this.$message.warning("保外的数据不能发函通知");
        return;
      }
      let data = {
        list: this.multipleSelection.map(item => item.id),
        state: state
      };
      handleButtons(data).then(res => {
        console.log(res.data);
        if (res.data.code == 0) {
          this.$message.success("发函通知成功");
          this.getTableData();
        }
      });
    },
    blankOut(state) {
      //作废
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      if (this.multipleSelection.length > 1) {
        this.$message.warning("只能选择一条数据作废");
        return;
      }
      if (this.multipleSelection.some(item => item.state >= 9)) {
        this.$message.warning("已通知第三方的数据不可以作废");
        return;
      }
      if (this.multipleSelection.some(item => item.state == -2)) {
        this.$message.warning("数据不可重复作废");
        return;
      }
      if (this.multipleSelection.some(item => item.state == 0)) {
        this.$message.warning("此数据不可作废");
        return;
      }
      this.dialogIsShow = true;
    },
    switchForm(state) {
      //转单
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      if (this.multipleSelection.length > 1) {
        this.$message.warning("只能选择一条数据作废");
        return;
      }
      if (this.multipleSelection.some(item => item.state >= 9)) {
        this.$message.warning("已通知第三方的数据不可以转单");
        return;
      }
      if (this.multipleSelection.some(item => item.state == 0)) {
        this.$message.warning("此数据已跳单");
        return;
      }
      if (this.multipleSelection.some(item => item.state == -1)) {
        this.$message.warning("此数据已作废");
        return;
      }
      this.dialogIsShow = true;
    },
    informThird(state) {
      //通知第三方
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      if (this.multipleSelection.some(item => item.state != 8)) {
        this.$message.warning("只有状态为'待通知第三方'的数据可以发函通知");
        return;
      }
      let data = {
        list: this.multipleSelection.map(item => item.id),
        state: state
      };
      handleButtons(data).then(res => {
        if (res.data.code == 0) {
          this.$message.success("通知第三方成功");
          this.getTableData();
        }
      });
    },
    dialogSendMessage(reason) {
      let data = {
        list: this.multipleSelection.map(item => item.id),
        state: this.state,
        reason
      };
      if (this.state == 2) {
        handleButtons(data).then(res => {
          if (res.data.code == 0) {
            this.$message.success("作废成功");
            this.getTableData();
            this.dialogIsShow = false;
          }
        });
      } else if (this.state == 3) {
        handleButtons(data).then(res => {
          if (res.data.code == 0) {
            this.$message.success("跳单成功");
            this.getTableData();
            this.dialogIsShow = false;
          }
        });
      }
    },
    clickDryer(state) {
      //催单
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      if (this.multipleSelection.some(item => item.state != 1)) {
        this.$message.warning("只有状态为'待维修'的数据可以发函通知");
        return;
      }
      let data = {
        list: this.multipleSelection.map(item => item.id),
        state: state
      };
      handleButtons(data).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message.success("催单成功");
          this.getTableData();
        }
      });
    },
    clickSwitchForm() {
      // 重派
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      if (this.multipleSelection.length > 1) {
        this.$message.warning("只能选择一条数据重派");
        return;
      }
      if (this.multipleSelection.some(item => item.state >= 9)) {
        this.$message.warning("已通知第三方的数据不可以重派");
        return;
      }
      if (this.multipleSelection.some(item => item.state == 0)) {
        this.$message.warning("数据已跳单");
        return;
      }
      if (this.multipleSelection.some(item => item.state == -1)) {
        this.$message.warning("此数据已作废");
        return;
      }
      // console.log(this.multipleSelection[0].buildUuid);
      this.buildUuid = this.multipleSelection[0].buildUuid;
      this.heavyDialogIsShow = true;
    },
    heavyDialogSendMessage(form) {
      //重派 - 往后台传数据
      let data = {
        maintenanceId: this.multipleSelection[0].id,
        explanation: form.explanation,
        problemIds: form.problemIds.join(","),
        supplierCode: form.supplierCode
      };
      console.log(data);

      handleResend(data).then(res => {
        if (res.data.code == 0) {
          this.$message.success("重派成功");
          this.getTableData();
          this.dialogIsShow = false;
        }
      });
    },

    clickExport() {
      console.log(this.checkboxVal);
      var loading = this.$loading({
        lock: true,
        text: "导出中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.getAllList().then(() => {
        import("@/vendor/Export2Excel").then(excel => {
          //获取当前选中的动态列
          const tHeader = this.tableHeader.map(item => item.label);
          const filterVal = this.tableHeader.map(item => item.prop);
          // console.log(this.tableAllData, "Excel的数据");

          const data =
            this.multipleSelection.length == 0
              ? this.formatJson(filterVal, this.tableAllData)
              : this.formatJson(filterVal, this.multipleSelection);
          // 默认导出是全部导出  然后选择哪条导出哪条
          let _this = this;
          // console.log(data, "Excel的数据");
          // console.log(
          //   this.formatJson(filterVal, this.multipleSelection),
          //   "选中的Excel的数据"
          // );
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "维修单管理导出数据"
          });
          loading.close();
        });
      });
    },
    formatJson(filterVal, jsonData) {
      let data = jsonData.map(v =>
        filterVal.map(j => {
          if (j === "repairTime") {
            return this.$options.filters["dateFilter"](v[j]);
          } else if (j === "state") {
            return this.$options.filters["stateFilter"](v[j]);
          } else {
            return v[j];
          }
        })
      );
      console.log(data);
      return data;
    },
    getAllList() {
      return new Promise((resolve, reject) => {
        let target = this.$refs["queryList"];

        getRepairExcel(target.listQuery).then(res => {
          // console.log(res, "111111111111111111111111");
          var data = res.data;
          data.forEach((item, index) => {
            item.position = `${item.projectName}-${item.projectStageName}-${item.roomName}`;
            item.question = `${item.moduleName}-${item.bigClassName}`;
            // item.state = this.$options.filters["stateFilter"](item.state);
            // item.repairTime = this.$options.filters["dateFilter"](
            //   item.repairTime
            // );
          });
          this.tableAllData = data;
          resolve();
        });
      });
    },

    handleClickDetail(id, projectUuid, budgetProcId, state) {
      // console.warn(this.isRepairManageList, state);
      this.$router.push({
        path: "/repairManager/index",
        query: {
          id: id,
          projectUuid: projectUuid,
          budgetProcId: budgetProcId,
          state: this.isRepairManageList ? -1 : state
        }
      });
    },
    getTableData() {
      this.tableData = [];
      this.loading = true;

      getList(this.listQuery).then(res => {
        this.loading = false;
        this.tableData = res.data.records;

        this.tableData.forEach(item => {
          item.position = `${item.projectName}-${item.projectStageName}-${item.roomName}`;
          item.question = `${item.moduleName}-${item.bigClassName}`;
        });
        this.total = res.data.total;
      });
    },
    getQuery(data) {
      console.log(this.editName, this.listQuery.state, "操作名称");

      if (data.state == -5 || data.state == -7) {
        this.editName = "查看";
      } else if (data.state == 5 || data.state == 7) {
        this.editName = "审批";
      }
      this.listQuery = Object.assign(this.listQuery, data);
      // 赋值给查询条件（可优化）
      console.log(this.listQuery);
      this.getTableData();
    },

    getPro() {
      getProjects({ id: this.Lander }).then(res => {
        console.log(res);
        this.itemOption = res.data;
        this.itemId = res.data.map(v => v.projectId);
      });
    },
    sizeChange(size) {
      this.listQuery.limit = size;
      this.getTableData();
    },
    currentChange(page) {
      this.listQuery.page = page;
      this.getTableData();
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
}
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  height: 40px;
}
</style>