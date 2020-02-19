<template>
     <div class="wrap app-container ">
        <!-- <common-title title="基本信息"></common-title> -->
        <div style="height:100%;overflow:auto">
            <el-form label-width="100px" :model="form" :rules="rules" ref="forms">
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="项目名称" prop="project">
                            <el-select size="mini" v-model="form.project" placeholder="请选择"
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
                        <el-form-item label="分期" >
                            <!-- <el-input disabled v-model="fenqi" size="mini"></el-input> -->
                            <el-select  size="mini" :disabled="periodDisabled" v-model="form.period" placeholder="请选择">
                                <el-option
                                
                                v-for="item in periodArr"
                                :key="item.project"
                                :label="item.project"
                                :value="item.projectCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="报修标题" prop="title">
                            <el-input  v-model="form.title" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="维保项" prop="like">
                                <el-select size="mini" :disabled="placeDisabled" v-model="form.like" placeholder="请选择"
                                @change="getBuildNums">
                                    <el-option
                                    v-for="item in likeArr"
                                    :key="item.place"
                                    :label="item.place"
                                    :value="item.placeCode">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around" v-if="type=='增加'"> 
                        <el-col :span="8">
                        <el-form-item label="维保位置" prop="place">
                            <el-select size="mini" :disabled="buildDisbled" v-model="form.place" placeholder="请选择"
                                @change="getCodes">
                                    <el-option
                                    v-for="item in placeArr"
                                    :key="item.buildNum"
                                    :label="item.buildNum"
                                    :value="item.buildNum">
                                    </el-option>
                                </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                         <el-form-item label="维保编号" prop="code">
                            <el-select size="mini" :disabled="eleDisabled" v-model="form.code" placeholder="请选择" @change="getPoeples"
                               >
                                    <el-option
                                    v-for="item in codeArr"
                                    :key="item.elevNum"
                                    :label="item.elevNum"
                                    :value="item.elevNum">
                                    </el-option>
                                </el-select>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around" v-if="type=='增加'">
                        <el-col :span="8">
                        <el-form-item label="计划结束" prop="planEndTime">
                            <el-date-picker
                            size="small"
                            v-model="form.planEndTime"
                            type="date"
                            placeholder="选择结束时间"
                            format="yyyy 年 MM 月 dd 日"
                            >
                            </el-date-picker>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="年份" prop="year">
                            <el-select size="mini" v-model="form.year" placeholder="请选择"
                           >
                                <el-option
                                v-for="item in yearArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around" v-if="type=='增加'">
                        <el-col :span="8">
                            <el-form-item label="月份" prop="month">
                            <el-select size="mini" v-model="form.month" placeholder="请选择"
                            >
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
                            <el-form-item label="周期" prop="circle">
                            <el-select size="mini" v-model="form.circle" placeholder="请选择"
                            >
                                <el-option
                                v-for="item in circleArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="维保模块" prop="moudle">
                            <el-select size="mini" v-model="form.moudle" placeholder="请选择"
                            @change="selectModul">
                                <el-option
                                v-for="item in moudleArr"
                                :key="item.modules"
                                :label="item.modules"
                                :value="item.modules">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                             <el-form-item label="维保大类"  prop="bigClass" v-if="type=='增加'">
                            <el-select size="mini" :disabled="bclassDisable" v-model="form.bigClass" placeholder="请选择">
                                <el-option
                                v-for="item in bigClassArr"
                                :key="item.bclass"
                                :label="item.bclass"
                                :value="item.bclass">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="责任方" prop="people" v-if="type=='增加'">
                            <el-select size="mini" :disabled="peopleDisabled" v-model="form.people" placeholder="请选择">
                                <el-option
                                v-for="item in peopleArr"
                                :key="item.supplierName"
                                :label="item.supplierName"
                                :value="item.supplierName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="">
                            <!-- <el-input disabled v-model="zeren" size="mini"></el-input> -->
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row v-if="type=='导入'">
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="导入文件" required>
                                <el-upload
                                size="small"
                                class="upload-demo"
                                drag
                                action="123"
                                :limit="1"
                                accept=".xls"
                                :auto-upload="false"
                                ref="upload"
                                :file-list="excelList"
                                :on-exceed="exceed"
                                :on-change="uploadChange"
                                :on-remove="uploadRemove">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                
                                </el-upload>
                            </el-form-item>
                        </el-col>
                         <el-col :span="8">
                         </el-col>
                        </el-row>
                </el-row>
            </el-form>
            <div class="btn-box">
                <div class="btn">
                    <el-button v-if="type=='增加'" type="primary" size="small" @click.native="submit">提交</el-button>
                    <el-button v-if="type=='导入'" type="primary" size="small" @click.native="submitMore">批量新增</el-button>
                    <el-button type="warning" size="small" @click.native="back">返回</el-button>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import {getType,getProjectName,addSubmit,getProjectTimes,getPlace} from "@/api/maintenaceCenter/planManage.js"
import { getPlaceDesc,getCmodul,getBclass,getSclass } from '../../../api/maintenaceCenter/planManage';
import {getBuildNum,getCode,saveAdd,saveAddMore,getPeople} from "../../../api/maintenaceCenter/confirm"
export default {
    data(){
        return{
            type:'',
            form:{
                project:'',
                period:'',
                title:'',
                like:'',
                place:'',
                code:'',
                planEndTime:'',
                year:'',
                month:'',
                circle:'',//周期
                moudle:'',
                bigClass:'',
                people:''
            },
            rules:{
                project:[{ required: true, message: '请选择项目', trigger: 'change' }],
                period:[{ required: true, message: '请选择分期', trigger: 'change' }],
                title:[{ required: true, message: '请填写标题', trigger: 'blur' }],
                like:[{ required: true, message: '请选择维保项', trigger: 'change' }],
                place:[{ required: true, message: '请选择维保位置', trigger: 'change' }],
                code:[{ required: true, message: '请选择维保编号', trigger: 'change' }],
                planEndTime: [
                    { type: 'date', required: true, message: '请选择计划结束时间', trigger: 'change' }
                ],
                year:[{ required: true, message: '请选择年份', trigger: 'change' }],
                month:[{ required: true, message: '请选择月份', trigger: 'change' }],
                circle:[{ required: true, message: '请选择周期', trigger: 'change' }],
                moudle:[{ required: true, message: '请选择维保模块', trigger: 'change' }],
                bigClass:[{ required: true, message: '请选择维保大类', trigger: 'change' }],
                people:[{ required: true, message: '请选择责任方', trigger: 'change' }],
             } ,
            projectArr:[],
            periodArr:[],
            placeArr:[],
            likeArr:[],
            codeArr:[],
            yearArr:[
                { 
                value: '2018',
                label: '2018'
                },{value:"2019",label:"2019"},{value:"2020",label:"2020"},{value:"2021",label:"2021"},{value:"2022",label:"2022"},{value:"2023",label:"2023"},{value:"2024",label:"2024"},{value:"2025",label:"2025"},{value:"2026",label:"2026"},{value:"2027",label:"2027"},{value:"2028",label:"2028"},{value:"2029",label:"2029"},{value:"2030",label:"2030"},{value:"2031",label:"2031"},{value:"2032",label:"2032"},{value:"2033",label:"2033"},{
                    value:"2034",label:"2034"
                },{value:"2035",label:"2035"},{value:"2036",label:"2036"},{value:"2037",label:"2037"},{value:"2038",label:"2038"}
            ],
            monthArr:[{label:"一月",value:"01"},{label:"二月",value:"02"},{label:"三月",value:"03"},{label:"四月",value:"04"},{label:"五月",value:"05"},{label:"六月",value:"06"},{label:"七月",value:"07"},{label:"八月",value:"08"},{label:"九月",value:"09"},{label:"十月",value:"10"},{label:"十一月",value:"11"},{label:"十二月",value:"12"}],
            circleArr:[ { //状态
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
                }],
            moudleArr:[],
            bigClassArr:[],            
            peopleArr:[],
            excelList:[],//文件
            periodDisabled:true,//分期的
            placeDisabled:true,//维保项
            buildDisbled:true,//维保位置
            eleDisabled:true,//维保编号
            peopleDisabled:true,//责任方
            bclassDisable:true,//维保大类
            phone:null,
            vcode:null

        }
    },
    methods:{
        submit(){
            //console.log("aaaa")
             this.$refs["forms"].validate((valid) => {
             if (valid) {
                // var names = ''
                // console.log(this.peopleArr,"责任方的code")
                // for(var i=0;i<this.peopleArr.length;i++){
                //     if(this.form.people == this.peopleArr[i].supplierCode){
                //         names = this.peopleArr[i].supplierName
                //     }
                // }
                // console.log(names,"names")
                var projectName=''
                for(var i = 0;i<this.projectArr.length;i++){
                    if(this.form.project==this.projectArr[i].projectCode){
                        projectName = this.projectArr[i].project
                    }
                }
                var periodName = ''
                for(var i=0;i<this.periodArr.length;i++){
                    if(this.form.period==this.periodArr[i].projectCode){
                        periodName = this.periodArr[i].project
                    }
                }
                var placeName = ''
                //console.log(this.form.like,"维保项目百纳好")
                for(var i=0;i<this.likeArr.length;i++){
                    if(this.form.like == this.likeArr[i].placeCode){
                        placeName = this.likeArr[i].place
                    }
                }
                var resPerson = '';
                for(var i=0;i<this.peopleArr.length;i++){
                    if(this.form.people == this.peopleArr[i].supplierName){
                        resPerson = this.peopleArr[i].resPerson
                    }
                }
                for(var i=0;i<this.codeArr.length;i++){
                    if(this.form.people==this.peopleArr[i].supplierName){
                        this.phone = this.peopleArr[i].phone;
                        this.vcode = this.peopleArr[i].supplierCode
                    }
                }
                var data = {
                    projectCode:this.form.project,//项目名称
                    project:projectName,//项目编码
                    projectTimesCode:this.form.period,//分期编码
                    projectTimes: periodName,//分期名称
                    title:this.form.title,
                    placeCode:this.form.like,//维保项编号
                    place:placeName,//维保项名称
                    buildNum:this.form.place,//维保位置
                    elevNum:this.form.code,//维保编号
                    planndeEndTime:this.form.planEndTime,//计划结束
                    year:this.form.year,
                    month:this.form.month,
                    cycle:this.form.circle,
                    cmodul:this.form.moudle,
                    bclass:this.form.bigClass,
                    // supplierCode:this.form.people,
                    responsibleParty:this.form.people,
                    resPerson:resPerson,
                    add1:this.vcode,
                    add2:this.phone

                }
                console.log(data,"data")
               // return
                saveAdd(data).then(res=>{
                    console.log(res,"闭单")
                    if(res.data.code==0){
                        this.$message({
                            type:"success",
                            message:"新增成功"
                        });
                        this.resetForm("forms")
                        this.$router.push({
                            path: "/protectCenter/confirm",
                        })
                    }
                })

             } else {
                 console.log('error submit!!');
                 return false;
             }
             });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitMore(){
            console.log("批量新增")
             this.$refs["forms"].validate((valid) => {
             if (valid) {
                //  var data = {
                //     project:this.form.project,
                //     projectTimes:this.form.period,
                //     title:this.form.title,
                //     place:this.form.like,//维保项
                //     cmodul:this.form.moudle,

                // }
                if(this.excelList.length==0){
                    this.$message({
                        type:"warning",
                        message:"请上传文件"
                    })
                }
                var projectName=''
                for(var i = 0;i<this.projectArr.length;i++){
                    if(this.form.project==this.projectArr[i].projectCode){
                        projectName = this.projectArr[i].project
                    }
                }
                var periodName = ''
                for(var i=0;i<this.periodArr.length;i++){
                    if(this.form.period==this.periodArr[i].projectCode){
                        periodName = this.periodArr[i].project
                    }
                }
                var placeName = ''
                //console.log(this.form.like,"维保项目百纳好")
                for(var i=0;i<this.likeArr.length;i++){
                    if(this.form.like == this.likeArr[i].placeCode){
                        placeName = this.likeArr[i].place
                    }
                }
                var fd = new FormData();
                fd.append("projectCode",this.form.project);
                fd.append("project",projectName);
                fd.append("projectTimes",periodName);
                fd.append("projectTimesCode",this.form.period);
                fd.append("title",this.form.title);
                fd.append("placeCode",this.form.like);
                fd.append("place",placeName);
                fd.append("cmodul",this.form.moudle);
                fd.append("file",this.excelList[0].raw);
                saveAddMore(fd).then(res=>{
                    console.log(res,"批量新增")
                    if(res.data.code==0){
                        this.$message({
                            type:"success",
                            message:"新增成功"
                        });
                        this.$router.push({
                            path:'/protectCenter/confirm'
                        });
                        this.resetForm("forms")
                    }else{
                        this.$message({
                            type:"warning",
                            message:res.data.msg
                        })
                    }
                })
             }else{

             }
             })
        },
        back(){
            this.$router.push({
                path:"/protectCenter/confirm"
            })
        },
        uploadChange(file,fileList){
            this.excelList = fileList.splice(-1)
        }, 
        uploadRemove(file,fileList){
            this.excelList = fileList.splice(-1)
        },
        exceed(){
            this.$message({
                type:"warning",
                message:"只能上传一个文件"
            })
        },
        init(){
            var date=new Date();
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var day=date.getDate();
            var hh=date.getHours();
            var mm=date.getMinutes();
            var ss=date.getSeconds();
            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;
            if (hh < 10) hh = "0" + hour;
            if (mm < 10) mm = "0" + minu;
            if (ss < 10) ss = "0" + sec;
            var  rq = year+"-"+month+"-"+day+" "+hh+":"+mm+":"+ss;
            return rq
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
            console.log(val,"选择的项目")
            this.periodDisabled = false;
            this.placeDisabled = false;
            var data = {
                projectCode:val
            };
            this.form.period = '';
            this.form.like='',
            this.form.place='',
            this.form.code='',
            getProjectTimes(data).then(res=>{
                console.log(res,"项目带出来的");
                this.periodArr = res.data;
                //this.positionArr = res.data;
                //this.projectNameArr=res.data
            })
            var data = {
                projectCode:this.form.project,
                // projectTimes:val
            };
            getPlace(data).then(res=>{
                console.log(res,"分期带出来的");
                //this.fenqiArr = res.data;
               // this.positionArr = res.data;
                //this.projectNameArr=res.data
                this.likeArr=res.data;//维保项
            })
        }, 
        //获取维保项
        fenqiChange(val){
            this.placeDisabled = false;
            var data = {
                projectCode:this.form.project,
                // projectTimes:val
            };
            getPlace(data).then(res=>{
                console.log(res,"分期带出来的");
                //this.fenqiArr = res.data;
               // this.positionArr = res.data;
                //this.projectNameArr=res.data
                this.likeArr=res.data;//维保项
            })
        },
        //获取维保位置
        getBuildNums(val){
            this.buildDisbled = false;
            var data = {
               // project:this.form.project,
                projectCode:this.form.project,
                placeCode:val
            };
            getBuildNum(data).then(res=>{
                console.log(res,"维保位置");
                //this.fenqiArr = res.data;
               // this.positionArr = res.data;
                //this.projectNameArr=res.data
                this.placeArr=res.data;//维保项
               // this.
            })
        },
        //获取维保编号
        getCodes(val){
            this.eleDisabled = false;
            var data = {
                projectCode:this.form.project,
                placeCode:this.form.like,
                buildNum:val
            };
            getCode(data).then(res=>{
                console.log(res,"维保位置");
                this.codeArr=res.data;//维保项
            })
        },
        //获取责任方
        getPoeples(val){
            this.peopleDisabled = false;
            var data = {
                projectCode: this.projectCode,
                placeCode: this.likeCode,
                buildNum: this.form.place,
                elevNum:val
            };
            getPeople(data).then(res => {
                this.peopleArr = res.data;
            });
        },
        //获取模块
        getMoudle(){
            var data = {}
            getCmodul(data).then(res=>{
                console.log(res,"维保模块")
                this.moudleArr = res.data;
            })
        },
        //获取大类
        selectModul(val){
            console.log(val,"选完模块以后")
            this.bclassDisable = false
             var data = {
                modules:val
            }
            this.form.bclass = '';
            getBclass(data).then(res=>{
                console.log(res,"大类")
                this.bigClassArr = res.data;
            })
        },

    },
    mounted(){
        this.getProjectNames();//获取项目
        this.getMoudle()//获取模块
        this.type = this.$route.query.type;
    },
    activated(){
        this.getProjectNames();//获取项目
        this.getMoudle()//获取模块
        this.type = this.$route.query.type;
    }
}
</script>
<style lang="scss" scoped>
    .wrap {
        overflow: auto;
    }
    .btn-box{
        width:100%;position:relative;height:50px;
    }
    .btn{
        width:15%;position: absolute;left:0;right:0;bottom:0;top:0;margin:auto;
    }
    .row-bg>>>.el-upload-dragger{
        width:180px!important;
    }
</style>