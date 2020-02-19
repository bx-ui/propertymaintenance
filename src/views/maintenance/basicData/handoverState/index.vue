<template>
  <div class="app-container calendar-list-container">
    <!-- 查询 -->
    <div class="selectIt">
      <el-form label-width="80px">
        <el-row :gutter="24">
          <el-col :span="5">
            <el-form-item label-width="70px" label="项目名">
              <el-select size="small" v-model="listQuery.projectCode" @change="changeP" clearable filterable>
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
            <el-form-item label-width="60px" label="分期名">
              <el-select size="small" v-model="listQuery.projectStageCode" clearable filterable :disabled="listQuery.projectCode == ''">
                <el-option
                  v-for="(item,index) in stageOption"
                  :key="index"
                  :value="item.code"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-top: 5px">
            <el-button size="small" type="primary" @click="hander">查询</el-button>
            <el-button size="small" type="primary" @click="refresh">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 列表数据 -->
    <el-table :data="tableData" style="width: 100%;margin-top:20px" height="calc(100% - 100px)">
      <el-table-column prop="projectName" label="项目名" width="400" align="center"></el-table-column>
      <el-table-column prop="projectStageName" label="分期名" width="500" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="openChange(scope.row)" size="small">交接</el-button>
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
    <!-- 抽屉 -->
    <el-drawer title="交接" :visible.sync="drawer" direction="rtl" size="20%" class="drawer">
      <el-tree
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="buildId"
        ref="tree"
        highlight-current
        :props="defaultProps"
        :default-checked-keys="moValue"
      ></el-tree>
      <div class="draw-btn">
        <el-button size="small" type="primary" @click="doSubmit">确定</el-button>
        <el-button size="small" @click="drawer = false">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  getData,
  getHandover,
  addHandover
} from "@/api/maintenance/handoverState.js";
import { mixinText } from "@/mixins/getProjectAndstage.js"
export default {
  mixins: [mixinText],
  data() {
    return {
      projectOption: [],
      stageOption: [],
      tableData: [],
      drawer: false,
      listQuery: {
        page: 1,
        limit: 10,
        projectCode: "",
        projectStageCode: ""
      },
      total: 0,
      treeData: [],
      defaultProps: {
        children: "children",
        label: "buildName",
        id: "buildId"
      },
      moValue: []
    };
  },
  methods: {
    openChange({ projectStageCode, projectStageName }) {
      this.$nextTick(() => {
        this.treeData = [];
        this.moValue = [];
      });
      getHandover({ projectStageCode }).then(res => {
        var obj = {
          buildId: 0,
          buildName: projectStageName,
          children: res.data.data
        };
        if(!res.data.data.length){
          return false;
        }
        this.treeData.push(obj);
        // 默认选中数据
        var array = res.data.data;
        array.forEach((item, index) => {
          if (item.isHandover == 1) {
            this.moValue.push(item.buildId);
          }
        });
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.moValue); //获取已经设置的资源后渲染
        });
        console.log(this.moValue, "是是是");
      });
      this.drawer = true;
    },
    refresh(){
      this.listQuery.projectCode = "";
      this.listQuery.projectStageCode = "";
    },
    changeP(){
      this.listQuery.projectStageCode = "";
      this.changePro(this.listQuery.projectCode).then(data => {
        this.stageOption = data;
      })
    },
    hander(){
      this.listQuery.page = 1;
      this.getList();
    },
    doSubmit() {
      var newArr = this.$refs.tree.getCheckedKeys();
      newArr.forEach((item, index) => {
        if (item == 0) {
          newArr.splice(index, 1);
        }
      });
      console.log(newArr, "newArr");
      var totalArr = Array.from(new Set([...newArr, ...this.moValue]));
      var deleteIds = totalArr.filter(function(v) {
        return newArr.indexOf(v) == -1;
      });
      var addIds = totalArr.filter((v) => {
        console.warn(this.moValue);
        return this.moValue.indexOf(v) == -1;
      });
      var loading = this.$loading({
          lock: true,
          text: "交接中，请稍后...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
      });
      addHandover({ deleteIds, addIds }).then(res => {
        this.$message({
          type: "success",
          message: "交接成功"
        })
        this.drawer = false;
        this.getList();
        loading.close();
      });
    },
    sizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    currentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    getList() {
      getData(this.listQuery).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
    }
  },
  created() {
    this.getPro().then(data => {
      this.projectOption = data;
    })
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  height: 40px;
}
.el-drawer__body {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}
.draw-btn {
  height: 60px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

