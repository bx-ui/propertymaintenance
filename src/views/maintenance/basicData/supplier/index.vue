<template>
    <div class="app-container calendar-list-container">
        <!-- 查询 -->
        <el-form label-width="100px" class='select'>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="项目名称">
                        <el-input v-model="listQuery.project" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item label-width="20px">
                        <el-button type="primary" size="small">查 询</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="2" :offset="8">
                    <el-form-item label-width="20px">
                        <el-button size="small">批量删除</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item label-width="20px">
                        <el-button size="small" @click="addSupplier">新 增</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!-- 列表 -->
        <el-table :data="tableData" style="width: 100%" height="calc(100% - 110px)">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="project" label="项目名" width="400"></el-table-column>
            <el-table-column prop="supplier" label="供应商名" width="500"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
        <!-- 新增弹框 -->
        <el-dialog title="新增供应商信息" :visible.sync="dialogVisible" width="40%">
            <!-- 新增表单 -->
            <el-form ref="addForm" :model="addForm" label-width="70px" :rules="rules">
                <el-form-item label="项目名" prop="project">
                    <el-select v-model="addForm.project" placeholder="请选择" size="small" clearable>
                        <el-option v-for="(item,index) in projectOption" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="供应商名" prop="supplier">
                    <el-select v-model="addForm.supplier" placeholder="请选择" size="small" multiple>
                        <el-option v-for="(item,index) in supplierOption" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            listQuery:{
                limit: 10,
                page: 1,
                project: "",
            },
            tableData: [],
            total: 0,
            dialogVisible: false,
            addForm:{
                project: "",
                supplier: [],
            },
            projectOption: [{id: 0, name: '中国'}],
            supplierOption: [{id: 0, name: '上海易彩'},{id: 1, name: '五菱宏光'}],
            rules:{
                 project: [{required: true, message: "请选择项目名", trigger: "change"}],
                 supplier: [{required: true, message: "请选择供应商名", trigger: "change"}]
            },
        }
    },
    methods:{
        handleClick(){

        },
        addSupplier(){
            this.dialogVisible = true;
        }
    }
}
</script>

<style lang="scss" scoped>
</style>