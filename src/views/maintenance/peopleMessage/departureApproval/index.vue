<template>
    <div class="app-container calendar-list-container">
        <!-- 搜索 -->
        <peopleQuery @selectChange="selectChange" :stateOption="stateOption"></peopleQuery>
        <!-- 按钮 -->
        <div class="message-btns">
            <el-button size="mini" type="primary" @click="outGo">离职确认</el-button>
        </div>
        <!-- 列表 -->
        <msTable :tableList="tableList" :tableData="tableData" v-model="page" @refresh="refresh" @multData="multData" :height="height" :flagShowBtns="1" :flag="1"></msTable>
        </div>
</template>

<script>
import peopleQuery from "@/components/common/peopleQuery.vue"
import msTable from "../common/table.vue"
import config from "@/config/config.js";
import { getpage,lzSubmit,confirm } from "@/api/maintenance/message.js";
export default {
    components: {
        peopleQuery,
        msTable
    },
    data(){
        return {
            tableData: [],
            multipleSelection: [],
            selId: [],
            listQuery: {
                name: "",
                functionCode: "",
                roleCode: "",
                sex: "",
                idCard: "",
                supplierCode: "",
                entryStartTime: "",
                entryEndTime: "",
                departureStartTime: "",
                departureEndTime: "",
                page: 1,
                limit: 10,
            },
            page:{
                page: 1,
                limit: 10,
                total: 0,
            },
            ruleForm:{

            },
            height: "calc(100% - 180px)",
        }
    },
    methods: {
        refresh(){
            this.listQuery.page = this.page.page;
            this.listQuery.limit = this.page.limit;
            this.getList();
        },
        selectChange(data){
            Object.assign(this.listQuery,data);
            this.getList();
        },
        getList(){
            getpage(this.listQuery).then(res => {
                var data= res.data.records;
                data.forEach((item,index) => {
                    item.sex = item.sex == 0 ? "女" : "男";
                    if(item.entryTime){
                        item.entryTime = item.entryTime.split(" ")[0];
                    }
                    if(item.departureTime){
                        item.departureTime = item.departureTime.split(" ")[0];
                    }
                    item.state = item.state == 0 ? "暂存" : item.state == 1 ? "在职" : item.state == 2 ? "离职" : item == 3 ? "入职申请中" : item.state == 4 ? "待上岗确认" : item.state == 5 ? "离职申请中" : item.state == 6 ? '待离职确认' : item.state == 7 ? "离职驳回" : "入职驳回";
                    item.education = item.education == 1 ? "小学" : item.education == 2 ? "初中" : item.education == 3 ? "高中" : item.education == 4 ? "专科" : item.education == 5 ? "本科" : item.education == 6 ? "硕士研究生" : item.education == 7 ? "博士研究生" : "";
                    var str = "";
                    item.hzBasisRoles.forEach((a,b) => {
                        str += `${a.parentName}-${a.name},`;
                    })
                    item.roleName = str;
                })
                this.tableData = data.filter(item => {
                    return (item.state == '离职申请中' || item.state == '待离职确认' || item.state == '离职驳回');
                });
                this.page.total = this.tableData.length;
            })
        },
        multData(data){
            this.multipleSelection = data;
            this.selId = this.multipleSelection.map(v => v.id);
        },
        outGo(){
            var flag = true;
            if(!this.multipleSelection.length){
                this.$message({
                    type: 'error',
                    message: '至少选择一条数据'
                })
                return false;
            }
            this.multipleSelection.forEach((item,index) => {
                if(item.state != '待离职确认'){
                    flag = false;
                }
            })
            if(!flag){
                this.$message({
                    type: 'error',
                    message: '只有待离职确认才能进行入职确认'
                })
                return false;
            }
            var loading = this.$loading({lock: true,text: '保存中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
            var obj = {
                state: 0,
                ids: this.selId,
            }
            confirm(obj).then(res => {
                loading.close();
                this.getList();
                this.$message({
                    type: 'success',
                    message: '确认成功'
                })
            })
        }
    },
    created(){
        this.getList();
        this.stateOption = [{code: 5,name: '离职申请中'},{code: 6, name: '待离职确认'}];
    },
    computed: {
        tableList(){
            return config.message.messageTableList;
        }
    },
    beforeRouteEnter(to, from, next){
        next(vm => {
            // vm.tableList = config.message.messageTableList;
        })
    },
    beforeRouteLeave(to, from, next) {
        if(to.path != '/maintenance/peopleMessage/message/add'){
            next();
        }else{
            to.meta.title = (to.query.addressFrom == "详情" && to.query.isState == 1) ?
            '查看' : (to.query.addressFrom == "详情" && to.query.isState == 0) ?
            '编辑' : (to.query.addressFrom == "审批" && to.query.flag == 0) ?
            '入职详情页' : (to.query.addressFrom == "审批" && to.query.flag == 1) ?
            '离职详情页': '新增';
            next();
        }
    },

}
</script>
<style lang="scss" scoped>
.message-btns{
    margin-left: 10px;
    margin-bottom: 15px;
}
</style>