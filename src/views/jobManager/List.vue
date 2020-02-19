<!--创建人:蒋万鹏  创建时间: 2019-10-23 -->
<!-- 列表页面 -->
<template>
  <div class="app-container calendar-list-container">
    <el-form label-width="100px">
      <el-row :gutter="24">
        <!-- <el-col :span="5">
          <el-form-item label="职能编码" label-width="80px">
            <el-input size="small" v-model="listQuery.parentCode"></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :span="5">
          <el-form-item label="职能名称" label-width="80px">
            <el-input size="small" v-model="listQuery.parentName"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="5">
          <el-form-item label="岗位编码" label-width="80px">
            <el-input size="small" v-model="listQuery.code"></el-input>
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
        prop="parentCode"
        label="职能编码"
        width="160"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="parentName"
        label="职能名称"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="code"
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
        prop="described"
        label="描述"
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
          <el-button @click="handleDetail(scope.row.id)" type="text" size="mini">查看</el-button>
          <el-button @click="handleEdit(scope.row.id)" type="text" size="mini">编辑</el-button>
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
import { getTableList, deleteListItem } from "@/api/job/job";
export default {
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        parentCode: "",
        parentName: "",
        code: "",
        name: ""
      },
      loading: true,
      multipleSelection: [], //选择框的选中数据
      total: 10,
      tableData: [] //列表数据
    };
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getTableData();
    });
  },
  beforeRouteLeave(to, from, next) {
    next(vm => {
      // vm.name = "";
    });
  },
  filters: {},
  methods: {
    handleQuery() {
      this.getTableData();
    },
    handleDetail(id) {
      this.$router.push({
        path: "/jobManager/details",
        query: { name: "详情", id: id }
      });
    },
    handleEdit(id) {
      this.$router.push({
        path: "/jobManager/details",
        query: { name: "编辑", id: id }
      });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        deleteListItem({id:id}).then(res => {
          console.log(res.data)
          loading.close()
          this.getTableData()
        });
      });
    },
    add() {
      this.$router.push({
        path: "/jobManager/insert"
      });
    },
    handleSelectionChange() {},
    getTableData() {
      this.tableData = [];
      this.loading = true;
      getTableList(this.listQuery).then(res => {
        this.loading = false;
        this.tableData = res.data.records;
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