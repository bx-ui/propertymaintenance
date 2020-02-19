<!--创建人:蒋万鹏  创建时间: 2019-10-22 -->
<!--责任划分 -->
<template>
  <div class="wrap">
    <common-title title="基本信息"></common-title>
    <RepairInformModule :data="resData" />
    <div class="pane_bottom">
      <common-title title="责任划分"></common-title>
      <el-row :gutter="10" style="padding:15px 0;" v-if="!isDisabled">
        <el-col :span="4">
          <el-select
            v-model="contractCode"
            placeholder="请选择"
            size="mini"
            @change="handleChange"
            filterable
          >
            <el-option
              v-for="item in options"
              :key="item.contractCode"
              :label="item.name"
              :value="item.contractCode"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button @click="add" size="mini" type="primary">添加</el-button>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="10" style="padding:15px 0;">
        <el-col :span="4">
          <el-select v-model="contractCode" placeholder="请选择" size="mini" @change="handleChange">
            <el-option
              v-for="item in options"
              :key="item.contractCode"
              :label="item.name"
              :value="item.contractCode"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button @click="add" size="mini" type="primary">添加</el-button>
        </el-col>
      </el-row>-->
      <el-table :data="tableData">
        <el-table-column prop="name" label="责任方" min-width="240" align="center"></el-table-column>
        <el-table-column prop="percent" label="责任比例 (%)" width="120" align="center">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.percent"
              :max="100"
              :min="0"
              size="mini"
              :step="1"
              :disabled="isDisabled"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="contractCode" label="合同编号" align="center" min-width="160"></el-table-column>
        <el-table-column prop="contractName" label="合同名称" min-width="220" align="center"></el-table-column>
        <el-table-column prop="explain" label="责任说明" min-width="150" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.explain"
              size="mini"
              placeholder="请输入内容"
              :disabled="isDisabled"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" v-if="!isDisabled" align="center">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row.contractCode)" type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form label-width="100px" style="margin-top:10px;;">
        <el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="8">
              <el-form-item label="发起人员">
                <el-input disabled v-model="formData.initiator " size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发起时间">
                <el-input disabled v-model="formData.startTime" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发起人部门">
                <el-input disabled v-model="formData.department" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <common-title title="审批流程"></common-title>
      <el-table :data="tableResData">
        <el-table-column prop="auditorName" label="承诺人" align="center"></el-table-column>
        <el-table-column prop="taskName" label="角色" align="center"></el-table-column>
        <el-table-column prop="statusName" label="操作" align="center"></el-table-column>
        <el-table-column prop="opinion" label="审批意见" align="center"></el-table-column>
      </el-table>
      <el-row style="text-align:center;padding-top:10px;" v-if="!isDisabled">
        <el-button
          type="primary"
          @click="handleSubmit"
          size="mini"
          v-loading.fullscreen.lock="fullscreenLoading"
        >提交</el-button>
      </el-row>
      <el-row style="text-align:center;padding-top:10px;" v-if="canSubmit">
        <el-button type="primary" @click="handeleShow(1)" size="mini">同意</el-button>
        <el-button type="primary" @click="handeleShow(0)" size="mini">驳回</el-button>
      </el-row>
    </div>

    <!-- 审批的弹框 -->
    <el-dialog
      :visible="dialogIsShow"
      width="500px"
      :before-close="modalClose"
      :close-on-click-modal="false"
    >
      <div slot="title">
        <span class="preTitle"></span>
        <span class="nextTitle">审批意见</span>
      </div>
      <div class="main">
        <div>
          <el-form ref="form" label-width="80px" :model="approve">
            <el-form-item label="审批意见" prop="reason">
              <el-input
                type="textarea"
                :rows="7"
                :placeholder="flag | opinionFilter"
                v-model="approve.reason"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleApproval" :loading="buttonLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import RepairInformModule from "./RepairInformModule";
import {
  getProvidersWithoutUUid,
  saveResponse,
  responseApproval,
  getApprovalHistory
} from "@/api/repair/repair";
export default {
  name: "ResponsibilityDivide",
  props: ["resData", "totalData", "state"],
  components: {
    RepairInformModule
  },
  filters: {
    opinionFilter(data) {
      return data == 1 ? "同意" : "";
    }
  },
  data() {
    return {
      approve: {
        reason: ""
      },
      buttonLoading: false,
      formData: {
        initiator: "",
        startTime: "",
        department: ""
      },
      flag: "", //判断是点击同意还是驳回(1 同意 0 驳回)
      dialogIsShow: false,
      isDisabled: true,
      fullscreenLoading: false,
      canSubmit: false,
      contractCode: "", //选中的数据
      options: [],
      tableData: [
        // { name: 1, percent: 2, contractCode: 3, contractName: 4, explain: 5 },
      ],
      tableResData: []
    };
  },
  watch: {
    state(newDate, oldDate) {
      console.log(newDate, "责任划分");
      if (newDate == 4) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
      if (newDate == 5) {
        this.canSubmit = true;
      } else {
        this.canSubmit = false;
      }
    },
    totalData(newData, oldData) {
      if (
        newData.hzPropertyDuty &&
        newData.hzPropertyDuty.hzPropertyDutyAllocation.length > 0
      ) {
        newData.hzPropertyDuty.hzPropertyDutyAllocation.forEach(element => {
          this.tableData.push({
            name: element.supplierName,
            contractName: element.dutySupContractName,
            contractCode: element.dutySupContractCode,
            percent: element.dutyRatio,
            explain: element.dutyRemark
            // code: element.dutySupContractCode
          });
        });
        this.getApproveList(newData.hzPropertyDuty.procId);
        Object.keys(this.formData).forEach(item => {
          if (item == "startTime") {
            this.formData[item] = newData.hzPropertyDuty[item].split(" ")[0];
          } else {
            this.formData[item] = newData.hzPropertyDuty[item];
          }
        });
      }
    }
  },
  created() {
    this.getResponsePers();
    this.openEdit();
  },
  methods: {
    handleDelete(contractCode) {
      console.log(contractCode);
      this.tableData = this.tableData.filter(
        item => item.contractCode != contractCode
      );
    },
    handleCancel() {
      this.dialogIsShow = false;
      this.$refs["form"].resetFields();
    },
    modalClose() {
      this.dialogIsShow = false;
      this.$refs["form"].resetFields();
    },
    getApproveList(procId) {
      getApprovalHistory({
        procId: procId
      }).then(res => {
        console.log(res.data, "责任划分页面审批历史列表数据");
        this.tableResData = res.data;
      });
    },
    handeleShow(data) {
      this.flag = data; //1 同意 0 驳回
      this.dialogIsShow = true;
    },
    handleApproval() {
      let obj = {
        state: this.flag,
        opinion: !!this.approve.reason ? this.approve.reason : "同意",
        procId: this.totalData.hzPropertyDuty.procId,
        taskId: this.totalData.hzPropertyDuty.taskId,
        id: this.totalData.hzPropertyDuty.id,
        maintenanceId: this.totalData.id
      };
      this.buttonLoading = true;

      responseApproval(obj).then(res => {
        this.buttonLoading = false;
        this.dialogIsShow = false;
        this.$refs["form"].resetFields();

        if (res.data.code == 0) {
          this.$message.success("审批成功");
          let a = setTimeout(() => {
            this.$router.go(-1);
            clearTimeout(a);
          }, 300);
        } else {
          this.$message.error("审批失败");
        }
      });
    },
    openEdit() {
      if (this.$route.query.state == 0) {
        this.isDisabled = false;
      }
    },
    handleSubmit() {
      if (this.tableData.length <= 0) {
        this.$message.warning("请添加责任方数据");
        return;
      }
      let sumPercent = 0;
      this.tableData.forEach(item => {
        sumPercent = sumPercent + item.percent;
      });
      if (sumPercent > 100) {
        this.$message.warning("责任比例总和不能超过100%");
        return;
      }
      let data = [];
      let id = this.$route.query.id;
      this.tableData.forEach(element => {
        data.push({
          contractCode: element.contractCode,
          dutyRatio: element.percent,
          dutyRemark: element.explain
        });
      });
      let finalData = {
        id: !!this.totalData.hzPropertyDuty
          ? this.totalData.hzPropertyDuty.id
          : "",
        procId: !!this.totalData.hzPropertyDuty
          ? this.totalData.hzPropertyDuty.procId
          : "",
        taskId: !!this.totalData.hzPropertyDuty
          ? this.totalData.hzPropertyDuty.taskId
          : "",
        maintenanceId: id,
        hzPropertyDutyAllocation: data,
        isHandover: this.totalData.isHandover
      };
      console.log(finalData);

      this.fullscreenLoading = true;
      saveResponse(finalData).then(res => {
        this.fullscreenLoading = false;
        if (res.data.code == 0) {
          this.$message.success("保存成功");
          let a = setTimeout(() => {
            this.$router.go(-1);
            clearTimeout(a);
          }, 300);
        } else {
          this.$message.error("保存失败");
        }
      });
    },
    getResponsePers() {
      getProvidersWithoutUUid({
        projectUuid: this.$route.query.projectUuid
      }).then(res => {
        // console.log(res.data, "责任划分:");
        this.options = res.data;
      });
    },
    handleChange() {},
    add() {
      console.log(this.contractCode);
      if (!this.contractCode) {
        this.$message.warning("请选择责任方后再添加");
        return;
      }
      if (this.tableData.some(item => item.contractCode == this.contractCode)) {
        this.$message.warning("此责任方已被添加");
        return;
      }

      this.options.forEach(item => {
        if (item.contractCode == this.contractCode) {
          this.tableData.push({
            contractCode: item.contractCode,
            name: item.name,
            percent: "",
            contractCode: item.contractCode,
            contractName: item.contractName,
            explain: ""
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
}
</style>