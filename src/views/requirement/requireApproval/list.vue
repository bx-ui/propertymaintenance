<!--创建人:蒋万鹏  创建时间: 2019-10-23 -->
<!-- 审批列表页面 -->
<template>
  <div class="app-container calendar-list-container">
    <el-form label-width="100px">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="项目" label-width="80px">
            <el-select
              v-model="listQuery.projectUuid"
              size="small"
              clearable
              filterable
              @change="changeProject"
            >
              <el-option
                v-for="(item,index) in projectOption"
                :key="index"
                :label="item.projectName"
                :value="item.projectId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分期" label-width="80px">
            <el-select
              v-model="listQuery.projectStageUuid"
              size="small"
              clearable
              filterable
              @change="changeStage"
              :disabled="listQuery.projectUuid == ''"
            >
              <el-option
                v-for="(item,index) in stagetOption"
                :key="index"
                :label="item.projectStageName"
                :value="item.projectStageUuid"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="类别" label-width="80px">
            <!-- <el-input size="small" v-model="listQuery.code"></el-input> -->
            <el-select v-model="listQuery.demandType" size="small" clearable filterable @change="changeToType">
              <el-option v-for="(item,index) in requireTypeOption" :key="index" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="单据类型" label-width="80px">
            <el-select v-model="listQuery.billType" size="small" clearable filterable :disabled="listQuery.demandType == ''">
              <el-option v-for="(item,index) in typeOption" :key="index" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="起止日期" label-width="80px">
             <el-date-picker
             size="small"
              v-model="timer"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态" label-width="80px">
            <el-select v-model="listQuery.state" size="small" clearable>
              <el-option
                v-for="(item,index) in stateOption"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button size="mini" type="primary" @click="handleQuery">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- <el-row :gutter="10" style="margin-top: 5px;padding-left:5px;" align="right">
      <el-button size="mini" type="primary" @click="add">需求申请</el-button>
      <el-button size="mini" type="primary" @click="deleteList">作废</el-button>
    </el-row>-->
    <!-- 列表页 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      ref="multipleTable"
      height="calc(100% - 140px)"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="35" align="center"></el-table-column>
      <el-table-column
        fixed
        prop="projectName"
        label="项目"
        width="160"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="projectStageName"
        label="分期"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="demandTypeName"
        label="类别"
        min-width="100"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="billTypeName"
        label="单据类型"
        min-width="160"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="department"
        label="部门"
        min-width="100"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="createUserName"
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
      >
        <template slot-scope="scope">{{scope.row.createTime | dateFilter}}</template>
      </el-table-column>
      <el-table-column
        prop="state"
        label="审批状态"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">{{scope.row.state | updateStateFilter}}</template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150"
        align="center"
        v-if="this.listQuery.state==-7"
      >
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row.id)" type="text" size="mini">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150"
        align="center"
        v-if="this.listQuery.state==7"
      >
        <template slot-scope="scope">
          <el-button @click="handleApproval(scope.row.id)" type="text" size="mini">审核</el-button>
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
import { fetchList } from "@/api/require/require";
import {
  getProjects,
  getUnit,
  getStore,
  getDans,
  getHaos
} from "@/api/maintenance/hzpropertyrepair";
import { dictTypeTree } from "@/api/maintenance/dictionary";
export default {
  data() {
    return {
      timer: [],
      listQuery: {
        page: 1,
        limit: 10,
        state: 7, //7 待审  -7 已审核
        projectUuid: "",
        projectStageUuid: "",
        billType: "",
        demandType: "",
        startTime: "",
        endTime: "",
      },
      // itemId: [],
      Lander: JSON.parse(sessionStorage.getItem("userInfo")).content.userId,
      projectOption: [], //项目列表
      stagetOption: [], //分期列表
      stateOption: [
        { name: "待审核", value: 7 },
        { name: "已审核", value: -7 }
      ],
      loading: true,
      multipleSelection: [], //选择框的选中数据
      total: 10,
      tableData: [], //列表数据
      requireTypeOption: [],
      typeOption: [],
    };
  },
  created() {
    this.getPro();
    this.getDictIndexData();
  },
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
  filters: {
    updateStateFilter(state) {
      let stateMap = {
        "7": "审批中",
        "-7": "审批完成"
      };
      return stateMap[state];
    },
    dateFilter(date) {
      return !date ? "" : date.split(" ")[0];
    }
  },
  methods: {
     //根据字典分类获取列表
    getDictIndexData() {
      dictTypeTree({ typeId: 7, type: 2 }).then(res => {
        this.requireTypeOption = res.data.data;
      });
    },
    //根据列表id获取字典
    changeToType() {
      this.listQuery.billType = "";
      this.typeOption = [];
      let id = this.requireTypeOption.filter(
        item => item.code == this.listQuery.demandType
      )[0].id;
      dictTypeTree({ listId: id, type: 3 }).then(res => {
        this.typeOption = res.data.data;
      });
    },
    // 获取项目
    getPro() {
      // console.log(this.Lander, "this.Lander");
      getProjects({ userId: this.Lander, type: 1 }).then(res => {
        this.projectOption = res.data;
        // this.itemId = res.data.map(v => v.projectId);
        // this.$emit("changeItemId", this.itemId);
      });
    },
    // 选择项目
    changeProject() {
      if (this.listQuery.projectUuid == "") {
        this.listQuery.projectStageUuid = "";
        this.listQuery.buildUuid = "";
        this.listQuery.unitUuid = "";
      }
      console.log(this.listQuery.projectUuid, "所以我");
      getUnit({ projectUuid: this.listQuery.projectUuid }).then(res => {
        console.log(res, "33333333333333333");
        this.stagetOption = res.data;
      });
    },
    // 选择分期
    changeStage() {
      if (this.listQuery.projectStageUuid == "") {
        this.listQuery.buildUuid = "";
        this.listQuery.unitUuid = "";
      }
      getStore({ projectStageUuid: this.listQuery.projectStageUuid }).then(
        res => {
          this.buildOption = res.data;
        }
      );
    },
    handleQuery() {
      if (this.timer && this.timer.length !== 0) {
        this.listQuery.startTime = this.getTimeData(this.timer[0]);
        this.listQuery.endTime = this.getTimeData(this.timer[1]);
      } else {
        this.listQuery.startTime = "";
        this.listQuery.endTime = "";
      }
      this.getTableData();
    },
     // 中国标准时间转换成 年-月-日
    getTimeData(time) {
      var d = new Date(time);
      return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    },
    handleDetail(id) {
      this.$router.push({
        path: "/requireApproval/details",
        query: { name: "详情", id: id }
      });
    },
    handleApproval(id) {
      this.$router.push({
        path: "/requireApproval/details",
        query: { name: "审批", id: id }
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
        deleteListItem({ id: id }).then(res => {
          console.log(res.data);
          loading.close();
          this.getTableData();
        });
      });
    },
    add() {
      this.$router.push({
        path: "/requirement/insert"
      });
    },
    deleteList() {},
    handleSelectionChange() {},
    getTableData() {
      this.tableData = [];
      this.loading = true;
      fetchList(this.listQuery).then(res => {
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