<template>
    <div>
        <el-form label-width="60px" ref="selectForm">
            <el-row :gutter="24">
                <el-col :span="4">
                    <el-form-item label="姓名" label-width="50px" prop="name">
                        <el-input size="mini" v-model="listQuery.name" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="职能名称" prop="functionCode">
                        <el-select v-model="listQuery.functionCode" size="mini" clearable @change="getWork">
                            <el-option v-for="(item,index) in jobOption" :key="index" :value="item.parentCode" :label="item.parentName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="岗位" label-width="40px" prop="roleCode">
                        <el-select v-model="listQuery.roleCode" size="mini" clearable>
                            <el-option v-for="(item,index) in roleOption" :key="index" :value="item.code" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="性别" label-width="40px" prop="sex">
                        <el-select v-model="listQuery.sex" size="mini" clearable>
                            <el-option v-for="(item,index) in genderOption" :key="index" :value="item.code" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="身份证号" label-width="60px" prop="idCard">
                        <el-input size="mini" v-model="listQuery.idCard" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="4">
                    <el-form-item label="供应商" label-width="50px" prop="supplierCode">
                        <el-input size="mini" v-model="listQuery.supplierCode" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="状态" label-width="60px" prop="state">
                        <el-select v-model="listQuery.state" size="mini" clearable>
                            <el-option v-for="(item,index) in stateOption" :key="index" :value="item.code" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                 <el-col :span="6">
                    <el-form-item label="入职时间" label-width="60px" clearable>
                        <el-date-picker v-model="inTimer" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6"> 
                    <el-form-item label="离职时间" label-width="60px" clearable>
                        <el-date-picker v-model="outTimer" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label-width="0px">
                        <el-button size="mini" type="primary" @click="hander">查询</el-button>
                        <el-button size="mini" type="primary" @click="refresh">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { mixinWork } from "@/mixins/jobAndWork.js"
export default {
    mixins: [mixinWork],
    props :{
        stateOption: {
            type: Array,
            default: [],
        }
    },
    data(){
        return {
            listQuery: {
                name: "",
                functionCode: "",
                roleCode: "",
                sex: "",
                idCard: "",
                supplierCode: "",
                state: "",
                entryStartTime: "",
                entryEndTime: "",
                departureStartTime: "",
                departureEndTime: "",
            },
            // 搜索option值
            jobOption: [],
            roleOption: [],
            genderOption: [{code: "", name: "全部"},{code: 0, name: "女"},{code: 1, name: "男"}],
            // 时间框
            inTimer: [],
            outTimer: [],
            // stateOption: [{code: "", name: "全部"},{code: 0, name: "暂存"}, {code: 1, name: "在职"}, {code: 2, name: "离职"}, {code: 3, name: "入职申请中"}, {code: 4, name: "待上岗确认"}, {code: 5, name: "离职申请中"}, {code: 6, name: "待离职确认"}],
        }
    },
    created(){
        this.getParentCode().then(res => {
            this.jobOption = res;
        })
    },
    methods:{
        getWork(){
            this.getCode(this.listQuery.functionCode).then(res => {
                this.roleOption = res;
            })
        },
        hander(){
            this.$emit("selectChange",this.listQuery);
        },
        refresh(){
            this.$refs['selectForm'].resetFields();
        }
    }
}
</script>
<style lang="scss" scoped>
.el-col{
    height: 45px;
}
</style>