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
                    @node-click="nodeClick"
                    :highlight-current="true">
                </el-tree>
            </div>
        </div>
        <div class="rel-table">
            <div class="width: 100%; float: right">
                <el-button size="mini" type="primary" @click="add" :disabled="name == '' || name == '巡检项'">添加</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%;margin-top: 10px" height="calc(100% - 120px)" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" fixed="left"></el-table-column>
                <!-- <el-table-column prop="type" label="类型" width="120" align="center"></el-table-column> -->
                <el-table-column prop="name" label="名称" width="180" align="center"></el-table-column>
                <el-table-column prop="parentName" label="上级" width="180" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row)">操作</el-button>
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
        <addDialog v-model="diaShow" :setObj="setObj" ref="dialogChild" @refresh="refresh" :updateMsg="updateMsg" :tag="tag" :id="id"></addDialog>
    </div>
</template>

<script>
import { getTree,getItemsByParentId } from 'api/maintenance/inspect.js'
import addDialog from '../common/adddialog.vue'
export default {
    data(){
        return {
            filterText: "",
            treeData: [{
                id: 0,
                name: "巡检项",
                type: 0,
                children: [],
            }],
            tableData: [],
            listQuery: {
                page: 1,
                limit: 10,
            },
            total: 0,
            defaultProps: {
                children: "children",
                label: "name",
                id: "id"
            },
            diaShow: false,
            setObj: {
                // type: 0,
                parentId: 0,
            },
            showBtn: false,
            updateMsg: "",
            tag: "",
            name: "",
        }
    },
    components: {
        addDialog
    },
    watch:{
        filterText(val){
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        sizeChange(){

        },
        currentChange(){

        },
        refresh(parentId){
            this._getTree();
            this.getData(parentId).then(res => {
                res.forEach((item,index) => {
                    item.parentName = this.name;
                })
                this.tableData = res;
            })
        },
        _getTree(){
            getTree().then(res => {
                console.log(res,"张学友")
                this.treeData[0].children = res.data.data;
                // console.log(this.treeData,"1111111111")
            })
        },
        nodeClick(obj,node,data){
            console.log(obj)
            this.tableData = [];
            this.name = obj.name;
            // this.setObj.type = obj.type + 1;
            this.setObj.parentId = obj.id;
            this.getData(obj.id).then(res => {
                res.forEach((item,index) => {
                    item.parentName = this.name;
                })
                this.tableData = res;
                console.log(this.tableData,"11111")
            })
        },
        getData(parentId){
            return new Promise((resolve, reject) => {
                getItemsByParentId({parentId}).then(res => {
                    var data = res.data.records;
                    this.total = res.data.total;
                    resolve(data);
                })
            })
        },
        filterNode(value,data,node){
            console.log(111111)
             if (!value) return true;
             console.log(data)
            return data.name.indexOf(value) !== -1;
        },
        handleSelectionChange(){

        },
        edit(val){
            console.log(val)
            this.$nextTick(() => {
                this.diaShow = true;
                this.$refs.dialogChild.init();
                this.updateMsg = val.name;
                this.id = val.id;
                this.tag = "编辑";
            })
        },
        add(){
            this.$nextTick(() => {
                this.diaShow = true;
                this.$refs.dialogChild.init();
                this.tag = "新增";
            })
        }
    },
    created(){
        this._getTree();
    }
}
</script>

<style lang="scss" scoped>
.app-container{
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
</style>