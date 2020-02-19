<template>
    <div class="app-container calendar-list-container">
        <!-- 列表 -->
        <el-table :data="tableData" style="width: 100%" :height="height" border @selection-change="handleSelectionChange">
            <el-table-column width="55" type="selection"></el-table-column>
            <el-table-column v-for="(item,index) in tableList" :key="index" :width="item.width" :label="item.label" :prop="item.prop" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120" align="center" v-if="flagShowBtns == 0">
                <template slot-scope="scope">
                    <el-button @click="see(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small" @click="update(scope.row)" v-if="scope.row.state == '暂存' || scope.row.state == '入职驳回'">修改</el-button>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120" align="center" v-if="flagShowBtns == 1">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="approval(scope.row)" :disabled="!(scope.row.state == '入职申请中' || scope.row.state == '离职申请中')">审批</el-button>
                    <el-button type="text" size="small" @click="seeHis(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-row style="text-align:center;margin-top:15px">
        <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page.sync="value.page"
            :page-sizes="[10,20,30,50]"
            :page-size="value.limit"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="value.total"
        ></el-pagination>
        </el-row>
    </div>
</template>

<script>
export default {
   props: {
       tableList:{
            type: Array,
            default: [],
       },
        tableData: {
            type: Array,
            default: [],
        },
        value: {
            type: Object,
            default: {},
        },
        height: {
            type: String,
            default: "",
        },
        flagShowBtns: {
            type: Number,
            default: 0,
        },
        flag: {
            type: Number,
            default: 0,
        }
   },
    data(){
        return {
           
        }
    },
   methods:{
       handleClick(){
           
       },
       sizeChange(val){
           this.value.limit = val;
           this.$emit("input",this.value);
           this.$emit("refresh");
       },
       currentChange(val){
           this.value.page = val;
           this.$emit("input",this.value);
           this.$emit("refresh");
       },
       see({id}){
           this.$router.push({
                name: "员工信息新增",
                query: { id , addressFrom: '详情', isState: 1 }, 
                // isState 是否可以修改
           })
       },
       seeHis({id,rzProcId,rzTaskId,lzProcId,lzTaskId}){
           console.log(this.flag);
           this.$router.push({
                name: "员工信息新增",
                query: { id , addressFrom: '审批查看', isState: 1, rzProcId, rzTaskId, flag: this.flag, lzProcId, lzTaskId}, 
                // flag  0  入职    1  离职
           })
       },
       update({id,rzProcId,rzTaskId,lzProcId,lzTaskId,state}){
           this.$router.push({
                name: "员工信息新增",
                query: { id , addressFrom: '详情', isState: 0, rzProcId, rzTaskId, lzProcId, lzTaskId, state }, 
                // isState 是否可以修改
           })
       },
       handleSelectionChange(val){
           this.$emit('multData', val);
       },
       approval({id,rzProcId,rzTaskId,lzProcId,lzTaskId}){
           console.log(this.flag);
           this.$router.push({
                name: "员工信息新增",
                query: { id , addressFrom: '审批', isState: 1, rzProcId, rzTaskId, flag: this.flag, lzProcId, lzTaskId}, 
                // flag  0  入职    1  离职
           })
       },
   },
//     beforeRouteLeave(to, from, next) {
//         alert(111)
//         to.meta.title = (to.query.addressFrom == "详情" && to.query.isState == 1) ?
//          '查看' : (to.query.addressFrom == "详情" && to.query.isState == 0) ?
//          '编辑' : (to.query.name == "审批" && to.query.flag == 0) ?
//          '入职详情页' : (to.query.name == "审批" && to.query.flag == 1) ?
//          '离职详情页': '新增';
//          next();
//   },
}
</script>
<style lang="scss" scoped>
.app-container {
  height: 100%;
  padding: 0;
}
</style>