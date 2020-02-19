<template>
    <div class="app-container calendar-list-container">
        <div class="pepple-tree">
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
        <div class="people-table">
            <div class="selectIt">
                <el-form label-width="40px">
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <el-form-item label="姓名" label-width="60px">
                                <el-input v-model="listQuery.name" size="mini" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="身份证号" label-width="60px">
                                <el-input v-model="listQuery.idCard" size="mini" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="时间">
                                <el-date-picker v-model="timer" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="6">
                           <el-form-item label="岗位" label-width="60px">
                                <el-select v-model="listQuery.roleCode" size="mini" clearable>
                                    <el-option v-for="(item,index) in useOption" :key="index" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                           </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label-width="60px" label="是否可用">
                                <el-select v-model="listQuery.isUsable" size="mini" clearable>
                                    <el-option v-for="(item,index) in isOption" :key="index" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                           </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label-width="0px">
                                <el-button size="mini" type="primary" @click="hander">查询</el-button>
                                <el-button size="mini" type="primary">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="people-btns">
                <el-button size="mini" type="primary" @click="add">新增</el-button>
                <el-button size="mini" type="primary">删除</el-button>
            </div>
            <el-table :data="tableData" border height="calc(100% - 180px)" style="width: 100%">
                <el-table-column width="55" type="selection"></el-table-column>
                <el-table-column width="150" label="编号" prop="code" align="center"></el-table-column>
                <el-table-column width="150" label="姓名" prop="name" align="center"></el-table-column>
                <el-table-column width="80" label="性别" prop="gender" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.gender | showGender }}
                    </template>
                </el-table-column>
                <el-table-column width="150" label="身份证号" prop="idCard" align="center"></el-table-column>
                <el-table-column width="150" label="创建时间" prop="createTime" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.createTime | showTime }}
                    </template>
                </el-table-column>
                <el-table-column width="150" label="是否可用" prop="isUsable" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.isUsable | showAble }}
                    </template>
                </el-table-column>
                 <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
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
        </div>
        <el-dialog title="新增" :visible.sync="dialogVisible" width="50%">
            <el-form :model="addForm" ref="addForm" :rules="addRule" label-width="50px">
                <el-row :gutter="24">
                    <el-col :span="10">
                        <el-form-item prop="name" label="姓名" label-width="70px">
                            <el-input v-model="addForm.name" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item prop="isUsable" label="性别" label-width="70px">
                            <el-select size="mini" v-model="addForm.isUsable">
                                <el-option v-for="(item,index) in manOption" :key="index" :value="item.id" :label="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="10">
                        <el-form-item prop="idCard" label="身份证号" label-width="70px">
                            <el-input v-model="addForm.idCard" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item prop="phone" label="手机号码" label-width="70px">
                            <el-input v-model="addForm.phone" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-row :gutter="24">
                    <el-col :span="10">
                        <el-form-item prop="isUsable" label="是否可用" label-width="70px">
                            <el-select v-model="addForm.isUsable" size="mini" filterable clearable>
                                <el-option v-for="(item,index) in ableOption" :key="index" :value="item.id" :label="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item prop="roleCode" label="岗位" label-width="70px">
                            <el-select v-model="addForm.roleCode" size="mini" multiple filterable clearable>
                                <el-option v-for="(item,index) in roleOption" :key="index" :label="item.name" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
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
  getProjectTree,
  getRoleMessage,
  getPage,
  save,
} from "@/api/maintenance/peopleMessage.js";
export default {
    data(){
        return {
            filterText: "",
            treeData: [],
            defaultProps:{ 
                label: 'name',
                value: 'id',
                children: 'children'
            },
            listQuery:{
                page: 1,
                limit: 10,
                name: "",
                idCard: "",
                startTime: "",
                endTime: "",
                isUsable: "",
                roleCode: "",
                projectStageCode: "",
            },
            total: 0,
            timer: [],
            useOption: [],
            manOption: [{id: 1, name: "男"},{id: 2, name: "女"}],
            ableOption: [{id: 1,name: "可用"},{id: 0, name: "不可用"}],
            isOption: [{id: "", name: "全部"},{id: 1,name: "可用"},{id: 0, name: "不可用"}],
            roleOption: [],
            tableData: [],
            dialogVisible: false,
            addForm: {
                name: "",
                isUsable: "",
                idCard: "",
                phone: "",
                isUsable: "",
                roleCode: [],
            },
            addRule:{
                name:[{required: true, message: "请输入用户", trigger: "blur"}],
                isUsable: [{required: true, message: "请选择性别", trigger: "change"}],
                idCard: [
                   {required: true, message: "请输入身份证号", trigger: "blur"},
                    {
                        pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                        message: "证件号码格式有误",
                        trigger: "blur"
                    },
                ],
                phone: [
                    {required: true, message: "请输入身份证号", trigger: "blur"},
                    {
                        pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
                        message: "手机号码格式有误",
                        trigger: "blur"
                    }
                ],
                isUsable: [{required: true, message: "请选择是否可用", trigger: "change"}],
                roleCode: [{required: true, message: "请选择岗位", trigger: "change"}],
            }
        }
    },
    filters: {
        showAble(value){
            const statusDef = {
                0: "不可用",
                1: "可用",
            };
            return statusDef[value];
        },
        showGender(value){
             const statusDef = {
                0: "女",
                1: "男",
            };
            return statusDef[value];
        },
        showTime(value){
            return value.split(" ")[0];
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
        filterNode(value,data,node){
             if (!value) return true;
             console.log(data)
            return data.name.indexOf(value) !== -1;
        },
        nodeClick(obj,node,data){
            console.log(obj);
            if(obj.children){
                return false;
            }
           this.listQuery.projectStageCode = obj.id;
           this.getList();
        },
        handleClick(){

        },
        sizeChange(val){
            this.listQuery.limit = val;
            this.getList();
        },
        currentChange(val){
            this.listQuery.page = val;
            this.getList();
        },
        getList(){
            getPage(this.listQuery).then(res => {
                console.log(res)
                this.tableData = res.data.records;
                this.total = res.data.total;
            })
        },
        add(){
           this.$nextTick(() => {
                this.$refs['addForm'].resetFields();
           })
            this.dialogVisible = true;
        },
        getRole(){
            getRoleMessage().then(res => {
                console.log(res);
                this.roleOption = JSON.parse(JSON.stringify(res.data));
                this.useOption = res.data;
                var obj = {code: "", name: "全部"};
                this.useOption.unshift(obj);
                console.log(this.useOption,"this.useOption")
            })
        },
        // 查询
        hander(){
            this.listQuery.page = 1;
            this.getList();
        },
        doSubmit(){
            this.$refs['addForm'].validate((valid) => {
                if(valid){
                    save(this.addForm).then(res => {

                    })
                }
            })
        }
    },
    created(){
        this.getTree();
        this.getRole();
    }
}
</script>

<style lang="scss" scoped>
.app-container{
    display: flex;
    justify-content: space-between;
}
.pepple-tree{
    width: 22%;
    height: 100%;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}
.tree-main{
    overflow: scroll;
}
.people-table{
    width: 77%;
    height: 100%;
}
.el-col{
    height: 45px;
}
.people-btns{
    margin-bottom: 10px;
    margin-top: 10px;
}
</style>