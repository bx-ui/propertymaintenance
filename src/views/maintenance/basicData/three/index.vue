<template>
    <div class="app-container calendar-list-container">
        <!-- 查询 -->
        <div class="selectIt" style="margin-bottom:15px">
            <el-form label-width="80px">
                <el-row :gutter="24">
                    <el-col :span="5">
                        <el-form-item label-width="60px" label="项目名">
                            <el-select size="small" v-model="listQuery.projectCode" clearable filterable @change="changePro(1)">
                                <el-option v-for="(item,index) in projectOption" :key="index" :value="item.code" :label="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label-width="70px" label="供应商名">
                            <el-select size="small" v-model="listQuery.supplierCode" clearable filterable @change="changeSup(1)" :disabled="listQuery.projectCode == ''">
                                <el-option v-for="(item,index) in supplierOption" :key="index" :value="item.code" :label="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label-width="60px" label="合同名">
                            <el-select size="small" v-model="listQuery.contractCode" clearable filterable :disabled="listQuery.projectCode == '' || listQuery.supplierCode == ''">
                                <el-option v-for="(item,index) in contractOption" :key="index" :value="item.code" :label="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="margin-top: 4px">
                        <el-button size="small" type="primary" @click="hander">查询</el-button>
                        <el-button size="small" type="primary" @click="refresh">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 按钮 -->
        <div class="btns" style="margin-bottom: 20px">
            <el-button size="small" type="primary" @click="add">新增</el-button>
            <el-button size="small" type="primary" @click="del">删除</el-button>
        </div>
        <!-- 列表 -->
        <el-table :data="tableData" border style="width: 100%" height="calc(100% - 150px)" @selection-change="handleSelectionChange">
             <el-table-column type="selection" width="55" fixed="left"></el-table-column>
            <el-table-column prop="projectName" label="项目" width="300" align="center"></el-table-column>
            <el-table-column prop="supplierName" label="供应商" width="300" align="center"></el-table-column>
            <el-table-column prop="contractName" label="合同" align="center"></el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-row style="text-align:center;margin-top:15px">
            <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page.sync="listQuery.page"
                :page-sizes="[10,20,30,50]"
                :page-size="listQuery.limit"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </el-row>
        <!-- 新增弹框 -->
        <el-dialog  title="新增" :visible.sync="dialogVisible"  width="40%">
            <el-form :rules="addRule" :model="addForm" ref="addForm" label-width="80px">
                <el-form-item prop="projectName" label="项目名">
                    <el-select size="small" v-model="addForm.projectName" clearable filterable @change="changePro(2)">
                        <el-option v-for="(item,index) in projectOption" :key="index" :value="item.code" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="supplierName" label="供应商名">
                    <el-select size="small" v-model="addForm.supplierName" clearable filterable @change="changeSup(2)" :disabled="addForm.projectName == ''">
                        <el-option v-for="(item,index) in supplierOption" :key="index" :value="item.code" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="contractName" label="合同名称">
                    <el-select size="small" v-model="addForm.contractName" clearable filterable :disabled="addForm.projectName == '' || addForm.supplierName == ''">
                        <el-option v-for="(item,index) in contractOption" :key="index" :value="item.code" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="doSubmit" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
  getData,
  getProject,
  getSupplier,
  getContract,
  addContract,
  deletes
} from "@/api/maintenance/three.js";
export default {
    data(){
        return {
            projectOption: [],
            supplierOption: [],
            contractOption: [],
            listQuery: {
                page: 1,
                limit: 10,
                projectCode: "",
                supplierCode: "",
                contractCode: "",
            },
            tableData: [],
            total: 0,
            addForm: {
                projectName: "",
                supplierName: "",
                contractName: "",
            },
            dialogVisible: false,
            addRule: {
                projectName:[{required: true, message: "请选择项目名称", trigger: "change"}],
                supplierName: [{required: true, message: "请选择供应商名称", trigger: "change"}],
                contractName: [{required: true, message: "请选择合同名称", trigger: "change"}],
            },
            multipleSelection: [],
            selId: [],
        }
    },
    methods: {
        sizeChange(val){
            this.listQuery.limit = val;
            this.getList();
        },
        currentChange(val){
            this.listQuery.page = val;
            this.getList();
        },
        getList(){
            getData(this.listQuery).then(res => {
                this.tableData = res.data.records;
                this.total = res.data.total;
            })
        },
        getPro(){
            getProject({type: 1}).then(res => {
                console.log(res);
                this.projectOption = res.data.data;
            })
        },
        // 选择项目带出供应商
        changePro(num){
            var data = num == 1 ? this.listQuery.projectCode : this.addForm.projectName;
            console.log(data,"111111")
            getSupplier({projectCode: data}).then(res => {
                this.supplierOption = res.data.data;
            })
        },
        // 带出合同
        changeSup(num){
            var data = num == 1 ? this.listQuery.supplierCode : this.addForm.supplierName;
            var projectCode = num == 1 ? this.listQuery.projectCode : this.addForm.projectName;
            getContract({supplierCode: data, projectCode}).then(res => {
                this.contractOption = res.data.data;
            })
        },
        // 添加按钮
        add(){
            this.$nextTick(() => {
                 this.$refs["addForm"].resetFields();
            })
            this.dialogVisible = true;
        },
        // 添加确定按钮
        doSubmit(){
             this.$refs['addForm'].validate((valid) => {
                 if(valid){
                     var loading = this.$loading({
                        lock: true,
                        text: "添加中，请稍后...",
                        spinner: "el-icon-loading",
                        background: "rgba(0, 0, 0, 0.7)"
                    });
                    addContract({projectUuid: this.addForm.projectName, supplierCode: this.addForm.supplierName, contractCode: this.addForm.contractName}).then(res => {
                        this.$message({
                            type: "success",
                            message: "添加成功",
                        })
                        loading.close();
                        this.dialogVisible = false;
                        this.getList();
                    })
                 }
             })
             
        },
        handleSelectionChange(val){
            this.multipleSelection = val;
            this.selId = val.map(v => v.id);
        },
        del(){
            if(!this.multipleSelection.length){
                this.$message({
                    type: 'error',
                    message: '至少选择一条数据',
                })
                return false;
            }
             var loading = this.$loading({
                lock: true,
                text: "删除中，请稍后...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            deletes(this.selId).then(res => {
                loading.close();
                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
                this.getList();
            })
        },
        refresh(){
            this.listQuery.projectName = ""
            this.listQuery.supplierName = ""
            this.listQuery.contractName = ""
        },
        hander(){
            this.listQuery.page = 1;
            this.getList();
        }
    },
    created(){
        this.getList();
        this.getPro();
    }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  height: 40px;
}
</style>