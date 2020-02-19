<template>
     <div class="wrap app-container ">
        <!-- <common-title title="基本信息"></common-title> -->
        <div class="">
            <el-form label-width="100px" :model="form"  :rules="rules" ref="form">
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="项目" prop="projectName">
                           <el-select size="mini" v-model="form.projectName" placeholder="请选择" @change="selectProject">
                                <el-option
                                v-for="item in projectNameArr"
                                :key="item.project"
                                :label="item.project"
                                :value="item.project">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="分期" prop="fenqi">
                            <el-select size="mini" v-model="form.fenqi" placeholder="请选择"
                            @change="fenqiChange"
                            >
                                <el-option
                                v-for="item in fenqiArr"
                                :key="item.projectTimes"
                                :label="item.projectTimes"
                                :value="item.projectTimes">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="维保标题" prop="topic">
                            <el-input v-model="form.topic" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="年份" prop="year">
                            <el-select size="mini" v-model="form.year" placeholder="请选择">
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
                <!-- 维保模块大类小类 -->
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="维保模块" prop="cmodule">
                            <el-select size="mini" v-model="form.cmodule" placeholder="请选择"
                            @change=" selectModul">
                                <el-option
                                v-for="item in cmodulArr"
                                :key="item.modules"
                                :label="item.modules"
                                :value="item.modules">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="维保大类" prop="bclass">
                            <el-select size="mini" v-model="form.bclass" placeholder="请选择"
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
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                       
                        <el-col :span="8">
                        <el-form-item label="维保周期" prop="period">
                            <el-select size="mini" v-model="form.period" placeholder="请选择">
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
                        <el-form-item label="维保位置" prop="position">
                            <el-select size="mini" v-model="form.position" placeholder="请选择" @change="placeChange">
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
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                       
                        <el-col :span="8">
                        <el-form-item label="位置描述" prop="positionDesc">
                            <el-select size="mini" v-model="form.positionDesc" placeholder="请选择" >
                                <el-option
                                v-for="item in positionDescArr"
                                :key="item.placeDescribe"
                                :label="item.placeDescribe"
                                :value="item.placeDescribe">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                          <el-col :span="8">
                        <el-form-item label="责任方" prop="people">
                            <el-select size="mini" v-model="form.people" placeholder="请选择">
                            <el-option
                                v-for="item in peopleArr"
                                :key="item.supplierCode"
                                :label="item.supplierCode"
                                :value="item.supplierCode">
                            </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                      
                        <el-col :span="5">
                        <!-- <el-form-item label="维保小类" prop="type">
                            <el-select size="mini" v-model="form.type" placeholder="请选择">
                                <el-option
                                v-for="item in typeArr"
                                :key="item.sclass"
                                :label="item.sclass"
                                :value="item.sclass">
                                </el-option>
                            </el-select>
                        </el-form-item> -->
                             <div style="color:#409EFF;cursor:pointer" >
                                <span style="cursor:pointer" @click="seeSclass">点击查看维保小类</span> 
                            </div>
                           
                        </el-col>
                         <el-col :span="8">
                         </el-col>
                    </el-row>
                </el-row>
            </el-form>
             
            <div class="btn-box">
                <div class="btn">
                    <el-button type="primary" size="small" @click="submit">提交</el-button>
                    <el-button type="primary" size="small" @click="back">返回</el-button>
                </div>
                
            </div>
        </div>
        <el-dialog
            title="维保小类"
            :visible.sync="sclassDiago"
            width="60%"
            :before-close="handleClose">
            <!-- <span sytle="font-weight:800">维保小类</span> -->
            <div class="digo-box">
                <div v-if="typeArr.length==0" style="width:100%;text-align:center">
                    请先选择维保模块和维保大类才可查看维保小类
                </div>
                <div v-for="(item,index) in typeArr" :key="index">
                    {{item.sclass}}
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="sclassDiago = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {getType,getProjectName,addSubmit,getProjectTimes,getPlace} from "@/api/maintenaceCenter/planManage.js"
import { getPlaceDesc,getCmodul,getBclass,getSclass } from '../../../api/maintenaceCenter/planManage';
export default {
    data(){
        return{
            sclassDiago:false,
            form:{
                projectName:'',
                fenqi:'',
                topic:'',
                year:"2019",
                type:'',
                period:"",//周期
                position:'',
                positionDesc:'',
                people:'',//责任方
                cmodule:'',//维保模块
                bclass:''//维保大类
            },
            rules: {
                projectName: [
                    { required: true, message: '请选择项目名字', trigger: 'change' }
                ],
                fenqi: [
                    { required: true, message: "请选择分期", trigger: 'change' }
                ],
                topic: [
                    { required: true, message: "请填写标题", trigger: 'blur' },
                    { max: 30, message: '不能超过30个字符', trigger: 'blur' }
                ],
                year: [
                    { required: true, message: "请选择年份", trigger: 'change' }
                ],
                 cmodule: [
                    { required: true, message: "请选择模块", trigger: 'change' }
                ],
                 bclass: [
                    { required: true, message: "请选择大类", trigger: 'change' }
                ],
                // type: [
                //     { required: true, message: "请选择小类", trigger: 'change' }
                // ],
                period: [
                    { required: true, message: "请选择周期", trigger: 'change' }
                ],
                position: [
                    { required: true, message: "请选择位置", trigger: 'change' }
                ],
                 positionDesc: [
                    { required: true, message: "请选择位置描述", trigger: 'change' }
                ],
                 people: [
                    { required: true, message: "请选择责任方", trigger: 'change' }
                ],
            },
            projectNameArr:[],
            positionDescArr:[],
            fenqiArr:[],
            peopleArr:[],
            cmodulArr:[],
            bclassArr:[],
            yearArr:[{ 
                value: '2018',
                label: '2018'
                },{value:"2019",label:"2019"},{value:"2020",label:"2020"},{value:"2021",label:"2021"},{value:"2022",label:"2022"},{value:"2023",label:"2023"},{value:"2024",label:"2024"},{value:"2025",label:"2025"},{value:"2026",label:"2026"},{value:"2027",label:"2027"},{value:"2028",label:"2028"},{value:"2029",label:"2029"},{value:"2030",label:"2030"},{value:"2031",label:"2031"},{value:"2032",label:"2032"},{value:"2033",label:"2033"},{
                    value:"2034",label:"2034"
                },{value:"2035",label:"2035"},{value:"2036",label:"2036"},{value:"2037",label:"2037"},{value:"2038",label:"2038"}],
            typeArr:[],
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
            positionArr:[
                {value:"二号楼一梯",label:"二号楼一梯"}
            ],
           
            
            
        }
    },
    methods:{
        seeSclass(){
            console.log("点击")
            this.sclassDiago = true;
        },
        handleClose(){
            this.sclassDiago = false;
        },
        //返回
        back(){
            this.$router.push({
                path: "/protectCenter/planmanage",
            });
            this.resetForm("form")
        },
        //提交
        submit(){
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    //alert('submit!');
                    var data = {
                        project:this.form.projectName,
                        projectTimes:this.form.fenqi,
                        title:this.form.topic,
                        years:this.form.year,
                        sclass:this.form.type,//小类
                        cmodul:this.form.cmodule,//模块
                        bclass:this.form.bclass,//大类
                        frequency:this.form.period,
                        place:this.form.position,
                        placeDescribe:this.form.positionDesc,
                        supplierCode :this.form.people
                    }
                    addSubmit(data).then(res=>{
                        console.log(res,"增加接口的res")
                        if(res.data.code==0){
                            this.$message({
                                type:"success",
                                message:"提交成功"
                            });
                            this.$router.push({
                                path: "/protectCenter/planmanage",
                            })
                        }else{
                            this.$message({
                                type:"success",
                                message:res.data.msg
                            });
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
         
        //获取项目
        getProjectNames(){
            var data = {};
            getProjectName(data).then(res=>{
                console.log(res,"项目");
                this.projectNameArr=res.data
            })
        },
        //项目变了以后
        selectProject(val){
            console.log(val,"选择的项目")
            var data = {
                project:val
            };
            this.form.position='';
            this.form.positionDesc='';
            this.form.fenqi=''
            getProjectTimes(data).then(res=>{
                console.log(res,"项目带出来的");
                this.fenqiArr = res.data;
                //this.positionArr = res.data;
                //this.projectNameArr=res.data
            })
        },
        //分期变了以后
        fenqiChange(val){
            var data = {
                project:this.form.projectName,
                projectTimes:val
            };
            getPlace(data).then(res=>{
                console.log(res,"分期带出来的");
                //this.fenqiArr = res.data;
               // this.positionArr = res.data;
                //this.projectNameArr=res.data
                this.positionArr=res.data;
            })
        },
        //位置选完以后
        placeChange(val){
            var data = {
                project:this.form.projectName,
                projectTimes:this.form.fenqi,
                place:val
            };
             getPlaceDesc(data).then(res=>{
                console.log(res,"位置带出来的");
                //this.fenqiArr = res.data;
               // this.positionArr = res.data;
                //this.projectNameArr=res.data
                //this.positionArr=res.data;
               // this.peopleArr = res.data;
               this.positionDescArr = res.data;
               this.peopleArr = res.data;

            })
        },
        //获取模块
        getMoudle(){
            var data = {}
            getCmodul(data).then(res=>{
                console.log(res,"维保模块")
                this.cmodulArr = res.data;
            })
        },
        //获取大类
        selectModul(val){
            console.log(val,"选完模块以后")
             var data = {
                modules:val
            }
            this.form.bclass = '';
            this.form.type = '';
            getBclass(data).then(res=>{
                console.log(res,"大类")
                //this.cmodulArr = res.data;
                this.bclassArr = res.data;
            })
        },
        //获取小类
        selectBclass(val){
            var data = {
                modules:this.cmodul,
                bclass:val
            }
            getSclass(data).then(res=>{
                console.log(res,"小类")
                //this.cmodulArr = res.data;
                this.typeArr = res.data;
            })
        }

    },
    mounted(){
            
        //this.getTypes();
       // this.getMoudle();
       this.getMoudle()
        this.getProjectNames()
    },
    activated(){
        this.form={
                projectName:'',
                fenqi:'',
                topic:'',
                year:"2019",
                type:'',
                period:"",//周期
                position:'',
                positionDesc:'',
                people:'',//责任方
                cmodule:'',//维保模块
                bclass:''//维保大类
            }
            this. resetForm("form") 
         
        //this.getMoudle();
        this.getMoudle()
        this.getProjectNames()
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
    .digo-box{
        height:290px;
        overflow: auto;
    }
</style>


