<template>
    <div class="app-container calendar-list-container">
        <el-form :model="addForm" :rules="addRule" ref="addForm" label-width="80px">
            <el-row :gutter="24">
                <el-col :span="8">
                    <el-form-item label="结算单号" prop="code">
                        <el-input v-model="addForm.code" size="mini" clearable :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="项目" prop="projectUuid" label-width="80px">
                        <el-select v-model="addForm.projectUuid" size="mini" filterable clearable @change="_getUnit">
                            <el-option v-for="(item,index) in projectOption" :key="index" :label="item.projectName" :value="item.projectId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="8">
                    <el-form-item label="分期" prop="projectStage" label-width="80px">
                        <el-select v-model="addForm.projectStage" size="mini" filterable clearable>
                            <el-option v-for="(item,index) in projectStageOption" :key="index" :label="item.projectStageName" :value="item.projectStageUuid"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="供应商" prop="supplier">
                        <el-select v-model="addForm.supplier" size="mini" filterable clearable>
                            <el-option v-for="(item,index) in supplierOption" :key="index" :label="item.name" :value="item.contractCode"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="8">
                    <el-form-item label="发起人" prop="people">
                        <el-input v-model="addForm.people" size="mini" clearable :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                  <el-col :span="8">
                    <el-form-item label="发起时间" prop="people">
                        <el-input v-model="addForm.time" size="mini" clearable :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div style="margin-bottom: 15px">
            <el-button size="mini" type="primary" @click="changeOrder" :disabled="this.addForm.supplier == ''">选择验收单</el-button>
            <el-button size="mini" type="primary" @click="delOrder">删除</el-button>
        </div>
        <!-- 列表页数据 -->
        <el-table :data="tableData" max-height="300px" style="width: 100%" @selection-change="handleChange">
            <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="wxCode" label="维修单号" width="140" align="center"></el-table-column>
                <el-table-column prop="ysCode" label="验收单号" width="150" align="center"></el-table-column>
                <el-table-column prop="ysTime" label="验收时间" width="100" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.ysTime | date('yyyy-MM-dd') }}
                    </template>
                </el-table-column>
                <el-table-column prop="approvedMoney" label="成本预算金额" width="100" align="center"></el-table-column>
                <el-table-column prop="accMoney" label="验收世纪金额" width="100" align="center"></el-table-column>
                <el-table-column prop="zrSupplierName" label="主要责任方" width="100" align="center"></el-table-column>
            <el-table-column prop="seven" label="责任比例分配" align="center">
                <template slot-scope="scope">
                    <!-- <span @click="seeNumber(scope.row)" class="see-number">查看比例</span> -->
                        <el-popover
                        placement="left"
                        title="比例"
                        width="600"
                        trigger="click">
                        <el-table :data="scope.row.seven" height="200px" border>
                            <el-table-column prop="supplierName" label="供应商"></el-table-column>
                                <el-table-column prop="bb" label="责任比例" width="200"></el-table-column>
                                <el-table-column prop="dutyRatio" label="金额" width="200"></el-table-column>
                        </el-table>
                        <el-button slot="reference"  @click="seeSev(scope.row)" class="see-number">查看比例</el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <div class="btns">
            <el-button size="mini" type="primary" @click="doSubmit">确认</el-button>
        </div>
        <!-- 选择列表页弹框 -->
        <el-dialog title="验收信息" :visible.sync="dialogVisible" width="80%" v-if="dialogVisible">
            <el-form>
                <el-row :gutter="24">
                    <el-col :span="11">
                        <el-form-item label="验收日期" label-width="80px">
                            <el-date-picker
                            size="mini"
                                v-model="timer"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item>
                            <el-button size="mini" type="primary">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="tableDataChange" height="300px" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="wxCode" label="维修单号" width="140" align="center"></el-table-column>
                <el-table-column prop="ysCode" label="验收单号" width="150" align="center"></el-table-column>
                <el-table-column prop="ysTime" label="验收时间" width="100" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.ysTime | date('yyyy-MM-dd') }}
                    </template>
                </el-table-column>
                <el-table-column prop="approvedMoney" label="成本预算金额" width="100" align="center"></el-table-column>
                <el-table-column prop="accMoney" label="验收世纪金额" width="100" align="center"></el-table-column>
                <el-table-column prop="zrSupplierName" label="主要责任方" width="100" align="center"></el-table-column>
                <el-table-column prop="seven" label="责任比例分配" align="center" width="130">
                    <template slot-scope="scope">
                        <!-- <span @click="seeNumber(scope.row)" class="see-number">查看比例</span> -->
                         <el-popover
                            placement="left"
                            title="比例"
                            width="600"
                            trigger="click">
                            <el-table :data="scope.row.seven" height="200px" border>
                                <el-table-column prop="supplierName" label="供应商"></el-table-column>
                                <el-table-column prop="bb" label="责任比例" width="200"></el-table-column>
                                <el-table-column prop="dutyRatio" label="金额" width="200"></el-table-column>
                            </el-table>
                            <el-button slot="reference"  @click="seeNumber(scope.row)" class="see-number">查看比例</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="eight" label="报修提报日期" align="center"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="addTableData" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getYsListByJs, getZrRatioByMaintenanceId,add } from "api/settlement.js"
import { ERR_OK } from "api/config.js"
import {
  getProjects,
  getUnit
} from "@/api/maintenance/hzpropertyrepair";
import { getProviders } from "@/api/repair/repair";
export default {
    data(){
        return {
            addForm: {
                code: "",
                projectUuid: "",
                projectStage: "",
                supplier: "",
                people: "",
            },
            addRule: {
                code: [{required: true, message: "请填写结算单号", trigger: "blur"}],
                projectUuid: [{required: true, message: "请选择项目", trigger: "blur"}],
                projectStage: [{required: true, message: "请选择分期", trigger: "blur"}],
                supplier: [{required: true, message: "请选择供应商", trigger: "blur"}],
            },
            Lander: JSON.parse(sessionStorage.getItem("userInfo")).content.userId,
            projectOption: [],
            projectStageOption: [],
            supplierOption: [],
            peopleOption: [],
            // 表格数据
            tableData: [],
            tableDataChange: [
                // {id: 1, one: 'wx00000', two: 'bx11111', three: '2019-01-01', four: '1200', five: '2500', six: '管理员', seven: [{aa: '111', bb: '222', cc: '333'}], eight: '2020-01-01'},
                // {id: 2, one: 'wx3330', two: 'bx113331', three: '2019-01-01', four: '1600', five: '2200', six: '管理员2', seven: [{aa: '111', bb: '222', cc: '333'}], eight: '2020-01-01'}
            ],
            tablePopoverData: [],
            dialogVisible: false,
            timer: [],
            // 弹框中
            multion: [],
            selId: [],
            // 列表页
            multionList: [],
            selIdList: [],
        }
    },
    computed:{
    },
    methods: {
        changeOrder(){
            this.$nextTick(() => {
                this.selId = [];
                this.multion = [];
            })
            this._getYsListByJs();
            this.dialogVisible = true;
        },
        _getYsListByJs(){
            getYsListByJs({contractCode: this.addForm.supplier}).then(res => {
                console.log(res,"11111")
                this.tableDataChange = res.data;
            })
        },
        seeNumber(row){
            getZrRatioByMaintenanceId(row.maintenanceId).then(res => {
                console.log(res);
                let data = res.data;
                this.tableDataChange.forEach((item,index) => {
                    if(item.maintenanceId == row.maintenanceId){
                        this.$set(item, 'seven', data);
                    }
                })
                console.log(this.tableDataChange);
            })
        },
        seeSev(row){
            getZrRatioByMaintenanceId(row.maintenanceId).then(res => {
                console.log(res);
                let data = res.data;
                this.tableData.forEach((item,index) => {
                    if(item.maintenanceId == row.maintenanceId){
                        this.$set(item, 'seven', data);
                    }
                })
                console.log(this.tableData);
            })
        },
        addTableData(){
            var flag = false;
            if(!this.selId.length){
                this.$message({
                    type: 'error',
                    message: '至少选择一条数据'
                })
                return false;
            }
            this.multion.forEach((item,index) => {
                if(this.tableData.map(v => v.id).indexOf(item.id) != -1){
                    flag = true;
                }
            })
            if(flag){
                this.$message({
                    type: 'error',
                    message: '存在已经选择的数据,请重新选择'
                })
                return false;
            }
            this.multion.forEach((item,index) => {
                this.tableData.push(item);
            })
            this.dialogVisible = false;
        },
        handleSelectionChange(val){
            this.multion = val;
            this.selId = val.map(v => v.id);
        },
        handleChange(val){
             this.multionList = val;
            this.selIdList = val.map(v => v.id);
        },
        // checkSelectable(row, index){
        //     return this.selId.indexOf(row.id) == -1 ? true : false;
        // }
        delOrder(){
            this.multionList.forEach((item,index) => {
                this.tableData.splice(this.tableData.map(v => v.id).indexOf(item.id), 1);
            })
        },
        _getProjects(){
            getProjects({type: 1, userId: this.Lander}).then(res => {
                this.projectOption = res.data;
            })
        },
        _getUnit(){
            getUnit({ projectUuid: this.addForm.projectUuid }).then(res => {
                this.projectStageOption = res.data;
            })
            // 获取合同
            getProviders({ projectUuid: this.addForm.projectUuid }).then(res => {
                this.supplierOption = res.data;
            })
        },
        doSubmit(){
            let list = this.tableData.map(v => v.ysId);
            let arr = [];
            list.forEach(item => {
                arr.push({acceptanceId: item})
            })  
            let obj = {
                hzSettlementDetailsList: arr,
            }
            console.log(obj,"1111111");
            add(obj).then(res => {

            })
        }
    },
    created(){
        this._getProjects();
    }
}
</script>
<style lang="scss" scoped>
.see-number{
    color: blue;
    cursor: pointer;
}
// .app-container{
//     position: relative;
// }
.btns{
    margin-top: 30px;
    text-align: center;
}
.el-row{
    // padding-left: 100px;
    display: flex;
    justify-content: space-between
}
</style>