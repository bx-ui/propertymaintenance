<template>
     <div class="wrap app-container ">
        <!-- <common-title title="基本信息"></common-title> -->
        <div class="">
            <el-form label-width="100px" :model="form"  :rules="rules" ref="form">
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="项目" prop="projectName">
                           <el-select size="mini" v-model="form.projectName" placeholder="请选择">
                                <el-option
                                v-for="item in projectNameArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="分期" prop="fenqi">
                            <el-select size="mini" v-model="form.fenqi" placeholder="请选择">
                                <el-option
                                v-for="item in fenqiArr"
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
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="维保类型" prop="type">
                            <el-select size="mini" v-model="form.type" placeholder="请选择">
                                <el-option
                                v-for="item in typeArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
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
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="维保位置" prop="position">
                            <el-select size="mini" v-model="form.position" placeholder="请选择">
                                <el-option
                                v-for="item in positionArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="位置描述">
                            <el-input disabled v-model="form.positionDesc" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="责任方">
                            <el-input disabled v-model="form.people" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="">
                            
                        </el-form-item>
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
    </div>
</template>
<script>
export default {
    data(){
        return{
            form:{
                projectName:'',
                fenqi:'',
                topic:'',
                year:"",
                type:'',
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
                    { required: true, message: "请填写标题", trigger: 'blur' }
                ],
                year: [
                    { required: true, message: "请选择年份", trigger: 'change' }
                ],
                type: [
                    { required: true, message: "请选择类型", trigger: 'change' }
                ],
                period: [
                    { required: true, message: "请选择类型", trigger: 'change' }
                ],
                position: [
                    { required: true, message: "请选择类型", trigger: 'change' }
                ],
            },
            projectNameArr:[{value:"山海湾一期",label:"山海湾一期"}],
            fenqiArr:[{value:"一期",label:"一期"},{value:"二期",label:"二期"}],
            yearArr:[{ 
                value: '2018',
                label: '2018'
                },{value:"2019",label:"2019"},{value:"2020",label:"2020"},{value:"2021",label:"2021"},{value:"2022",label:"2022"},{value:"2023",label:"2023"},{value:"2024",label:"2024"},{value:"2025",label:"2025"},{value:"2026",label:"2026"},{value:"2027",label:"2027"},{value:"2028",label:"2028"},{value:"2029",label:"2029"},{value:"2030",label:"2030"},{value:"2031",label:"2031"},{value:"2032",label:"2032"},{value:"2033",label:"2033"},{
                    value:"2034",label:"2034"
                },{value:"2035",label:"2035"},{value:"2036",label:"2036"},{value:"2037",label:"2037"},{value:"2038",label:"2038"}],
            typeArr:[
                {value:"电梯",label:"电梯"},{value:"电动车",label:"电动车"}
            ],
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
            positionArr:[
                {value:"二号楼一梯",label:"二号楼一梯"}
            ],
           
            
            
        }
    },
    methods:{
        //返回
        back(){
            this.$router.push({
                path: "/maintenanceCenter/planManage",
            });
            this.resetForm("form")
        },
        //提交
        submit(){
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
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
</style>


