<template>
    <div class="app-container calendar-list-container">
        <el-card>
            <!-- <div slot="header" class="clearfix">
                <span class="text">报修</span>
                <div style="float: right; padding: 3px 0" type="text">
                    <el-button size="small" @click="saveRepair" type="primary" :disabled="showFlag">暂存</el-button>
                    <el-button size="small" type="primary" @click="submitRepair" :disabled="showFlag">提交</el-button>
                    <el-button size="small" @click="goback" type="primary">返回</el-button>
                </div>
            </div> -->
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
                    <el-row :gutter="24">
                        <el-col :span="24">
                            <el-form-item label="报修标题" label-width="80px" prop="title">
                                <el-input type="text" size="small" v-model="ruleForm.title" maxlength="30" show-word-limit clearable :disabled="showFlag" placeholder="请输入保修标题(最多30字)"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24" style="margin-top: 4px">
                        <el-col :span="10">
                            <el-form-item label="业主信息" prop="ownerName" label-width="80px">
                                <el-input size="small" @focus="addPeople" v-model="ruleForm.ownerName" :disabled="showFlag" placeholder="请输入业主信息"></el-input>
                                 <el-input size="small" v-model="ownerId" style="display: none"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="5">
                            <el-form-item label="是否紧急" prop="isPressing" label-width="90px">
                                 <el-select v-model="ruleForm.isPressing" placeholder="请选择" size="small" clearable :disabled="showFlag">
                                    <el-option
                                    v-for="item in hotOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->
                        <!-- <el-col :span="10">
                            <el-form-item label="业主要求时间" label-width="100px" prop="solveTime">
                                 <el-date-picker
                                v-model="ruleForm.solveTime"
                                type="date"
                                :picker-options="pickerOptions"
                                placeholder="选择日期"
                                size="small"
                                value-format="yyyy-MM-dd"
                                clearable
                                :disabled="showFlag">
                                </el-date-picker>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="7">
                            <el-form-item label="是否交接" prop="isHandover" label-width="80px">
                                <el-input size="small" v-model="ruleForm.isHandover" :disabled="true" placeholder="请选择是否交接"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-top: 4px">
                        <el-col :span="6">
                            <el-form-item label="项目" prop="projectName" label-width="80px">
                                <el-input v-model="ruleForm.projectName" size="small" :disabled="true" placeholder="请选择项目"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="分期" prop="projectStageName" label-width="50px">
                                <el-input v-model="ruleForm.projectStageName" size="small" :disabled="true" placeholder="请选择分期"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="6">
                            <el-form-item label="楼栋" prop="buildName">
                                <el-input v-model="ruleForm.buildName" size="small" :disabled="true" placeholder="请选择楼栋"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="5">
                            <el-form-item label="单元" prop="unitName">
                                <el-input v-model="ruleForm.unitName" size="small" :disabled="true" placeholder="请选择单元"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="6">
                            <el-form-item label="房号" prop="roomName">
                                 <el-input v-model="ruleForm.roomName" size="small" :disabled="true" placeholder="请选择房号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-top: 5px">
                         <el-form-item label="问题描述" prop="requirement" label-width="90px">
                            <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入问题描述(最多100字)"
                            v-model="ruleForm.requirement"
                            :disabled="showFlag"
                            maxlength="100" 
                            show-word-limit>
                            </el-input>
                        </el-form-item>
                    </el-row>
                    <el-row :gutter="20">
                         <el-form-item label="上传现场照片" label-width="92px" rule="file">
                             <el-upload 
                               :file-list="fileList"
                               ref="upload"
                               action="111"
                               accept=".jpg,.jpeg,.png,.gif"
                               :beforeUpload="beforeUploadPicture"
                               list-type="picture-card"
                               names="files"
                               :limit="4"
                               :on-remove="handleRemove"
                               multiple
                               :auto-upload="false"
                               :disabled="showFlag"
                               :on-change="onChange">
                                    <i class="el-icon-plus"></i>
                             </el-upload>
                             <el-dialog :visible.sync="dialogPicture">
                                 <img :src="dialogImageUrl" alt="" width="100%">
                             </el-dialog>
                        </el-form-item>
                    </el-row>
                    <!-- 需要动态增加保修模块明细就直接放开就行 -->
                <!-- <div style="margin-bottom: 15px">
                    <el-button type="primary" size="small" @click="addModel" :disabled="showFlag">新增模块</el-button>
                    <el-button type="primary" size="small" @click="delModel" :disabled="showFlag">删除</el-button>
                </div> -->
                <div class="logo">
                    <div class="logoBlock"></div>
                    <p>问题明细</p>
                </div>
                <el-row :gutter="24" style="display: flex">
                        <el-table
                            :data="ruleForm.sontableData"
                            border
                            style="width: 100%"
                            tooltip-effect="dark"
                             @selection-change="handleSelectionChange">
                             <!-- <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column> -->
                            <el-table-column
                            label="用户问题"
                            width="300"
                            prop="model"
                            align="center">
                            <template slot-scope="scope">
                                <el-form-item label-width="0px" :prop="'sontableData.'+scope.$index+'.model'" :rules="moreRules.moreMode" style="margin-top: 15px">
                                    <el-cascader :options="modelOption" clearable  v-model="scope.row.model" size="small" :props="defaultParams" @change="modelChange(scope.row)" :disabled="showFlag"></el-cascader>
                                </el-form-item>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="供应商名称"
                            width="150"
                            prop="supplierCode"
                            align="center">
                            <template slot-scope="scope">
                                <el-form-item label-width="0px" style="margin-top:15px" :prop="'sontableData.'+scope.$index+'.supplierCode'" :rules="moreRules.moreSupplier">
                                    <el-select v-model="scope.row.supplierCode" clearable size="small" @change="suppierChange" :disabled="showFlag">
                                        <el-option v-for="(item,index) in supplierOption" :key="index" :label="item.name" :value="item.code"></el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="是否保内"
                            width="150"
                            prop="isHelp"
                            align="center">
                            </el-table-column>
                            <!-- <el-table-column
                            label="是否交接"
                            width="65"
                            prop="isHandover">
                            </el-table-column> -->
                            <el-table-column
                            label="质保开始时间"
                            width="150"
                            prop="warrantyStartTime"
                            align="center">
                            </el-table-column>
                            <el-table-column
                            label="质保结束时间"
                            width="150"
                            prop="warrantyEndTime"
                            align="center">
                            </el-table-column>
                             <el-table-column
                            label="说明"
                            prop="explanation"
                            align="center">
                            <template slot-scope="scope">
                                <el-form-item label-width="0px" :prop="'sontableData.'+scope.$index+'.explanation'" :rules="moreRules.moreExplanation" style="margin-top: 15px" class="rules">
                                    <el-input size="small" v-model="scope.row.explanation" :disabled="showFlag" placeholder="请输入说明" class="el-select_box"></el-input>
                                </el-form-item>
                            </template>
                            </el-table-column>
                        </el-table>
                </el-row>
            </el-form>
            </div>
            <div style=" padding: 3px 0;margin-top: 20px" type="text">
                <div style="text-align: center;margin: 0 auto">
                    <el-button size="small" @click="saveRepair" type="primary" :disabled="showFlag" v-if="!showFlag">暂存</el-button>
                    <el-button size="small" type="primary" @click="submitRepair" :disabled="showFlag" v-if="!showFlag">提交</el-button>
                    <el-button size="small" type="primary" @click="againRepair" :disabled="showFlag" v-if="!showFlag && this.$route.query.configId == 1">再次报修</el-button>
                    <el-button size="small" @click="goback" type="primary">返回</el-button>
                </div>
            </div>
        </el-card>
        <!-- 人员弹框 -->
        <el-dialog
        title="选择人员"
        :visible.sync="dialogVisible"
        width="80%">
        <el-row :gutter="24">
            <el-col :span="6">
                <el-input placeholder="业主姓名" size="small" v-model="listQuery.ownerName" clearable @keyup.enter.native="keyDown"></el-input>
            </el-col>
            <el-col :span="6">
                <el-input placeholder="业主电话" size="small" v-model="listQuery.ownerTep" clearable @keyup.enter.native="keyDown"></el-input>
            </el-col>
             <el-col :span="6">
                <el-input placeholder="业主房号" size="small" v-model="listQuery.roomName" clearable @keyup.enter.native="keyDown"></el-input>
            </el-col>
            <el-col :span="6">
                <el-button size="small" @click="getHander">查询</el-button>
            </el-col> 
        </el-row>
        <hpTable :tableList="tableList" :tableData="tableData" :page="page" @pageChange="pageChange" @rowData="rowData" :isShowBtn="isShowBtn" @multChange="multChange" :isHeight="300" :loading="loading"></hpTable>
        <span slot="footer" class="dialog-footer">
            <el-button @click="doExit" size="small" type="primary">确 定</el-button>
        </span>
        </el-dialog> 
    </div>
</template>

<script>
import hpTable from "./hpTable.vue";
import config from "../../../config/config.js"
// import { mixinText } from "../../../mixins/moreStorage.js";
import { getPeopleData,getModelData,getSupperData,saveSubmit,details,submit } from "@/api/maintenance/hzpropertyrepair";
export default {
    
    data(){
        return {
            disData: [],
            disId: [],
            id: 0,
            dialogImageUrl: "",
            dialogPicture: false,
            ownerId: 0,  
            roomUuid: "",
            isShowBtn: false,   //控制子组件按钮的显示与隐藏
            ruleForm: {
                isHandover: "",
                title: "",
                // isPressing: "",
                solveTime: "",
                ownerName: "",
                projectName: "",
                projectStageName: "",
                buildName: "",
                // unitName: "",
                roomName: "",
                requirement: "",
                sontableData: [{bx: 1, model: [],moduleId: "",bigClassId: "",smallClassId: "",supplierCode: "",isHelp: "",isHandover: "",warrantyStartTime: "",warrantyEndTime:"",explanation: ""}],
            },
            defaultParams:{ 
                label: 'name',
                value: 'id',
                children: 'children'
            },
            // addForm:{
            //     sontableData: [{model: "",bigProblem: "",smallProblem: "",splier: "",isChange: "",startTime: "",speak:""}],
            // },
            hotOption: [{label: "是",value: '0'},{label: "否",value: '1'}],  // 是否紧急下拉框信息
            dialogVisible: false,  //人员弹框
            tableList: [],
            selId: [],  
            files: [], //上传图片
            fd: [],
            rules:{
                title: [{required: true, message: "请输入报修标题", trigger: "blur"}],
                // isPressing: [{required: true, message: "请选择紧急程度", trigger: "blur"}],
                solveTime: [{required: true, message: "请选择业主要求时间", trigger: "blur"}],
                ownerName: [{required: true, message: "请选择业主信息", trigger: "change"}],
                projectName: [{required: true, message: "请选择项目", trigger: "change"}],
                projectStageName: [{required: true, message: "请选择分期", trigger: "change"}],
                buildName: [{required: true, message: "请选择楼栋", trigger: "change"}],
                roomName: [{required: true, message: "请选择房间信息", trigger: "change"}],
                requirement: [{required: true, message: "请输入问题描述", trigger: "blur"}],
                // unitName: [{required: true, message: "请输入单元", trigger: "change"}],
                file: [{required: true, message: "请选择图片"}],
                isHandover: [{required: true, message: "请输入是否交接", trigger: "change"}],
            },
            moreRules:{
                moreMode:[{required: true, message: "请选择用户问题", trigger: "change"}],
                moreSupplier: [{required: true, message: "供应商不可为空", trigger: "blur"}],
            },
            listQuery:{
                page: 1,
                limit: 10,
                projectUuidList: [],
                ownerName: "",
                ownerTep: "",
                roomName:""
            },
            tableData: [],
            page: {
                page: 1,
                limit: 10,
                total: 0,
            },
            modelOption: [],  //三级联动数据
            fileList: [],
            imageFileAllData: [],
            showFlag: false,
            loading: true,
            pickerOptions:{
                disabledDate(time){
                    return time.getTime()  < Date.now() - 8.64e7;
                }
            },
            supplierOption: [],
            tableValue: [],
            supplierCode: "",
            contractCode: "",
        }
    },
    methods: {
        // 获取子组件传过来的值 --- 选中项
        multChange(data){
            this.disData = data;
            this.disId = data.map(v => v.id);
        },
        // 获取子组件传过来的值
        pageChange(data){
            this.listQuery = Object.assign(this.listQuery,data);
            this.getList();
        },
        rowData(data){
            // 清空列表
            this.ruleForm.sontableData =  [{bx: 1, model: [],moduleId: "",bigClassId: "",smallClassId: "",supplierCode: "",isHelp: "",isHandover: "",warrantyStartTime: "",warrantyEndTime:"",explanation: ""}];
            this.supplierOption = [];
            // 
            this.ownerId = data.id;
            this.$set(this,"ownerId",data.id);
            console.log(this.ownerId)
            this.roomUuid = data.roomUuid;
            this.ruleForm.projectName = data.projectName;
            this.ruleForm.projectStageName = data.projectStageName;
            this.ruleForm.buildName = data.buildName;
            // this.ruleForm.unitName = data.unitName;
            this.ruleForm.roomName = data.roomName;
            this.ruleForm.ownerName = data.ownerName;
            this.ruleForm.isHandover = data.isHandover == 1 ? '是' : '否';
            
            // 关闭弹框
            this.dialogVisible = false; 
        },
        doExit(){
            console.log(this.disId);
            if(this.disId.length > 1){
                this.$message({
                    type: 'failed',
                    message: '最多选择一项，不可多选'
                })
                return false;
            }
            if(this.disId.length == 0){
                this.$message({
                    type: 'failed',
                    message: '至少选择一项',
                })
                return false;
            }
            this.rowData(this.disData[0])
        },
        addPeople(){
            // 初始化
            this.listQuery.ownerName = "";
            this.listQuery.ownerTep = "";
            // 获取业主信息
           this.getList();
            // 获取业主信息
            this.dialogVisible = true;
            // 修改列表项
            this.tableList = config.hzpropertyrepair.hzDialogList;
        },
        getList(){
            this.loading = true;
             getPeopleData(this.listQuery).then(res => {
                console.log(res);
                var data = res.data.records;
                data.forEach((item,index) => {
                    // if(item.projectName && item.projectStageName && item.buildName && item.unitName && item.roomName)
                    item.problem = `${item.projectName}-${item.projectStageName}-${item.roomName}`;
                })
                console.log(data);
                this.tableData = data;
                this.page.total = res.data.total;
                this.loading = false;
            })
        },
        getHander(){
            this.getList();
        },
        keyDown(){
            this.getList();
        },
        // 返回按钮
        goback(){
            this.$store.commit("DEL_TAG", {value:"/maintenance/hzpropertyrepair/add",close:true,});
            this.$router.go(-1);
        },
        onChange(file,fileList){
            var list = ['jpg','jpeg','png','gif',"GIF"];
            var arr = file.name.split('.')
            console.log((list.indexOf(arr[arr.length-1]) == -1));
            if(list.indexOf(arr[arr.length-1]) == -1){
                this.handleRemove(file,fileList,1);
                this.$message({
                    type: 'failed',
                    message: `文件格式不正确，不允许上传${arr[arr.length-1]}格式的文件`
                })
            }
        },
        // 图片上传逻辑
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeUploadPicture(file) {
            this.files.push(file);
        },
        handleRemove(file,fileList,code){
            console.log(code);
            if(code){
                fileList.splice(fileList.indexOf(file), 1);
                return false;
            }
            this.imageFileAllData.forEach((item,index) => {
                if(item.attUrl === file.url){
                    this.imageFileAllData.splice(index,1);
                }
            })
        },
        upPicture(num,numAgain){
            var loading = this.$loading({lock: true,text: '保存中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
            // 处理数据
            console.log(this.ruleForm.sontableData);
            this.ruleForm.sontableData.forEach((item,index) => {
                item.moduleId = item.model[0];
                item.bigClassId = item.model[1];
                item.smallClassId = item.model[2];
            })
            var fd = new FormData();
            // 判断代码
            if(this.$route.query.name == '新增'){
                // 新增页面
                 this.files.forEach((item,index) => {
                    fd.append('calculateFiles',item);
                })
                fd.append('hzPropertyRepair',JSON.stringify({
                    title: this.ruleForm.title,
                    source: this.$route.query.configId == 2 ? 0 : 1,
                    roomUuid: this.roomUuid,
                    requirement: this.ruleForm.requirement,
                    solveTime: this.ruleForm.solveTime,
                    isHandover: this.ruleForm.isHandover == '已交接' ? 1 : 0,
                }));
                this.$set(this.ruleForm.sontableData[0],'contractCode', this.contractCode);
                console.log(this.ruleForm.sontableData,"this.ruleForm.sontableDatathis.ruleForm.sontableDatathis.ruleForm.sontableData")
                fd.append('repairProblems',JSON.stringify(this.ruleForm.sontableData));
                if(num == 1){
                    console.log(this.ruleForm.sontableData,"18812096731");
                    // 暂存按钮
                    saveSubmit(fd).then(res => {
                        console.log(res);
                        loading.close();
                        this.$message({
                            type: 'success',
                            message: '暂存成功',
                        })
                         this.$router.go(-1);
                    })
                }else if(num == 2){
                    // 提交按钮
                    submit(fd).then(res => {
                        console.log(res);
                        loading.close();
                        this.$message({
                            type: 'success',
                            message: '提交成功',
                        })
                        if(numAgain != 1){
                            this.$router.go(-1);
                        }
                    })
                }
            }else if(this.$route.query.name == '详情'){
               
                // 详情页面
                this.files.forEach((item,index) => {
                    fd.append('calculateFiles',item);
                })
                fd.append('hzPropertyRepair',JSON.stringify({
                    title: this.ruleForm.title,
                    source: this.$route.query.configId == 2 ? 0 : 1,
                    roomUuid: this.roomUuid,
                    isHandover: this.ruleForm.isHandover == '已交接' ? 1 : 0,
                    requirement: this.ruleForm.requirement,
                    // isPressing: this.ruleForm.isPressing,
                    solveTime: this.ruleForm.solveTime,
                    id: this.id,
                    
                    fileId: this.imageFileAllData.map(v => v.id).toString(),
                }));
                this.$set(this.ruleForm.sontableData[0],'contractCode', this.contractCode);
                fd.append('repairProblems',JSON.stringify(this.ruleForm.sontableData));
                if(num == 1){
                    // 暂存按钮
                    saveSubmit(fd).then(res => {
                        console.log(res);
                        loading.close();
                        this.$message({
                            type: 'success',
                            message: '暂存成功',
                        })
                         this.$router.go(-1);
                    })
                }else if(num == 2){
                    // 提交按钮
                    submit(fd).then(res => {
                        console.log(res);
                        loading.close();
                        this.$message({
                            type: 'success',
                            message: '提交成功',
                        })
                        if(numAgain != 1){
                            this.$router.go(-1);
                        }
                    })
                }
            }
        },
        // 保存按钮
        saveRepair(){
            // ruleForm
            this.$refs['ruleForm'].validate((valid) => {
                if(valid){
                    this.$refs.upload.submit();
                    this.upPicture(1);
                   
                }else{
                    console.log("失败")
                }
            })
        },
        // 提交
        submitRepair(){
            // ruleForm
            this.$refs['ruleForm'].validate((valid) => {
                if(valid){
                    this.$refs.upload.submit();
                    this.upPicture(2);
                }else{
                    console.log("失败")
                }
            })
        },
        // 再次报修
        againRepair(){
             this.$refs['ruleForm'].validate((valid) => {
                if(valid){
                    this.$refs.upload.submit();
                    this.upPicture(2,1);
                    this.id = "";
                    this.imageFileAllData = [];
                    // // 清空表单
                    this.fileList = [];
                    this.$refs['ruleForm'].resetFields();
                    this.ruleForm.sontableData =  [{bx: 1, model: [],moduleId: "",bigClassId: "",smallClassId: "",supplierCode: "",isHelp: "",isHandover: "",warrantyStartTime: "",warrantyEndTime:"",explanation: ""}];
                }
            })
        },
        // 报修单编号  hr_年度_项目编号_项目分期_报修楼栋_4位流水号
        // 新增模块按钮
        addModel(){
            this.ruleForm.sontableData.push({bx: Date.parse(new Date()),model: [],moduleId: "",bigClassId: "",smallClassId: "",supplierCode: "",splier: "",isHelp: "",isHandover: "",warrantyStartTime: "",warrantyEndTime:"",explanation: ""})
        },
        // 删除按钮
        delModel(){
            console.log(this.ruleForm.sontableData[0].model);
            if(this.ruleForm.sontableData.length <= 1 || this.ruleForm.sontableData.length == this.selId.length){
                this.$message({
                    type: "fail",
                    message: "最少保留一项"
                })
                return false;
            }
            if(this.selId.length == 0){
                this.$message({
                    type: "fail",
                    message: "至少选择一项",
                })
                return false;
            }
            for(var i=0;i< this.ruleForm.sontableData.length;i++){
                for(var j=0;j<this.selId.length;j++){
                    if(this.ruleForm.sontableData[i].id == this.selId[j]){
                        this.ruleForm.sontableData.splice(i,1);
                    }
                }
            }
            this.$message({
                type: "success",
                message: "删除成功"
            })
        },
        // 获取报修模块明细三级联动数据
        repairDetail(){
            getModelData().then(res => {
                console.log(res,"11111111111");
                res.data.forEach((item,index) => {
                    this.modelOption.push(item);
                })
                console.warn(this.modelOption)
            })
        },
        // 带出供应商信息
        modelChange(val){
            this.supplierOption = [];
            if(this.ruleForm.projectName == ""){
                var obj = {bx: val.bx, model: [],moduleId: "",bigClassId: "",smallClassId: "",supplierCode: "",isHelp: "",isHandover: "",warrantyStartTime: "",warrantyEndTime:"",explanation: ""};
                this.ruleForm.sontableData.forEach((item,index) => {
                    if(item.bx == val.bx){
                        this.ruleForm.sontableData.splice(index,1,obj);
                    }
                })
                this.$message({
                    type: "error",
                    message: "请先选择业主信息",
                })
                return false;
            }
            getSupperData({problemId: val.model[1], ownerId: this.ownerId}).then(res => {
                if(res.data.length == 0){
                    this.ruleForm.sontableData[0].supplierCode =  "";
                    this.ruleForm.sontableData[0].isHelp =  "";
                    this.ruleForm.sontableData[0].isHandover =  "";
                    this.ruleForm.sontableData[0].warrantyStartTime =  "";
                    this.ruleForm.sontableData[0].warrantyEndTime =  "";
                    this.supplierOption = [];
                    this.ruleForm.sontableData[0].isHelp = "";
                    return false;
                }
                // 获取数据
                this.tableValue = res.data;
                var data = res.data[0];  //默认获取滴1个
                this.contractCode = data.contractCode;
                var date = data.warrantyEndTime ? new Date(data.warrantyEndTime) : "";
                res.data.forEach((item,index) => {
                    this.supplierOption.push({name: item.supplierName, code: item.supplierCode});
                })
                // 默认显示
                this.ruleForm.sontableData[0].supplierCode = data.supplierCode ? data.supplierCode : "";
                this.ruleForm.sontableData[0].isHandover = data.isHandover == '1' ? '是' : '否';
                if(!data.warrantyEndTime && data.supplierCode.length != 0){
                    this.ruleForm.sontableData[0].isHelp = "保内";
                }else if(data.warrantyEndTime && data.supplierCode.length != 0){
                    this.ruleForm.sontableData[0].isHelp = date.getTime() > Date.parse(new Date()) ? "保内" : "保外";
                }else{
                    this.ruleForm.sontableData[0].isHelp = "";
                }
                this.ruleForm.sontableData[0].warrantyStartTime = data.warrantyStartTime ? data.warrantyStartTime.split(" ")[0] : "";
                this.ruleForm.sontableData[0].warrantyEndTime = data.warrantyEndTime ? data.warrantyEndTime.split(" ")[0] : "";

            })
        },
        // 选中项
        handleSelectionChange(val){
            console.log(val);
            this.selId = val.map(v => v.id);
        },
        suppierChange(){
            this.tableValue.forEach((item,index) => {
                var date = new Date(item.warrantyEndTime);
                if(item.supplierCode == this.ruleForm.sontableData[0].supplierCode){
                    this.ruleForm.sontableData[0].isHandover = item.isHandover == '1' ? '是' : '否';
                     if(!item.warrantyEndTime){
                        this.ruleForm.sontableData[0].isHelp = "保内";
                    }else{
                        this.ruleForm.sontableData[0].isHelp = date.getTime() > Date.parse(new Date()) ? "保内" : "保外";
                    }
                    this.ruleForm.sontableData[0].warrantyStartTime = item.warrantyStartTime ? item.warrantyStartTime.split(" ")[0] : "";
                    this.ruleForm.sontableData[0].warrantyEndTime = item.warrantyEndTime ? item.warrantyEndTime.split(" ")[0] : "";
                    this.contractCode = item.contractCode ? item.contractCode : "";
                }
            })
        },
        getDetail(){
            details({id: this.id}).then(res => {
                console.log(res);
                var data = res.data.data;
                this.ruleForm.title = data.title;
                // this.ruleForm.isPressing = data.isPressing;
                this.ruleForm.solveTime = data.solveTime;
                this.ruleForm.ownerName = data.ownerName;
                this.ruleForm.projectName = data.projectName;
                this.ruleForm.projectStageName = data.projectStageName;
                this.ruleForm.buildName = data.buildName;
                // this.ruleForm.unitName = data.unitName;
                this.ruleForm.roomName = data.roomName;
                this.ruleForm.requirement = data.requirement;
                this.ruleForm.isHandover = data.isHandover == 1 ? "是" : "否";
                this.ownerId = data.ownerId;
                this.roomUuid = data.roomUuid;
                // 图片回显
                if(data.sysAttachments != null){
                    this.imageFileAllData =  data.sysAttachments;
                    data.sysAttachments.forEach(item => {
                        var obj = {};
                        obj.url = item.attUrl;
                        this.fileList.push(obj);
                    })
                }
                data.repairProblemVos.forEach((item,index) => {
                    console.warn(this.ruleForm.sontableData)
                    this.ruleForm.sontableData[0].model = [item.moduleId, item.bigClassId];
                    this.ruleForm.sontableData[0].warrantyStartTime = item.warrantyStartTime ? item.warrantyStartTime.split(" ")[0] : "";
                    this.ruleForm.sontableData[0].warrantyEndTime = item.warrantyEndTime ? item.warrantyEndTime.split(" ")[0] : "";
                    this.getSupplierOver(data.ownerId, item.bigClassId).then(res => {
                        this.ruleForm.sontableData[0].supplierCode = item.supplierCode;
                    })
                    if(!item.warrantyEndTime && this.supplierOption.length != 0){
                        this.ruleForm.sontableData[0].isHelp = "保外";
                    }else if(item.warrantyEndTime && this.supplierOption.length != 0){
                        this.ruleForm.sontableData[0].isHelp = date.getTime() > Date.parse(new Date()) ? "保内" : "保外"; 
                    }else{
                        this.ruleForm.sontableData[0].isHelp = "";
                    }
                    
                })
                // 回显问题明细
            })
        },
        getSupplierOver(ownerId, problemId){
            return new Promise((resolve,reject) => {
                getSupperData({problemId, ownerId}).then(res => {
                    this.tableValue = res.data;
                    res.data.forEach((item,index) => {
                        this.supplierOption.push({name: item.supplierName, code: item.supplierCode});
                    })
                    resolve();
                })
            })
        },
        // 初始化
        getFrist(){
            this.ruleForm = {
                isHandover: "",
                title: "",
                // isPressing: "",
                solveTime: "",
                ownerName: "",
                projectName: "",
                projectStageName: "",
                buildName: "",
                // unitName: "",
                roomName: "",
                requirement: "",
                sontableData: [{bx: 1, model: [],moduleId: "",bigClassId: "",smallClassId: "",supplierCode: "",isHelp: "",isHandover: "",warrantyStartTime: "",warrantyEndTime:"",explanation: ""}],
            };
            this.fileList = [];
            this.showFlag = false;
            // this.files = [];
        }
    },
    activated(){
        this.getFrist(); 
        this.listQuery.projectUuidList = this.$route.query.itemId;
        this.repairDetail();
        if(this.$route.query.name == '详情'){
            this.id = this.$route.query.id;
            this.showFlag = this.$route.query.state == '已确认' ? true : false;
            // this.getNoImgDetail();
        }   
        console.log(this.isHandover,"zzzzzzz")
    },
    components:{
        hpTable,
    },
    beforeRouteEnter(to,from ,next){
        next(vm => {
            console.log(1111)
            vm.getFrist();
            vm.listQuery.projectUuidList = vm.$route.query.itemId;
            vm.repairDetail();
            if(vm.$route.query.name == '详情'){
                vm.id = vm.$route.query.id;
                vm.showFlag = vm.$route.query.state == '已确认' ? true : false;
                vm.getDetail();
            }   
        })
    },
     beforeRouteLeave(to, from, next) {
        this.$store.commit("DEL_TAG", {value:"/maintenance/hzpropertyrepair/add",close:true,});
        next();
    },
}
</script>

<style lang="scss" scoped>
.app-container{
    overflow: scroll;
}
.text {
    font-size: 18px;
    font-weight: 800;
  }
  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .el-card {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border: 1px solid rgba(0,0,0,0.1)
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-col{
      height: 50px;
  }
  .el-form-item__label{
      width: 50px !important;
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
.el-form-item__content{
    margin-top: 10px !important;
}
.el-dialog__body{
    height: 500px !important;
}
.el-form-item__error{
    line-height: 0.4px !important;
}
</style>