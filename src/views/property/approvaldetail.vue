<!-- 审批列表页 -->
<template>
  <div class="app-container calendar-list-container">
    <div style="height: 100%">
      <div class="form_search">
        <el-form ref="form" label-width="60px" label-position="right">
          <el-row :gutter="9" class="search_row">
            <el-col :span="4">
              <el-form-item label="审核状态">
                <el-select v-model="listQuery.flag" size="small" clearable placeholder="全部">
                  <el-option label="完结" value="complete"></el-option>
                  <el-option label="待办" value="pending"></el-option>
                  <el-option label="执行" value="handle"></el-option>
                  <el-option label="全部" value></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <template>
                <el-button type="primary" size="small" @click="getList()">查询</el-button>
              </template>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table_search">
        <el-table
          width="100%"
          ref="searchMulTable"
          :data="tableData"
          :cell-style="cellStyle"
          :header-cell-style="headerCellStyle"
          height="calc(100% - 30px)"
        >
          <el-table-column align="center" type="index" label="序号" min-width="4"></el-table-column>

          <el-table-column
            prop="bpmName"
            align="center"
            min-width="200"
            label="审批名称"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="projectName"
            label="项目名称"
            align="center"
            min-width="200"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="procDefName"
            label="流程名称"
            align="center"
            min-width="200"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
            min-width="200"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <p style="text-align:center">{{!scope.row.createTime?'-':scope.row.createTime.substr(0,10)}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="createName"
            label="发起人"
            align="center"
            min-width="200"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="center"
            label="状态"
            min-width="140"
            prop="status"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <p v-if="scope.row.status=='pending'" style="color:red;text-align: center;">待办</p>
              <p v-if="scope.row.status=='handle'" style="color:green;text-align: center;">执行</p>
              <p v-if="scope.row.status=='complete'" style="color:blue;text-align: center;">完结</p>
            </template>
          </el-table-column>
          <!-- <el-table-column
                    prop="status"
                    label="状态"
                    align="center"
                    width="150"
                    show-overflow-tooltip>
                     <template slot-scope="scope">
                      <span>{{ scope.row.status | statusFilter }}</span>
                    </template>
          </el-table-column>-->
          <el-table-column align="center" label="操作" min-width="120" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row,scope.index)"
                v-if="scope.row.status=='pending' && roleManager_btn_approval==true"
                style="color: #66B1FF;border:0"
              >审核</el-button>
              <el-button
                size="mini"
                @click="process(scope.row,scope.index)"
                v-if="scope.row.status!='pending'"
                style="color: #66B1FF;border:0"
              >查看流程进度</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination_footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10,20,50,100]"
            :page-size="pageSize"
            background
            layout=" total, prev, pager, next, jumper, sizes"
            prev-text=" <<上一页 "
            next-text=" 下一页>> "
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {processList} from "@/api/property/property.js";

export default {
  name: "demo",
  data() {
    return {
      isShow: false,
      //分页
      currentPage: 1,
      total: null,
      pageSize: 10,
      //模糊查询
      listQuery: {
        page: 1,
        limit: 10,
        flag: ""
      },
      spid: 0,
      spType: "",
      spTaskId: "",
      spProcessId: "",
      modelDataLs: {
        radioIsOk: "",
        text: ""
      },
      dialogVisible: false,
      doItVis: false,
      tableData: [],
      DATA: [],
      waterData: [],
      objs: {},
      getOneData: [], //查看数据
      text: "",
      actor: "",
      count: 0,
      isText: false,
      taskOne: false, //调离职人员模板
      rowDetail: {}, //调离值表单数据
      oneTableData: [], // //调离值表格数据
      zeroTableData: [], // 违规人员子表信息
      taskZero: false, //违规信息模板
      taskTwo: false, //个人目标模板
      taskThree: false, //佣金发放模块
      rowDetailThree: {}, //佣金发放模块表单
      rowDetailZero: {},
      threeTableData: [], // //佣金发放表格数据
      rowDetail: {},
      rowDetailTwo: {},
      rowDetailOne: {},
      childDetail: {},
      value6: "", //
      currentPage: 1,
      pageSize: 10,
      selectDate: {
        title: "",
        category: "",
        time: ""
      },
      //权限操作
      roleManager_btn_add: true, //增
      roleManager_btn_del: true, //删
      roleManager_btn_import: true, //导入
      roleManager_btn_export: true, //导出
      roleManager_btn_change: true, //改
      roleManager_btn_status: true, //改变状态
      roleManager_btn_approval: true, //审批
      
      //修改传的id
      updateId: null,
      headerCellStyle: {
        padding: "5px 0",
        color: "#898989",
        backgroundColor: "#fafbfa",
        fontWeight: 500
      },
      cellStyle: {
        padding: "7px 0",
        color: "#5d5d5d",
        lineHeight: "35px",
        fontWeight: 500
      },
      options: [
        {
          label: "正常",
          value: "1"
        },
        {
          label: "失效",
          value: "2"
        }
      ],
      value: "",
      value1: "",
      value6: "",
      value11: "",
      startTime: null,
      endTime: null,
      endTimeOptions: {
        disabledDate(time) {
          if (this.startTime) {
            return time.getTime() < Date.now();
          } else {
            return true;
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters(["menus"]),
    statusComputed(){
      return this.statusFilterMethod(this.rowDetailZero.submissionStatus)
    }
  },
  filters: {
    statusFilter(status) {
      const statusDef = {
        pending: "待办",
        complete: "完结",
        handle: "已办"
      };
      return statusDef[status];
    }
  },
  methods: {
     statusFilterMethod(status){
        const statusDef = {
          1:'未发起审批',
          2:'审批中',
          3:'驳回',
          4:'审批完成'
        }
        return statusDef[status]
      },
    handleClose(done) {
      // console.log("wertukl");
      this.taskTwo = false;
    },
    //获取数据
    getList() {
      let flag = this.listQuery.flag+'';
      let obj = {
        flag,
        // currentPage: this.currentPage,
        // pageSize: this.pageSize,
        page: this.currentPage,
        limit: this.pageSize,
      }
      this.tableLoading = true;
      processList(obj).then(res=>{
        console.log('结果',res);
        this.total = res.data.total;
        this.tableData = res.data.records
        this.tableLoading = true;
         
      })
    },
    //流程跟踪
    process(row) {
      window.open(this.$flowImageUrl + "?id=" + row.processId);
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
      this.getList();
    },
    // 审批键
    handleEdit(row){
      if (row.status != "pending") {
        this.$message({
          type: "fail",
          message: "只有待办状态的才能审批"
        });
        return false;
      }
      let id = row.id;
      let processId = row.processId;
      let taskId = row.taskId;
      this.$router.push({path:"/property/pass",query:{id,processId,taskId}});
    },
    cancel() {
      this.dialogAdd = false;
    },
    // 点击审批，出现弹框
    adopt() {
      this.doItVis = true;
      this.modelDataLs.radioIsOk = "";
      this.modelDataLs.text = "";
    },
    examine(row) {
      // 流程跟踪
      window.open(this.$flowImageUrl + "?id=" + this.objs.processId);
    }
  },
  created(){
    this.getList();
    /*  var that = this;
      document.onkeydown = function(e){
        console.log(e);
        if(e.key === "Enter"){
        //   that.getLists();
        }

      } */
    // this.getLists();
    //获取区域
  },
  mounted() {
    console.log(window.innerHeight, window.innerWidth);
  }
};
</script>

<style lang="scss" scoped >
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 14px;
}
// .el-button--small[data-v-32e2cd06], .el-button--small.is-round[data-v-32e2cd06]{
//   padding:0!important;
// }
//弹框样式
.dialog_mask_mine >>> .el-dialog__title {
  font-size: 14px;
}

.dialog_mask_mine >>> .el-dialog__title:before {
  width: 5px;
  height: 16px;
  background-color: #409eff;
}
.preTitle {
  height: 16px;
  width: 5px;
  background-color: #3a8ee6;
  display: block;
  float: left;
  text-align: center;
  margin: 4px 0;
}
.nextTitle {
  float: left;
  padding: 0 0 0 5px;
  line-height: 24px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #666;
}
.row_main {
  height: 100%;
  padding: 15px;
  /*overflow: hidden;*/
}
.col_left {
  height: 100%;
  /*padding: 10px;*/
  /*border: 1px solid #e5e5e5;*/
}
.col_right {
  height: 100%;
}
.right_main {
  height: 100%;
  padding: 0 30px;
  overflow-y: overlay;
}
.row_main.el-scrollbar.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.search_row {
  height: 40px;
  .el-col {
    height: 40px;
  }
  button {
    margin-top: 6px;
  }
  /deep/ .el-date-editor {
    .el-range-input {
      font-size: 12px;
    }
  }
}
.tag_row {
  margin-left: 0 !important;
  padding-bottom: 2px;
  .el-col {
    padding: 0 !important;
  }
  .el-col:last-child {
    padding: 0 10px 0 0 !important;
  }
}
.form_search {
  /*background-color: #f6fbfa;*/
  padding: 3px;
  margin-bottom: 5px;
  /deep/ .el-form-item {
    margin: 0;
  }
}
.tags_search {
  padding: 3px;
}
.table_search {
  // margin-top:10px;
  height: calc(100% - 90px);
  .el-table {
    font-size: 12px;
    border: 1px solid #e5e5e5;
  }
  .pagination_footer {
    margin-top: 10px;
    height: 30px;
    text-align: center;
    padding: 0;
    .el-pagination {
      padding: 2px 0 0 0;
    }
  }
  /deep/ .cell {
    line-height: 20px;
  }
  transition: height 0.4s linear;
}
.open_search {
  height: calc(100% - 170px);
}
.open_tags {
  height: calc(100% - 154px);
}
.open_all {
  height: calc(100% - 234px);
}

.el-button--small,
.el-button--small.is-round {
  padding: 8px 10px !important;
}
.titleTask p {
  text-align: center;
  font-size: 18px;
  font-weight: 800;
}
p{
  text-align: center !important;
}
</style>

