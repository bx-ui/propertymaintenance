<template>
<div class="app-container calendar-list-container">

   <div class="selectIt" style="padding-bottom:15px;">
    <el-form label-width="70px">
        <el-row :gutter="24">
            <el-col :span="8">
                <el-form-item label="项目名称">
                   <el-select size="small" clearable v-model="project" placeholder="请选择"
                   @change="selectProject">
                        <el-option
                        v-for="item in projectArr"
                        :key="item.project"
                        :label="item.project"
                        :value="item.projectCode">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="项目分期">
                   <el-select size="small" clearable v-model="selectProjectTimes" placeholder="请选择" :disabled="!this.project">
                        <el-option
                        v-for="item in selectProjectTimesArr"
                        :key="item.project"
                        :label="item.project"
                        :value="item.projectCode">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="维保标题">
                    <el-input size="small" clearable v-model="topic" placeholder="请输入标题"></el-input>
                </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
                <el-form-item label="责任方">
                    <el-select size="small" clearable v-model="people" placeholder="请选择">
                        <el-option
                        v-for="item in peopleArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col> -->
           <!-- <el-col :span="8">
                <el-form-item label="状态">
                    <el-select size="small" clearable v-model="status" placeholder="请选择">
                        <el-option
                        v-for="item in statusArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col> -->
        </el-row>
        <el-row :gutter="24">
            <el-col :span="8">
                <el-form-item label="责任方">
                    <!-- <el-select  placeholder="请选择">
                        <el-option
                        v-for="item in peopleArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> -->
                    <el-input size="small" clearable v-model="people" placeholder="请输入责任方">

                    </el-input>
                </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="状态">
                    <el-select size="small" clearable v-model="status" placeholder="请选择">
                        <el-option
                        v-for="item in statusArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                    <el-form-item label="开始时间" >
                    <div  id="time">
                    <el-date-picker
                    size="small"
                    v-model="endTime"
                    type="daterange"
                    range-separator="——"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                    </div>
                </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
                 <el-form-item label="月份" >
               <el-select size="small" clearable v-model="month" placeholder="请选择">
                        <el-option
                        v-for="item in monthArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                 </el-form-item>
            </el-col> -->
             <!-- <el-col :span="8">
                <el-col :span="6">
                <el-form-item label-width="0px">
                    <el-button size="small" type="primary" @click="search">查询</el-button>
                </el-form-item>
                </el-col>
                <el-col :span="6">
                <el-form-item label-width="0px">
                    <el-button size="small" type="primary" @click="reset">重置</el-button>
                </el-form-item>
                </el-col>
            </el-col> -->
        </el-row>
        <el-row :gutter="24">
            <el-col :span="8">
                 <el-form-item label="月份" >
               <el-select size="small" clearable v-model="month" placeholder="请选择">
                        <el-option
                        v-for="item in monthArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                 </el-form-item>
            </el-col>
            <el-col :span="8">
                 <el-form-item label="是否超期" >
               <el-select size="small" clearable v-model="timeMore" placeholder="请选择">
                        <el-option
                        v-for="item in orderStatusArr"
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
                    <el-button size="small" type="primary" @click="search">查询</el-button>
                </el-form-item>
                </el-col>
                <el-col :span="6">
                <el-form-item label-width="0px">
                    <el-button size="small" type="primary" @click="reset">重置</el-button>
                </el-form-item>
                </el-col>
            </el-col>
            <!-- <el-col :span="8">
            </el-col> -->
            
        </el-row>
    </el-form>
   </div>
<!-- 操作 驳回 导出 -->
   <el-row >
      <el-button size="small" type="primary" @click="handleWrite">操作</el-button>
      <!-- <el-button size="small" type="primary" >驳回</el-button> -->
      <el-button size="small" type="primary" @click="exportLists">导出</el-button>
    </el-row>
<!-- 表格部分 -->
<!-- 原来是190加上以后是240 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      height="calc(100% - 240px)"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column fixed prop="orderNumber" label="工单编号" width="150" align="center"></el-table-column>
        <el-table-column prop="confirmFlag" label="状态" width="120" show-overflow-tooltip align="center">
           <template slot-scope="scope">
                {{scope.row.confirmFlag | statusFilter}}
              </template>
        </el-table-column>
        <el-table-column prop="project" label="项目名称" width="120" align="center"></el-table-column>
        <el-table-column prop="projectTimes" label="项目分期" width="120" align="center"></el-table-column>
        <el-table-column prop="place" label="维保项" width="120" align="center"></el-table-column>
        <!-- <el-table-column prop="placeDescribe" label="位置描述" width="120" align="center" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="buildNum" label="维保位置" width="120" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="elevNum" label="维保编号" width="120" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="year" label="年份" width="120" align="center"></el-table-column>
        <el-table-column prop="month" label="月份" width="120" align="center"></el-table-column>
        <el-table-column prop="cycle" label="周期" width="120" align="center"></el-table-column>
        <el-table-column prop="cmodul" label="维保模块" width="120" align="center"></el-table-column>
        <el-table-column prop="bclass" label="维保大类" width="120" align="center">
            <template slot-scope="scope">
                <el-button @click="handleSee(scope.row)" type="text" size="small">{{scope.row.bclass}}</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="responsibleParty" label="责任方" width="120" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="planndeEndTime" label="计划结束" width="120" show-overflow-tooltip align="center">
            <template slot-scope="scope">
                {{toSwitch(scope.row.planndeEndTime)}}
            </template>
        </el-table-column>
        <el-table-column prop="actualEndTime" label="实际结束" width="120" show-overflow-tooltip align="center">
            <template slot-scope="scope">
                {{toSwitch(scope.row.actualEndTime)}}
            </template>
        </el-table-column>
        <el-table-column prop="closeTime" label="复审时间" width="120" show-overflow-tooltip align="center">
            <template slot-scope="scope">
                {{toSwitch(scope.row.closeTime)}}
            </template>
        </el-table-column>
        <el-table-column prop="orderStatus" label="是否超期" width="120" show-overflow-tooltip align="center">
            <template slot-scope="scope">
                {{scope.row.orderStatus | statusFilterOrder}}
            </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="50">
            <template slot-scope="scope">
                <el-button @click="seeItem(scope.row)" type="text" size="small">查看</el-button>
            </template>
        </el-table-column>
         <!-- <el-table-column
            fixed="right"
            label="维保清单"
            width="80">
            <template slot-scope="scope">
                <el-button @click="has(scope.row)" type="text" size="small">查看</el-button>
            </template>
            </el-table-column> -->
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
    <!-- 维保小类部分 -->
    <el-dialog
        title="维保清单"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
         <div class="digo-box" v-loading="loadings">
                  <div   v-for="(item,index) in bclassArr" :key="index">
                 <span>{{index+1}}:</span>
                 <span>{{item.sclass}}</span>
                </div>
         </div>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button size="small" @click="hasCancel">取 消</el-button> -->
            <el-button size="small" type="primary" @click="hasConfirm">确 定</el-button>
        </span>
    </el-dialog>

</div>

</template>
<script>
import {getList, exportList,getProjectName,getProject,getSclass } from "@/api/maintenaceCenter/orderManage.js";
 import config from "../../../config/config.js";
 import {getProjectTimes} from "@/api/maintenaceCenter/oneorder.js"
 import { mixinText } from "@/mixins/moreStorage.js";
export default {
    mixins: [mixinText],
    data(){
        return{
            selectProjectDis:true,
            selectProjectTimes:'',
            selectProjectTimesArr:[],
            timeMore:'',
            orderStatusArr:[{
                label:"是",value:"是"
            },{
                label:"否",value:"否"
            }],
            project:'',
            bclassArr:[],
            loadings:true,
            projectArr:[],
            topic:"",//维保标题
            responsible:"",//责任方
            statusArr: [{ //状态
                value: '1',
                label: '未闭单'
                }, {
                value: '2',
                label: '已闭单未评价'
                }, {
                value: '3',
                label: '已评价'
                }],
           peopleArr: [],
                people:'',
            status:'2',//状态
            beginTime:'',//开始时间
            endTime:[],//结束时间
            tableData:[],
            page:1,
            limit:10,
            total:null,
            multipleSelection:[],
            loading:true,
            checkboxName:[
                "工单编号","项目名称","项目分期","维保项","维保位置","维保编号","年份","月份","周期","维保模块","维保大类","责任方","计划结束","实际结束","复审时间","状态"
            ],
            checkboxVal:[
                "orderNumber","project","projectTimes","place","buildNum","elevNum","year","month","cycle","cmodul","bclass","responsibleParty","planndeEndTime","actualEndTime","recheckTime","orderStatus"
            ],
            tableAllData:[],
            month:'',
            monthArr:[{label:"一月",value:"01"},{label:"二月",value:"02"},{label:"三月",value:"03"},{label:"四月",value:"04"},{label:"五月",value:"05"},{label:"六月",value:"06"},{label:"七月",value:"07"},{label:"八月",value:"08"},{label:"九月",value:"09"},{label:"十月",value:"10"},{label:"十一月",value:"11"},{label:"十二月",value:"12"}],
            dialogVisible:false

        }
    },
    methods:{
        toSwitch(str){
            if(str!=null){
                var strSwitch = str.trim().split(" ")
                return strSwitch[0]
            }else{
                return str
            }
        },
        handleSelectionChange(value) {
            this.multipleSelection = value;
            console.log(this.multipleSelection,"多选")
        },
        //分页
        sizeChange(val){
            console.log(val,"fenye")
            this.limit = val;  
            this.getData()
        },
        currentChange(val){
            console.log("当前页面",val)
            this.page = val;
            this.getData()
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

                var id = null
                for(var i=0;i<this.multipleSelection.length;i++){
                    console.log
                    if(this.multipleSelection[i].confirmFlag=="2"||(this.multipleSelection[i].orderStatus=="超期未完成"&&this.multipleSelection[i].confirmFlag=="1")){
                       id = this.multipleSelection[i].id
                        this.$router.push({
                            path: "/protectCenter/ordermanage/handle",
                            query: {
                                id: id,
                                type:"操作"
                            }
                        });
                    }else if(this.multipleSelection[i].confirmFlag=="1"&&this.multipleSelection[i].orderStatus!="超期未完成"){
                         this.$message({
                            type:"warning",
                            message:"未闭单的不能进行操作"
                        })
                        
                    }else if(this.multipleSelection[i].orderStatus=="已完成"){
                         this.$message({
                            type:"warning",
                            message:"已完成的不能进行操作"
                        })
                        
                    }else if(this.multipleSelection[i].confirmFlag=="3"){
                         this.$message({
                            type:"warning",
                            message:"已评价的不能进行操作"
                        })
                        
                    }
                     
                }
             
            }
        },
        getData(){
            console.log(this.status,"11111");
            var data = {
                currentPage:this.page,
                pageSize:this.limit,
                title :this.topic,
                responsibleParty:this.people,
                confirmFlag:this.status,
                startTime: this.endTime ? this.endTime[0] : "",
                endTime : this.endTime ? this.endTime[1] : "",
                year :this.year,
                month:this.month,
                projectCode:this.project,
                flag :1,
                projectTimesCode:this.selectProjectTimes,
            }
            getList(data).then(res=>{
                console.log(res,"工单计划")
                this.loading = false;
                if(res.data.code==0){
                    this.total=res.data.total
                    this.tableData = res.data.data
                }else{
                    this.$message("查询失败")
                }
            })
        },
        //导出
        exportLists(){
            
            var loading = this.$loading({lock: true,text: '导出中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
            // exportList(data).then(res=>{
                
            // })
            this.getAllList().then(res => {
            import("@/vendor/Export2Excel").then(excel => {
                        //获取当前选中的动态列
                const tHeader = this.checkboxName;
                const filterVal = this.checkboxVal;
                //console.log(this.tableAllData,"6666666")
                const data = this.multipleSelection.length == 0 ? this.formatJson(filterVal, this.tableAllData) : this.formatJson(filterVal, this.multipleSelection)
                //console.log(tHeader,"6666");
               // console.log(filterVal,"6666");
                // 默认导出是全部导出  然后选择哪条导出哪条
                let _this = this;
               // console.log(excel);
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "维修工单"
                });
                loading.close();
            });
            })
        },
        
        //获取全部的数据
        getAllList(){
            var that = this
            return new Promise((resolve, reject) => {
            var obj = {
                currentPage:this.page,
                pageSize:this.limit,
                title :this.topic,
                responsibleParty:"",
                // orderStatus:'',
                confirmFlag:'',
                startTime:'',
                endTime :"",
                month:'',
                projectCode:'',
                flag :2
            };
            getList(obj).then(res => {
                console.log(res,"全部数据")
                that.tableAllData = res.data.data;
                console.log(that.tableAllData,"全部数据")
                resolve();
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
        //查询
        search(){
            var data = {
                currentPage:this.page,
                pageSize:this.limit,
                title :this.topic,
                responsibleParty:this.people,
                orderStatus:this.timeMore,
                confirmFlag:this.status,
                startTime:this.endTime ? this.endTime[0] : "",
                endTime :this.endTime ? this.endTime[1] : "",
                year :this.year,
                month:this.month,
                
                projectCode:this.project,
                projectTimesCode:this.selectProjectTimes,
                flag :1
            }
            getList(data).then(res=>{
                console.log(res,"工单计划")
                this.loading = false;
                if(res.data.code==0){
                    this.total=res.data.total
                    this.tableData = res.data.data
                }else{
                    this.$message("查询失败")
                }
            })
            // 存储
            var obj = {
                project: this.project,
                selectProjectTimes: this.selectProjectTimes,
                topic: this.topic,
                people: this.people,
                status: this.status,
                endTime: this.endTime,
                month: this.month,
                timeMore: this.timeMore,
            }
            this.setStore("维保工单评价", obj);
        },
        //重置
        reset(){
            this.project = "";
            this.topic="";
            this.status="";
            this.people='';
            this.endTime=[];
            this.selectProjectTimes = '';
            this.timeMore = "";
           // this.project='';
           localStorage.removeItem("维保工单评价");
        },
        //获取责任方
        getProjectNames(){
            var data = {}
            getProjectName(data).then(res=>{
                console.log(res,"责任方")
            })
        },
        getProjects(){
            return new Promise((resolve,reject) => {
                var data = {}
                getProject(data).then(res=>{
                    console.log(res,"项目")
                    this.projectArr = res.data
                })
                resolve();
            })
        },
        handleSee(item){
            this.dialogVisible = true;
            console.log(item,"查看")
            var data = {
                cmodul:item.cmodul,
                bclass:item.bclass
            }
            getSclass(data).then(res=>{
                console.log(res,"小类")
                this.loadings = false
                if(res.data.code==0){
                    this.bclassArr = res.data.data;
                }else{

                }
            })
        },
        handleSeeCancel(){
            this.bclassArr = [];
            this.dialogVisible = false;
            this.loadings = true
        },
        handleSeeConfirm(){
            this.bclassArr = [];
            this.dialogVisible = false;
             this.loadings = true
        },
        handleClose(){
            this.dialogVisible = false;
            this.bclassArr = [];
             this.loadings = true
        },
        seeItem(item){
            //console.log(item,"item")
            this.$router.push({
                path:"/protectCenter/ordermanage/handle",
                query:{
                    confirmFlag:item.confirmFlag,
                    id:item.id,
                    type:"查看"
                }
            })
        },
        hasConfirm(){
            this.dialogVisible = false;
            this.bclassArr = [];
             this.loadings = true
        },
        getS(){
            // this.getData();
            var mixinData = this.getStore("维保工单评价");
            if(mixinData){
                var {
                    project,
                    selectProjectTimes,
                    topic,
                    people,
                    status,
                    endTime,
                    month,
                    timeMore
                } = mixinData;
            }
            this.getProjects().then(res => {
                this.selectProject(this.project);
                this.project = project;
                this.selectProjectTimes = selectProjectTimes;
                this.topic = topic;
                this.people = people;
                this.status = !!status ? status : '2';
                this.endTime = endTime;
                this.month = month;
                this.timeMore = timeMore;
                this.getData();
            })
        },
        selectProject(val){
            //if(this.firstChange == false){
               // this.firstChange = true;
                this.selectProjectDis = false;
                this.selectProjectTimes = "";
                //this.placeDisable = false;
                console.log(val,"选择的项目")
                var data = {
                    projectCode:val
                };
                // this.form.position='';
                // this.form.like='';
                // this.form.fenqi=''
                this.period = '';
                this.place = ''
                getProjectTimes(data).then(res=>{
                    console.log(res,"项目带出来的");
                    this.selectProjectTimesArr = res.data;
                    //this.positionArr = res.data;
                    //this.projectNameArr=res.data
                })
            //}
           
        }
    },
    mounted(){
        this.getS();
    },
    activated(){
        this.getS();
    },
    computed:{
        tableList(){
            return config.hzpropertyrepair.hzTableList;
        },
        // 导出数据逻辑
        // checkboxName(){
        //     return config.hzpropertyrepair.hzTableList.map(v => v.label);
        // },
        // checkboxVal(){
        //     return config.hzpropertyrepair.hzTableList.map(v => v.prop);
        // }
    },
     filters:{
        statusFilter(status){
            const statusDef = {
                1:"已确定未闭单",
                2:"已闭单未评价",
                3:"已评价"
            }
            return statusDef[status]
        },
         statusFilterOrder(status){
            const statusDef = {
                "已完成":"否",
                "未完成":"否",
                "超期未完成":"是",
                "超期已完成":"是"
               
            }
            return statusDef[status]
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.getS();
        });
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
#time >>> .el-date-editor .el-range-separator{
    padding:0px
}
 .digo-box{
     min-height: 100px;
        max-height:290px;
        overflow: auto;
    }

</style>

