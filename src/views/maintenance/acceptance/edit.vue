<template>
    <div class="app-container calendar-list-container">
        <!-- 头部 -->
        <!-- <div class="header">
            <p class="font">详情</p>
            <div class="btns">
                <el-button size="small" type="primary" @click="save" :disabled="flag">暂存</el-button>
                <el-button size="small" type="primary" @click="submit" :disabled="flag">提交</el-button>
                <el-button size="small" type="primary" @click="back">返回</el-button>
            </div>
        </div> -->
        <!-- 内容 -->
        <div class="bodyer">
            <!-- 基础信息 -->
            <div class="basic">
                <div class="logo">
                    <div class="logoBlock"></div>
                    <p>基础信息</p>
                </div>
                <el-form :model="basicForm" :rule="basicForm" label-width="100px">
                   <el-row :gutter="30">
                       <el-col :span="7">
                           <el-form-item label="项目" prop label-width="80px">
                               <el-input v-model="basicForm.projectName" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                       <el-col :span="8">
                           <el-form-item label="分期" prop label-width="70px">
                               <el-input v-model="basicForm.projectStageName" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                       <el-col :span="8">
                           <el-form-item label="维修区域" prop>
                               <el-input v-model="basicForm.moduleName" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                   </el-row>
                   <el-row :gutter="30">
                       <el-col :span="7">
                           <el-form-item label="提报人" prop label-width="80px">
                               <el-input v-model="basicForm.invalidUser" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                       <el-col :span="8">
                           <el-form-item label="提报时间" prop label-width="70px">
                               <el-input v-model="setRepairTime" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                       <el-col :span="8">
                           <el-form-item label="维修单位名称" prop>
                               <el-input v-model="basicForm.supplierName" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                   </el-row>
                   <el-row :gutter="30">
                       <!-- <el-col :span="7">
                           <el-form-item label="质保金比例" prop label-width="80px">
                               <el-input v-model="basicForm.projectName" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col> -->
                       <el-col :span="8">
                           <el-form-item label="质保期限" prop label-width="80px">
                               <el-input v-model="setwarrantyEndTime" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                       <!-- <el-col :span="8">
                           <el-form-item label="期望完成时间" prop>
                               <el-input v-model="basicForm.solveTime" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col> -->
                   </el-row>
                   <el-row>
                       <el-col :span="23">
                           <el-form-item label="事由" prop label-width="80px">
                               <el-input v-model="basicForm.requirement" size="small" :disabled="true" type="textarea" :row="2"></el-input>
                           </el-form-item>
                       </el-col>
                   </el-row>
                   <el-row>
                       <el-col :span="23">
                           <el-form-item label="维修说明" prop label-width="80px">
                               <el-input v-model="basicForm.projectName" size="small" :disabled="true" type="textarea" :row="2"></el-input>
                           </el-form-item>
                       </el-col>
                   </el-row>
                   <el-row>
                       <el-col :span="23">
                           <el-form-item label="附件" prop label-width="80px">
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
                   <!-- <el-row>
                       <el-col :span="23">
                           <el-form-item label="关单说明" prop label-width="80px">
                               <el-input v-model="basicForm.supplierOpinion" size="small" :disabled="true" type="textarea" :row="2"></el-input>
                           </el-form-item>
                       </el-col>
                   </el-row>
                   <el-row>
                       <el-col :span="23">
                           <el-form-item label="关单附件" prop label-width="80px">
                              <el-upload 
                                :file-list="fileListDone"
                                ref="uploadDone"
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
                   </el-row> -->
                </el-form>
            </div>
            <!-- 成本核定 -->
            <div class="cost">
                <div class="logo">
                    <div class="logoBlock"></div>
                    <p>成本核定</p>
                </div>
                <el-form :model="costForm" :rule="costForm" label-width="100px">
                    <el-row :gutter="30">
                       <el-col :span="7">
                           <el-form-item label="发起人" prop label-width="60px">
                               <el-input v-model="basicForm.approvedUser" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                       <el-col :span="8">
                           <el-form-item label="发起时间" prop label-width="70px">
                               <el-input v-model="basicForm.approvedTime" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                       <el-col :span="8">
                           <el-form-item label="发起人部门" prop label-width="80px">
                               <el-input v-model="basicForm.approvedDept" size="small" :disabled="true"></el-input>
                           </el-form-item>
                       </el-col>
                   </el-row>
                </el-form>
                <el-table :data="costTableData" style="width: 98%;margin: 0 auto" height="200px">
                    <el-table-column label="物料名称" prop="materialName" width="100" align="center"></el-table-column>
                    <el-table-column label="工艺标准" prop="technologyStandard" width="100" align="center"></el-table-column>
                    <el-table-column label="单位" prop="unit" width="100" align="center"></el-table-column>
                    <el-table-column label="用量" prop="count" width="100" align="center"></el-table-column>
                    <el-table-column label="单价" prop="money" width="100" align="center"></el-table-column>
                    <el-table-column label="总额" prop="totalMoney" width="100" align="center"></el-table-column>
                    <el-table-column label="额定用量" prop="approvedCount" width="100" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.approvedCount" size="small" @change="changeMoney(scope.row)" :disabled="flag" type="number" :min="0"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="核定总额" prop="approvedTotal" width="150" align="center"></el-table-column>
                    <el-table-column label="备注" prop="remarks" width="240" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.remarks" size="small" :disabled="flag"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 审批历史 -->
            <div class="approval">
                <div class="logo">
                    <div class="logoBlock"></div>
                    <p>审批历史</p>
                </div>
                <el-table :data="approvalTableData" style="width: 98%;margin: 0 auto" height="200px">
                    <el-table-column label="承诺人签字" prop="auditorName" width="300" align="center"></el-table-column>
                    <el-table-column label="部门" prop="taskName" width="400" align="center"></el-table-column>
                    <el-table-column label="备注" prop="name" width="400" align="center"></el-table-column>
                </el-table>
            </div>
            <div class="btns" style="width: 100%;text-align: center;margin-top: 20px;margin-bottom: 10px;">
                <el-button size="small" type="primary" @click="save" :disabled="flag" v-if="state != 1">暂存</el-button>
                <el-button size="small" type="primary" @click="submit" :disabled="flag" v-if="state == 4">提交</el-button>
                <el-button size="small" type="primary" @click="back">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import {
  getDetail,
  getTemporary,
  getSubmit
} from "@/api/maintenance/acceptance";
export default {
    data(){
        return {
            basicForm: {},
            costTableData: [],
            costForm:{},
            approvalTableData: [{}],
            id: 0,
            state: 0,
            fileList: [],
            flag: false,
            maintenanceId: 0,
            fileListDone: [],
            isHandover: "",
            updateTime: "",
        }
    },
    methods:{
        getList(){
            getDetail({id: this.id}).then(res => {
                console.log(res.data.data,"datadatatdata")
                var data = res.data.data;
                if(data.approvedTime){
                     data.approvedTime = data.approvedTime.split(" ")[0];
                }
                this.isHandover = data.isHandover;
                this.updateTime = data.updateTime;
                this.$set(this.basicForm,'projectName',data.projectName);
                this.$set(this.basicForm,'projectStageName',data.projectStageName);
                this.$set(this.basicForm,'moduleName',data.moduleName);
                this.$set(this.basicForm,'invalidUser',data.invalidUser);
                this.$set(this.basicForm,'repairTime',data.repairTime);
                this.$set(this.basicForm,'projectStageName',data.projectStageName);
                this.$set(this.basicForm,'projectName',data.projectName);
                // this.$set(this.basicForm,'projectName',data.projectName);  //质保金比例 ？？？
                this.$set(this.basicForm,'warrantyEndTime',data.warrantyEndTime);
                this.$set(this.basicForm,'solveTime',data.solveTime);
                this.$set(this.basicForm,'requirement',data.requirement);
                this.$set(this.basicForm,'supplierName',data.supplierName);
                this.$set(this.basicForm,'isReject',data.isReject);
                // procId taskId
                this.$set(this.basicForm,'procId',data.procId);
                this.$set(this.basicForm,'taskId',data.taskId);
                this.$set(this.basicForm,'approvedUser',data.approvedUser);
                this.$set(this.basicForm,'approvedTime',data.approvedTime);
                this.$set(this.basicForm,'supplierOpinion',data.supplierOpinion); 
                if(data.approvedDept){
                    var buda = data.approvedDept == 'maintenance_zb' ? '总部维修工程' : '项目工程';
                    this.$set(this.basicForm,'approvedDept',buda);
                }
                if(data.hzPropertyBudgetList[0] != null){
                    var list = data.hzPropertyBudgetList;
                    list.forEach((item,index) => {
                        item.totalMoney = Number(item.money) * item.count;
                    })
                }
                // 列表赋值
                this.costTableData = list;
                // 图片回显
                if(data.sysAttachments != null){
                    this.imageFileAllData =  data.sysAttachments;
                    data.sysAttachments.forEach(item => {
                        var obj = {};
                        obj.url = item.attUrl;
                        this.fileList.push(obj);
                    })
                    console.warn(this.fileList,"fileList")
                }
                if(data.supplierPicture){
                    var objSup = {};
                    var strSup = data.supplierPicture;
                    if(strSup.indexOf(",") == -1){
                        objSup.url = strSup;
                        this.fileListDone.push(objSup);
                    }else{
                        strSup.split(",").forEach((item,index) => {
                             objSup.url = item;
                             this.fileListDone.push(objSup);
                        })
                    }
                }
            })
        },
        changeMoney({approvedCount,id,money}){
           this.costTableData.forEach((item,index) => {
               if(item.id === id){
                   item.approvedTotal = approvedCount * money;
               }
           })
        },
        save(){
            var loading = this.$loading({lock: true,text: '暂存中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
            getTemporary(this.costTableData).then(res => {
                console.log(res);
                loading.close();
                this.$message({
                    type: 'success',
                    message: '暂存成功'
                })
                this.$router.go(-1);
            })
        },
        submit(){
             var loading = this.$loading({lock: true,text: '提交中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
            getSubmit({id: this.id, hzPropertyBudgetLists: this.costTableData,repairTime: this.basicForm.repairTime,warrantyEndTime: this.basicForm.warrantyEndTime, procId: this.basicForm.procId, taskId: this.basicForm.taskId, maintenanceId: this.maintenanceId, isHandover: this.isHandover, updateTime: this.updateTime}).then(res => {
                console.log(res)
                loading.close();
                this.$message({
                    type: 'success',
                    message: '提交成功'
                })
                this.$router.go(-1)
            }) 
        },
        back(){
            this.$router.go(-1)
        },
        init(){
            this.id = this.$route.query.id;
            this.state = this.$route.query.state;
            this.maintenanceId = this.$route.query.maintenanceId;
            console.log(this.state);
            // this.flag = this.state == 6 ? false : true;
            this.getList();
        }
    },
    created(){
        this.init();
    },
    activated(){
        this.init();
    },
    computed: {
        setRepairTime(){
            if(this.basicForm.repairTime){
               return this.basicForm.repairTime.split(" ")[0]
            }else{
                return "";
            }
            
        },
        setwarrantyEndTime(){
            if(this.basicForm.warrantyEndTime){
                return this.basicForm.warrantyEndTime.split(" ")[0]
            }else{
                return "";
            }
            
        }
    },
    watch:{
        basicForm:{
            handler(newName, oldName) {
                console.log(newName,"newName");
                console.log(oldName,"oldName")
                // this.basicForm.repairTime = newName.repairTime.split(" ")[0];
            },
            immediate: true,
            deep: true
        }
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
    background-color: blue;
    margin-top: 5px;
}
.logo p{
    font-weight: 500;
    font-size: 14px;
}
.el-row{
    height: 40px;
}
</style>