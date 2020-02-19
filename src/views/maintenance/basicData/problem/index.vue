<template>
    <div class="app-container calendar-list-container">
        <!-- 搜索 -->
        <el-form label-width="70px" :model="listQuery">
            <el-row :gutter="24">
                <el-col :span="7">
                    <el-form-item label="模块名称">
                        <el-select v-model="listQuery.parentId" size="mini" clearable filterable>
                            <el-option v-for="(item,index) in modelOption" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="名称">
                        <el-input size="mini" v-model="listQuery.name" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item label-width="0px">
                        <el-button size="mini" type="primary" @click="hander">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div style="margin-bottom:10px">
            <el-button size="mini" type="primary" @click="add">新增</el-button>
            <el-button size="mini" type="primary" @click="del">删除</el-button>
        </div>
        <!-- 列表页 -->
        <el-table :data="tableData" border style="width: 100%" height="calc(100% - 150px)"  @selection-change="handleSelectionChange">
            <el-table-column  type="selection" width="55" align="center"></el-table-column>
            <el-table-column label="模块名称" width="200" prop="name" align="center"></el-table-column>
            <el-table-column label="大类名称" width="200" prop="moduleName" align="center"></el-table-column>
            <el-table-column label="维修周期" width="300" prop="maintenanceCycle" align="center"></el-table-column>
            <el-table-column label="是否工区" width="300" prop="isPublicArea" align="center">
                <template slot-scope="scope">
                    {{ scope.row | showArea }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="update(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
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
        <!-- 弹框新增/修改/查看 -->
        <el-dialog title="新增问题" :visible.sync="dialogVisible" width="40%">
            <el-form :model="addForm" :rules="addRule" ref="addForm" label-width="70px">
                <el-form-item label="类型" prop="type">
                    <el-select v-model="addForm.type" size="mini" @change="getChange">
                        <el-option v-for="(item,index) in typeOption" :key="index" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <template v-if="addForm.type == 0">
                    <el-form-item label="是否工区" prop="isPublicArea">
                        <el-select v-model="addForm.isPublicArea" size="mini">
                            <el-option v-for="(item,index) in isOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="模块名" prop="name">
                        <el-input v-model="addForm.name" clearable size="mini"></el-input>
                    </el-form-item>
                </template>
                <template v-if="addForm.type == 1">
                    <el-form-item label="周期" prop="maintenanceCycle">
                        <el-input size="mini" v-model="addForm.maintenanceCycle" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="名称" prop="name">
                        <el-input size="mini" v-model="addForm.name" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="所属模块" prop="parentId">
                        <el-select size="mini" v-model="addForm.parentId" clearable>
                            <el-option v-for="(item,index) in modelOption" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                <el-button @click="doSubmit" size="mini" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>  
</template>

<script>
import {
  problemPage,
  addProblem,
  updateProblem,
  getModule,
  deleteProblem
} from "@/api/maintenance/problem.js";
export default {
    data(){
        return {
            listQuery: {
                parentId: "",
                name: "",
                page: 1,
                limit: 10,
            },
            total: 0,
            tableData: [],
            modelOption: [],
            dialogVisible: false,
            addForm: {
                type: 0,
                isPublicArea: 0,
                name: "",
                maintenanceCycle: "",
                parentId: "",
            },
            addRule:{
                type: [{required: true, message: "请选择类型", trigger: "blur"}],
                isPublicArea: [{required: true, message: "请选择是否工区", trigger: "blur"}],
                name: [{required: true, message: "请填写名称", trigger: "blur"}],
                maintenanceCycle: [{required: true, message: "请选择周期", trigger: "blur"}],
                parentId: [{required: true, message: "请选择所属模块", trigger: "blur"}]
            },
            typeOption: [{name: '模块', code: 0}, {name: '大类', code: 1}],
            isOption: [{name: '是', code: 1}, {name: '否', code: 0}],
            // parentOption: [],
            flag: 0,   //0 代表新增   1代表编辑
            multipleSelection: [],
            selId: [],
        }
    },
    filters: {
        showArea(value) {
            if(value.moduleName){
                return ""
            }else if(!value.moduleName && value.isPublicArea == '0'){
                return "否"
            }else{
                return "是"
            }
        }
    },
    methods: {
        add(){
            this.$nextTick(function(){
                 this.$refs['addForm'].resetFields();
            })
            this.flag = 0;
            this.dialogVisible = true;
        },
        update(row){
            console.log(row);
            // this.$nextTick(() => {
            //     this.$refs['addForm'].resetFields();
            //     row.type = row.moduleName ? 1 : 0;
                 
            //     row.parentId = row.moduleId ? Number(row.moduleId) : "";
               
            //     Object.assign(this.addForm, row);
            //     console.log(this.addForm,"0000")
            // })
            row.type = row.moduleName ? 1 : 0;
            row.parentId = row.moduleId ? Number(row.moduleId) : "";
            row.isPublicArea = row.isPublicArea ? Number(row.isPublicArea) : "";
            Object.assign(this.addForm, row);
            console.log(this.addForm,"0000")
            this.flag = 1;
            // updateProblem({id}).then(res => {

            // })
            this.dialogVisible = true;
        },
        getChange(){
            this.addForm.type == 0 ? 
            (this.addForm.maintenanceCycle = "", this.addForm.name = "", this.addForm.parentId = '') : 
            (this.addForm.isPublicArea = 0, this.addForm.name = "");
        },
        doSubmit(){
            this.$refs['addForm'].validate((valid) => {
                if(valid){
                    var loading = this.$loading({lock: true,text: '保存中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
                    if(this.flag == 0){
                        this.addForm.parentId = this.addForm.parentId ? this.addForm.parentId : 0;
                        addProblem(this.addForm).then(res => {
                            this.$message({
                                type: 'success',
                                message: '新增成功'
                            })
                            this.dialogVisible = false;
                            loading.close();
                            this.getList();
                        })
                    }else if(this.flag == 1){
                        updateProblem(this.addForm).then(res => {
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            })
                            this.dialogVisible = false;
                            loading.close();
                            this.getList();
                        })
                    }
                    
                }
            })
            
        },
        handleSelectionChange(val){
            this.multipleSelection = val;
            this.selId = val.map(v => v.id);
        },
        sizeChange(val){
            this.listQuery.limit = val;
            this.getList();
        },
        currentChange(val){
            this.listQuery.page = val;
            this.getList();
        },
        hander(){
            this.listQuery.page = 1;
            this.getList();
        },
        getList(){
            problemPage(this.listQuery).then(res => {
                this.tableData = res.data.records;
                this.total = res.data.total;
            })
        },
        getPName(){
            getModule().then(res => {
               this.modelOption = res.data.data;
            })
        },
        del(){
            if(this.selId.length > 1){
                this.$message({
                    type: 'error',
                    message: '最多选择一条数据'
                })
                return false;
            }
            if(this.selId.length == 0){
                 this.$message({
                    type: 'error',
                    message: '至少选择一条数据'
                })
                return false;
            }
            // console.log(this.multipleSelection);
            var obj = {};
            this.multipleSelection[0].moduleName ? obj.deleteBigClassId = this.selId[0] : obj.deleteModuleId = this.selId[0]
            deleteProblem(obj).then(res => {
                console.log(res);
                if(res.data.code == 0){
                    this.$message({
                        type: 'success',
                        message: res.data.msg,
                    })
                    this.getList();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.data.msg,
                    })
                     this.getList();
                }
            })
        }
    },
    created(){
        this.getList();
        this.getPName();
    }
}
</script>

<style lang="scss" scoped>
.el-form-item{
    height: 25px;
}
</style>