  <!--创建人:蒋万鹏  创建时间:  -->
  <!-- 成本预算清单 -->

<template>
  <div class="wrap">
    <common-title title="基本信息"></common-title>
    <RepairInformModule :data="costData" />
    <common-title title="添加物料"></common-title>
    <div class="pane_bottom">
      <el-row style="margin-bottom:10px;">
        <el-col>
          <input type="file" style="display:none;" id="excelInput" accept=".xlsx, .xls" />
          <el-button size="mini" type="primary" @click="add" v-if="!isDisabled">添加物料</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleDownloadExcel"
            v-if="!isDisabled"
          >下载模板excel</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleimportExcel"
            v-if="!isDisabled"
          >导入excel</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleInsertIntoTable"
            v-if="!isDisabled"
          >导入表格中</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData">
        <el-table-column prop="materialName" label="物料名称" width="200" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.materialName" :disabled="isDisabled" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="technologyStandard" label="工艺标准" width="170" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.technologyStandard" :disabled="isDisabled" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="unit" label="单位" width="170" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unit" :disabled="isDisabled" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="用量" width="180" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.count"
              :disabled="isDisabled"
              @input="handleInputCount($event,scope.row.itemId)"
              size="mini"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" width="180" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.price"
              :disabled="isDisabled"
              @input="handleInputMoney($event,scope.row.itemId)"
              size="mini"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="totalMoney" label="总额" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" v-if="!isDisabled" align="center">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row.itemId)" type="text" size="mini">删除</el-button>
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
      <el-row style="margin-top:10px;text-align:center;">
        <el-col v-if="!isDisabled">
          <el-button
            size="mini"
            type="primary"
            @click="handleSubmit(1)"
            v-loading.fullscreen.lock="fullscreenLoading"
          >提交</el-button>
        </el-col>
        <el-col v-if="canSubmit">
          <el-button size="mini" type="primary" @click="handeleShow(1)">同意</el-button>
          <el-button size="mini" type="primary" @click="handeleShow(0)">驳回</el-button>
        </el-col>
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
import XLSX from "xlsx";
import RepairInformModule from "./RepairInformModule";
import {
  // getMaterial,
  saveCost,
  getApproval,
  getApprovalHistory
} from "@/api/repair/repair";
export default {
  name: "CostBudget",
  props: ["costData", "totalData", "state"],
  components: {
    RepairInformModule
  },
  data() {
    return {
      approve: {
        reason: ""
      },
      buttonLoading: false,
      flag: "", //判断是点击同意还是驳回(1 同意 0 驳回)
      dialogIsShow: false,
      fullscreenLoading: false,
      isDisabled: true,
      canSubmit: false,
      options: [],
      sum: 0, //用来记录添加到第几行 , 用来计算每一行的自增ID , 便于选择物料时 , 知道是哪一行在修改
      formData: {
        initiator: "",
        startTime: "",
        department: ""
      },
      tableData: [],
      tableHeader: [
        {
          label: "物料名称",
          prop: "materialName"
        },
        {
          label: "工艺标准",
          prop: "technologyStandard"
        },
        {
          label: "单位",
          prop: "unit"
        },
        {
          label: "用量",
          prop: "count"
        },
        {
          label: "单价",
          prop: "price"
        }
      ],
      excelData: [], //暂存导入的数据

      tableResData: []
    };
  },
  created() {
    // this.getMaterials();
  },
  filters: {
    typeFilter(type) {
      switch (type) {
        case "1":
          return "一级";
        case "2":
          return "二级";
        case "3":
          return "三级";
        default:
          break;
      }
    },
    opinionFilter(data) {
      return data == 1 ? "同意" : "";
    }
  },
  watch: {
    state(newDate, oldDate) {
      // console.log(newDate, "成本预算清单");
      if (newDate == 6) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
      if (newDate == 7) {
        this.canSubmit = true;
      } else {
        this.canSubmit = false;
      }
    },
    totalData(newData, oldData) {
      console.log(newData, "成本预算清单列表数据");
      if (
        newData.hzPropertyBudget &&
        newData.hzPropertyBudget.hzPropertyBudgetList.length > 0
      ) {
        newData.hzPropertyBudget.hzPropertyBudgetList.forEach(element => {
          this.tableData.push({
            unit: element.unit,
            technologyStandard: element.technologyStandard,
            price: element.price,
            totalMoney: parseFloat(element.totalMoney),
            materialName: element.materialName,
            count: element.count,
            materialId: element.materialId,
            // inputIsDisbaled: false,
            itemId: this.sum++
          });
        });
        // console.warn(newData.hzPropertyBudget.procId, "procId");
        this.getApproveList(newData.hzPropertyBudget.procId);
        Object.keys(this.formData).forEach(item => {
          if (item == "startTime") {
            this.formData[item] = newData.hzPropertyBudget[item].split(" ")[0];
          } else {
            this.formData[item] = newData.hzPropertyBudget[item];
          }
        });
      } else {
        this.tableData.push({
          unit: "",
          technologyStandard: "",
          totalMoney: 0,
          materialName: "",
          count: 0,
          price: 0,
          // inputIsDisbaled: false,
          itemId: this.sum++
        });
      }
    }
  },

  methods: {
    handleDownloadExcel() {
      var loading = this.$loading({
        lock: true,
        text: "导出中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      import("@/vendor/Export2Excel").then(excel => {
        //获取当前选中的动态列
        const tHeader = this.tableHeader.map(item => item.label);
        // const filterVal = this.tableHeader.map(item => item.prop);
        const data = [];
        // 默认导出是全部导出  然后选择哪条导出哪条
        let _this = this;
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "维修单管理导出数据"
        });
        loading.close();
      });
    },
    handleimportExcel() {
      document.getElementById("excelInput").click();
    },
    handleInsertIntoTable() {
      const files = document.getElementById("excelInput").files;

      // 通过FileReader对象读取文件
      const fileReader = new FileReader();
      fileReader.onload = event => {
        try {
          const { result } = event.target;
          // 以二进制流方式读取得到整份excel表格对象
          const workbook = XLSX.read(result, { type: "binary" });
          let data = []; // 存储获取到的数据
          // 遍历每张工作表进行读取（这里默认只读取第一张表）
          for (const sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
              // 利用 sheet_to_json 方法将 excel 转成 json 数据
              data = data.concat(
                XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
              );
              break; // 如果只取第一张表，就取消注释这行
            }
          }
          // console.warn(data);
          this.dataFilter(data);
        } catch (e) {
          // 这里可以抛出文件类型错误不正确的相关提示
          console.log("文件类型不正确");
          return;
        }
      };
      // 以二进制方式打开文件
      fileReader.readAsBinaryString(files[0]);
    },
    dataFilter(data) {
      this.excelData = data;

      // 1.计算每行数据的个数是否是this.tableHeader.length
      this.judgeLength().then(
        this.count // 2.为每一行添加计算后的总价
      );
    },
    judgeLength() {
      return new Promise((resolve, reject) => {
        let tableHeaderArray = this.tableHeader.map(item => item.label);
        if (
          this.excelData.length <= 0 ||
          this.excelData.some(
            item => Object.keys(item).length !== this.tableHeader.length //判断每行是否有空值列
          ) ||
          Object.keys(this.excelData[0]).some(
            item => tableHeaderArray.indexOf(item) === -1
          ) //判断导入的数据的属性名是否都在tableHeader中
        ) {
          this.$message.warning(
            "文件内容为空或文件格式有误 , 请核对后重新导入"
          );
          reject();
        } else {
          console.warn("通过检测");
          resolve();
        }
      });
    },
    count() {
      return new Promise((resolve, reject) => {
        try {
          this.excelData.forEach((item, index) => {
            let itemData = {};
            this.tableHeader.forEach(element => {
              let key = element.prop;
              let data;
              if (key == "count" || key == "price") {
                data = !parseFloat(item[element.label])
                  ? 0
                  : parseFloat(item[element.label]);
              } else {
                data = item[element.label];
              }
              itemData[key] = data;
            });
            // 计算itemId和求sum
            itemData.totalMoney = itemData.price * itemData.count;
            itemData.itemId = this.sum++;
            this.tableData.push(itemData);
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
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
        // console.log(res.data, "成本预算清单页面审批历史列表数据");
        this.tableResData = res.data;
      });
    },
    handleInputCount(value, id) {
      console.log(value, id, "value_id");
      if (isNaN(value)) {
        value = 0;
        for (let i = 0; i < this.tableData.length; i++) {
          if (id == this.tableData[i].itemId) {
            console.log(this.tableData[i].count, "1111111");
            this.tableData[i].count = "0";
            console.log(this.tableData[i].count);
          }
        }
      }
      // console.warn(value, id, "输入的值和条目id");
      // console.log(this.tableData);
      for (let i = 0; i < this.tableData.length; i++) {
        if (id == this.tableData[i].itemId) {
          this.tableData[i].totalMoney = value * this.tableData[i].price;
        }
      }
    },
    handleInputMoney(value, id) {
      // console.log(value, id, "value_id");
      if (isNaN(value)) {
        value = 0;
        for (let i = 0; i < this.tableData.length; i++) {
          if (id == this.tableData[i].itemId) {
            console.log(this.tableData[i].count, "1111111");
            this.tableData[i].price = "0";
            console.log(this.tableData[i].count);
          }
        }
      }
      for (let i = 0; i < this.tableData.length; i++) {
        if (id == this.tableData[i].itemId) {
          this.tableData[i].totalMoney = value * this.tableData[i].count;
        }
      }
    },
    handleDelete(id) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].itemId == id) {
          this.tableData.splice(i, 1);
        }
      }
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].itemId > id) {
          this.tableData[i].itemId = this.tableData[i].itemId - 1;
        }
      }
      // console.log(this.tableData.map(item => item.itemId).join(","));
      this.sum = this.sum - 1;
    },
    handleInputCountKeyUp() {},
    // getMaterials() {
    //   getMaterial().then(res => {
    //     this.options = res.data;
    //   });
    // },
    add() {
      this.tableData.push({
        unit: "",
        technologyStandard: "",
        price: 0,
        materialName: "",
        count: 0,
        totalMoney: 0,
        itemId: this.sum++
        // inputIsDisbaled: false
      });
      console.log(this.tableData);
    },
    handleSubmit(idea) {
      let obj = {
        id: !!this.totalData.hzPropertyBudget
          ? this.totalData.hzPropertyBudget.id
          : "",
        procId: !!this.totalData.hzPropertyBudget
          ? this.totalData.hzPropertyBudget.procId
          : "",
        taskId: !!this.totalData.hzPropertyBudget
          ? this.totalData.hzPropertyBudget.taskId
          : "",
        maintenanceId: this.$route.query.id,
        hzPropertyBudgetList: [],
        state: idea
      };
      if (this.tableData.length == 0) {
        this.$message.warning("请添加物料信息");
        return;
      }

      let flag = false;
      this.tableData.forEach(item => {
        if (!item.materialName) {
          this.$message.warning(`请填写第${item.itemId + 1}行数据的物料名称`);
          flag = true;
          return;
        }
        if (item.count == 0 && !item.count) {
          this.$message.warning(
            `请填写第${item.itemId + 1}行数据的物料用量，且值不能为0`
          );
          flag = true;
          return;
        }
        if (item.price == 0 && !item.price) {
          this.$message.warning(
            `请填写第${item.itemId + 1}行数据的物料单价，且值不能为0`
          );
          flag = true;
          return;
        }

        obj.hzPropertyBudgetList.push({
          count: item.count,
          unit: item.unit,
          price: item.price,
          technologyStandard: item.technologyStandard,
          materialName: item.materialName,
          totalMoney: item.totalMoney
        });
      });
      if (flag) return;

      this.fullscreenLoading = true;

      saveCost(obj).then(res => {
        this.fullscreenLoading = false;
        if (res.data.code == 0) {
          this.$message.success("提交成功");
          let a = setTimeout(() => {
            this.$router.go(-1);
            clearTimeout(a);
          }, 300);
        } else {
          this.$message.error("保存失败");
        }
      });
    },
    handeleShow(data) {
      this.flag = data; //1 同意 0 驳回
      this.dialogIsShow = true;
    },
    handleApproval() {
      let data = {
        state: this.flag,
        maintenanceId: this.totalData.id,
        id: this.totalData.hzPropertyBudget.id,
        budgetProcId: this.totalData.hzPropertyBudget.budgetProcId,
        taskId: this.totalData.hzPropertyBudget.taskId,
        procId: this.totalData.hzPropertyBudget.procId,
        opinion: !!this.approve.reason ? this.approve.reason : "同意"
      };
      this.buttonLoading = true;
      getApproval(data).then(res => {
        this.$refs["form"].resetFields();
        this.dialogIsShow = false;
        this.buttonLoading = false;
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
    }
  }
};
</script>
<style lang="scss" scoped>
</style>