<template>
    <div class="app-container calendar-list-container">
        <!-- <div class="selectIt" style="">
             <el-form label-width="70px">
                  <el-row :gutter="24">
                      <el-col :span="8">
                        <el-form-item label="项目">
                            <el-select size="small" v-model="topic" placeholder="请选择"
                            @change="getPeriod">
                                <el-option
                                v-for="item in topicArr"
                                :key="item.project"
                                :label="item.project"
                                :value="item.project">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="分期">
                            <el-select size="small" v-model="period" placeholder="请选择"
                            @change="getPosition">
                                <el-option
                                v-for="item in periodArr"
                                :key="item.projectTimes"
                                :label="item.projectTimes"
                                :value="item.projectTimes">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="维保位置">
                            <el-select size="small" v-model="position" placeholder="请选择">
                                <el-option
                                v-for="item in positionArr"
                                :key="item.place"
                                :label="item.place"
                                :value="item.place">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                      <el-col :span="8">
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
        </div> -->
        <el-row style="margin-bottom:10px">
            <el-button size="small" type="primary" @click="handleExport">导出</el-button>
            <el-button size="small" type="warning" @click="back">返回</el-button>
        </el-row>
        <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="calc(100% - 90px)"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        :index="methodIndex"
        >
            <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
            <el-table-column fixed prop="project" label="项目名称" width="150" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="projectTimes" label="项目分期" width="120" align="center"></el-table-column>
            <el-table-column prop="place" label="维保项" width="120" align="center"></el-table-column>
            <!-- <el-table-column prop="placeDescribe" label="位置描述" width="120" align="center" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="buildNum" label="维保位置" width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="elevNum" label="维保编号" width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="responsibleParty" label="维保单位" width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="resPerson" label="维保责任人" width="120" align="center"></el-table-column>
             <el-table-column prop="cmodul" label="维保模块" width="120" align="center"></el-table-column>
              <el-table-column prop="bclass" label="维保大类" width="120" align="center"></el-table-column>
            <!-- <el-table-column prop="sclass" label="维保小类" width="120" align="center"></el-table-column> -->
            <!--  -->
            <el-table-column prop="planndeEndTime" label="计划保养时间" width="120" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    {{toSwitch(scope.row.planndeEndTime)}}
              </template>
            </el-table-column >
            <el-table-column prop="actualEndTime" label="实际保养时间" width="120" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    {{toSwitch(scope.row.actualEndTime)}}
              </template>
            </el-table-column>
            <el-table-column prop="orderStatus" label="状态" width="120" align="center"></el-table-column>
            <el-table-column prop="checkExplain" label="维保效果评价" width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="closePicture" label="维保图片" width="120" align="center">
                <template slot-scope="scope">
                    <el-button @click="handleSee(scope.row)" type="text" size="small">查看图片</el-button>
              </template>
            </el-table-column>
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
        <!-- 弹窗查看图片 -->
        <el-dialog
            title="维保图片"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <div class="demo-image__preview">
                <el-image  v-for="(item,index) in urls" :key="index"
                    style="width: 100px; height: 100px;margin-right:10px"
                    :src="item.url"
                    :preview-src-list="srcUrl"
                    >
                </el-image>
            </div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button size="small" @click="dialogVisible = false">取 消</el-button> -->
                <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {getOneList,getProjectName} from "@/api/maintenaceCenter/oneorder.js"
export default {
    data(){
        return{
            multipleSelection:[],
            loading:true,
            tableData:[],
            total:null,
            page:1,
            limit:10,
            years:'2019',//年度
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
                "序号","项目名称","项目分期","位置","楼栋","梯号","维保单位","维保责任人","维保模块","维保大类","计划保养时间","实际保养时间","超期未保养","维保评价"
            ],
            checkboxVal:[
                "id","project","projectTimes","place","buildNum","elevNum","responsibleParty","resPerson","cmodul","bclass","planndeEndTime","actualEndTime","orderStatus","checkExplain"
            ],
            itemId:null,
            month:'',
            project:'',
            projectTimes:'',
            position:'',
            elevNum:'',
            //查看图片的弹框
            dialogVisible:false,
            urls:[],
            srcUrl: [],
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
                month : this.month,
                project:this.project ,
                projectTimes: this.projectTimes,
                position : this.position,
                flag:1,//1是分页2是导出
                elevNum:this.elevNum
               // maintenancePlanId:this.itemId
            }
            console.log(data,"Data")
            getOneList(data).then(res=>{
                this.loading = false
                console.log(res,"一票到底")
                if(res.data.code==0){
                    this.total = res.data.total;
                    this.tableData = res.data.data;
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
                month : this.month,
                project:this.project ,
                projectTimes: this.projectTimes,
                position : this.position,
                flag:2,//1是分页2是导出
                // maintenancePlanId:this.itemId
                elevNum:this.elevNum
            };
            getOneList(obj).then(res => {
                console.log(res,"分层的全部数据")
                that.tableAllData = res.data.data;
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
               // console.log(data,"datadata");
               // console.log(excel.export_json_to_excel,"zheshishenm");
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "一票到底"
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
        back(){
            this.$router.push({
                path:"/protectCenter/onepage",
            })
        },
        //按照空格截取时间
        toSwitch(str){
            if(str!=null){
                var strSwitch = str.trim().split(" ")
                return strSwitch[0]
            }else{
                return str
            }
        },
        //查看图片
        handleSee(item){
            console.log(item.closePicture,"item")
            this.urls = [];
            if(item.closePicture!=null){
                this.dialogVisible = true;
                var arr = []
                arr = item.closePicture.split(",");
                console.log(arr,"arr")
                for(var i=0;i<arr.length;i++){
                    let obj = {};
                    obj.url = arr[i]
                    this.urls.push(obj)
                }
                this.srcUrl = this.urls.map(v => v.url);
            }else{
                this.$message({
                    type:"warning",
                    message:"暂无评价图片"
                })
            }
            
             console.log(this.urls,"urls")
        },
        handleClose(){
            this.dialogVisible = false;
        }
    },
    mounted(){
        //this.itemId = this.$route.query.id;
        this.years = this.$route.query.year;
        this.month = this.$route.query.month;
        this.project = this.$route.query.project;
        this.projectTimes = this.$route.query.projectTimes;
        this.position = this.$route.query.position;
        this.elevNum = this.$route.query.elevNum;
        this.getLists();
        this.getAllList();
    },
    activated(){
       // this.itemId = this.$route.query.id;
        this.years = this.$route.query.year;
        this.month = this.$route.query.month;
        this.project = this.$route.query.project;
        this.projectTimes = this.$route.query.projectTimes;
        this.position = this.$route.query.position;
        this.elevNum = this.$route.query.elevNum;
        this.getLists();
        this.getAllList();
    }
}
</script>

