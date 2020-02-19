<template>
<div class="app-container calendar-list-container">

   <div class="selectIt" style="padding-bottom:15px;">
    <el-form label-width="70px">
        <el-row :gutter="24">
            <el-col :span="8">
                <el-form-item label="维保标题">
                    <el-input size="small" clearable v-model="topic" placeholder="请输入标题"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="周期">
                   <el-select size="small"  clearable v-model="period" placeholder="请选择">
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
                <el-form-item label="维保模块">
                    <el-select size="small" clearable v-model="cmodul" placeholder="请选择"
                    @change="selectModul">
                        <el-option
                        v-for="item in cmodulArr"
                        :key="item.modules"
                        :label="item.modules"
                        :value="item.modules">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
         <el-row :gutter="24">
              <el-col :span="8">
                <el-form-item label="维保大类">
                    <el-select size="small" clearable v-model="bclass" placeholder="请选择"
                    @change="selectBclass">
                        <el-option
                        v-for="item in bclassArr"
                        :key="item.bclass"
                        :label="item.bclass"
                        :value="item.bclass">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
                <el-form-item label="维保小类">
                    <el-select size="small" clearable v-model="status" placeholder="请选择">
                        <el-option
                        v-for="item in statusArr"
                        :key="item.sclass"
                        :label="item.sclass"
                        :value="item.sclass">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col> -->
            <el-col :span="8">
                <el-form-item label="维保年份">
                    <el-select size="small" clearable v-model="protectYear" placeholder="请选择">
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
                    <el-select size="small" clearable v-model="publishStatus" placeholder="请选择">
                        <el-option
                        v-for="item in publishStatusArr"
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
        </el-row>
    </el-form>
   </div>
<!-- 操作 驳回 导出 -->
   <el-row >
      <el-button size="small" type="primary" @click="handleWrite">新增</el-button>
      <el-button size="small" type="primary" @click="handleUpdate">修改</el-button>
      <el-button size="small" type="primary" @click="handleDelete">删除</el-button>
      <el-button size="small" type="primary" @click="handleExport">导出</el-button>
      <el-button size="small" type="primary" @click="handlePublish">发布</el-button>
    </el-row>
<!-- 表格部分 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      height="calc(100% - 240px)"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      :index="methodIndex"
    >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
         <el-table-column fixed prop="title" label="标题" width="150" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column fixed prop="project" label="项目名称" width="150" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="projectTimes" label="项目分期" width="120" align="center"></el-table-column>
        <el-table-column prop="place" label="位置" width="120" align="center"></el-table-column>
        <el-table-column prop="placeDescribe" label="位置描述" width="120" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="years" label="年份" width="120" align="center"></el-table-column>
        <el-table-column prop="frequency" label="周期" width="120" align="center"></el-table-column>
        <el-table-column prop="cmodul" label="维保模块" width="120" align="center"></el-table-column>
        <el-table-column prop="bclass" label="维保大类" width="120" align="center"></el-table-column>
        <el-table-column prop="supplierName" label="责任方名称" width="120" align="center"></el-table-column>
        <el-table-column prop="publishFlag" label="发布状态" width="120" align="center">
            <template slot-scope="scope">
                {{scope.row.publishFlag | statusFilter}}
              </template>
        </el-table-column>
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
import {getList,getAllData,publish,getCmodul,getBclass, getSclass } from "@/api/maintenaceCenter/planManage.js"
import { deleteArr } from '../../../api/maintenaceCenter/planManage';
export default {
    data(){
        return{
            topic:"",//维保标题
            period:"",//周期
            periodArr:[
                { //状态
                value: '年度',
                label: '年度'
                },
                { //状态
                value: '季度',
                label: '季度'
                },
                { //状态
                value: '月',
                label: '月'
                },
                { //状态
                value: '周',
                label: '周'
                },
                
            ],
            cmodul:'',
            cmodulArr:[],//维保模块
            bclassArr:[],//维保大类
            bclass:'',
            //维保小类
            statusArr: [ ],
            status:'',//维保小类
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
                {value:"0",label:"未发布"},{value:"1",label:"已发布"}
            ],
            loading:true,//表格转圈的
            tableData:[],
            page:1,
            limit:10,
            total:null,
            multipleSelection:[],
            tableAllData:[],
            checkboxName:[
                "序号","标题","项目名称","项目分期","位置","位置描述","年份","周期","模块","维保大类",
                "责任方名称","发布状态"
            ],
            checkboxVal:[
                "id","title","project","projectTimes","place","placeDescribe","years","frequency","cmodul","bclass","supplierName","publishFlag"
            ]
        }
    },
    methods:{
        handleSelectionChange(value) {
            this.multipleSelection = value;
            console.log(this.multipleSelection,"多选")
        },
        //分页
        sizeChange(val){
            this.limit = val; 
            this.getLists() 
        },
        currentChange(val){
            this.page = val;
            this.getLists()
        },
        //增加
        handleWrite(){
                this.$router.push({
                    path: "/protectCenter/planmanage/add",
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
        },
        //查询
        getLists(){
            var data={
                page:this.page,
                limit:this.limit,
                title: this.topic,//项目名称
                frequency:this.period,//分期
                years:this.protectYear,//年份
                publishFlag:this.publishStatus,//发布状态
                cmodul:this.cmodul,
                bclass:this.bclass,
                sclass:this.status//维保类型
            }
            getList(data).then(res=>{
                this.loading = false
                console.log(res,"工单查询列表")
                this.total = res.data.total;
                this.tableData = res.data.records;
            })
        },
        //删除
        handleDelete(){
            if(this.multipleSelection.length==0){
                this.$message({
                    type:"warning",
                    message:"请至少选择一条数据"
                })
            }else{
                var deleteTip = false
                for(var i = 0;i<this.multipleSelection.length;i++){
                    if(this.multipleSelection[i].publishFlag==1){
                        this.$message({
                            type:"warning",
                            message:"已发布的不能够删除"
                        })
                        deleteTip=true
                        break
                    }
                }
                if(deleteTip==false){
                    var id = []
                    for(var j=0;j<this.multipleSelection.length;j++){
                        id.push(this.multipleSelection[j].id)
                    }
                    console.log(id,"iddddd")
                    this.deleteArrs(id)
                    // this.$message({
                    //     type:"success",
                    //     message:"删除成功"
                    // })
                }
            }
            
        },
        deleteArrs(id){
            var data = {
                ids:id
            }
            deleteArr(data).then(res=>{
                console.log(res,"删除的")
                if(res.data.code==0){
                    this.$message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.getLists()
                }
            })
        },
        //导出时查询全部的数据
        getAllList(){
            var that = this
            return new Promise((resolve, reject) => {
            var obj = {
              title: this.topic,//项目名称
              frequency:this.period,//分期
              years:this.protectYear,//年份
              publishFlag:this.publishStatus,//发布状态
              cmodul:this.cmodul,
              bclass:this.bclass,
                sclass:this.status//维保状态
              
            };
            getAllData(obj).then(res => {
                console.log(res,"全部数据")
                that.tableAllData = res.data;
                console.log(that.tableAllData,"全部数据")
                for(var i = 0;i<that.tableAllData.length;i++){
                    if(that.tableAllData[i].publishFlag==0){
                        that.tableAllData[i].publish = "未发布"
                    }else if(that.tableAllData[i].publishFlag==1){
                        that.tableAllData[i].publish = "已发布"
                    }
                }
                resolve();
            });
        });
        },
        handleExport(){
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
                //console.log(tHeader,"theader");
                //console.log(filterVal,"filterval");
                //console.log(this.tableAllData, "SSS");
                // 默认导出是全部导出  然后选择哪条导出哪条
                let _this = this;
                // debugger;

               // console.log(data,"datadata");
               // console.log(excel.export_json_to_excel,"zheshishenm");
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "维保计划导出"
                });
                    loading.close();
                });
            })
            //this.getAllList()
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
        //修改
        handleUpdate(){
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

                var id = null;
                var projectName = null;
                var projectTimes = null;
                for(var i=0;i<this.multipleSelection.length;i++){
                    if(this.multipleSelection[i].publishFlag==1){
                        this.$message({
                            message: '已完成的数据不可进行操作',
                            type: 'warning'
                        })
                    }else{
                        id = this.multipleSelection[i].id;
                        projectName = this.multipleSelection[i].project;
                        projectTimes = this.multipleSelection[i].projectTimes
                        this.$router.push({
                            path: "/protectCenter/planmanage/edit",
                            query: {
                                id: id,
                                projectName: projectName,
                                projectTimes:projectTimes
                            }
                        });
                     }
             
              }
            }
            //       this.$router.push({
            //     path: "/protectCenter/planmanage/edit",}) 
        },
        //重置
        reset(){
            this.topic = '';
            this.period = "";
            this.status =  '';
            this.protectYear = '';
            this. publishStatus = ""

        },
        
        //查询接口
        search(){
            var obj = {
                page:this.page,
                limit:this.limit,
                title: this.topic,//项目名称
                frequency:this.period,//分期
                years:this.protectYear,//年份
                publishFlag:this.publishStatus,//发布状态
                bclass:this.bclass,
                cmodul:this.cmodul,
                sclass:this.status//维保类型
            };
             getList(obj).then(res=>{
                this.loading = false
                console.log(res,"工单查询列表")
                // if(res.data.code==0){

                // }
                this.total = res.data.total;
                this.tableData = res.data.records;
            })
        },
        //发布
        handlePublish(){
           if(this.multipleSelection.length==0){
                this.$message({
                    message: '请先选择一条单据',
                    type: 'warning'
                })
            }else{
                var id = null;
                var projectName = null;
                var projectTimes = null;
                for(var i=0;i<this.multipleSelection.length;i++){
                    if(this.multipleSelection[i].publishFlag==1){
                        this.$message({
                            message: '已发布的数据不可进行操作',
                            type: 'warning'
                        })
                    }else{
                        var ids='';
                        for(let j = 0;j<this.multipleSelection.length;j++){
                            if(ids==''){
                                ids = this.multipleSelection[j].id;
                            }else{
                             ids = ids +"," +this.multipleSelection[j].id

                            }
                        }
                        //console.log(ids,"ids")
                        var idsStr = JSON.stringify(ids)
                        console.log(ids,"idsstr")
                        publish(ids).then(res=>{
                            console.log(res,"发布")
                            if(res.data.code==0){
                                this.$message({
                                    type:"success",
                                    message:"发布成功"
                                })
                                this.getLists()
                            }else{
                                this.$message({
                                    type:"warning",
                                    message:res.data.msg
                                });
                                this.getLists()
                            }
                        })
                    }
                    
                }
            }
        },
        getCmoduls(){
            var data = {
               
            }
            getCmodul(data).then(res=>{
                console.log(res,"查询维保模块")
                this.cmodulArr = res.data;
            })
        },
        //选完模块以后
        selectModul(val){
            console.log(val,"选完模块以后")
             var data = {
                modules:val
            }
            this.bclass = '';
            this.status = '';
            getBclass(data).then(res=>{
                console.log(res,"大类")
                //this.cmodulArr = res.data;
                this.bclassArr = res.data;
            })
        },
        //选完大类以后
        selectBclass(val){
            var data = {
                modules:this.cmodul,
                bclass:val
            }
            getSclass(data).then(res=>{
                console.log(res,"小类")
                //this.cmodulArr = res.data;
                this.statusArr = res.data;
            })
        }
    },
    mounted(){
        this.getLists();
        //this.getTypes();
        this.getCmoduls()
    },
    activated(){
        this.getLists();
        //this.getTypes();
         this.getCmoduls()
    },
     
    filters:{
        statusFilter(status){
            const statusDef = {
                0:'未发布',
                1:'已发布',
            }
            return statusDef[status]
        }
    },
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

