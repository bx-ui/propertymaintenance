<template>
    <div class="app-container calendar-list-container">
        <el-table :data="tableData" height="calc(100% - 180px)" style="width: 100%" border ref="table">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column v-for="(item,index) in tableList" :key="index" :label="item.label" :prop="item.prop"></el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="100">
                <template slot-scope="scope">
                    <el-button @click="see(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-row style="text-align:center;margin-top:15px" v-if="type == 1">
        <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page.sync="page.page"
            :page-sizes="[10,20,30,50]"
            :page-size="page.limit"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
        ></el-pagination>
        </el-row>
    </div>
</template>

<script>
export default {
    props: {
        tableList: {
            type: Array,
            default: [],
        },
        type:{
            type: Number,
            default: 1,
        },
        tableData: {
            type: Array,
            default: [],
        },
        value: {
            type: Object,
            default: {},
        }
    },
    data(){
        return {
            page: {
                page: 1,
                limit: 10,
                total: 0
            },
        }
    },
    methods: {
        currentChange(val){
            this.value.page = val;
            this.$emit('input', value);
        },
        sizeChange(val){
            this.value.limit = val;
            this.$emit('input', value);
        },
        see({id}){
            this.$router.push({
                name: "结算管理详情",
                query: {id, beforeName: '查看'},
            })
        },
        edit({id}){
            this.$router.push({
                name: "结算管理详情",
                query: {id, beforeName: '编辑'},
            })
        }
    },
    computed:{
        
    },
    updated(){
        console.log(this.$refs.table, "111")
    }
}
</script>

<style lang="scss" scoped>
.el-col{
    height: 50px;
}
.app-container {
  height: 100%;
  padding: 0;
}
</style>