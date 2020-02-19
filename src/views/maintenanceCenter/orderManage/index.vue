<template>
<div class="app-container calendar-list-container">

   <div class="selectIt" style="padding-bottom:15px;">
    <el-form label-width="70px">
        <el-row :gutter="24">
            <el-col :span="8">
                <el-form-item label="维保标题">
                    <el-input size="small" v-model="topic" placeholder="请输入标题"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="责任方">
                    <el-input size="small" v-model=" responsible" placeholder="责任方"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="状态">
                    <el-select size="small" v-model="status" placeholder="请选择">
                        <el-option
                        v-for="item in statusArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="8">
                <el-form-item label="开始时间" >
                     <el-date-picker
                     size="small"
                    v-model="endTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
                <el-form-item label="结束时间">
                    <el-date-picker
                        size="small"
                        v-model="endTime"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-col> -->
            <el-col :span="8">
                <el-col :span="6">
                <el-form-item label-width="0px">
                    <el-button size="small" type="primary">查询</el-button>
                </el-form-item>
                </el-col>
                <el-col :span="6">
                <el-form-item label-width="0px">
                    <el-button size="small" type="primary">重置</el-button>
                </el-form-item>
                </el-col>
            </el-col>
        </el-row>
    </el-form>
   </div>
<!-- 操作 驳回 导出 -->
   <el-row >
      <el-button size="small" type="primary" @click="handleWrite">操作</el-button>
      <el-button size="small" type="primary" >驳回</el-button>
      <el-button size="small" type="primary" >导出</el-button>
    </el-row>
<!-- 表格部分 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      height="calc(100% - 180px)"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column fixed prop="code" label="工单编号" width="150"></el-table-column>
        <el-table-column prop="fenqi" label="项目分期" width="120"></el-table-column>
        <el-table-column prop="position" label="位置" width="120"></el-table-column>
        <el-table-column prop="positionDesc" label="位置描述" width="120"></el-table-column>
        <el-table-column prop="year" label="年份" width="120"></el-table-column>
        <el-table-column prop="zhouqi" label="周期" width="120"></el-table-column>
        <el-table-column prop="type" label="维保类型" width="120"></el-table-column>
        <el-table-column prop="resbility" label="责任方" width="120"></el-table-column>
        <el-table-column prop="endtime" label="计划结束" width="120"></el-table-column>
        <el-table-column prop="starttimeEnd" label="实际结束" width="120"></el-table-column>
        <el-table-column prop="fushen" label="复审时间" width="120"></el-table-column>
        <el-table-column prop="status" label="状态" width="120"></el-table-column>
    </el-table>

     <!-- 分页器 -->
    <el-row style="text-align:center;margin-top:15px">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="page"
        :page-sizes="[10,20,30,50]"
        :page-size="limit"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-row>
</div>

</template>
<script>
import {getList} from "@/api/maintenaceCenter/orderManage.js"
export default {
    data(){
        return{
            topic:"",//维保标题
            responsible:"",//责任方
            statusArr: [{ //状态
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            status:'',//状态
            beginTime:'',//开始时间
            endTime:'',//结束时间
            loading:false,//表格转圈的
            tableData:[{
                code:"123456789",fenqi:"山海湾一期",position:"位置",positionDesc:"电梯坏了",year:"2019",zhouqi:"季度",type:"电梯维保",resbility:"三菱",endtime:"2019-12-3",
                starttime:"2019-4-3",starttimeEnd:"2019-4-5",fushen:"2019-4-10",status:"到期已执行"
            }],
            page:1,
            limit:10,
            total:100,
            multipleSelection:[]
        }
    },
    methods:{
        handleSelectionChange(value) {
            this.multipleSelection = value;
            console.log(this.multipleSelection,"多选")
        },
        //分页
        sizeChange(val){
            this.page = val;  
        },
        currentChange(val){
            this.limit = val;
        },
        //操作
        handleWrite(){
            if(this.multipleSelection.length==0){
                this.$message({
                    message: '请先选择一条单据',
                    type: 'warning'
                })
            }else if(this.multipleSelection.length>1){
                this.$message({
                    message: '只能选择一条单据进行操作',
                    type: 'warning'
                })
            }else{
                this.$router.push({
                    path: "/maintenanceCenter/orderManage/handle",
                    // query: {
                    // id: id,
                    // projectUuid: projectUuid,
                    // procId: procId,
                    // state: state
                    // }
                });
            }
        },
        getData(){
            var data = {
                currentPage:1,
                pageSize:10,
                title :"",
                responsibleParty:"",
                orderStatus:'',
                startTime:'',
                endTime :"",
                year :''
            }
            getList(data).then(res=>{
                console.log(res,"工单计划")
            })
        }
    },
    mounted(){
        this.multipleSelection = [];
        this.getData()
    }
}
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
.app-container {
  height: 100%;
}
.el-date-editor .el-range-separator{
    width:7%!important;
}

</style>

