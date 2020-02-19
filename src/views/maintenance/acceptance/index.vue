<template>
  <div class="app-container calendar-list-container">
    <!-- 查询 -->
    <query @getQuery="getQuery" :stateOption="stateOption" :isShowItemAndTag="isShowItemAndTag" @tagShows="tagShows" :moState="moState"></query>
    <el-row :gutter="10" style="margin-top: 20px">
      <el-button size="small" type="primary" @click="backgo" v-if="permissions.acceptance_index_reject">驳回</el-button>
      <el-button size="small" type="primary" @click="doIt" v-if="permissions.acceptance_index_ok">验收确认</el-button>
      <el-button size="small" type="primary" @click="closePage" v-if="permissions.acceptance_index_close">强制关单</el-button>
      <el-button size="small" type="primary" @click="handleDownload" v-if="permissions.acceptance_index_out">导出</el-button>
    </el-row>
    <!-- 列表页 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :height="tagShow ? 'calc(100% - 160px)' : 'calc(100% - 260px)'"
      @selection-change="handleSelectionChange"
      border
      v-loading="loading"
    >
      <el-table-column type="selection" width="55" fixed="left"></el-table-column>
      <el-table-column prop="code" label="报修单编号" width="200" align="center"></el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="80"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">{{ scope.row.state | supplyState }}</template>
      </el-table-column>
      <el-table-column
        prop="source"
        label="来源"
        width="80"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">{{ scope.row.source | sourceState }}</template>
      </el-table-column>
      <el-table-column prop="ownerName" label="用户名" width="80" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="ownerTep" label="用户电话" width="120" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column
        prop="title"
        label="问题标题"
        width="120"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <!-- <el-table-column prop="projectName" label="项目" width="120" align="center"></el-table-column>
      <el-table-column prop="projectStageName" label="分期" width="120" align="center"></el-table-column>
      <el-table-column prop="buildName" label="楼栋" width="120" align="center"></el-table-column>
      <el-table-column prop="unitName" label="单元" width="120" align="center"></el-table-column>
      <el-table-column prop="roomName" label="房号" width="120" align="center"></el-table-column>-->
      <el-table-column
        prop="problem"
        label="用户地址"
        width="240"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="isThree" label="是否第三方" width="120" align="center">
        <template slot-scope="scope">
            {{ scope.row.isThree | showThree }}
        </template>
      </el-table-column>
      <el-table-column prop="twoModel" label="用户问题" width="240" align="center" :show-overflow-tooltip="true"></el-table-column>
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
      <el-table-column prop="supplierName" label="维修单位" width="120" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="报修提报日期" width="140" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.source == '1'">{{ scope.row.repairTime | timeValue }}</span>
          <span v-if="scope.row.source == '0'">{{ scope.row.createTime | timeValue }}</span>
        </template>
      </el-table-column>
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
         <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small" :disabled="scope.row.isThree == '0'" v-if="permissions.acceptance_index_detail">详 情</el-button>
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
    <!-- 强制关单弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="form" :rules="rule" label-width="80px">
        <el-form-item label="理由" prop="reason">
          <el-input v-model="form.reason" size="small" :row="8" type="textarea" placeholder="请输入理由"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="mustClose" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
    
<script>
import {
  getData,
  getAllData,
  doFinish,
  doBack,
  doClose
} from "@/api/maintenance/acceptance";
import query from "@/components/common/query.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
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
        isThree: 0,
        state: 1,
      },
      itemOption: [], //搜索项目名称内容
      repairTime: [], //报修日期
      total: 0,
      Lander: JSON.parse(sessionStorage.getItem("userInfo")).content.userId,
      itemId: [], //存放所有项目得projectId
      tableData: [],
      tableAllData: [], //导出使用
      checkboxName: [
        "报修单编号",
        "状态",
        "来源",
        "用户名",
        "用户电话",
        "问题标题",
        "用户地址",
        "维修单位",
        "用户问题",
        "所属供应商",
        "报修提报日期",
      ],
      checkboxVal: [
        "code",
        "state",
        "source",
        "ownerName",
        "ownerTep",
        "title",
        "problem",
        "isThree",
        "twoModel",
        "supplierName",
        "repairTime",
      ],
      multipleSelection: [],
      selId: [],
      stateOption: [],
      dialogVisible: false,
      form: {
        reason: ""
      },
      rule: {
        reason: [
          { required: true, message: "请输入理由", trigger: "blur" }
        ]
      },
      loading: true,
      isShowItemAndTag: true,
      tagShow: false,
      num: 0,
      moState: "",
      supplier: [],
    };
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  filters: {
    supplyState(value) {
      const statusDef = {
        1: "待验收",
        2: "待评价",
        3: "业主驳回",
        4: "已评价",
        5: "驳回重修"
      };
      return statusDef[value];
    },
    sourceState(value){
      const statusDef = {
        0: "海客会",
        1: "维修平台"
      }
      return statusDef[value];
    },
    timeValue(value){
      if(value){
         return value.split(" ")[0];
      }else{
        return value;
      }
     
    },
    showThree(value){
       const statusDef = {
        0: "否",
        1: "是", //
      };
      return statusDef[value];
    },
    cycleShow(value){
      return value + "天";
    },
    timeShow(value){
      return value + "次"
    }
  },
  created() {
    this.getList();
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
    tagShows(data){
      this.tagShow = data;
      console.log(data);
    },
    getQuery(data) {
      Object.assign(this.listQuery, data);
      this.getList();
      this.getAllList();
    },
    getList() {
      this.loading = true;
      getData(this.listQuery).then(res => {
        var data = res.data.records;
        
        data.forEach((item, index) => {
          item.problem = `${item.projectName}-${item.projectStageName}-${item.buildName}-${item.roomName}`;
          item.twoModel = `${item.moduleName}-${item.bigClassName}`;
        });
          this.tableData = data;
        console.warn(data)
        console.log(this.tableData,"data");
        this.total = res.data.total;
        this.loading = false;
      });
    },
    getAllList() {
      return new Promise((resolve, reject) => {
        var obj = {
          projectUuid: this.listQuery.projectUuid, // 
          projectStageUuid: this.listQuery.projectStageUuid, // 
          buildUuid: this.listQuery.buildUuid, // 
          startTime: this.listQuery.startTime, // 
          endTime: this.listQuery.endTime, // 
          title: this.listQuery.title, // 
          ownerName: this.listQuery.title, // 
          ownerTep: this.listQuery.ownerTep, // 
          isThree: this.listQuery.isThree, // 
          state: this.listQuery.state, // 
        };
        getAllData(obj).then(res => {
          var data = res.data.data;
          data.forEach((item,index) => {
            if(item.source == '0' && item.createTime){
              item.repairTime = item.createTime.split(" ")[0];
            }else if(item.source == '1' && item.repairTime){
              item.repairTime = item.repairTime.split(" ")[0];
            }
            item.problem = `${item.projectName}-${item.projectStageName}-${item.buildName}-${item.roomName}`;
            item.twoModel = `${item.moduleName}-${item.bigClassName}`;
            item.state = item.state == 1 ? "待验收" : item.state == 2 ? "待评价" : item.state == 3 ? "业主驳回" : item.state == 4 ? "已评价" : "驳回重修";
            item.source = item.source == 0 ? "海客会" : "维修平台";
            item.isThree = item.isThree == 0 ? "责任方" : "第三方" ;
          })
          this.tableAllData = data;
          resolve();
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.selId = val.map(v => v.id);
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
          console.log(tHeader,"theader");
          console.log(filterVal,"filterval");
          console.log(this.tableAllData, "SSS");
          // 默认导出是全部导出  然后选择哪条导出哪条
          let _this = this;
          // debugger;

          console.log(data,"datadata");
          console.log(excel.export_json_to_excel,"zheshishenm");
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "验收单管理导出"
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
    // 详情
    handleClick({ id, state,maintenanceId }) {
      console.log(state);
      this.$router.push({
        name: "验收详情",
        query: { id, state,maintenanceId }
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
    backgo() {
      this.$nextTick(function(){
         this.$refs["form"].resetFields();
      })
      var flag = false;
      if (this.selId.length === 0) {
        this.$message({
          type: "error",
          message: "至少选择一条数据"
        });
        return false;
      }
      this.multipleSelection.forEach((item, index) => {
        if (item.state != 1 && item.state != 3) {
          flag = true;
        }
      });
      if (flag) {
        this.$message({
          type: "error",
          message: "存在不可驳回的数据"
        });
        return false;
      }
      this.num = 1;
      this.dialogVisible = true;
      // doBack(this.selId).then(res => {
      //   this.$message({
      //     type: 'success',
      //     message: '驳回成功',
      //   })
      //   this.getList();
      // });
    },
    doIt() {
      var flag = false;
      var obj = {};
      if (this.selId.length === 0) {
        this.$message({
          type: "error",
          message: "至少选择一条数据"
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
      this.multipleSelection.forEach((item,index) => {
        if(item.state != 1){
          flag = true
        }
      })
      if(flag){
        this.$message({
          type: 'error',
          message: '只能是待验收才可以验收确认'
        })
        return false;
      }
      var loading = this.$loading({lock: true,text: '确认中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
      obj.ids = this.selId;
      if (this.multipleSelection[0].source == 0) {
        // app
        obj.orderIds = [this.multipleSelection[0].orderId];  
      }
      doFinish(obj).then(res => {
        loading.close();
        this.$message({
          type: "success",
          message: "确认成功"
        });
        this.getList();
      });
    },
    closePage() {
      this.$nextTick(function(){
         this.$refs["form"].resetFields();
      })
      if (this.selId.length === 0) {
        this.$message({
          type: "error",
          message: "至少选择一条数据"
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
      if (this.multipleSelection[0].state != 3) {
        this.$message({
          type: "error",
          message: "只有业主驳回才能强制关单"
        });
        return false;
      }
      this.num = 2;
      this.dialogVisible = true;
    },
    // 
    mustClose() {
      this.$refs['form'].validate((valid) => {
        if(valid){
          var loading = this.$loading({lock: true,text: '执行中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
          if(this.num == 1){
            var obj = {
              ids: this.selId,
              source: 6,
              reason: this.form.reason,
            }
            doBack(obj).then(res => {
              this.$message({
                type: 'success',
                message: '驳回成功',
              })
              loading.close();
              this.dialogVisible = false;
              this.getList();
            });
          }else if(this.num == 2){
              var obj = {
                reason: this.form.reason,
                source: 7,
                ids: this.selId,
              }
              if (this.multipleSelection[0].source == 0 && this.multipleSelection[0].orderId) {
                obj.orderIds = [this.multipleSelection[0].orderId];
              }
              doClose(obj).then(res => {
                this.dialogVisible = false;
                loading.close();
                this.getList();
              });
          }
        }
      })
    }
  },
  components: {
    query
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.stateOption = [
        { id: "", name: "全部" },
        { id: 1, name: "待验收" },
        { id: 2, name: "待评价" },
        { id: 3, name: "业主驳回" },
        { id: 4, name: "已评价" },
        { id: 5, name: "驳回重修" },
      ];
      vm.moState = 1;
      vm.getList();
    });
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