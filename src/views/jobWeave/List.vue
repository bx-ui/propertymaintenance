<!--创建人:蒋万鹏  创建时间: 2019-10-23 -->
<!-- 列表页面 -->
<template>
  <div class="app-container calendar-list-container">
    <el-form label-width="100px">
      <el-row :gutter="24">
        <el-col :span="5">
          <el-form-item label="项目名称" label-width="80px">
            <el-select
              v-model="listQuery.projectUuid"
              filterable
              placeholder="请选择项目名称"
              size="small"
              clearable
            >
              <el-option
                v-for="item in projectOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="5">
          <el-form-item label="岗位编码" label-width="80px">
            <el-input size="small" v-model="listQuery.roleCode"></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :span="5">
          <el-form-item label="岗位名称" label-width="80px">
            <el-input size="small" v-model="listQuery.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button size="mini" type="primary" @click="handleQuery">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="10" style="margin-top: 5px;padding-left:5px;" align="right">
      <el-button size="mini" type="primary" @click="add">新增</el-button>
      <el-button size="mini" type="primary" @click="exportExcel">导出</el-button>
    </el-row>
    <!-- 列表页 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      ref="multipleTable"
      height="calc(100% - 130px)"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="35" align="center"></el-table-column>
      <el-table-column
        fixed
        prop="projectUuid"
        label="项目编码"
        width="160"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="projectName"
        label="项目名称"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="parentCode"
        label="职能编码"
        min-width="300"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="parentName"
        label="职能名称"
        min-width="250"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="roleCode"
        label="岗位编码"
        min-width="300"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="岗位名称"
        min-width="250"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="planNum"
        label="计划人数"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="realNum"
        label="实际人数"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="createUser"
        label="提交人"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="提交时间"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            @click="handleDetail(scope.row.id,scope.row.realNum)"
            type="text"
            size="mini"
          >查看</el-button>
          <el-button @click="handleEdit(scope.row.id,scope.row.realNum)" type="text" size="mini">编辑</el-button>
          <el-button
            @click="handleDelete(scope.row.id)"
            type="text"
            size="mini"
            style="color:red;"
          >删除</el-button>
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
import { getWeaveTableList, getExcelAllList } from "@/api/job/job";
import { mixinText } from "@/mixins/getProjectAndstage.js";

export default {
  data() {
    return {
      projectOptions: [],
      multipleSelection: [],
      listQuery: {
        page: 1,
        limit: 10,
        parentCode: "",
        parentName: "",
        projectUuid:"",
        code: "",
        name: ""
      },
      tableHeader: [
        { label: "项目编码", prop: "projectUuid" },
        { label: "项目名称", prop: "projectName" },
        { label: "职能编码", prop: "parentCode" },
        { label: "职能名称", prop: "parentName" },
        { label: "岗位编码", prop: "roleCode" },
        { label: "岗位名称", prop: "name" },
        { label: "计划人数", prop: "planNum" },
        { label: "实际人数", prop: "realNum" },
        { label: "提交人", prop: "createUser" },
        { label: "提交时间", prop: "createTime" }
      ],
      loading: true,
      multipleSelection: [], //选择框的选中数据
      total: 10,
      tableData: [], //列表数据
      tableAllData: []
    };
  },
  mixins: [mixinText],
  created() {
    this.getProjectList();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getTableData();
    });
  },
  filters: {},
  methods: {
    getProjectList() {
      this.getPro().then(res => {
        // console.log("项目options", res);
        this.projectOptions = res;
      });
    },
    handleQuery() {
      this.getTableData();
    },
    handleDetail(id, realNum) {
      this.$router.push({
        path: "/jobWeave/details",
        query: { name: "详情", id: id, realNum: realNum }
      });
    },
    handleEdit(id, realNum) {
      this.$router.push({
        path: "/jobWeave/details",
        query: { name: "编辑", id: id, realNum: realNum }
      });
    },
    handleDelete() {},
    add() {
      this.$router.push({
        path: "/jobWeave/insert"
      });
    },
    exportExcel() {
      // console.log(this.checkboxVal);
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
          return v[j];
        })
      );
      console.log(data);
      return data;
    },
    getAllList() {
      return new Promise((resolve, reject) => {
        getExcelAllList(this.listQuery).then(res => {
          var data = res.data.data;
          console.warn("全部内容", data);
          this.tableAllData = data;
          this.tableAllData.forEach(item => {
            item.createTime = item.createTime.split(" ")[0];
          });
          resolve();
        });
      });
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    getTableData() {
      this.tableData = [];
      this.loading = true;
      getWeaveTableList(this.listQuery).then(res => {
        // console.warn(res.data);
        this.loading = false;

        this.tableData = res.data.records;
        this.tableData.forEach(item => {
          item.createTime = item.createTime.split(" ")[0];
        });
        this.total = res.data.total;
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