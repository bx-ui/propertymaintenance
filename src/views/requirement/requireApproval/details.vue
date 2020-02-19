  <!--创建人:蒋万鹏  创建时间: 2020-1-2 -->
<template>
  <div class="wrap">
    <div class="insertTitle">
      <h1>业务需求申请单</h1>
      <div class="listNum" style="text-align:right;">
        NO：
        <span style="font-size:15px;">{{listNum}}</span>
      </div>
    </div>
    <el-form ref="form" label-width="100px" :model="form">
      <el-row class="titleRow">
        <el-col :span="8">
          <el-form-item label="申请部门">
            <el-input v-model="form.department" size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请人">
            <el-input disabled size="small" v-model="submitPerson"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="日期">
            <el-input disabled size="small" v-model="submitDate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目">
            <el-select v-model="form.projectUuid" size="small" clearable filterable disabled>
              <el-option
                v-for="(item,index) in projectOption"
                :key="index"
                :label="item.projectName"
                :value="item.projectId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分期">
            <el-select v-model="form.projectStageUuid" size="small" clearable filterable disabled>
              <el-option
                v-for="(item,index) in stagetOption"
                :key="index"
                :label="item.projectStageName"
                :value="item.projectStageUuid"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="需求类别">
            <el-select
              v-model="form.demandType"
              size="small"
              clearable
              disabled
              filterable
              @change="changeToType"
            >
              <el-option
                v-for="(item,index) in requireTypeOption"
                :key="index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单据类型">
            <el-select
              v-model="form.billType"
              size="small"
              clearable
              filterable
              @change="changeToList"
              disabled
            >
              <el-option
                v-for="(item,index) in typeOption"
                :key="index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="价格" prop="billType">
            <el-input v-model="form.money" size="small" :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="业务需求概述">
            <el-input size="small" v-model="form.remark" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="业务需求内容">
            <el-input
              size="small"
              v-model="form.content"
              type="textarea"
              maxlength="255"
              show-word-limit
              rows="4"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="附加内容">
            <!-- <el-input size="small" v-model="form.file"></el-input> -->
            <!-- <el-upload
              class="upload"
              action="noAction"
              multiple
              :file-list="fileList"
              :on-change="onChange"
              :on-remove="onRemove"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>-->
            <ul>
              <li v-for="(item,index) in fileList" :key="index">
                <a :href="item.url">{{item.name}}</a>
              </li>
            </ul>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- <common-title title="费用清单" v-if="moneyListIsShow"></common-title> -->
    <div class="pane_bottom">
      <!-- <el-row style="margin-bottom:10px;" v-if="moneyListIsShow">
        <el-col>
          <input type="file" style="display:none;" id="excelInput" accept=".xlsx, .xls" />
          <el-button size="mini" type="primary" @click="add">添加物料</el-button>
          <el-button size="mini" type="primary" @click="handleDownloadExcel">下载模板excel</el-button>
          <el-button size="mini" type="primary" @click="handleimportExcel">导入excel</el-button>
          <el-button size="mini" type="primary" @click="handleInsertIntoTable">导入表格中</el-button>
        </el-col>
      </el-row>-->
      <el-table
        :data="tableData"
        v-if="moneyListIsShow"
        show-summary
        :summary-method="getSummaries"
      >
        <el-table-column prop="materialName" label="物料名称" min-width="150" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.materialName" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="brand" label="规格品牌" min-width="130" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.brand" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="unit" label="单位" min-width="130" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unit" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="用量" min-width="130" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.count"
              @input="handleInputCount($event,scope.row.itemId)"
              size="mini"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" min-width="150" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.price"
              @input="handleInputMoney($event,scope.row.itemId)"
              size="mini"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="totalPrice" label="总额" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" v-if="!isDisabled" align="center">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row.itemId)" type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="250" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" size="mini"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <common-title title="审批流程"></common-title> -->
    <div class="bottomWrap">
      <el-table :data="tableResData">
        <el-table-column prop="signName" label="承诺人" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.signName" alt />
          </template>
        </el-table-column>
        <el-table-column prop="taskName" label="角色" align="center"></el-table-column>
        <el-table-column prop="statusName" label="操作" align="center"></el-table-column>
        <el-table-column prop="opinion" label="审批意见" align="center"></el-table-column>
      </el-table>
    </div>

    <el-row style="margin-top:10px;text-align:center;">
      <el-col v-if="isCanSubmit">
        <el-button size="mini" type="primary" @click="handeleShow(1)">同意</el-button>
        <el-button size="mini" type="primary" @click="handeleShow(0)">驳回</el-button>
      </el-col>
    </el-row>

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
import { saveCost, getApproval, getApprovalHistory } from "@/api/repair/repair";
import {
  getProjects,
  getUnit,
  getStore,
  getDans,
  getHaos
} from "@/api/maintenance/hzpropertyrepair";
import {
  getdata,
  saveEditData,
  submitApprovalOpnion
} from "@/api/require/require";
import { dictTypeTree } from "@/api/maintenance/dictionary";
export default {
  name: "CostBudget",
  props: ["costData", "totalData", "state"],
  data() {
    return {
      listNum: "",
      submitPerson: "",
      submitDate: "",
      isCanSubmit: false,
      moneyListIsShow: false,
      getTotalData: {}, //保存基本信息
      form: {
        department: "", //部门
        projectUuid: "", //项目id
        projectStageUuid: "", //分期id
        demandType: "", //需求类别
        billType: "", //单据类型
        // calculateFiles: "", //附件
        remark: "", //业务需求概述
        content: "", //业务需求内容
        money: ""
      },
      fileList: [],
      fileId: [],
      oldFileId: [],
      selectTypeId: "", //选中的需求类别id
      requireTypeOption: [],
      typeOption: [],
      approve: {
        reason: ""
      },
      Lander: JSON.parse(sessionStorage.getItem("userInfo")).content.userId,
      projectOption: [], //项目列表
      stagetOption: [], //分期列表
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
          label: "规格品牌",
          prop: "brand"
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
    this.getPro();
    this.getDictIndexData();
    this.getData();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // console.warn(vm.$route.query.name);
      if (vm.$route.query.name == "审批") {
        vm.isCanSubmit = true;
      } else {
        vm.isCanSubmit = false;
      }
    });
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
            brand: element.brand,
            price: element.price,
            totalPrice: parseFloat(element.totalPrice),
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
          brand: "",
          totalPrice: 0,
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
    getData() {
      getdata({ id: this.$route.query.id }).then(res => {
        let data = res.data.data;
        this.listNum = data.applicationCode;
        Object.keys(this.form).forEach(item => {
          this.form[item] = data[item];
        });
        this.getByStages();
        if (!data.sysAttachmentList) {
          data.sysAttachmentList = [];
        }
        data.sysAttachmentList.forEach(item => {
          this.fileList.push({
            name: item.attViewName,
            url: item.attUrl,
            id: item.id
          });
        });
        this.oldFileId =
          data.sysAttachmentList.length < 0
            ? []
            : data.sysAttachmentList.map(item => item.id);

        data.hzPropertyApplicationLists.forEach(item => {
          item.totalPrice = this.getSumSaveForTwo(item.count, item.price);
        });
        this.tableData = data.hzPropertyApplicationLists;

        this.moneyListIsShow = data.isSpecial == 1 ? true : false;
        this.submitDate = data.createTime && data.createTime.split(" ")[0];
        this.submitPerson = data.createUserName;
        this.getTotalData = data;
        this.getApproveList(data.procId);

        //获取单据类型数据
        let id = this.requireTypeOption.filter(
          item => item.code == this.form.demandType
        )[0].id;
        dictTypeTree({ listId: id, type: 3 }).then(res => {
          this.typeOption = res.data.data;
        });
      });
    },
    onChange(file, fileList) {
      return (this.fileList = fileList);
    },
    onRemove(file, fileList) {
      console.log(file);
      if (!!file.id) {
        this.fileId.push(file.id);
      }
    },
    //根据字典分类获取列表
    getDictIndexData() {
      dictTypeTree({ typeId: 7, type: 2 }).then(res => {
        this.requireTypeOption = res.data.data;
      });
    },
    //根据列表id获取字典
    changeToType() {
      this.form.billType = "";
      this.typeOption = [];
      let id = this.requireTypeOption.filter(
        item => item.code == this.form.demandType
      )[0].id;
      dictTypeTree({ listId: id, type: 3 }).then(res => {
        this.typeOption = res.data.data;
      });
    },
    //根据字典id判断是否显示费用清单
    changeToList() {
      if (
        this.typeOption.filter(item => item.code == this.form.billType)[0]
          .isSpecial == 1
      ) {
        this.moneyListIsShow = true;
      } else {
        this.moneyListIsShow = false;
      }
    },
    // 获取项目
    getPro() {
      getProjects({ userId: this.Lander, type: 1 }).then(res => {
        this.projectOption = res.data;
      });
    },
    // 获取分期
    getByStages() {
      getUnit({ projectUuid: this.form.projectUuid }).then(res => {
        this.stagetOption = res.data;
      });
    },
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
            itemData.totalPrice = itemData.price * itemData.count;
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
        res.data.shift();
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
      for (let i = 0; i < this.tableData.length; i++) {
        if (id == this.tableData[i].itemId) {
          this.tableData[i].totalPrice = value * this.tableData[i].price;
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
          this.tableData[i].totalPrice = value * this.tableData[i].count;
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
        brand: "",
        price: 0,
        materialName: "",
        count: 0,
        totalPrice: 0,
        itemId: this.sum++
        // inputIsDisbaled: false
      });
      // console.log(this.tableData);
    },
    handleSubmit() {
      if (this.tableData.length == 0 && this.moneyListIsShow) {
        this.$message.warning("请添加物料信息");
        return;
      }

      let materiel = [];
      if (this.moneyListIsShow) {
        console.warn(this.moneyListIsShow, this.tableData);
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

          materiel.push({
            count: item.count,
            unit: item.unit,
            price: item.price,
            brand: item.brand,
            materialName: item.materialName,
            totalPrice: item.totalPrice
          });
        });

        if (flag) return;
      }

      this.fullscreenLoading = true;
      let obj = new FormData();

      //循环插入文件
      if (!!this.fileId.length) {
        obj.append("fileId", this.fileId.toString());
        obj.append("oldFileId", this.oldFileId.toString());
      }
      Object.keys(this.fileList).forEach(item => {
        if (!!this.fileList[item].raw) {
          obj.append("calculateFiles", this.fileList[item].raw);
        }
      });
      //主体
      Object.keys(this.form).forEach(item => {
        // console.log(item);
        obj.append(item, this.form[item]);
      });
      console.error(this.moneyListIsShow, materiel);
      if (this.moneyListIsShow) {
        //物料
        obj.append("hzPropertyApplicationLists", JSON.stringify(materiel));
      }
      obj.append("id", this.$route.query.id);
      saveEditData(obj).then(res => {
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
        id: this.getTotalData.id,
        taskId: this.getTotalData.taskId,
        procId: this.getTotalData.procId,
        opinion: !!this.approve.reason ? this.approve.reason : "同意"
      };

      this.buttonLoading = true;
      submitApprovalOpnion(data).then(res => {
        this.$refs["form"].resetFields();
        this.dialogIsShow = false;
        this.buttonLoading = false;
        if (res.data.data == true) {
          this.$message.success("审批成功");
          let a = setTimeout(() => {
            this.$router.go(-1);
            clearTimeout(a);
          }, 300);
        } else if (res.data.data == false) {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  overflow: scroll;
  padding: 10px 20px;
  .insertTitle {
    text-align: center;
    h1 {
      font-weight: bold;
    }
  }
  .el-form {
    border: 1px solid #8c8c8c;
    padding: 10px;
  }
  .pane_bottom {
    border: 1px solid #8c8c8c;
    border-top: unset;
    padding-top: 20px;
    padding: 10px;
  }
  .bottomWrap {
    padding: 10px;
    border: 1px solid #8c8c8c;
    border-top: unset;
    padding: 10px;
  }
  .titleRow {
    border-bottom: 1px solid #aaaaaab3;
  }
  .el-form-item {
    margin-bottom: 10px !important;
  }
  .el-row {
    margin-bottom: 12px;
  }
}
</style>