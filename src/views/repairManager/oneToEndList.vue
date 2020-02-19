<!--创建人:蒋万鹏  创建时间: 2019-10-23 -->
<!-- 列表页面 -->
<template>
  <div class="app-container calendar-list-container">
    <transition name="fade" mode="in-out">
      <el-form label-width="100px">
        <el-row :gutter="24">
          <el-col :span="5">
            <el-form-item label="项目名称" label-width="80px">
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
          <el-col :span="5">
            <el-form-item label="分期名称" label-width="80px">
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
              <!-- <el-input size="small" v-model="listQuery.projectStageName"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="楼栋" label-width="80px">
              <el-select
                v-model="listQuery.buildUuid"
                size="small"
                clearable
                filterable
                :disabled="listQuery.projectStageUuid == '' || listQuery.projectUuid == ''"
              >
                <el-option
                  v-for="(item,index) in buildOption"
                  :key="index"
                  :label="item.buildName"
                  :value="item.buildUuid"
                ></el-option>
              </el-select>
              <!-- <el-input size="small" v-model="listQuery.roomName"></el-input> -->
            </el-form-item>
          </el-col>
          <!-- <el-col :span="5">
          <el-form-item label="房号" label-width="80px">
            <el-input size="small" v-model="listQuery.roomNames"></el-input>
          </el-form-item>
          </el-col>-->
          <el-col :span="5">
            <el-form-item label="业主名" label-width="80px">
              <el-input size="small" v-model="listQuery.ownerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button size="small" type="text" @click="changeTag">
              {{ tagShow ? "展开" : "收起"}}
              <i :class="tagShow?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
            </el-button>
          </el-col>
        </el-row>
        <template v-if="!tagShow">
          <el-row :gutter="24">
            <el-col :span="5">
              <el-form-item label="责任单位" label-width="80px">
                <el-input size="small" v-model="listQuery.zrSupplierName"></el-input>
                <!-- <el-select
                  v-model="listQuery.zrSupplierName"
                  size="small"
                  clearable
                  filterable
                  :disabled="listQuery.projectUuid == ''"
                >
                  <el-option
                    v-for="(item,index) in responseOption"
                    :key="index"
                    :label="item.buildName"
                    :value="item.buildUuid"
                  ></el-option>
                </el-select>-->
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="提报日期" label-width="80px">
                <!-- <el-input size="small" v-model="listQuery.tbTime"></el-input> -->
                <el-date-picker
                  v-model="repairTime"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="small"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="问题模块" label-width="80px">
                <!-- <el-input size="small" v-model="listQuery.moduleName"></el-input> -->
                <el-select v-model="listQuery.mkId" size="small" @change="changeModel">
                  <el-option
                    v-for="(item,index) in modelOption"
                    :key="index"
                    :value="item.id"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="问题大类" label-width="80px">
                <!-- <el-input size="small" v-model="listQuery.bigClassName"></el-input> -->
                <el-select v-model="listQuery.dlId" size="small" :disabled="listQuery.mkId == ''">
                  <el-option
                    v-for="(item,index) in bigProblemOption"
                    :key="index"
                    :value="item.id"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="5">
              <el-form-item label="工作状态" label-width="80px">
                <!-- <el-input size="small" v-model="listQuery.state"></el-input> -->
                <el-select v-model="listQuery.state" size="small" clearable filterable>
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
                <el-button size="small" type="primary" @click="repush">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </el-form>
    </transition>

    <el-row style="padding:10px 0 5px 0;">
      <el-col>
        <el-button type="primary" size="mini" @click="clickExport">导出</el-button>
      </el-col>
    </el-row>
    <!-- 列表页 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      ref="multipleTable"
      :height="tagShow ? 'calc(100% - 160px)' : 'calc(100% - 260px)'"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column
        fixed
        prop="state"
        label="工作状态"
        width="160"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        fixed
        prop="projectUuid"
        label="报修位置"
        width="160"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">{{scope.row.bigClassName+scope.row.moduleName}}</template>
      </el-table-column>
      <el-table-column
        prop="ownerName"
        label="业主"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="roomName"
        label="房号"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>

      <el-table-column
        prop="ownerTep"
        label="电话"
        min-width="300"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="问题标题"
        min-width="250"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="zrSupplierName"
        label="责任单位"
        min-width="300"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="工单编号"
        min-width="250"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="moduleName"
        label="问题模块"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="bigClassName"
        label="问题大类"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="tbTime"
        label="提报日期"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{scope.row.tbTime | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="fdTime"
        label="分单日期"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{scope.row.fdTime | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sqbdTime"
        label="申请闭单日期"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{scope.row.sqbdTime | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="ybdTime"
        label="应闭单日期"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{scope.row.ybdTime | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="fsTime"
        label="复审日期"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{scope.row.fsTime | dateFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="yzpjTime"
        label="业主评价时间"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="csTime"
        label="超时日期"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{scope.row.csTime | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="requirement"
        label="问题描述"
        min-width="140"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="150" align="center">
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
      </el-table-column>-->
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
import {
  getProjects,
  getUnit,
  getStore,
  getModelData
} from "@/api/maintenance/hzpropertyrepair";
// import {
//   getPeopleData,
//   getModelData,
//   getSupperData,
//   saveSubmit,
//   details,
//   submit
// } from "@/api/maintenance/hzpropertyrepair";

import {
  getProvidersWithoutUUid,
  getOneToEndList,
  getOneToEndExcel
} from "@/api/repair/repair";
// import { getWeaveTableList } from "@/api/job/job";
export default {
  data() {
    return {
      tableAllData: [],
      tableHeader: [
        {
          prop: "state",
          label: "工作状态"
        },
        {
          prop: "position",
          label: "报修位置"
        },
        {
          prop: "ownerName",
          label: "业主"
        },
        {
          prop: "roomName",
          label: "房号"
        },
        {
          prop: "ownerTep",
          label: "电话"
        },
        {
          prop: "title",
          label: "问题标题"
        },
        {
          prop: "zrSupplierName",
          label: "责任单位"
        },
        {
          prop: "code",
          label: "工单编号"
        },
        {
          prop: "moduleName",
          label: "问题模块"
        },
        {
          prop: "bigClassName",
          label: "问题大类"
        },
        {
          prop: "tbTime",
          label: "提报日期"
        },
        {
          prop: "fdTime",
          label: "分单日期"
        },
        {
          prop: "sqbdTime",
          label: "申请闭单日期"
        },
        {
          prop: "ybdTime",
          label: "应闭单日期"
        },
        {
          prop: "fsTime",
          label: "复审日期"
        },
        {
          prop: "yzpjTime",
          label: "业主评价时间"
        },
        {
          prop: "csTime",
          label: "超时日期"
        },
        {
          prop: "requirement",
          label: "问题描述"
        }
      ],
      modelOption: [],
      bigProblemOption: [],
      repairTime: "",
      responseOption: [], //责任单位选项
      listQuery: {
        page: 1,
        limit: 10,
        projectUuid: "", //项目名称
        projectStageUuid: "", //分期名称
        buildUuid: "", //楼栋
        // roomNames: "", //房号
        ownerName: "", //业主名
        zrSupplierName: "", //责任单位
        tbTime: "", //提报日期
        mkId: "", //问题模块
        dlId: "", //问题大类
        state: "-1" //工作状态
      },
      projectOption: [], //项目列表
      stagetOption: [], //分期列表
      buildOption: [], //楼栋列表
      stateOption: [
        { value: "-2", name: "已作废" },
        { value: "-1", name: "全部" },
        { value: "0", name: "待维修" },
        { value: "1", name: "待复审" },
        { value: "2", name: "待评价" },
        { value: "3", name: "已完成" },
        { value: "4", name: "已跳单" },
        { value: "5", name: "超时完成" },
        { value: "6", name: "超时未完成" }
      ], //状态选项
      loading: true,
      multipleSelection: [], //选择框的选中数据
      total: 10,
      tableData: [], //列表数据
      tagShow: false
    };
  },
  created() {
    this.getPro();
    this.getModuleProblem();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getTableData();
    });
  },
  filters: {
    dateFilter(val) {
      if (!val) {
        return "";
      }
      // let time = new Date(parseInt(val));
      // let year = time.getFullYear();
      // let month = time.getMonth() + 1;
      // let day = time.getDate();
      // return `${year}-${month}-${day}`;
      return val.split(" ")[0];
    },
    timestampFilter(val) {
      if (!val) {
        return "";
      }
      let time = new Date(parseInt(val));
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return `${year}-${month}-${day}`;
    }
  },
  methods: {
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

          const data = this.formatJson(filterVal, this.tableAllData);
          // 默认导出是全部导出  然后选择哪条导出哪条
          let _this = this;
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "一票到底导出数据"
          });
          loading.close();
        });
      });
    },
    formatJson(filterVal, jsonData) {
      let data = jsonData.map(v =>
        filterVal.map(j => {
          if (
            j === "tbTime" ||
            j === "fdTime" ||
            j === "sqbdTime" ||
            j === "ybdTime" ||
            j === "fsTime" ||
            j === "yzpjTime"
          ) {
            return this.$options.filters["timestampFilter"](v[j]);
          } else {
            return v[j];
          }
        })
      );
      console.log(data);
      return data;
    },
    getAllList() {
      //获取全部数据
      return new Promise((resolve, reject) => {
        getOneToEndExcel(this.listQuery).then(res => {
          // console.log(res.data, "111111111111111111111111");
          var data = res.data;
          data.forEach((item, index) => {
            item.position = `${item.moduleName}-${item.bigClassName}`;
          });
          this.tableAllData = data;
          resolve();
        });
      });
    },
    changeTag() {
      this.tagShow = !this.tagShow;
    },
    // 重置按钮
    repush() {
      this.repairTime = [];
      this.listQuery = {
        projectUuid: "", //项目名称
        projectStageUuid: "", //分期名称
        buildUuid: "", //楼栋
        // roomNames: "", //房号
        ownerName: "", //业主名
        zrSupplierName: "", //责任单位
        tbStartTime: "", //提报开始日期
        tbEndTime: "", //提报结束日期
        moduleName: "", //问题模块
        bigClassName: "", //问题大类
        state: "" //工作状态
      };
    },
    changeState() {
      this.$emit("getQuery", this.listQuery);
    },
    // 中国标准时间转换成 年-月-日
    getTimeData(time) {
      var d = new Date(time);
      return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    },
    // 获取问题模块和问题大类选项
    getModuleProblem() {
      getModelData().then(res => {
        console.warn("问题大类选型", res.data);
        this.modelOption = res.data;
      });
    },
    changeModel() {
      //问题模块的切换函数
      this.listQuery.bigClassName = "";
      this.modelOption.forEach((item, index) => {
        if (item.id == this.listQuery.mkId) {
          this.bigProblemOption = this.modelOption[index].children;
        }
      });
    },
    // 获取项目
    getPro() {
      console.log(this.Lander, "this.Lander");
      getProjects({ userId: this.Lander, type: 1 }).then(res => {
        this.projectOption = res.data;
      });
    },
    // 选择项目
    changeProject() {
      this.listQuery.projectStageUuid = "";
      this.listQuery.buildUuid = "";
      // this.listQuery.unitUuid = "";
      getUnit({ projectUuid: this.listQuery.projectUuid }).then(res => {
        this.stagetOption = res.data;
      });
      // getProvidersWithoutUUid({
      //   projectUuid: this.listQuery.projectUuid
      // }).then(res => {
      //   console.log("getProvidersWithoutUUid", res.data);
      //   this.stagetOption = res.data;
      // });
    },
    // 选择分期
    changeStage() {
      this.listQuery.buildUuid = "";
      // this.listQuery.unitUuid = "";
      getStore({ projectStageUuid: this.listQuery.projectStageUuid }).then(
        res => {
          this.buildOption = res.data;
        }
      );
    },
    handleQuery() {
      if (this.repairTime && this.repairTime.length !== 0) {
        this.listQuery.tbStartTime = this.getTimeData(this.repairTime[0]);
        this.listQuery.tbEndTime = this.getTimeData(this.repairTime[1]);
      } else {
        this.listQuery.tbStartTime = "";
        this.listQuery.tbEndTime = "";
      }
      this.getTableData();
    },
    handleDetail() {},
    handleEdit() {},
    handleDelete() {},
    add() {},
    handleSelectionChange() {},
    getTableData() {
      this.tableData = [];
      this.loading = true;
      getOneToEndList(this.listQuery).then(res => {
        console.warn(1, res.data);
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