<template>
     <div class="wrap app-container ">
        <!-- <common-title title="基本信息"></common-title> -->
        <div class="">
            <el-form label-width="100px">
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="项目">
                            <el-input disabled v-model="projectName" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="分期">
                            <el-input disabled v-model="fenqi" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="报修标题">
                            <el-input disabled v-model="topic" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="下单编号">
                            <el-input disabled v-model="code" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="维保位置">
                            <el-input disabled v-model="position" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="位置描述">
                            <el-input disabled v-model="positionDesc" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="计划结束">
                            <el-input disabled v-model="endtime" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="实际开始">
                            <el-input disabled v-model="starttime" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="实际结束">
                            <el-input disabled v-model="starttimeend" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="考核标准">
                            <el-select size="mini" v-model="standard" placeholder="请选择">
                                <el-option
                                v-for="item in standardArr"
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
                        <el-form-item label="考核说明">
                             <el-input  v-model="shuoming" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="扣款活动">
                            <el-input disabled v-model="contract" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="扣款金额">
                             <el-input  v-model="money" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="责任方">
                            <el-input disabled v-model="zeren" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        
                    </el-row>
                </el-row>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="8">
                        <el-form-item label="闭单时间">
                             <el-input  v-model="endordertime" size="mini"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="">
                            <!-- <el-input disabled v-model="zeren" size="mini"></el-input> -->
                        </el-form-item>
                        </el-col>
                        
                    </el-row>
                </el-row>
            </el-form>
            <div class="btn-box">
                <div class="btn">
                    <el-button type="primary" size="small">提交</el-button>
                    <el-button type="primary" size="small">闭单</el-button>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            projectName:'',
            fenqi:'',
            topic:'',
            code:'',
            position:'',
            positionDesc:'',
            endtime:'',
            starttime:'',
            starttimeend:'',
            standardArr:[{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }],
            standard:'',
            contract:'',
            money:"100元",
            shuoming:'',
            zeren:'',
            endordertime:''
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


