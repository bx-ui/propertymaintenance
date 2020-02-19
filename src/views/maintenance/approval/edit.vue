<template>
    <div class="app-container calendar-list-container">
        <!-- 头部 -->
        <div class="header">
            <p class="font">详情</p>
        </div>
        <!-- 内容 -->
        <div class="bodyer">
            <!-- 基础信息 -->
            <div class="basic">
                <div class="logo">
                    <div class="logoBlock"></div>
                    <p>基础信息</p>
                </div>
                <el-form :model="basicForm" :rule="basicForm" label-width="100px">
                   <el-row :gutter="20">
                       <el-col :span="6">
                           <el-form-item label="验收单号" prop label-width="60px">
                               <el-input v-model="basicForm.acceptanceCode" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                       <el-col :span="5">
                           <el-form-item label="项目分期" prop label-width="60px">
                               <el-input v-model="basicForm.projectStageName" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                       <el-col :span="6">
                           <el-form-item label="维修区域" prop label-width="90px">
                               <el-input v-model="basicForm.projectStageName" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                       <el-col :span="6.5">
                           <el-form-item label="实际完成时间" prop label-width="100px">
                               <el-input v-model="generateTime" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                   </el-row>
                   <el-row :gutter="30">
                       <el-col :span="6">
                           <el-form-item label="提报人" prop label-width="60px">
                               <el-input v-model="basicForm.createUser" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                       <el-col :span="5">
                           <el-form-item label="提报时间" prop label-width="60px">
                               <el-input v-model="createTime" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                       <el-col :span="6">
                           <el-form-item label="维修单位名称" prop label-width="90px">
                               <el-input v-model="basicForm.supplierName" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                       <el-col :span="6.5">
                           <el-form-item label="维修单号" prop>
                               <el-input v-model="basicForm.maintenanceCode" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                   </el-row>
                   <el-row>
                       <el-col :span="23">
                           <el-form-item label="事由" prop label-width="40px">
                               <el-input v-model="basicForm.requirement" size="small" :disabled="true" type="textarea" :row="2"></el-input>
                           </el-form-item>
                       </el-col>
                   </el-row>
                   <el-row>
                       <el-col :span="23">
                           <el-form-item label="附件" prop label-width="70px">
                               <el-upload 
                                :file-list="fileList"
                                ref="upload"
                                action="111"
                                list-type="picture-card"
                                names="files"
                                :limit="4"
                                multiple
                                :auto-upload="false"
                                :disabled="true">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                           </el-form-item>
                       </el-col>
                   </el-row>
                   <el-row>
                       <el-col :span="23">
                           <el-form-item label="维修结果" prop label-width="70px">
                               <el-input v-model="basicForm.supplierOpinion" size="small" :disabled="true" type="textarea" :row="2"></el-input>
                           </el-form-item>
                       </el-col>
                   </el-row>
                   <el-table :data="costTableData" style="width: 96%;margin: 0 auto" height="150px">
                       <el-table-column label="成本清单" align="center">
                           <el-table-column label="物料名称" prop="materialName" width="100" align="center"></el-table-column>
                            <el-table-column label="工艺标准" prop="materialType" width="100" align="center"></el-table-column>
                            <el-table-column label="单位" prop="materialUnit" width="100" align="center"></el-table-column>
                            <el-table-column label="用量" prop="materialType" width="100" align="center"></el-table-column>
                            <el-table-column label="单价" prop="money" width="100" align="center"></el-table-column>
                            <el-table-column label="总额" prop="total" width="100" align="center"></el-table-column>
                            <el-table-column label="额定用量" prop="approvedCount" width="100" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.approvedCount" size="small" :disabled="true"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="核定总额" prop="approvedTotal" width="150" align="center"></el-table-column>
                            <el-table-column label="备注" prop="remark" width="240" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.remark" size="small" :disabled="true"></el-input>
                                </template>
                            </el-table-column>
                       </el-table-column>
                    </el-table>
                </el-form>
            </div>
            <div class="approval">
                <el-table :data="approvalTableData" style="width: 96%;margin: 0 auto" height="150px">
                    <el-table-column label="承诺人签字" prop="auditorName" width="300" align="center"></el-table-column>
                    <el-table-column label="部门" prop="taskName" width="400" align="center"></el-table-column>
                    <el-table-column label="成员承诺" prop="statusName" width="400" align="center"></el-table-column>
                </el-table>
            </div>
            <div class="btns" style="margin-top: 30px; width: 100%;text-align:center;margin-bottom: 10px">
                <el-button type="primary" size="small" @click="getDis" style="margin: 0 auto;text-align: center">审批</el-button>
            </div>
        </div>
        <el-dialog
        title="请选择审批意见"
        :visible.sync="dialogVisible"
        width="60%">
        <el-form :model="optionForm" :rules="optionRule" label-width="70px" ref="optionForm">
            <el-form-item label="审批意见" prop="radio">
                <el-radio-group v-model="optionForm.radio" @change="changeRadio">
                    <el-radio :label="1">同意</el-radio>
                    <el-radio :label="0">驳回</el-radio>
                </el-radio-group>
            </el-form-item>
            <div style="margin-top: 20px">
                <el-form-item label="原因" prop="opinion">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入原因" v-model="optionForm.opinion"></el-input>
                </el-form-item>
            </div>
        </el-form>
         
  
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="doApproval">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import {
  getData,
  getDetail,
  getHistory,
  getApproval
} from "@/api/maintenance/approval";
export default {
    data(){
        return {
            basicForm: {},
            costTableData: [],
            approvalTableData: [],
            id: 0,
            fileList: [],
            dialogVisible: false,
            taskId: "",
            procId: "",
            showOpinion: false,
            optionForm:{
                radio: 1,
                opinion: "",
            },
            optionRule: {
                radio: [{required: true, message: "请输入报修标题", trigger: "blur"}],
                opinion: [{required: true, message: "请输入报修标题", trigger: "blur"}],
            },
            flagRouter: 0,
            maintenanceId: 0,
        }
    },
    methods:{
        getData(){
            return new Promise((resolve,reject) => {
                getDetail({id: this.id}).then(res => {
                    resolve(res.data.procId);
                    if(this.flagRouter == 1){
                        this.id = res.data.id;
                    }
                    this.basicForm = res.data;
                    this.taskId = res.data.taskId;
                    this.procId = res.data.procId;
                    this.maintenanceId = res.data.maintenanceId;
                    if(res.data.fileUrl){
                        var arr = res.data.fileUrl.trim().split(",");
                        arr.forEach(item => {
                            var obj = {};
                            obj.url = item;
                            this.fileList.push(obj);
                        })
                    }
                    this.costTableData = res.data.hzBudgetDetailVOList;
                    // if()
                })
            })
        },
        getDis(){
            this.$nextTick(() => {
                this.optionForm.radio = 1;
                this.optionForm.opinion = "";
                this.showOpinion = false;
            })
            this.dialogVisible = true;
        },
        changeRadio(){
            // console.log(this.radio);    
            // this.showOpinion = this.optionForm.radio == 1 ? false : true;
        },
        getHis(procId){
            getHistory({procId}).then(res => {
                console.log(res.data)
                // var data = res.data;
                // data.qualfieds = JSON.parse(data.qualfieds);
                // console.log(JSON.parse(data.qualfieds),"11111")
                // data.forEach((item,index) => {
                //     console.log(typeof item.qualfieds,"item.qualfieds")
                //     debugger
                //     item.qualfieds = typeof item.qualfieds == 'string' ? JSON.parse(item.qualfieds) : item.qualfieds;
                //     debugger
                // })
                
                this.approvalTableData = res.data;
            })
        },
        doApproval(){
            this.$refs['optionForm'].validate((valid) => {
                if(valid){
                    var loading = this.$loading({lock: true,text: '保存中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
                    getApproval({taskId: this.taskId,procId: this.procId,state: Number(this.optionForm.radio),opinion: this.optionForm.opinion,id: this.id, maintenanceId: this.maintenanceId}).then(res => {
                        loading.close();
                        this.dialogVisible = false;
                        this.$message({
                            type: 'success',
                            message: '提交成功'
                        })
                        this.getData().then(res => {
                            this.getHis(res);
                        })
                    })
                }else{
                    this.$message({
                        type: 'error',
                        message: '请按照规范输入表单项'
                    })
                }
            })
            
        }
    },
    computed:{
        generateTime(){
            if(this.basicForm.generateTime){
                var date = new Date(this.basicForm.generateTime);
                var y=date.getFullYear();
                var m=date.getMonth()+1;
                var d=date.getDate();
                m = m<10?("0"+m):m;
                d = d<10?("0"+d):d;
                return y+"-"+m+"-"+d;
            }else{
                return "";
            }
        },
        createTime(){
             if(this.basicForm.createTime){
                var date = new Date(this.basicForm.createTime);
                var y=date.getFullYear();
                var m=date.getMonth()+1;
                var d=date.getDate();
                m = m<10?("0"+m):m;
                d = d<10?("0"+d):d;
                return y+"-"+m+"-"+d;
            }else{
                return "";
            }
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.getData().then(res => {
            this.getHis(res);
        })
    },
    beforeRouteEnter(to,from,next){
        next(vm => {
            console.log(from,"我是图图小淘气")
            vm.flagRouter = from.name == '首页' ? 1 : 2;
        })
    },
    beforeRouteLeave(to, from, next){
        this.$store.commit("DEL_TAG", {value:"/maintenance/approval/edit",close:true,});
        next();
    }
}
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
//   overflow: scroll;
//   padding: 0;
}
.header{
    width: 100%;
    height: 50px;
    line-height: 40px;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}
.font{
    font-size: 18px;
    font-weight: 600;
}
.bodyer{
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: scroll;
}
// 基础信息
.basic{
    width: 100%;
}
.logo{
    width: 70px;
    height: 24px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    line-height: 25px;
    margin-bottom: 10px;
}
.logoBlock{
    width: 8px;
    height: 14px;
    background-color: green;
    margin-top: 5px;
}
.logo p{
    font-weight: 500;
    font-size: 14px;
}
.el-row{
    height: 40px;
}
.approval{
    margin-top: 15px;
}
</style>