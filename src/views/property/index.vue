<template>
<!-- 需求列表页 -->
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="filter-container crud-menu">
        <div class="clearfix">
          <el-form :inline="true" size="small">
            <!--检索框-->
            <el-form-item label="标题" class="font" >
              <el-input
                @keyup.enter.native="handleFilter"
                style="width:150px;"
                class="filter-item fl"
                size="small"
                suffix-icon="el-icon-search"
                placeholder="请输入标题名字"
                v-model="search.title"
              ></el-input>
            </el-form-item>
            <!-- 审批状态 -->
            <el-form-item label="审批状态" class="font">
              <el-select v-model="search.status" placeholder="全部" size="small" style="width:150px;" clearable=true>
                <el-option
                  v-for="item in Status"
                  :key="item.id"
                  :label="item.status"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间" class="font">
              <el-date-picker
                style="width:200px;"
                v-model="search.createTime"
                @blur="getTime"
                value-format='yyyy-MM-dd'
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <!--新增功能-->
            <el-button @click="handleSearch" style="margin-right:15px" type="primary" size="mini">查询</el-button>
            <el-button
              :disabled="isshow"
              @click="startApproval"
              type="success"
              style="margin-right: 0px;float: right"
              size="mini"
            >发起审批</el-button>
            <el-button
              class="basic_button"
              @click="handleAdd"
              style="margin-right: 0px;float: right"
              icon="edit"
              size="mini"
            >新增</el-button>
          </el-form>
        </div>
      </div>
      <!--表格控件-->
      <el-table
        @selection-change="handleSelectionChange"
        :key="tableKey"
        :data="tableData"
        v-loading="tableLoading"
        element-loading-text="给我一点时间"
        fit
        height="calc(100% - 115px)"
        size="mini"
        tooltip-effect="dark"
        :cell-style="{fontWeight: '600'}"
        style="width: 100%;font-size: 12px;margin-bottom:15px;border-radius:3px;"
        :header-cell-style="tableHeaderColor"
      >
        <!--索引列-->
        <el-table-column type="selection" :reserve-selection="true" label="" width="40" align="center"></el-table-column>
        <el-table-column width="60" align="center" label="序号" type="index">
          <template slot-scope="scope">
              <span>{{(page.currentPage - 1) * page.pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="submissionStatus"
          align="center"
          width="100"
          label="审批状态"
          show-overflow-tooltip
        >
          <!-- 过滤器 -->
          <template slot-scope="scope">
            <span v-if='scope.row.status==1?true:false' >{{ scope.row.status | statusFilter }}</span>
            <span v-if='scope.row.status==2?true:false' style="color:#66B1FF">{{ scope.row.status | statusFilter }}</span>
            <span v-if='scope.row.status==3?true:false' style="color:red">{{ scope.row.status | statusFilter }}</span>
            <span v-if='scope.row.status==4?true:false' style="color:green">{{ scope.row.status | statusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="nextHandle"
          label="当前审批人"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
              <span>{{!scope.row.nextHandle?'—':scope.row.nextHandle}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createUserName"
          label="创建人"
          align="center"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          align="center"
          min-width="100"
          label="创建时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
              <span>{{!scope.row.createTime?'-':scope.row.createTime.substr(0,10)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateUserName"
          align="center"
          min-width="100"
          label="修改人"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
              <span>{{!scope.row.updateUserName?'—':scope.row.updateUserName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="修改时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{!scope.row.updateTime?'—':scope.row.updateTime.substr(0,10)}}</span>
          </template>
        </el-table-column>

        <!--操作列-->
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              style="color:#66B1FF"
              @click="handleEdit(scope.row,scope.index)"
            >{{ scope.row.status | editFilter }}</el-button>
            <el-button
              :disabled="scope.row.status==2?true:false || scope.row.status==4?true:false" 
              size="mini"
              type="text"
              style="color:#F78989"
              @click="handleDel(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页控件-->
      <div v-show="!tableLoading" class="pagination-container">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page.sync="page.currentPage"
          :page-sizes="[10,20,50,100]"
          :page-size="page.pageSize"
          background
          class="pull-center"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { 
  getList,
  //删除某一条需求
  Delete,
  Update, 
  getInfo, 
  approvals,
  //发起审批
  start
} from "@/api/property/property";
import { mapGetters } from "vuex";
import waves from "@/directive/waves/index.js"; // 水波纹指令
export default {
  data() {
    return {
      isshow:false,
      SelectionCode:'', //全选存储数组
      //搜索项目
      search: {
        title: "",
        status:null,
        createTime:''
      },
      color:'',
      /*1.表格参数初始化*/
      tableKey: 0,
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      downloadLoading: false,
      /*表单参数初始化*/
      form: {
        /*name: undefined,*/
      },
      /*弹窗初始化*/
      dialogFormVisible: false,
      dialogFieldsVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建"
      },
       //审批状态
      Status: [
        { id: 1, status: "未发起审批" },
        { id: 2, status: "审批中" },
        { id: 3, status: "驳回" },
        {id:4, status:"审核完成"}
      ]
    };
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  created(){
    this.handleSearch();
  },
  filters: {
    statusFilter(status) {
      const statusDef = {
        1: "未发起审批",
        2: "审核中",
        3: "审核驳回",
        4: "审核完成"
      };
      return statusDef[status];
    },
    colorFilter(status) {
      const statusDef = {
        1: "",
        2: "#66B1FF",
        3: "red",
        4: "green"
      };
    },
    editFilter(status){
      const statusDef = {
        1: "编辑",
        2: "查看",
        3: "编辑",
        4: "查看"
      };
      return statusDef[status]
    }
  },
  mounted: function() {},
  methods: {
    //获取时间
    getTime(val){     
      // console.log(this.search.createTime,"--------");
    },
    changeExcel() {
      var excelFile = document.getElementById("upload_file").files[0];
      this.fileName = document.getElementById("upload_file").files[0].name;
      this.upExcel();
    },
    selectExcel() {
      upload_file.click();
    },
    handleSelectionChange(val) {
      this.SelectionCode =val;
    },
    handleDeletes: function() {
      this.$confirm(
        "将批量删除 " + this.multipleSelection.length + " 条数据, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        let checks = this.multipleSelection.join(",");
        delObjs({ ids: checks })
          .then(() => {
            // this.getList();
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000
            });
          })
          .catch(() => {
            this.$notify({
              title: "失败",
              message: "删除失败",
              type: "error",
              duration: 2000
            });
          });
      });
    },
    //请求表数据,渲染数据
    handleSearch() {
      // console.log("1111",this.search.createTime);
      this.tableLoading = true;
      var obj = {};
      if(this.search.createTime){
        obj = {
          title: this.search.title,
          status: this.search.status,
          createTimeStart: this.search.createTime[0],
          createTimeEnd: this.search.createTime[1],
          page: this.page.currentPage,
          limit: this.page.pageSize
        }
      }else{
        obj = {
          title: this.search.title,
          status: this.search.status,
          createTimeStart: '',
          createTimeEnd: '',
          page: this.page.currentPage,
          limit: this.page.pageSize
        }
      }

      console.log(obj);
      getList(obj).then(response => {
        this.tableData = response.data.records;
        this.page.total = response.data.total;
        this.tableLoading = false;
      });
    },
    //查找函数
    handleFilter() {
      this.listQuery.page = 1;
      this.handleSearch();
    },
    //发起审批
    startApproval() { 
      if(this.SelectionCode.length != 1){
        this.$notify({
            title: "警告",
            message: "请选择一条数据进行审批",
            type: "warning",
            duration: 2000,
          });
          return false
      }
      //校验只有未发起审批的才能发起
      let SelectionCode = this.SelectionCode[0];
      let obj = {
        id: SelectionCode.id,
        defKey: 'WYFCS',
        title: SelectionCode.title
      };
      if(this.SelectionCode[0].status != '1'){
         this.$notify({
            title: "警告",
            message: "该条数据已经发起审批，请勿重复发起",
            type: "warning",
            duration: 2000,
          });
          return false
      }
      //只有当前创建人才能发起审批
      var user = JSON.parse(sessionStorage.getItem("userInfo")).content;
      if(user.userId != this.SelectionCode[0].createUserId){
        this.$notify({
            title: "警告",
            message: "只有创建者才能发起审批",
            type: "warning",
            duration: 2000,
          });
          return false
      }
      this.isshow = true;
      start(obj).then(res=>{
        if(res.data.code == 0){
          this.$notify({
            title: "成功",
            message: "发起审批申请成功",
            type: "success",
            duration: 2000,
          });
          this.isshow = false;
          this.handleSearch();
        }else{
          this.$notify({
            title: "失败",
            message: "发起审批失败",
            type: "faild",
            duration: 2000,
          });
          this.isshow = false;
        }
        // console.log(res)
      })
    },
    //当前页数改变时触发函数
    currentChange(val) {
      this.page.currentPage = val;
      this.handleSearch();
    },
    //当前显示条数发生改变时触发函数
    sizeChange(val) {
      this.page.pageSize = val;
      this.handleSearch()
    },
    /**
     * @title 打开新增窗口
     *
     **/
    handleAdd() {
      this.$router.push({ path: "/property/add" });
    },
    handleEdit(row,index) {
      let id = row.id;
      let status = row.status*1;
      switch(status){
        case 1:
          //跳转到编辑页面
          this.$router.push({path:"/property/edit",query:{id}});
          break;
        case 2:
          //跳转到查看页面
          this.$router.push({path:"/property/show",query:{id}});
          break;
        case 3:
          //跳转到编辑页面
          this.$router.push({path:"/property/edit",query:{id}});
          break;
        case 4:
        //跳转到查看页面
          this.$router.push({path:"/property/show",query:{id}});
          break;
      }
      

      
    },
    handleDel(id) {
      this.$confirm(
        '确认删除这条数据吗?',
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(()=>{
        Delete(id).then(res=>{
        if(res.data.code===0){
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              showClose:false,
              duration: 2000,
            });
            this.handleSearch();
          }
        })
      })
     
      // console.log(id)
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        //获取当前选中的动态列
        // console.log(this.checkboxVal);
        const tHeader = this.checkboxVal;
        const filterVal = this.checkboxVal;
        const data = this.formatJson(filterVal, this.tableData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list"
        });
        this.downloadLoading = false;
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
    cancel(formName) {
      this.dialogFormVisible = false;
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          putObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "成功",
              message: "修改成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false;
            // this.getList();
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    /**
     * 刷新回调
     */
    refreshChange() {
      this.getList();
    },
    selectFileds() {
      this.dialogFieldsVisible = true;
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #fafafa;color:#999; font-size:12px;";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .el-form-item--small .el-form-item__content,
  .el-form-item--small .el-form-item__label {
    color: #000 !important;
  }
  /deep/ .filter-container {
    .filter-item {
      margin-bottom: 0;
    }
  }

  /deep/ .role_menu {
    .el-dialog {
      height: 70vh;
      margin: 0 auto;
      .el-dialog__header {
        height: 58px;
      }
      .el-dialog__body {
        height: calc(100% - 124px);
        padding: 10px 20px;
        .dialog_tree {
          height: 99%;
          #areaTree {
            height: 100%;
            border-width: 0;
            .el-header {
              padding: 0 !important;
            }
            .el-main {
              padding: 0 200px !important;
            }
          }
        }
      }
    }
  }
  /deep/ .role_dept {
    .el-dialog {
      height: 70vh;
      margin: 0 auto;
      .el-dialog__header {
        height: 58px;
      }
      .el-dialog__body {
        height: calc(100% - 124px);
        padding: 10px 20px;
        .dialog_form_select {
          .el-col:first-child {
            text-align: right;
          }
        }
        .dialog_tree {
          height: 99%;
          #areaTree {
            height: 100%;
            border-width: 0;
            .el-header {
              padding: 0 !important;
            }
            .el-main {
              padding: 0 200px !important;
            }
          }
        }
      }
    }
  }

  .basic-container {
    height: 100%;
    .el-button:nth-child(-n + 4) {
      margin: 0 0 0 10px !important;
    }
  }
}

/deep/ .drawer_permission {
  .ivu-drawer-header {
    padding: 10px 16px;
    .drawer_title {
      line-height: 30px;
      .titleSpan {
        padding: 0;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        color: #3a8ee6;
      }
      .titleSpan:before {
        content: "";
        height: 16px;
        width: 5px;
        background-color: #3a8ee6;
        display: block;
        float: left;
        text-align: center;
        margin: 7px 5px 7px 0;
      }
    }
  }
  .ivu-drawer-body {
    padding: 16px 0 10px 16px;
    .drawer_tree {
      #areaTree {
        height: 100%;
        border-width: 0;
        padding: 0 0 10px 0;
        .el-header {
          padding: 0 !important;
        }
        .el-main {
          padding: 0 2px !important;
        }
      }
    }
    .drawer_button {
      text-align: center;
    }
  }
}
/deep/ .drawer_data {
  .ivu-drawer-header {
    padding: 10px 16px;
    .drawer_title {
      line-height: 30px;
      .titleSpan {
        padding: 0;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        color: #3a8ee6;
      }
      .titleSpan:before {
        content: "";
        height: 16px;
        width: 5px;
        background-color: #3a8ee6;
        display: block;
        float: left;
        text-align: center;
        margin: 7px 5px 7px 0;
      }
    }
  }
  .ivu-drawer-body {
    padding: 16px 0 10px 16px;
    .drawer_main {
      .dialog_form_select {
        .el-col:first-child {
          text-align: right;
          padding: 8px 1px !important;
        }
        .el-select {
          width: 160px !important;
        }
      }
      .dialog_tree {
        height: 99%;
        #areaTree {
          height: 100%;
          border-width: 0;
          .el-header {
            padding: 0 !important;
          }
          .el-main {
            padding: 0 2px !important;
          }
        }
      }
    }
    .drawer_button {
      text-align: center;
    }
  }
}
.titleSpan {
  padding: 0;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #3a8ee6;
}
.titleSpan:before {
  content: "";
  height: 16px;
  width: 5px;
  background-color: #3a8ee6;
  display: block;
  float: left;
  text-align: center;
  margin: 6px 5px 6px 0;
}

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

.fr {
  float: right;
}
.fl {
  float: left;
}
/* 清浮动 */
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.clearfix {
  zoom: 1; /* for IE6 IE7 */
}

.el-table::before {
  height: 0;
}
.el-table {
  border: 1px solid #e5e5e5;
}
.button_edit {
  padding: 0;
  border: none;
  color: #66b1ff;
}
.button_delete {
  padding: 0;
  border: none;
  color: #f78989;
  background-color: #fff;
}
.button_delete:hover {
  color: #f78989;
}
.is-circle {
  padding: 9px;
}

.font {
  font-weight: 550;
}
/* .el-input--suffix .el-input__inner .dataselect{
        padding-right:0px !important;
    } */
</style>