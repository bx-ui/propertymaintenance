<template>
    <div class="app-container calendar-list-container">
        <div class="selectIt" style="padding-bottom:15px;">
             <el-form label-width="70px">
                 <el-row :gutter="24">
                    <el-col :span="8">
                        <el-form-item label="项目名称">
                            <el-select size="small" clearable v-model="project" placeholder="请选择项目名称"
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
                            <el-select size="small" clearable v-model="period" placeholder="请选择" :disabled="periodDisable ">
                                <el-option
                                v-for="item in periodArr"
                                :key="item.project"
                                :label="item.project"
                                :value="item.projectCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="维保项">
                            <el-select size="small" :disabled="placeDisable" clearable v-model="place" placeholder="请选择">
                                <el-option
                                v-for="item in placeArr"
                                :key="item.place"
                                :label="item.place"
                                :value="item.placeCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                     <el-row :gutter="24">
                    <el-col :span="8">
                            <el-form-item label="起止时间" >
                                <div  id="time">
                                <el-date-picker
                                size="small"
                                v-model="time"
                                type="daterange"
                                range-separator="——"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                                </div>
                            </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="维保单位" >
                            <el-input
                            size="small"
                            placeholder="请输入维保单位"
                            v-model="danwei"
                            clearable>
                            </el-input>
                        </el-form-item >
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
                </el-row>
             </el-form>
        </div>

        <!-- 导出 -->
        <el-row >
            <el-button size="small" type="primary" @click="exportList">导出</el-button>
        </el-row>
        <!-- 表格 -->
        <el-table
            :data="tableData"
            border
            style="width: 100%"
            height="calc(100% - 180px)"
            @selection-change="handleSelectionChange"
            v-loading="loading"
        >
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column prop="project" label="项目名称" width="120" align="center"></el-table-column>
            <el-table-column prop="projectTimes" label="项目分期" width="120" align="center"></el-table-column>
            <el-table-column prop="place" label="维保项" width="120" align="center"></el-table-column>
            <el-table-column prop="buildNum" label="维保位置" width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="elevNum" label="维保编号" width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="responsibleParty" label="维保单位" width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="resPerson" label="维保责任人" width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cmodul" label="维保模块" width="120" align="center"></el-table-column>
            <el-table-column prop="bclass" label="维保大类" width="120" align="center"></el-table-column>
            <el-table-column prop="checkExplain" label="维保效果评价" width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="checkAmount" label="扣款金额" width="120" align="center"></el-table-column>
            <el-table-column prop="amount" label="扣款总额" width="120" align="center"></el-table-column>
        </el-table>
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
import {getList} from "@/api/maintenaceCenter/money.js"
import {getProjectName,addSubmit,getProjectTimes,getPlace} from "@/api/maintenaceCenter/planManage.js"
import { getPlaceDesc,getCmodul,getBclass,getSclass } from '../../../api/maintenaceCenter/planManage';
export default {
    data(){
        return{
            //维保单位
            danwei:'',
            project:'',
            projectArr:[],
            period:'',
            periodArr:[],
            place:'',
            placeArr:[],
            time:[],
            loading:true,
            tableData:[],
            multipleSelection:[],
            page:1,
            limit:10,
            total:null,
            tableAllData:[],
            checkboxName:[
                "项目名称","项目分期","维保项","维保位置","维保编码","维保单位","维保责任人","维保模块","维保大类","维保效果评价","扣款金额","扣款总额"
            ],
            checkboxVal:[
                "project","projectTimes","place","buildNum","elevNum","responsibleParty","resPerson","cmodul","bclass","checkExplain","checkAmount","amount"
            ],
            periodDisable :true,
            placeDisable : true,
        }
    },
    methods:{
        reset(){
            this.project = '';
            this.period = '';
            this.place = '';
            this.time = [];
            this.danwei = '';
        },
        //查询
        search(){
             var data ={
                currentPage:this.page,
                pageSize:this.limit,
                flag:1,
                // project:this.project,
                // projectTimes:this.period,
                // place:this.place,
                projectCode:this.project,
                projectTimesCode:this.period,
                placeCode:this.place,
                startTime:this.time[0],
                endTime:this.time[1],
                responsibleParty:this.danwei
            }
            console.log(data,"data")
            getList(data).then(res=>{
                console.log(res,"查询");
                this.loading = false;
                if(res.data.code==0){
                    this.total = res.data.total;
                    this.tableData = res.data.data;

                }
            })   
        },
        getAllList(){
            var that = this
            return new Promise((resolve, reject) => {
            var obj = {
                currentPage:this.page,
                pageSize:this.limit,
               // year:this.years,
               // month:this.month,
                flag:2//1是分页2是导出
            };
            getList(obj).then(res => {
                this.loading = false;
                console.log(res,"全部数据")
                that.tableAllData = res.data.data;
                //console.log(that.tableAllData,"全部数据")
                resolve();
            });
        });
        },
        //导出
        exportList(){
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
                const data = this.formatJson(filterVal, this.tableAllData);
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
                    filename: "维保扣款导出"
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
        //多选
        handleSelectionChange(value) {
            this.multipleSelection = value;
            console.log(this.multipleSelection,"多选")
        },
        //页数改变
        sizeChange(val){
            this.limit = val;
            this.getLists()
        },
        currentChange(val){
            this.page = val;
            this.getLists()
        },
        getLists(){
            var data ={
                currentPage:this.page,
                pageSize:this.limit,
                flag:1,
                project:this.project,
                projectTimes:this.period,
                place:this.place,
                startTime:this.time[0],
                endTime:this.time[1]
            }
            getList(data).then(res=>{
                console.log(res,"扣款查询");
                if(res.data.code==0){
                    this.loading = false
                    this.total = res.data.total;
                    this.tableData = res.data.data;

                }
            })
        },
        //获取项目
        getProjectNames(){
            var data = {};
            getProjectName(data).then(res=>{
                console.log(res,"项目");
                this.projectArr=res.data
            })
        },
        //获取分期
        selectProject(val){
            this.periodDisable = false;
            this.placeDisable = false;
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
                this.periodArr = res.data;
                //this.positionArr = res.data;
                //this.projectNameArr=res.data
            })
            getPlace(data).then(res=>{
                console.log(res,"分期带出来的");
                //this.fenqiArr = res.data;
               // this.positionArr = res.data;
                //this.projectNameArr=res.data
                this.placeArr=res.data;
            })
        },
        //获取维保项目
        fenqiChange(val){
            var data = {
                // project:this.project,
                // projectTimes:val
                projectCode:val
            };
            getPlace(data).then(res=>{
                console.log(res,"分期带出来的");
                //this.fenqiArr = res.data;
               // this.positionArr = res.data;
                //this.projectNameArr=res.data
                this.placeArr=res.data;
            })
        },
    },
    mounted(){
        this.getLists();
        this.getProjectNames();
        this.getAllList()
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

</style>

