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
                <el-form-item label="周期">
                   <el-select size="small" v-model="period" placeholder="请选择">
                        <el-option
                        v-for="item in periodArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="维保类型">
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
                <el-form-item label="维保年份">
                    <el-select size="small" v-model="protectYear" placeholder="请选择">
                        <el-option
                        v-for="item in protectYearArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="发布状态">
                    <el-select size="small" v-model="publishStatus" placeholder="请选择">
                        <el-option
                        v-for="item in publishStatusArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
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
      <el-button size="small" type="primary" @click="handleWrite">新增</el-button>
      <el-button size="small" type="primary" >修改</el-button>
      <el-button size="small" type="primary" >删除</el-button>
      <el-button size="small" type="primary" >导出</el-button>
      <el-button size="small" type="primary" >发布</el-button>
    </el-row>
<!-- 表格部分 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      height="calc(100% - 180px)"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      :index="methodIndex"
    >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column fixed prop="topic" label="标题" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="fenqi" label="项目分期" width="120"></el-table-column>
        <el-table-column prop="position" label="位置" width="120"></el-table-column>
        <el-table-column prop="positionDesc" label="位置描述" width="120"></el-table-column>
        <el-table-column prop="year" label="年份" width="120"></el-table-column>
        <el-table-column prop="zhouqi" label="周期" width="120"></el-table-column>
        <el-table-column prop="type" label="维保类型" width="120"></el-table-column>
        <el-table-column prop="resbility" label="责任方" width="120"></el-table-column>
        <el-table-column prop="status" label="发布状态" width="120"></el-table-column>
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
export default {
    data(){
        return{
            topic:"",//维保标题
            period:"",//周期
            periodArr:[
                { //状态
                value: 'year',
                label: '年度'
                },
                { //状态
                value: 'jidu',
                label: '季度'
                },
                { //状态
                value: 'month',
                label: '月'
                },
                { //状态
                value: 'week',
                label: '周'
                },
                { //状态
                value: 'day',
                label: '日'
                }
            ],
            //维保类型
            statusArr: [ {value:"all",label:"全部"},{value:"延期已修改",label:"延期已修改"}],
            status:'',//维保类型
            protectYear:'',//维保年份
            protectYearArr:[
                { 
                value: '2018',
                label: '2018'
                },{value:"2019",label:"2019"},{value:"2020",label:"2020"},{value:"2021",label:"2021"},{value:"2022",label:"2022"},{value:"2023",label:"2023"},{value:"2024",label:"2024"},{value:"2025",label:"2025"},{value:"2026",label:"2026"},{value:"2027",label:"2027"},{value:"2028",label:"2028"},{value:"2029",label:"2029"},{value:"2030",label:"2030"},{value:"2031",label:"2031"},{value:"2032",label:"2032"},{value:"2033",label:"2033"},{
                    value:"2034",label:"2034"
                },{value:"2035",label:"2035"},{value:"2036",label:"2036"},{value:"2037",label:"2037"},{value:"2038",label:"2038"}
            ],
            publishStatus:"",
            publishStatusArr:[
                {value:"all",label:"全部"},{value:"延期已修改",label:"延期已修改"}
            ],
            loading:false,//表格转圈的
            tableData:[{
                topic:"山海湾电梯年度维修计划",fenqi:"山海湾一期",position:"位置",positionDesc:"电梯坏了",year:"2019",zhouqi:"季度",type:"电梯维保",resbility:"三菱",endtime:"2019-12-3",
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
            
                this.$router.push({
                    path: "/maintenanceCenter/planManage/add",
                    // query: {
                    // id: id,
                    // projectUuid: projectUuid,
                    // procId: procId,
                    // state: state
                    // }
                });
        },
        //序号
        methodIndex(index){
            return index;
        }
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

</style>

