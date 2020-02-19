<template>
  <div class="app-container calendar-list-container">
    <!-- 查询 -->
    <div class="selectIt">
      <el-form label-width="50px">
        <el-row :gutter="24">
          <el-col :span="5">
            <el-form-item label="项目名">
              <el-select size="small" v-model="listQuery.projectCode" @change="changeP" filterable clearable>
                <el-option
                  v-for="(item,index) in projectOption"
                  :key="index"
                  :value="item.code"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="分期名">
              <el-select size="small" v-model="listQuery.projectStageCode" filterable clearable>
                <el-option
                  v-for="(item,index) in stageOption"
                  :key="index"
                  :value="item.code"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="同步" label-width="40px">
              <el-select size="small" v-model="listQuery.isSynchronize" filterable clearable>
                <el-option
                  v-for="(item,index) in syncOption"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="0px">
              <el-button size="small" type="primary" @click="hander">查询</el-button>
              <el-button size="small" type="primary" @click="refesh">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 按钮 -->
    <div class="sync-btns">
      <el-button size="small" type="primary" @click="sync">同步</el-button>
      <el-button size="small" type="primary" @click="del">删除</el-button>
      <!-- <input
        type="file"
        @change="importf(this)"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      /> -->
    </div>
    <!-- 列表 -->
    <el-table
      :data="tableData"
      border
      height="calc(100% - 140px)"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" fixed="left"></el-table-column>
      <el-table-column prop="projectName" label="项目" width="300" align="center"></el-table-column>
      <el-table-column prop="projectStageName" label="分期" width="400" align="center"></el-table-column>
      <el-table-column prop="isSynchronize" label="同步" align="center">
        <template slot-scope="scope">{{ scope.row.isSynchronize | showSync }}</template>
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
import {
  synchronizePage,
  addSynchronize,
  deleteSynchronize
} from "@/api/maintenance/synchronization.js";
import { getProject } from "@/api/maintenance/three.js";
import { mixinText } from "@/mixins/getProjectAndstage.js"
export default {
   mixins:[mixinText],
  data() {
    return {
      projectOption: [],
      stageOption: [],
      syncOption: [{id: "", name: "全部"},{id: 1, name: "同步"},{id: 0, name: "不同步"}],
      listQuery: {
        page: 1,
        limit: 10,
        projectCode: "",
        projectStageCode: "",
        isSynchronize: ""
      },
      tableData: [],
      total: 0,
      multipleSelection: {},
      selId: []
    };
  },
  methods: {
    changeP(){
       this.changePro(this.listQuery.projectCode).then(res => {
          this.stageOption = res;
       })
    },
    hander(){
        this.listQuery.page = 1;
        this.getList();
    },
    refesh(){
      this.listQuery.projectStageCode = "";
      this.listQuery.projectCode = "";
      this.listQuery.isSynchronize = "";
    },
    currentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    sizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    getList() {
      synchronizePage(this.listQuery).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.selId = val.map(v => v.stageProjectId);
    },
    del() {
      if (!this.multipleSelection.length) {
        this.$message({
          type: "error",
          message: "至少选择一条数据"
        });
        return false;
      }
       if (this.multipleSelection.some(v => v.isSynchronize == 0)) {
            this.$message({
            type: "error",
            message: "包含未同步的数据"
            });
            return false;
        }
      var loading = this.$loading({
            lock: true,
            text: "删除中，请稍后...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
        });
      deleteSynchronize(this.selId).then(res => {
          this.$message({
              type: "success",
              message: "删除成功",
          })
        loading.close();
        this.getList();
      });
    },
    sync() {
      if (!this.multipleSelection.length) {
        this.$message({
          type: "error",
          message: "至少选择一条数据"
        });
        return false;
      }
      if (this.multipleSelection.some(v => v.isSynchronize == 1)) {
        this.$message({
          type: "error",
          message: "包含已同步的数据"
        });
        return false;
      }
       var loading = this.$loading({
            lock: true,
            text: "同步中，请稍后...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
        });
      addSynchronize(this.selId).then(res => {
          this.$message({
              type: 'success',
              message: '同步成功',
          })
          loading.close();
          this.getList();
      });
    },
    importf(obj) {
      let _this = this;
      let inputDOM = this.$refs.inputer; // 通过DOM取文件数据
      this.file = event.currentTarget.files[0];
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          // outdata就是你想要的东西 excel导入的数据
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          // excel 数据再处理
          let arr = [];
          outdata.map(v => {
            let obj = {};
            obj.account = v.登录账号;
            obj.name = v.姓名;
            obj.department = v.部门;
            obj.secondDepartment = v.二级部门;
            obj.status = v.状态;
            obj.id = v.id;
            arr.push(obj);
          });
          _this.accountList = [...arr];
          console.log(_this.accountList);
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    }
  },
  created() {
    this.getPro().then(data => {
      console.log(data,"1112223333")
      this.projectOption = data;
    })
    this.getList();
  },
  filters: {
    showSync(value) {
      const statusDef = {
        0: "未同步",
        1: "同步"
      };
      return statusDef[value];
    }
  }
};
</script>

<style lang="scss" scoped>
.sync-btns {
  width: 130px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>