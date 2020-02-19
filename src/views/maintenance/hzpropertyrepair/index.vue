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
      <el-button size="mini" type="primary" @click="addPoper" v-if="permissions.hzpropertyrepair_index_add">+新增报修</el-button>
      <el-button size="mini" type="primary" @click="scrap" v-if="permissions.hzpropertyrepair_index_del">作废</el-button>
      <el-button size="mini" type="primary" @click="handleDownload" v-if="permissions.hzpropertyrepair_index_out">导出</el-button>
    </div>
    <!-- 列表页 -->
    <!-- showPremissionBtn    1 -- 报修新增页面     2 -- 工程确认页面 -->
    <hpTable
      :tableList="tableList"
      :tableData="tableData"
      :page="page"
      @multChange="multChange"
      @pageChange="pageChange"
      :itemId="itemId"
      :isHeight="0"
      :loading="loading"
      :showPremissionBtn="1"
    ></hpTable>
    <!-- 彈框 -->
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
import hpTable from "./hpTable.vue";
import queryModel from "../../../components/common/query.vue";
import config from "../../../config/config.js";
import { mapGetters, mapState, mapMutations } from "vuex";
import {
  getData,
  getProjects,
  getAllData,
  dels,
} from "@/api/maintenance/hzpropertyrepair";
export default {
  data() {
    return {
      moState: "",
      Lander: JSON.parse(sessionStorage.getItem("userInfo")).content.userId,
      dateTimer: [], //时间选择器
      listQuery: {
        source: "1",
        limit: 10,
        page: 1,
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
      loading: true,
      isShowItemAndTag: false,
      dialogForm: {
        reason: ""
      },
      dialogRule: {
        reason: [{ required: true, message: "请填写原因", trigger: "blur" }]
      },
      dialogVisible: false
    };
  },
  created() {
    this.getList();
    // this.getPro();
  },
  components: {
    hpTable,
    queryModel
  },
  methods: {
    // 接收query子组件传过来数据
    getQuery(data) {
      this.listQuery = Object.assign(this.listQuery, data);
      this.getList();
      this.getAllList();
    },
    changeItemId(data) {
      this.itemId = data;
    },
    doSelectPush() {
      this.$refs["dialogForm"].validate(valid => {
        if (valid) {
          var loading = this.$loading({
            lock: true,
            text: "作废中，请稍后...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          var obj = {
            ids: this.selId,
            reason: this.dialogForm.reason,
            source: 5
          };
          dels(obj).then(res => {
            console.log(res);
            loading.close();
            this.$message({
              type: "success",
              message: "作废成功"
            });
            this.getList();
            this.dialogVisible = false;
          });
        }
      });
    },
    multChange(data) {
      this.multipleSelection = data;
      this.selId = data.map(v => v.id);
    },
    pageChange(data) {
      this.listQuery.page = data.page;
      this.listQuery.limit = data.limit;
      this.getList();
    },
    addPoper() {
      this.$router.push({
        name: "报表新增",
        query: { itemId: this.itemId, name: "新增", configId: 1 }
      });
    },
    getList() {
      getData(this.listQuery).then(res => {
        console.log(res);
        var data = res.data.records;
        console.log(this.tableData, "1111111111111111111");
        data.forEach((item, index) => {
          item.problem = `${item.projectName}-${item.projectStageName}-${item.buildName}-${item.roomName}`;
          if (item.repairTime) {
            item.repairTime = item.repairTime.split(" ")[0];
          }
          item.state =
            item.state == 0 ? "暂存" : item.state == 1 ? "已确认" : "作废";
        });
        this.tableData = data;
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    getAllList() {
      return new Promise((resolve, reject) => {
        var obj = {
          projectUuid: this.listQuery.projectUuid,
          projectStageUuid: this.listQuery.projectStageUuid,
          ownerName: this.listQuery.ownerName,
          ownerTep: this.listQuery.ownerTep,
          buildUuid: this.listQuery.buildUuid,
          title: this.listQuery.title,
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime,
          source: this.listQuery.source,
          state: this.listQuery.state
        };
        getAllData(obj).then(res => {
          var data = res.data.data;
          console.log(res.data.data, "123456789");
          data.forEach((item, index) => {
            item.problem = `${item.projectName}-${item.projectStageName}-${item.buildName}-${item.roomName}`;
            item.state = item.state == 1 ? "已确认" : "未确认";
            item.repairTime = item.repairTime
              ? item.repairTime.split(" ")[0]
              : "";
          });
          this.tableAllData = data;
          resolve();
        });
      });
    },
    // 作废
    scrap() {
      console.log(this.$store);
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
          message: "最多选择一条数据"
        });
        return false;
      }
      this.multipleSelection.forEach((item, index) => {
        if (item.state == "已确认" || item.state == "作废") {
          flag = true;
        }
      });
      if (flag) {
        this.$message({
          type: "error",
          message: "包含已确认或已作废数据"
        });
        return false;
      }
      this.$nextTick(function() {
        this.$refs["dialogForm"].resetFields();
      });
      // dialogForm
      this.dialogVisible = true;
    },
    // 导出实现逻辑
    handleDownload() {
      console.log(this.checkboxVal);
      var loading = this.$loading({
        lock: true,
        text: "导出中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.getAllList().then(res => {
        import("@/vendor/Export2Excel").then(excel => {
          //获取当前选中的动态列
          // console.log(tHeader);
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
            filename: "新增报修导出模板"
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
    },
    ...mapMutations(['select'])
  },
  computed: {
    tableList() {
      return config.hzpropertyrepair.hzTableList;
    },
    // 导出数据逻辑
    checkboxName() {
      return config.hzpropertyrepair.hzTableList.map(v => v.label);
    },
    checkboxVal() {
      return config.hzpropertyrepair.hzTableList.map(v => v.prop);
    },
    ...mapGetters(['permissions']),
    ...mapState('select',['hzpropertyrepairSelectObj']),
  },
  activated() {
    this.getList();
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
      vm.stateOption = [
        { id: "", name: "全部" },
        { id: 1, name: "已确认" },
        { id: 0, name: "暂存" },
        { id: 4, name: "作废" }
      ];
      vm.moState = 0;
      vm.getList();
    });
  }
};
</script>

<style lang="scss" scoped>
//    .app-container{
// width:96.5%;
// display:fixed;
// height:100%;
// overflow:scroll;
// overflow-x:hidden;
// }
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
.el-form-item__error {
  line-height: 0.4 !important;
}
</style>

