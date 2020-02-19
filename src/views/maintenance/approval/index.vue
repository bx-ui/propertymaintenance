<template>
  <div class="app-container calendar-list-container">
    <!-- 查询 -->
    <query @getQuery="getQuery" :stateOption="stateOption" :moState="moState"></query> 
    <el-row :gutter="10" style="margin-top: 20px">
      <el-button size="small" type="primary">退回</el-button>
      <el-button size="small" type="primary" @click="handleDownload">导出</el-button>
    </el-row>
    <!-- 列表页 -->
    <el-table :data="tableData" style="width: 100%" height="calc(100% - 210px)" @selection-change="handleSelectionChange" border v-loading="loading">
      <el-table-column type="selection" width="55" fixed="left"></el-table-column>
      <el-table-column prop="code" label="报修单编号" width="220" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" width="90" align="center">
        <template slot-scope="scope">
            {{ scope.row.state | supplyState }}
        </template>
      </el-table-column>
      <el-table-column prop="isThree" label="来源" width="90" align="center">
        <template slot-scope="scope">
            {{ scope.row.isThree | threeState }}
        </template>
      </el-table-column>
      <el-table-column prop="ownerName" label="用户名" width="80" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="ownerTep" label="用户电话" width="120" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="problem" label="用户地址" width="240" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="question" label="用户问题" width="240" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="supplierName" label="维修单位" width="120" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="isThree" label="是否第三方" width="120" align="center">
        <template slot-scope="scope">
            {{ scope.row.isThree | showThree }}
        </template>
      </el-table-column>
      <el-table-column prop="maintenanceTime" label="驳回次数" width="80" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.maintenanceTime | timeShow }}
        </template>
      </el-table-column>
      <el-table-column prop="maintenanceCycle" label="维修周期" width="80" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.maintenanceCycle | cycleShow }}
        </template>
      </el-table-column>
      <el-table-column prop="repairTime" label="报修提报日期" width="140" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.source == '1'">{{ scope.row.repairTime | showTime }}</span>
          <span v-if="scope.row.source == '0'">{{ scope.row.createTime | showTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="zip" label="接单时间" width="120"></el-table-column>
      <el-table-column prop="zip" label="维修完成时间" width="120"></el-table-column>-->
       <el-table-column label="维修图片" width="140" align="center">
        <template slot-scope="scope">
            <!-- <span @click="see(scope.row)" class="see-pic">查看维修图片</span> -->
            <el-popover
              placement="right"
              width="400"
              trigger="click">
              <div class="img-total">
                <div class="bxBeautiful">
                  <!-- <a :href="item.url">{{ item.name }}</a> -->
                  <img  v-for="(item,index) in supplier" :key="index"  :src="item.url" alt="" style="width: 200px; height: 200px; display: block; margin-left: 5px;">
                </div>
              </div>
              <el-button slot="reference" @click="see(scope.row)" class="see-pic">查看维修图片</el-button>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">详 情</el-button>
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
import { getData, getDetail,getAllData } from "@/api/maintenance/approval";
import query from "@/components/common/query.vue";
import axios from "axios";
export default {
  data() {
    return {
      supplier: [],
      listQuery: {
        page: 1,
        limit: 10,
        projectUuid: "",
        projectStageUuid: "",
        buildUuid: "",
        title: "",
        startTime: "",
        endTime: "",
        ownerName: "",
        ownerTep: "",
        state: "",
      },
      itemOption: [], //搜索项目名称内容
      repairTime: [], //报修日期
      total: 10,
      Lander: JSON.parse(sessionStorage.getItem("userInfo")).content.userId,
      itemId: [], //存放所有项目得projectId
      tableData: [],
      multipleSelection: [],
      selId: [],
      stateOption: [],
      loading: true,
      moState: 0,
      checkboxName: [
        "保修单编号",
        "状态",
        "来源",
        "用户名",
        "用户电话",
        "用户地址",
        "用户问题",
        "所属供应商",
        "报修提报日期"
      ],
      checkboxVal: [
        "code",
        "state",
        "isThree",
        "ownerName",
        "ownerTep",
        "problem",
        "question",
        "supplierName",
        "repairTime"
      ],
    };
  },
   filters: {
    supplyState(value) {
      // const statusDef = {
      //   '-7': "验收审批中",
      //   7: "验收完成",
      // };
      // return statusDef[value];
      if(Number(value) === 7){
        return '未审批'
      }else{
        return '已审批'
      }
    },
    threeState(value){
       const statusDef = {
        0: "责任方",
        1: "第三方", //
      };
      return statusDef[value];
    },
    showTime(value){
      if(value){
        return value.split(" ")[0];
      }else{
        return "";
      }
      
    },
    cycleShow(value){
      return value + "天";
    },
    timeShow(value){
      return value + "次"
    },
    showThree(value){
       const statusDef = {
        0: "否",
        1: "是", //
      };
      return statusDef[value];
    },

  },
  // created() {
  //   this.getList();
  //   this.stateOption = [{id: 7, name: "未审批"},{id: -7, name: "已审批"}];
  //   this.moState = 7;
  // },
  beforeRouteEnter(to, from, next) {
     next(vm => {
      vm.stateOption = [{id: 7, name: "未审批"},{id: -7, name: "已审批"}];
      vm.moState = -7;
      vm.listQuery.state = vm.moState;
      vm.getList();
    });
  },
  methods: {
    see({supplierPicture}){
      this.supplier = [];
      var data = supplierPicture.split(",");
      console.log(this.supplier);
      // 修改数据
      data.forEach((item,index) => {
        var obj = {};
        obj.name = `维修图片${index + 1}`;
        obj.url = item;
        this.supplier.push(obj);
      })
      console.log(this.supplier)
    },
    getQuery(data) {
      console.log(data)
      // Object.assign(this.listQuery, data);
      this.listQuery.state = data.state;
      this.listQuery.ownerTep = data.ownerTep;
      this.listQuery.ownerName = data.ownerName;
      this.listQuery.endTime = data.endTime;
      this.listQuery.startTime = data.startTime;
      this.listQuery.title = data.title;
      this.listQuery.buildUuid = data.buildUuid;
      this.listQuery.projectStageUuid = data.projectStageUuid;
      this.listQuery.projectUuid = data.projectUuid;
      this.getList();
      this.getAllList();
    },
    getList() {
      this.loading = true;
      getData(this.listQuery).then(res => {
        console.log(res);
        var data = res.data.records;
         data.forEach((item,index) => {
          item.problem = `${item.projectName}-${item.projectStageName}-${item.buildName}-${item.roomName}`;
          item.question = `${item.moduleName}-${item.bigClassName}`;
        })
        this.tableData = data;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    getAllList(){
      return new Promise((resolve,reject) => {
        var obj = {
          projectUuid: this.listQuery.projectUuid, 
          projectStageUuid: this.listQuery.projectStageUuid, 
          buildUuid: this.listQuery.buildUuid, 
          startTime: this.listQuery.startTime, 
          endTime: this.listQuery.endTime, 
          title: this.listQuery.title, 
          ownerName: this.listQuery.title, 
          ownerTep: this.listQuery.ownerTep, 
          state: this.listQuery.state, 
        }
        getAllData(obj).then(res => {
          console.log(res);
          var data = res.data.data;
          data.forEach((item,index) => {
            item.problem = `${item.projectName}-${item.projectStageName}-${item.buildName}-${item.roomName}`;
            item.question = `${item.moduleName}-${item.bigClassName}`;
            item.state = item.state == 7 ? "未审批" : "已审批";
            item.isThree = item.isThree == 0 ? "责任方" : "第三方";
            item.repairTime = item.repairTime.split(" ")[0];
          })
          this.tableAllData = data;
          resolve();
        })
      })
    },
    handleDownload() {
      var loading = this.$loading({
        lock: true,
        text: "导出中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.getAllList().then(res => {
        import("@/vendor/Export2Excel").then(excel => {
          //获取当前选中的动态列
          const tHeader = this.checkboxName;
          const filterVal = this.checkboxVal;
          const data =
            this.multipleSelection.length == 0
              ? this.formatJson(filterVal, this.tableAllData)
              : this.formatJson(filterVal, this.multipleSelection);
          // 默认导出是全部导出  然后选择哪条导出哪条
          let _this = this;
          // debugger;
          console.log(data,"datadata");
          console.log(excel.export_json_to_excel,"zheshishenm");
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "验收单审批导出"
          });
          loading.close();
        });
      })
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
    // 详情
    handleClick({ id }) {
      this.$router.push({
        name: "验收单审批详情",
        query: { id },
      });
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      this.selId = val.map(v => v.id);
    },
    sizeChange(){

    },
    currentChange(){

    },
  },
  components: {
    query
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
.see-pic{
  cursor: pointer;
  color: blue;
}
.bxBeautiful{
  display: flex;
  justify-content: space-between;
}
</style>