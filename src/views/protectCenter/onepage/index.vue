<template>
    <div class="app-container calendar-list-container">
        <div class="selectIt">
             <el-form label-width="70px">
                  <el-row :gutter="24">
                      <el-col :span="6">
                        <el-form-item label="项目名称">
                            <el-select size="small" v-model="topic" placeholder="请选择"
                            @change="getPeriod" clearable>
                                <el-option
                                v-for="item in topicArr"
                                :key="item.project"
                                :label="item.project"
                                :value="item.projectCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="分期">
                            <el-select size="small" :disabled="!topic" v-model="period" placeholder="请选择"
                            clearable>
                                <el-option
                                v-for="item in periodArr"
                                :key="item.project"
                                :label="item.project"
                                :value="item.projectCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="维保项">
                            <el-select size="small" :disabled="!topic" clearable v-model="position" placeholder="请选择">
                                <el-option
                                v-for="item in positionArr"
                                :key="item.place"
                                :label="item.place"
                                :value="item.placeCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                      <el-col :span="5">
                        <el-form-item label="年度">
                           <el-select size="small" v-model="years" placeholder="请选择">
                                <el-option
                                v-for="item in yearsArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                           
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="月份">
                           <el-select size="small" v-model="month" placeholder="请选择">
                                <el-option
                                v-for="item in monthArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                           
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="维保单位">
                           <el-input v-model="responsibleParty" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="4">
                        <el-form-item label="是否超期">
                            <el-select size="small" v-model="outTime">
                                <el-option v-for="(item,index) in timeOption" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label-width="0px">
                            <el-button size="small" type="primary" @click="search">查询</el-button>
                            <el-button size="small" type="primary">重置</el-button>
                        </el-form-item>
                    </el-col>
                  </el-row>
             </el-form>
        </div>
        <el-row style="margin-bottom:10px">
            <el-button size="small" type="primary" @click="handleExport">导出</el-button>
        </el-row>
        <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="calc(100% - 180px)"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        :index="methodIndex"
       
        >
            <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
            <el-table-column fixed prop="project" label="项目名称" width="150" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="projectTimes" label="项目分期" width="120" align="center"></el-table-column>
            <el-table-column prop="place" label="维保项" width="120" align="center"></el-table-column>
            <!-- <el-table-column prop="placeDescrible" label="楼栋" width="120" align="center" show-overflow-tooltip></el-table-column> -->
             <el-table-column prop="buildNum" label="维保位置" width="120" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="elevNum" label="维保编号" width="120" align="center" show-overflow-tooltip></el-table-column>
            
            <el-table-column prop="responsibleParty" label="维保单位" width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="resPerson" label="维保责任人" width="120" align="center"></el-table-column>
            <el-table-column prop="cmodul" label="维保模块" width="120" align="center"></el-table-column>
           
            <el-table-column prop="frequency" label="应维保" width="120" align="center"></el-table-column>
             <el-table-column prop="countFinish" label="已维保" width="120" align="center"></el-table-column>
            <el-table-column prop="countNot" label="未维保" width="120" align="center"></el-table-column>
            <el-table-column prop="countLate" label="超期维保" width="120" align="center"></el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="50">
            <template slot-scope="scope">
                <el-button @click="handleSee(scope.row)" type="text" size="small">查看</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-row style="text-align:center;">
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
import {getList,getProjectName,getProjectTimes,getPlace} from "@/api/maintenaceCenter/oneorder.js"
 import { mixinText } from "@/mixins/moreStorage.js";
export default {
    mixins: [mixinText],
    data(){
        return{
            topic:'',
            period:"",//周期
            position:"",
            responsibleParty: "",
            outTime: '',
            positionArr:[],
            timeOption: [{id: 0, name: '未超期'}, {id: 1, name: '超期'}],
            topicArr:[],
            periodArr:[],
            multipleSelection:[],
            loading:true,
            tableData:[],
            total:null,
            page:1,
            limit:10,
            years: '',//年度
            yearsArr:[
                { 
                value: '2018',
                label: '2018'
                },{value:"2019",label:"2019"},{value:"2020",label:"2020"},{value:"2021",label:"2021"},{value:"2022",label:"2022"},{value:"2023",label:"2023"},{value:"2024",label:"2024"},{value:"2025",label:"2025"},{value:"2026",label:"2026"},{value:"2027",label:"2027"},{value:"2028",label:"2028"},{value:"2029",label:"2029"},{value:"2030",label:"2030"},{value:"2031",label:"2031"},{value:"2032",label:"2032"},{value:"2033",label:"2033"},{
                    value:"2034",label:"2034"
                },{value:"2035",label:"2035"},{value:"2036",label:"2036"},{value:"2037",label:"2037"},{value:"2038",label:"2038"}
            ],
            tableAllData:[],
            checkboxName:[
                "项目名称","项目分期","维保项","维保位置","维保编号","维保单位","维保责任人","维保模块","应维保","未维保","已维保","超期维保"
            ],
            checkboxVal:[
                "project","projectTimes","place","buildNum","elevNum","responsibleParty","resPerson","cmodul","cha","countNot","countFinish","countLate",
            ],
            month:'',
            monthArr:[{label:"一月",value:"01"},{label:"二月",value:"02"},{label:"三月",value:"03"},{label:"四月",value:"04"},{label:"五月",value:"05"},{label:"六月",value:"06"},{label:"七月",value:"07"},{label:"八月",value:"08"},{label:"九月",value:"09"},{label:"十月",value:"10"},{label:"十一月",value:"11"},{label:"十二月",value:"12"}],
            periodDesible:true,
            placeDesible:true
        }
    },
    methods:{
        handleSelectionChange(value) {
            this.multipleSelection = value;
            console.log(this.multipleSelection,"多选")
        },
        methodIndex(index){
            return index;
        },
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
                year:this.years,
                projectCode:this.topic,
                month:this.month,
                // projectTimes:this.period,
                // place:this.position,
                projectTimesCode:this.period,
                placeCode:this.position,
                flag:1,//1是分页2是导出
                responsibleParty: this.responsibleParty,
                outTime: this.outTime,
            }
            getList(data).then(res=>{
                console.log(res,"一票到底")
                this.loading = false;
                if(res.data.code==0){
                    this.total = res.data.total;
                    this.tableData = res.data.data;
                    //frequency - countNot
                    for(var i=0;i<res.data.data.length;i++){
                        console.log(parseInt(res.data.data[i].frequency)  - parseInt(res.data.data[i].countNot),"aaa")
                        this.tableData[i].cha = parseInt(res.data.data[i].frequency)  - parseInt(res.data.data[i].countNot) 
                    }
                    console.log( this.tableData,"table")
                }
            })
        },
        //导出
        getAllList(){
            var that = this
            return new Promise((resolve, reject) => {
            var obj = {
                currentPage:1,
                pageSize:10,
                year:this.years,
                month:this.month,
                flag:2//1是分页2是导出
            };
            getList(obj).then(res => {
                console.log(res,"全部数据")
                that.tableAllData = res.data.data;
                for(var i=0;i<res.data.data.length;i++){
                        // console.log(parseInt(res.data.data[i].frequency)  - parseInt(res.data.data[i].countNot),"aaa")
                        that.tableAllData[i].cha = parseInt(res.data.data[i].frequency)  - parseInt(res.data.data[i].countNot) 
                    }
                //console.log(that.tableAllData,"全部数据")
                resolve();
            });
        });
        },
        //导出xls
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
                    filename: "一票到底导出"
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
        //获取项目
        getProjectNames(){
            return new Promise((resolve,reject) => {
                var data = {};
                getProjectName(data).then(res=>{
                    console.log(res,"项目");
                    this.topicArr=res.data
                })
                resolve();
            })
        },
        //获取分期
        getPeriod(val){
            this.periodDesible = false
            this.placeDesible = false;
            var data = {
                projectCode:val
            };
            this.period = '';
            this.position = ''
            getProjectTimes(data).then(res=>{
                console.log(res,"项目");
                this.periodArr=res.data
            })
             getPlace(data).then(res=>{
                console.log(res,"位置");
                this.positionArr=res.data
            })
        },
        //获取位置
        // getPosition(val){
        //     var data = {
        //         projectCode:this.topic,
        //     }
        //     this.position = ''
        //      getPlace(data).then(res=>{
        //         console.log(res,"位置");
        //         this.positionArr=res.data
        //     })
        // },
        //查看
        handleSee(item){
            console.log(item,"item")
            this.$router.push({
                path:"/protectCenter/onepage/see",
                query:{
                    // id:item.maintenancePlanId,
                    project:item.project,
                    projectTimes:item.projectTimes,
                    position:item.position,
                    year:this.years,
                    month:this.month,
                    elevNum:item.elevNum
                }
            })
        },
        //查询
        search(){
            var data ={
                currentPage:this.page,
                pageSize:this.limit,
                // project:this.topic,
                // projectTimes:this.period,
                // place:this.position,
                projectCode:this.topic,
                projectTimesCode:this.period,
                placeCode:this.position,
                year:this.years,
                month:this.month,
                responsibleParty: this.responsibleParty,
                flag:1,//1是分页2是导出
                outTime: this.outTime,
            }
            getList(data).then(res=>{
                console.log(res,"一票到底")
                this.loading = false;
                if(res.data.code==0){
                    this.total = res.data.total;
                    this.tableData = res.data.data;
                    for(var i=0;i<res.data.data.length;i++){
                        console.log(parseInt(res.data.data[i].frequency)  - parseInt(res.data.data[i].countNot),"aaa")
                        this.tableData[i].cha = parseInt(res.data.data[i].frequency)  - parseInt(res.data.data[i].countNot) 
                    }
                }
            })

            // 实现存储
            var obj = {
                topic: this.topic,
                period: this.period,
                position: this.position,
                years: this.years,
                month: this.month,
                responsibleParty: this.responsibleParty,
                outTime: this.outTime,
            }
            this.setStore("一票到底", obj);
        },
        //重置
        reset(){
            this.topic='';
            this.position="";
            this.period = '';
        },
        getYear(){
            // alert(111)
            var d = new Date();
            this.years = d.getFullYear();
        }

    },
    mounted(){
        this.getYear();
        this.getLists();
        this.getAllList();
        this.getProjectNames();
        
    },
    activated(){
        this.getLists();
        this.getAllList();
        this.getProjectNames()
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            var mixinData = vm.getStore("一票到底");
            if(mixinData){
                var {
                    topic,
                    period,
                    position,
                    years,
                    month,
                    responsibleParty,
                    outTime
                } = mixinData;
            }
            if(years == "" || years == undefined){
                this.getYear();
            }else{
                vm.years = years;
            }
            vm.getProjectNames()
            .then(res => {
                vm.topic = topic;
                vm.month = month;
                vm.responsibleParty = responsibleParty;
                vm.outTime = outTime;
                getProjectTimes({projectCode: vm.topic}).then(res=>{
                    vm.periodArr=res.data;
                    vm.period = period;
                })
                getPlace({projectCode: vm.topic}).then(res=>{
                    vm.positionArr=res.data;
                    vm.position = position;
                    vm.getLists();
                })
            })
        });
  }
}
</script>

