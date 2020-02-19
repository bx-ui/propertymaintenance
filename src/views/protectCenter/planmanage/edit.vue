<template>
     <div class="wrap app-container ">
        <!-- <common-title title="基本信息"></common-title> -->
        <div class="">
            <el-form label-width="100px" :model="form"  :rules="rules" ref="form">
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="项目" prop="projectName">
                            <el-input disabled v-model="form.projectName" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="分期" prop="fenqi">
                            <el-input disabled v-model="form.fenqi" size="mini"></el-input>
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
                <!-- 维保模块 -->
                 <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="维保模块" prop="moudles">
                            <el-select size="mini" v-model="form.moudles" placeholder="请选择"
                            @change="selectModul">
                                <el-option
                                v-for="item in typeArr"
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
                            @change=" selectBclass">
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
                        <!-- <el-col :span="8">
                        <el-form-item label="维保小类" prop="sclass">
                            <el-select size="mini" v-model="form.sclass" placeholder="请选择">
                                <el-option
                                v-for="item in sclassArr"
                                :key="item.sclass"
                                :label="item.sclass"
                                :value="item.sclass">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col> -->
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
                            <el-select size="mini" v-model="form.position" placeholder="请选择"
                            @change="getPositionDesc">
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
                            <el-select size="mini" v-model="form.positionDesc" placeholder="请选择">
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
                    <el-button type="primary" size="small" @click="submit">修改</el-button>
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
                <div v-if="sclassArr.length==0" style="width:100%;text-align:center">
                    请先选择维保模块和维保大类才可查看维保小类
                </div>
                <div v-for="(item,index) in sclassArr" :key="index">
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
import {getDetail,getCmodul,getBclass,getSclass,getPlace,getPlaceDesc,getProjectName,updateSubmit} from "@/api/maintenaceCenter/planManage.js"
export default {
    data(){
        return{
            sclassDiago:false,
            form:{
                projectName:'',
                fenqi:'',
                topic:'',
                year:"",
                moudles:'',//模块
                bclass:'',//大类
                sclass:'',//小类
                period:"",//周期
                position:'',
                positionDesc:'',
                people:'',//责任方
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
                moudles: [
                    { required: true, message: "请选择维保模块", trigger: 'change' }
                ],
                bclass: [
                    { required: true, message: "请选择维保大类", trigger: 'change' }
                ],
                // sclass: [
                //     { required: true, message: "请选择维保小类", trigger: 'change' }
                // ],
                period: [
                    { required: true, message: "请选择周期", trigger: 'change' }
                ],
                position: [
                    { required: true, message: "请选择位置", trigger: 'change' }
                ],
                 positionDesc: [
                    { required: true, message: "请选择类型描述", trigger: 'change' }
                ],
                 people: [
                    { required: true, message: "请选择类型方", trigger: 'change' }
                ],
                
            },
            projectNameArr:[],
            fenqiArr:[],
            yearArr:[{ 
                value: '2018',
                label: '2018'
                },{value:"2019",label:"2019"},{value:"2020",label:"2020"},{value:"2021",label:"2021"},{value:"2022",label:"2022"},{value:"2023",label:"2023"},{value:"2024",label:"2024"},{value:"2025",label:"2025"},{value:"2026",label:"2026"},{value:"2027",label:"2027"},{value:"2028",label:"2028"},{value:"2029",label:"2029"},{value:"2030",label:"2030"},{value:"2031",label:"2031"},{value:"2032",label:"2032"},{value:"2033",label:"2033"},{
                    value:"2034",label:"2034"
                },{value:"2035",label:"2035"},{value:"2036",label:"2036"},{value:"2037",label:"2037"},{value:"2038",label:"2038"}],
            typeArr:[],//模块
            bclassArr:[],//大类
            sclassArr:[],//小类
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
                }
            ],
            positionArr:[],
            positionDescArr:[],
            peopleArr:[],
            itemId:null
        }
    },
    methods:{
        seeSclass(){
            console.log("点击")
            this.sclassDiago = true;
        },
        handleClose(){
            this.sclassDiago = false
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
            //         form:{
            //     projectName:'',
            //     fenqi:'',
            //     topic:'',
            //     year:"",
            //     type:'',
            //     period:"",//周期
            //     position:'',
            //     positionDesc:'',
            //     people:'',//责任方
            // },
                    var data = {
                        id:this.itemId,
                        project:this.form.projectName,
                        projectTimes:this.form.fenqi,
                        title:this.form.topic,
                        years:this.form.year,
                        cmodul:this.form.moudles,
                        bclass:this.form.bclass,
                        sclass:this.form.sclass,
                        frequency:this.form.period,
                        place:this.form.position,
                        placeDescribe:this.form.positionDesc,
                        supplierCode:this.form.people
                    }
                    updateSubmit(data).then(res=>{
                        console.log(res,"修改成功")
                        if(res.data.code==0){
                            this.$message({
                                type:"success",
                                message:"修改成功"
                            });
                            this.$router.push({
                                path: "/protectCenter/planmanage",
                            })
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
        //获取列表
        getDetails(ids){
            var data = {
                id:ids
            }
            getDetail(data).then(res=>{
                console.log(res)
                if(res.data.code==0){
                    var dataList = res.data.data;
                    this.form.topic = dataList.title;
                    this.form.year = dataList.years;
                    this.form.moudles = dataList.cmodul;//模块
                    this.form.bclass = dataList.bclass;//大类
                    this.form.sclass = dataList.sclass;//小类
                    this.form.period = dataList.frequency;//周期
                    this.form.position = dataList.place;
                    this.form.positionDesc = dataList.placeDescribe;
                    this.form.people = dataList.supplierCode
                }
            })
        },
        // 获取维保模块
        getmoudle(){
            var data = {
            }
           getCmodul(data).then(res=>{
                console.log(res,"维保模块")
                this.typeArr = res.data;
            })
        },
        //获取维保大类
         //获取大类
        selectModul(val){
            console.log(val,"选完模块以后")
             var data = {
                modules:val
            }
            this.form.bclass = '';
            this.form.sclass = '';
            getBclass(data).then(res=>{
                console.log(res,"大类")
                //this.cmodulArr = res.data;
                this.bclassArr = res.data;
            })
        },
        //获取小类
        selectBclass(val){
            var data = {
                modules:this.form.moudles,
                bclass:val
            }
            getSclass(data).then(res=>{
                console.log(res,"小类")
                //this.cmodulArr = res.data;
                this.sclassArr = res.data;
            })
        },
        //由项目和分期带出维保位置
        getPosition(){
            var data = {
                project:this.form.projectName,
                projectTimes:this.form.fenqi
            }
            getPlace(data).then(res=>{
                console.log(res)
                this.positionArr = res.data;
            })
        },
        //由位置带出位置描述
        getPositionDesc(val){
            var data = {
               project:this.form.projectName,
               projectTimes:this.form.fenqi,
               place:val
            }
            this.form.positionDesc='';
            this.form.people=''
            getPlaceDesc(data).then(res=>{
                console.log(res)
                this.positionDescArr= res.data;
                this.peopleArr = res.data;
            })
        }
    },
    mounted(){
        this.itemId = this.$route.query.id
        var id  = this.$route.query.id;
        console.log(id,this.$route.query.projectName,"idddd")
        this.form.projectName = this.$route.query.projectName;
        this.form.fenqi = this.$route.query.projectTimes;
        
        this.getDetails(id);
        this.getmoudle();
        this.getPosition()
        
    },
    activated(){
        this.itemId = this.$route.query.id
        var id  = this.$route.query.id;
        console.log(id,this.$route.query.projectName,"idddd")
        this.form.projectName = this.$route.query.projectName;
        this.form.fenqi = this.$route.query.projectTimes;
        this.getDetails(id);
        this.getmoudle();
        this.getPosition()
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


