<template>
    <div class="app-container calendar-list-container">
        <div class="rel-tree">
            <div style="width: 80%; height: 40px; margin: 0 auto;margin-top: 15px">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small"></el-input>
            </div>
            <div class="tree-main">
                <el-tree
                    class="filter-tree"
                    :data="treeData"
                    :props="defaultProps"
                    default-expand-all
                    :filter-node-method="filterNode"
                    ref="tree"
                    @node-click="nodeClick">
                </el-tree>
            </div>
        </div>
        <div class="rel-table">
            <el-form label-width="40px">
                <el-row :gutter="6">
                   <el-col :span="5">
                        <el-form-item label="楼栋">
                            <el-select size="mini" v-model="listQuery.buildCode" filterable clearable>
                                <el-option v-for="(item,index) in buildOption" :key="index" :label="item.name" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                   </el-col>
                   <el-col :span="5">
                        <el-form-item label="模块">
                            <el-select size="mini" v-model="listQuery.moduleCode" filterable clearable @change="getBigC">
                                <el-option v-for="(item,index) in moduleOption" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                   </el-col>
                   <el-col :span="5">
                        <el-form-item label="大类">
                            <el-select size="mini" v-model="listQuery.bigClassCode" filterable clearable>
                                <el-option v-for="(item,index) in bigClassOption" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                   </el-col>
                   <el-col :span="6">
                        <el-form-item label="供应商" label-width="60px">
                            <el-select size="mini" v-model="listQuery.supplierCode" filterable clearable>
                                <el-option v-for="(item,index) in suppOption" :key="index" :label="item.name" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                   </el-col>
                   <el-col :span="2" >
                       <el-form-item label-width="10px">
                           <el-button size="mini" type="primary" @click="hander">查询</el-button>
                       </el-form-item>
                   </el-col>
                </el-row>
            </el-form>
            <div class="tree-btns">
                <el-button size="small" type="primary" @click="addTree" :disabled="!listQuery.projectStageCode">增加</el-button>
                <!-- :disabled="!listQuery.projectStageCode" -->
                <el-button size="small" type="primary" @click="del">删除</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" height="calc(100% - 120px)" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" fixed="left"></el-table-column>
                <el-table-column prop="buildName" label="楼栋" width="120" align="center"></el-table-column>
                <el-table-column prop="moduleName" label="模块" width="180" align="center"></el-table-column>
                <el-table-column prop="contractName" label="合同" width="180" align="center"></el-table-column>
                <el-table-column prop="bigClassName" label="大类" width="120" align="center"></el-table-column>
                <el-table-column prop="supplierName" label="供应商" align="center"></el-table-column>
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
        </div>
        <!-- 新增弹框 -->
        <el-dialog
        title="添加"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form :model="addForm" label-width="80px" :rules="addRule" ref="addForm">
            <el-form-item prop="bigClassId" label="模块,大类">
                <el-cascader v-model="addForm.bigClassId" :options="modelOption" :props="defaultParams" size="small"></el-cascader>
            </el-form-item>
            <el-form-item prop="supplierCode" label="供应商">
                <el-select size="small" v-model="addForm.supplierCode" clearable filterable @change="getConName">
                    <el-option v-for="(item,index) in suppOption" :key="index" :value="item.code" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="buildUuid" label="楼栋">
                <el-select size="small" v-model="addForm.buildUuid" clearable multiple filterable>
                    <el-option v-for="(item,index) in buildOption" :key="index" :value="item.code" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item prop="name" label="合同">
                <el-select size="small" v-model="addForm.contractCode" clearable filterable>
                    <el-option v-for="(item,index) in nameOption" :key="index" :value="item.code" :label="item.name"></el-option>
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
import relQuery from "./relQuery.vue"
import {
  getProjectTree,
  problemSupplierPage,
  getSupplierByStage,
  getModelData,
  getBuild,
  addProblemSupplier,
  deleteProblemSupplier,
  getModule,
  getBigClass,
  getContractByStage
} from "@/api/maintenance/relation.js";
import { mixinProject } from "@/mixins/itemAndCon.js"
export default {
    mixins: [mixinProject],
    data(){
        return {
            filterText: "",
            treeData: [],
            defaultProps:{
                children: "children",
                label: "name",
                id: "buildId"
            },
            tableData: [],
            listQuery: {
                page: 1,
                limit: 10,
                projectStageCode: "",
                buildCode: "",
                moduleCode: "",
                bigClassCode: "",
                supplierCode: "",
            },
            total: 0,
            dialogVisible: false,
            addForm: {
                bigClassId: [],
                supplierCode: "",
                buildUuid: "",
                contractCode: "",
            },
            addRule: {
                bigClassId: [{required: true, message: "请选择模块大类", trigger: "change"}],
                supplierCode: [{required: true, message: "请选择供应商", trigger: "change"}],
                // buildUuid: [{required: true, message: "请选择楼栋", trigger: "blur"}],
                contractCode: [{required: true, message: "请选择合同", trigger: "change"}],
            },
            modelOption: [],
            bigClassOption: [],
            defaultParams:{ 
                label: 'name',
                value: 'id',
                children: 'children'
            },
            suppOption: [],
            buildOption: [],
            nameOption: [],
            moduleOption: [],
            multipleSelection: [],
            selId: [],
            index: 0,
        }
    },
    watch:{
        filterText(val){
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        getTree(){
            getProjectTree().then(res => {
                console.log(res)
                this.treeData = res.data;
            })
        },
        getConName(){
            // supplierCode
            getContractByStage({supplierCode: this.addForm.supplierCode, projectStageCode: this.listQuery.projectStageCode}).then(res => {
                this.nameOption = res.data.data;
            })
        },
        nodeClick(obj,node,data){
           console.log(obj);
           if(obj.children){
               return false;
           }
           this.listQuery.projectStageCode = obj.id;
            this.getList();
            // 搜索框更新
            this.getSupper();
            this.getBu();
            this.getdataModule();
        },
        getdataModule(){
            getModule().then(res => {
                this.moduleOption = res.data.data;
            })
        },
        getBigC(){
            this.listQuery.bigClassCode = "";
            getBigClass({moduleId: this.listQuery.moduleCode}).then(res => {
                this.bigClassOption = res.data.data;
            })
        },
        getList(){
            problemSupplierPage(this.listQuery).then(res => {
                this.tableData = res.data.records;
                this.total = res.data.total;
            })
        },
        sizeChange(val){
            this.listQuery.limit = val;
            this.getList();
        },
        currentChange(val){
            this.listQuery.page = val;
            this.getList();
        },
        filterNode(value,data,node){
             if (!value) return true;
             console.log(data)
            return data.name.indexOf(value) !== -1;
        },
        // 获取供应商
        getSupper(){
            getSupplierByStage({projectStageCode: this.listQuery.projectStageCode}).then(res => {
                this.suppOption = res.data.data;
            })
        },
        changeDataFuck(data){
            for(var i=0;i<data.length;i++){
                for(var j=0;j<data[i].children.length; j++){
                    delete data[i].children[j].children;
                }
            }
            return data;
        },
        // 获取模块信息
        getModelMessage(){
            getModelData().then(res =>{
                this.modelOption = this.changeDataFuck(res.data)
            })
        },
        // 获取楼栋信息
        getBu(){
            getBuild({projectStageCode: this.listQuery.projectStageCode}).then(res => {
                this.buildOption = res.data;
            })
        },
        addTree(){
            this.$nextTick(() => {
                this.$refs["addForm"].resetFields();
            })
            this.dialogVisible = true;
            this.getSupper();
            this.getModelMessage();
            this.getBu();
        },
        doSubmit(){
            this.$refs['addForm'].validate((valid) => {
                if(valid){
                     var loading = this.$loading({
                        lock: true,
                        text: "添加中，请稍后...",
                        spinner: "el-icon-loading",
                        background: "rgba(0, 0, 0, 0.7)"
                    })
                    console.log(this.addForm.contractCode)
                    addProblemSupplier({projectStageCode: this.listQuery.projectStageCode, problemId: this.addForm.bigClassId[1], supplierCode: this.addForm.supplierCode, buildIds: this.addForm.buildUuid, contractCode: this.addForm.contractCode}).then(res => {
                        this.$message({
                            type: "success",
                            message: "添加成功"
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
                    type: "error",
                    message: "至少选择一条数据"
                })
                return false;
            }
            var loading = this.$loading({
                lock: true,
                text: "删除中，请稍后...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            })
            deleteProblemSupplier(this.selId).then(res => {
                this.$message({
                    type: "success",
                    message: "删除成功",
                })
                this.getList();
                loading.close();
            })
        },
        hander(){
            this.listQuery.page = 1;
            this.getList();
        }
    },
    created(){
        this.getTree();
        // this.getPro();
    }
}
</script>

<style lang="scss" scoped>
.app-container{
    // width: 100%;
    // height: 100%;
    display: flex;
    justify-content: space-between;
}
.rel-tree{
    width: 22%;
    height: 100%;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}
.rel-table{
    width: 77%;
    height: 100%;
}
.tree-main{
    overflow: scroll;
}
.tree-btns{
    width: 140px;
    height: 40px;
    float: left;
    padding-right: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.el-tree{
    color: black !important;
}
.el-col {
    height: 46px;
}
</style>