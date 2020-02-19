<template>
    <div class="app-container calendar-list-container">
        <!-- 搜索 -->
        <peopleQuery @selectChange="selectChange" :stateOption="stateOption"></peopleQuery>
        <!-- 按钮 -->
        <div class="message-btns">
            <el-button size="mini" type="primary" @click="add">新增</el-button>
            <el-button size="mini" type="primary" @click="backJob">离职</el-button>
        </div>
        <!-- 列表 -->
        <msTable :tableList="tableList" :tableData="tableData" v-model="page" @refresh="refresh" @multData="multData" :height="height"></msTable>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="40%">
        <el-form :model="dialogForm" :rules="ruleForm" ref="dialogForm">
           <el-form-item label="备注" label-width="40px">
                <el-input
                type="textarea"
                placeholder="请输入备注"
                v-model="dialogForm.remark"
                maxlength="30"
                show-word-limit
                >
                </el-input>
           </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="doSubmit" size="mini">确 定</el-button>
        </span>
        </el-dialog>
        </div>
</template>

<script>
import peopleQuery from "@/components/common/peopleQuery.vue"
import msTable from "../common/table.vue"
import config from "@/config/config.js";
import { getpage,lzSubmit } from "@/api/maintenance/message.js";
export default {
    components: {
        peopleQuery,
        msTable
    },
    data(){
        return {
            tableData: [],
            dialogVisible: false,
            multipleSelection: [],
            selId: [],
            listQuery: {
                name: "",
                functionCode: "",
                roleCode: "",
                sex: "",
                idCard: "",
                supplierCode: "",
                state: "",
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
            dialogForm:{
                remark: "",
            },
            ruleForm:{

            },
            height: "calc(100% - 180px)",
            stateOption: [],
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
        add(){
            this.aa = 20;
            console.log(this.aa)
            this.$router.push({
                name: "员工信息新增",
                query: { addressFrom: '新增' },
            });
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
                    item.state = item.state == 0 ? "暂存" : item.state == 1 ? "在职" : item.state == 2 ? "离职" : item.state == 3 ? "入职申请中" : item.state == 4 ? "待上岗确认" : item.state == 5 ? "离职申请中" : item.state == 6 ? "待离职确认" : item.state == 7 ? "离职驳回" : "入职驳回";
                    item.education = item.education == 1 ? "小学" : item.education == 2 ? "初中" : item.education == 3 ? "高中" : item.education == 4 ? "专科" : item.education == 5 ? "本科" : item.education == 6 ? "硕士研究生" : item.education == 7 ? "博士研究生" : "";
                    var str = "";
                    item.hzBasisRoles.forEach((a,b) => {
                        str += `${a.parentName}-${a.name},`;
                    })
                    item.roleName = str;
                })
                this.tableData = data;
                this.page.total = res.data.total;
            })
        },
        backJob(){
            if(!this.selId.length){
                this.$message({
                    type: 'error',
                    message: '至少选择一条数据'
                })
                return false;
            }
            if(this.selId.length > 1){
                this.$message({
                    type: 'error',
                    message: '最多选择一条数据'
                })
                return false;
            }
            if(this.multipleSelection[0].state != '在职'){
                 this.$message({
                    type: 'error',
                    message: '只有在职的人员才能提离职'
                })
                return false;
            }
            this.$nextTick(() => {
                this.$refs["dialogForm"].resetFields();
            });
            this.dialogVisible = true;
        },
        multData(data){
            this.multipleSelection = data;
            this.selId = this.multipleSelection.map(v => v.id);
        },
        doSubmit(){
            var obj = {};
            // 离职
            if(this.multipleSelection[0].lzProcId && this.multipleSelection[0].lzTaskId){
                obj = {
                    id: this.multipleSelection[0].id,
                    procId: this.multipleSelection[0].rzTaskId,
                    taskId: this.multipleSelection[0].lzProcId,
                    remark: this.remark,

                }
            }else{
                obj = {
                    id: this.multipleSelection[0].id,
                    remark: this.remark,
                }
            }
            var loading = this.$loading({lock: true,text: '保存中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
            lzSubmit(obj).then(res => {
                console.log(res)
                this.$message({
                    type: "success",
                    message: "离职成功"
                })
                this.dialogVisible = false;
                this.getList();
                loading.close();
            })
        }
    },
    created(){
        this.getList();
        this.stateOption = [{code: "", name: "全部"},{code: 0, name: "暂存"}, {code: 1, name: "在职"}, {code: 2, name: "离职"}, {code: 3, name: "入职申请中"}, {code: 4, name: "待上岗确认"}, {code: 5, name: "离职申请中"}, {code: 6, name: "待离职确认"}, {code: 7, name: '离职驳回'},{code: 8, name: '入职驳回'}];
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