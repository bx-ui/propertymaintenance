<template>
    <div class="app-container calendar-list-container">
        <!-- 查询 -->
        <el-form label-width="60px">
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="结算单编号" label-width="80px">
                        <el-input v-model="listQuery.code" size="mini" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="结算单位">
                        <el-select v-model="listQuery.company" size="mini">
                            <el-option v-for="(item,index) in companyOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="发起人" label-width="50px">
                        <el-input size="mini" v-model="listQuery.people"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="发起时间" label-width="80px">
                        <el-date-picker size="mini" v-model="timer" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="状态" label-width="60px">
                        <el-select v-model="listQuery.state" size="mini">
                            <el-option v-for="(item,index) in stateOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                   <el-form-item label-width="0px">
                        <el-button size="mini" type="primary">查询</el-button>
                        <el-button size="mini" type="primary">重置</el-button>
                   </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--按钮 -->
        <el-row style="margin-bottom: 10px">
            <el-button size="mini" type="primary" @click="add">添加</el-button>
            <el-button size="mini" type="primary">作废</el-button>
        </el-row>
        <!-- 列表页 -->
        <setTable :tableList="tableList" :tableData="tableData" v-model="page"></setTable>
    </div>
</template>

<script>
import config from "@/config/config.js"
import setTable from "./common/table.vue"
import { getPage } from "api/settlement.js"
import { ERR_OK } from "api/config.js"
export default {
    data(){
        return {
            listQuery: {
                code: "",
                company: "",
                people: "",
                startTime: "",
                endTime: "",
                state: "",
                page: 1,
                limit: 10,
            },
            page: {
                limit: 10,
                page: 1,
                total: 0,
            },
            timer: [],
            companyOption: [],
            peopleOption: [],
            stateOption: [],
            tableData: [],
        }
    },
    components: {
        setTable
    },
    computed:{
        tableList(){
            return config.settlement.settlementTableList;
        }
    },
    methods: {
        add(){
             this.$router.push({
                name: "结算管理新增",
                // query: { id , name: '详情' ,itemId: this.itemId,state,configId: 2 },
            });
        },
        getList(){
            getPage(this.listQuery).then(res => {
                this.tableData = res.data.records;
                this.page.total = res.total;
            })
        }
    },
    created(){
        this.getList();
    }
}
</script>

<style lang="scss" scoped>
.el-col{
    height: 50px;
}
</style>