<template>
  <!-- 查看页面 -->
  <div class="add">
    <div class="title">物业费定价测算系统</div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path:'/property/index'}">物业费测算</el-breadcrumb-item>
      <el-breadcrumb-item>查看</el-breadcrumb-item>
    </el-breadcrumb>
   
    <div class="bgcolor">
      <div class="title2">
        <span></span>新增物业费定价测算
        <div></div>
      </div>
      <hr />
        <el-form :inline="true" size="small">
          <el-form-item label="标题" class="font">
            <el-input disabled v-model="title" style="width:200px;" size="mini"></el-input>
          </el-form-item>
         <el-form-item label="项目" class="font">
           <el-input disabled v-model="projectName" style="width:200px;margin-bottom:20px;" size="mini"></el-input> 
        </el-form-item>
        <el-form-item label="区域" class="font">
          <el-input disabled v-model="areaName" style="width:200px;margin-bottom:20px;" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <div class="tableList">
        <el-table
          border
          :data="tableData"
          v-loading="tableLoading"
          element-loading-text="给我一点时间"
          fit
          height="100%"
          size="mini"
          tooltip-effect="dark"
          :cell-style="{fontWeight: '600'}"
          style="width: 100%;font-size: 12px;margin-bottom:15px;border-radius:3px;"
          :header-cell-style="tableHeaderColor"
        >
          <!--索引列-->
          <el-table-column align="center" label="序号" type="index" show-overflow-tooltip width="50"></el-table-column>
          <el-table-column width="75" align="center" prop="format" label="业态"></el-table-column>

          <el-table-column align="center" label="成本支出列项">
            <el-table-column align="center" label="①人工成本">
              <el-table-column width="75" align="center" prop="empNum" label="人员数"></el-table-column>
              <el-table-column align="center" prop="salaryPerYear" width="75" label="年均工资"></el-table-column>
              <el-table-column align="center" prop="salaryYearSum" width="65" label="年合计"></el-table-column>
            </el-table-column>
            <el-table-column align="center" prop="equipmentCost" label="②设备设施维保费及能耗成本"></el-table-column>
            <el-table-column width="100" align="center" prop="environmentCost" label="③环境、秩序维护成本"></el-table-column>
            <el-table-column width="75" align="center" prop="officeCost" label="④办公室"></el-table-column>
            <el-table-column
              min-width="90"
              align="center"
              v-for="item in cost"
              :key="item.id"
              :prop="item.key"
              :label="item.label"
            >
              <template slot-scope="scope">{{ scope.row[item.key] }}</template>
            </el-table-column>

            <el-table-column width="60" align="center" prop="taxes" label="税金"></el-table-column>
          </el-table-column>

          <el-table-column
            min-width="78"
            align="center"
            v-for="item in defaultFormHead"
            :key="item.id"
            :prop="item.key"
            :label="item.label"
          >
            <template slot-scope="scope">{{ scope.row[item.key] }}</template>
          </el-table-column>
          
        </el-table>
      </div>
      <div class="upload">
        <!-- <span>上传附件</span> -->
        <el-form>
          <el-form-item label="附件下载：">
           <a class='fileTab' target="_blank" :href="file.attUrl" v-for="file in attachments" :key='file.id'>{{file.attViewName}}&ensp;&ensp;</a>
          </el-form-item> 
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {Hzproperty} from  '@/api/property/property';
export default {
  
  data() {
    return {
      title: "",
      options:'',
      project:'',
      areaName:'',
      projectCode:'',
      projectId:'',
      projectName:'',
      attachments:'',
      defaultFormHead: [
        { id: 4, key: "profitRate", label: "利润率" },
        { id: 5, key: "income", label: "总收入" },
        { id: 6, key: "chargeableArea", label: "可收费面积(m²)" },
        { id: 7, key: "unitPrice", label: "单价(元/月,m²)" }
      ],
      cost: [
        { id: 5, key: "communityCost", label: "⑤社区文化建设展" },
        { id: 6, key: "publicLiabilityCost", label: "⑥公众责任保险费" },
        { id: 7, key: "costSum", label: "前6项支出小计" }
      ],
      tableData: [],
      tableLoading:false,
      fd:new FormData(),
      dialogFormVisible: false,
    };
  },
  created(){
      this.getDefault();
  },
  methods: {
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #fafafa;color:#999; font-size:12px;";
      }
    },
    handleSelectionChange(val) {
      // console.log(val);
    },
    getDefault(){
        this.tableLoading = true;
        let id = this.$route.query.id
        // console.log(this.$route.query.id)
        Hzproperty(id).then(res=>{
            // console.log(res.data.data)
            this.tableData = res.data.data.hzPropertyDetailList;
            this.title = res.data.data.title;
            this.projectName = res.data.data.projectName;
            this.areaName = res.data.data.areaName;
            this.attachments = res.data.data.attachments;
            this.tableLoading = false;
        })
    },
  }
};
</script>

<style lang='scss' scoped>
.add {
  height: 100%;
  padding: 10px;
  padding-top: 10px;
  background-color: #edf2f5;
  overflow-y: scroll;
  .bgcolor {
    background: #fff;
    padding: 10px 15px;
    margin-top: 15px;
    // height:400px;
    .tableList {
      background: #fff;
      width: 100%;
      height: 280px;
    }
    .upload {
      width: 100%;
      height: auto;
      margin-top: 20px;
      background: #fff;
    }
  }
  .el-form-item--small .el-form-item__content,
  .el-form-item--small .el-form-item__label {
    color: #000 !important;
  }

  hr {
    width: 70%;
    color: #fcfcfc;
    margin-bottom: 20px;
  }
  .title {
    padding-left:5px;
    height: 40px;
    background: #fff;
    margin-bottom: 10px;
    font-size: 18px;
    color: #2b8ae6;
    font-weight: 600;
    line-height: 40px;
  }
  .title2 {
    height: 32px;
    background: #fff;
    color: #2b8ae6;
    font-weight: 600;
    margin-top: 20px;
    span {
      display: inline-block;
      width: 5px;
      height: 14px;
      background: #2b8ae6;
      vertical-align: middle;
      margin-right: 5px;
    }
    button {
      cursor: pointer;
      float: right;
      margin-right: 200px;
      width: 60px;
      height: 28px;
      background: #fff;
      border: 1px solid #2b8ae6;
      color: #2b8ae6;
      line-height: 28px;
      text-align: center;
      border-radius: 2px;
    }
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
  .fileTab{
    font-weight: 500;
  }
}
</style>