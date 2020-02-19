<template>
  <div class="app-container calendar-list-container">
    <queryModel
      @getQuery="getQuery"
      @changeItemId="changeItemId"
      :stateOption="stateOption"
      :moState="moState"
    ></queryModel>
    <!-- 操作按钮 -->
    <div style="width: 200px;display: flex; justify-content: space-between;margin-top: 20px">
      <!-- <el-button size="small" type="primary" @click="scrap">
                作废
      </el-button>-->
      <el-button size="mini" type="primary" @click="jumpPage" v-if="permissions.confirmation_index_jump">跳单</el-button>
      <el-button size="mini" type="primary" @click="changePaper" v-if="permissions.confirmation_index_reject">驳回</el-button>
      <el-button size="mini" type="primary" @click="handleDownload" v-if="permissions.confirmation_index_out">导出</el-button>
    </div>
    <!-- 列表页 -->
    <!-- showPremissionBtn    1 -- 报修新增页面     2 -- 工程确认页面 -->
    <hpTable
      :tableList="tableList"
      :tableData="tableData"
      :page="page"
      @multChange="multChange"
      :itemId="itemId"
      :isHeight="0"
      @pageChange="pageChange"
      :loading="loading"
      :showPremissionBtn="2"
    ></hpTable>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-form :model="dialogForm" ref="dialogForm" :rules="dialogRule" label-width="60px">
        <el-row>
          <el-col>
            <el-form-item label="理由" prop="reason">
              <el-input
                v-model="dialogForm.reason"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6}"
                maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSelectPush">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import hpTable from "../hzpropertyrepair/hpTable.vue";
import queryModel from "../../../components/common/query.vue";
import config from "../../../config/config.js";
import { mapGetters } from "vuex";
import {
  getData,
  getProjects,
  getAllData,
  dels,
  getPage,
  skipOrder
} from "@/api/maintenance/hzpropertyrepair";
export default {
  data() {
    return {
      Lander: JSON.parse(sessionStorage.getItem("userInfo")).content.userId,
      dateTimer: [], //时间选择器
      listQuery: {
        limit: 10,
        page: 1,
        source: 0,
        projectUuid: "",
        projectStageUuid: "",
        buildUuid: "",
        title: "",
        startTime: "",
        endTime: "",
        ownerName: "",
        ownerTep: "",
        state: 0
      },
      tableData: [], //列表数据
      tableAllData: [], //列表所有数据（用于导出）
      page: {
        page: 1,
        limit: 10,
        total: 0
      },
      itemId: [], //存放所有项目得projectId
      multipleSelection: [],
      selId: [],
      stateOption: [],
      orderId: [],
      loading: true,
      dialogVisible: false,
      dialogRule: {
        reason: [{ required: true, message: "请填写原因", trigger: "blur" }]
      },
      dialogForm: {
        reason: ""
      },
      num: 0,
      moState: ""
    };
  },
  created() {
    this.getList();
  },
  components: {
    hpTable,
    queryModel
  },
  methods: {
    jumpPage() {
      var flag = false;
      if (this.selId.length == 0) {
        this.$message({
          type: "error",
          message: "请选择至少一条数据"
        });
        return false;
      }
      if (this.selId.length > 1) {
        this.$message({
          type: "error",
          message: "只能选择一条数据"
        });
        return false;
      }
      console.log(this.multipleSelection);
      this.multipleSelection.forEach((item, index) => {
        if (item.state == "已确认" || item.state== '跳单') {
          flag = true;
        }
      });
      if (flag == true) {
        this.$message({
          type: "error",
          message: "包含已确认或已跳单的数据"
        });
        return false;
      }

      this.$nextTick(function() {
        this.$refs["dialogForm"].resetFields();
      });
      this.num = 2;
      this.dialogVisible = true;
    },
    pageChange(data) {
      this.listQuery = Object.assign(this.listQuery, data);
      //  projectUuid: "",
      //     projectStageUuid: "",
      //     buildUuid: "",
      //     title: "",
      //     startTime: "",
      //     endTime: "",
      //     ownerName: "",
      //     ownerTep: "",
      console.log(this.listQuery);
      this.getList();
    },
    // 接收query子组件传过来数据
    getQuery(data) {
      console.log(data, "111111");
      this.listQuery = Object.assign(this.listQuery, data);
      this.getList();
      this.getAllList();
    },
    multChange(data) {
      console.log(data);
      this.multipleSelection = data;
      this.selId = data.map(v => v.id);
      this.orderId = data.map(v => v.orderId);
    },
    changeItemId(data) {
      this.itemId = data;
      // console.log(this.itemId,"未来还有多远");
    },
    hander() {
      console.log(this.itemId);
    },
    getList() {
      this.loading = true;
      getData(this.listQuery).then(res => {
        console.log(res);
        var data = res.data.records;
        data.forEach((item, index) => {
          if (
            item.projectName &&
            item.projectStageName &&
            item.buildName &&
            item.roomName
          )
            item.problem = `${item.projectName}-${item.projectStageName}-${item.buildName}-${item.roomName}`;
          // item.state =
          //   item.state == "0"
          //     ? "未确认"
          //     : item.state == "1"
          //     ? "已确认"
          //     : "跳单";
          item.state = item.state == "0" ? "未确认" : item.state == "1" ? "已确认" : item.state == "2" ? "跳单" : "驳回"
          if (item.createTime) {
            item.createTime = item.createTime.split(" ")[0];
          }
        });
        this.tableData = data;
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    getAllList() {
      return new Promise((resolve, reject) => {
        var obj = {
          source: 0,
          projectName: this.listQuery.projectName,
          buildName: this.listQuery.buildName,
          title: this.listQuery.title,
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime,
          state: this.listQuery.state,
          ownerName: this.listQuery.ownerName,
          ownerTep: this.listQuery.ownerTep
        };
        getAllData(obj).then(res => {
          var data = res.data.data;
          data.forEach((item, index) => {
            if (
              item.projectName &&
              item.projectStageName &&
              item.buildName &&
              item.roomName
            )
              item.problem = `${item.projectName}-${item.projectStageName}-${item.buildName}-${item.roomName}`;
            item.state =
              item.state == "0"
                ? "未确认"
                : item.state == "1"
                ? "已确认"
                : "跳单";
            if (item.createTime) {
              item.createTime = item.repairTime.split(" ")[0];
            }
          });
          this.tableAllData = data;
          console.log(res, "123456789");
          resolve();
        });
      });
    },
    doSelectPush() {
      // 駁回路徑
      if (this.num == 1) {
        this.$refs["dialogForm"].validate((valid) => {
          if (valid) {
            var loading = this.$loading({
              lock: true,
              text: "保存中，请稍后...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            var obj = {
              source: 3,
              ids: this.selId,
              orderIds: this.orderId,
              reason: this.dialogForm.reason
            };
            getPage(obj).then(res => {
              loading.close();
              this.$message({
                type: "success",
                message: "驳回成功"
              });
              this.dialogVisible = false;
              this.getList();
            });
          }
        });
      } else if (this.num == 2) {
        this.$refs["dialogForm"].validate(valid => {
          if (valid) {
            var loading = this.$loading({
              lock: true,
              text: "保存中，请稍后...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            var arr = [];
            // 跳单路径
            var obj = {
              source: 4,
              ids: this.selId,
              reason: this.dialogForm.reason,
              orderIds: [this.multipleSelection[0].orderId]
            };
            skipOrder(obj).then(res => {
              this.$message({
                type: "success",
                message: "跳单成功"
              });
              this.dialogVisible = false;
              loading.close();
              this.getList();
            });
          }
        });
      }
    },
    // 作废
    scrap() {
      var flag = false;
      if (this.selId.length == 0) {
        this.$message({
          type: "error",
          message: "请选择至少一条数据"
        });
        return false;
      }
      this.multipleSelection.forEach((item, index) => {
        if (item.state == "已确认") {
          flag = true;
        }
      });
      if (flag == true) {
        this.$message({
          type: "error",
          message: "包含已确认的数据"
        });
        return false;
      }
      var loading = this.$loading({
        lock: true,
        text: "作废中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      dels(this.selId).then(res => {
        console.log(res);
        loading.close();
        this.$message({
          type: "success",
          message: "作废成功"
        });
      });
      this.getList();
    },
    // 驳回
    changePaper() {
      this.num = 1;
      var flag = false;
      if (this.selId.length == 0) {
        this.$message({
          type: "failed",
          message: "至少选择一条数据"
        });
        return false;
      }
      this.multipleSelection.forEach((item, index) => {
        if (item.state == "已确认" || item.state == "跳单") {
          flag = true;
        }
      });
      if (flag == true) {
        this.$message({
          type: "error",
          message: "包含已确认或跳单的数据"
        });
        return false;
      }
      if (this.orderId.indexOf(null) != -1) {
        this.$message({
          type: "error",
          message: "数据中包含没有orderId的数据,请重新选择"
        });
        return false;
      }   
      this.$nextTick(function() {
        this.$refs["dialogForm"].resetFields();
      });
      this.dialogVisible = true;
      // var loading = this.$loading({lock: true,text: '导出中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
      // getPage(this.orderId).then(res => {
      //     this.$message({
      //         type: 'success',
      //         message: '驳回成功'
      //     })
      //     loading.close();
      //     this.getList();
      // })
    },
    // 导出实现逻辑
    handleDownload() {
      var loading = this.$loading({
        lock: true,
        text: "导出中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.getAllList().then(res => {
        console.log(this.tableAllData, "555555555555");
        import("@/vendor/Export2Excel").then(excel => {
          //获取当前选中的动态列
          const tHeader = this.checkboxName;
          const filterVal = this.checkboxVal;
          const data =
            this.multipleSelection.length == 0
              ? this.formatJson(filterVal, this.tableAllData)
              : this.formatJson(filterVal, this.multipleSelection);
          console.log(tHeader);
          console.log(filterVal);
          // 默认导出是全部导出  然后选择哪条导出哪条
          let _this = this;
          console.log(excel);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "工程确认导出模板"
          });
          loading.close();
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  computed: {
    tableList() {
      return config.hzpropertyrepair.coTableList;
    },
    // 导出数据逻辑
    checkboxName() {
      return config.hzpropertyrepair.coTableList.map(v => v.label);
    },
    checkboxVal() {
      return config.hzpropertyrepair.coTableList.map(v => v.prop);
    },
    ...mapGetters(['permissions']),
  },
  beforeRouteLeave(to, from, next) {
    if (to.query.name == "新增") {
      to.meta.title = "新增";
      next();
    } else if (to.query.name == "详情") {
      to.meta.title = "详情";
      next();
    } else {
      next();
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.moState = 0;
      vm.stateOption = [
        { id: "", name: "全部" },
        { id: 0, name: "未确认" },
        { id: 1, name: "已确认" },
        { id: 2, name: "跳单" },
        { id: 3, name: "驳回" }
      ];
      vm.getList();
    });
  }
};
</script>

<style lang="scss" scoped>
.Increase_margin {
  margin-left: 30px;
  display: flex;
  justify-content: space-between;
}
.font-change {
  font-weight: 500;
  line-height: 30px;
  width: 40px;
}
.font-changes {
  font-weight: 500;
  line-height: 30px;
  width: 80px;
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

