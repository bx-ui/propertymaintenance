<template>
    <div class="app-container calendar-list-container">
        <el-form :model="addForm" label-width="50px" :rules="addRule" ref="addForm">
            <el-row :gutter="24" style="margin: 0 auto">
                <el-col :span="8">
                    <el-form-item label="项目" prop="projectUuid">
                        <el-select v-model="addForm.projectUuid" size="mini" clearable filterable @change="_getUnit">
                            <el-option v-for="(item,index) in projectOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                 <el-col :span="10">
                    <el-form-item label="分期" prop="projectStageUuid" label-width="80px">
                        <el-select v-model="addForm.projectStageUuid" size="mini" clearable filterable @change="_getBuild">
                            <el-option v-for="(item,index) in stageOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24" style="margin: 0 auto">
                <el-col :span="8">
                    <el-form-item label="楼栋" prop="buildUuid">
                        <el-select v-model="addForm.buildUuid" size="mini" clearable filterable>
                            <el-option v-for="(item,index) in buildOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                 <el-col :span="10">
                    <el-form-item label="巡检类型" prop="inspectionItemId" label-width="80px">
                        <!-- <el-select v-model="addForm.type" size="mini" clearable filterable>
                            <el-option v-for="(item,index) in typeOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select> -->
                         <el-cascader :options="typeOption" clearable  v-model="addForm.inspectionItemId" size="mini" :props="defaultParams" @change="addDesc"></el-cascader>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="21">
                    <el-form-item label="问题概述" prop="inspectionItemId" label-width="70px">
                        <!-- <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="addForm.desc"
                        :disabled="true">
                        </el-input> -->
                        <el-cascader :options="typeOption" clearable  v-model="addForm.inspectionItemId" size="mini" :props="defaultParams" :disabled="true"></el-cascader>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="21" style="margin-top: 10px; height: 140px">
                    <el-form-item label="附件" label-width="70px">
                        <el-upload 
                            :file-list="fileList"
                            ref="upload"
                            action="111"
                            accept=".jpg,.jpeg,.png,.gif"
                            list-type="picture-card"
                            names="files"
                            :limit="4"
                            multiple
                            :auto-upload="false"
                            :on-change="onChange"
                            :on-remove="onRemove">
                                <i class="el-icon-plus"></i>
                        </el-upload>
                            <!-- <el-dialog :visible.sync="dialogPicture">
                                <img :src="dialogImageUrl" alt="" width="100%">
                            </el-dialog> -->
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="21">
                    <el-form-item label="问题描述" prop="description" label-width="70px">
                        <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="addForm.description">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="btns">
                <el-button size="mini" type="primary" @click="submit">确认</el-button>
                <el-button size="mini" type="primary" @click="save">暂存</el-button>
                <el-button size="mini" type="primary">返回</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import { mixinText } from "@/mixins/getProjectAndstage.js"
import {
  getBuild,
} from "@/api/maintenance/relation.js";
import { getTree } from 'api/maintenance/inspect.js'
import { add } from 'api/maintenance/listData.js'
export default {
    mixins: [mixinText],
    data(){
        return {
            addForm: {
                projectUuid: "",
                projectStageUuid: "",
                buildUuid: "",
                inspectionItemId: [],
                description: "",
                chargeDept: "",
                inspectionTypeId: "",
            },
            addRule: {
                projectUuid: [{required: true, message: "请选择项目", trigger: "blur"}],
                projectStageUuid: [{required: true, message: "请选择分期", trigger: "blur"}],
                // buildUuid: [{required: true, message: "请选择楼栋", trigger: "blur"}],
                inspectionItem: [{required: true, message: "请选择巡检类型", trigger: "blur"}],
                description:  [{required: true, message: "请选择问题描述", trigger: "blur"}],

            },
            projectOption: [],
            stageOption: [],
            buildOption: [],
            fileList: [],
            typeOption: [],
            dialogPicture: false,
            Lander: JSON.parse(sessionStorage.getItem("userInfo")).content.userId,
            defaultParams:{ 
                label: 'name',
                value: 'id',
                children: 'children'
            },
            typeOptopn: [],
            files: [],
            loading: "",
        }
    },
    methods: {
        // _getProjects(){
        //     getProjects({ userId: this.Lander, type: 1 }).then(res => {
        //         this.projectOption = res.data;
        //     })
        // },
        _getUnit(){
            this.addForm.projectStageUuid = "";
            this.changePro(this.addForm.projectUuid).then(res => {
                this.stageOption = res;
            })
        },
        _getBuild(){
            getBuild({projectStageCode: this.addForm.projectStageUuid}).then(res => {
                this.buildOption = res.data;
            })
        },
        _getTree(){
            getTree().then(res => {
                console.log(res)
                this.typeOption = res.data.data;
            })
        },
        addDesc(){
            console.log(this.typeOption)
        },
        onChange(file,fileList){
            console.log(file)
            this.files.push(file);
        },
        onRemove(file,fileList){
            console.log(file);
            this.files.forEach((item,index) => {
                if(file.url == item.url){
                    this.files.splice(index,1);
                }
            })
        },
        // getQuery(state){
        //     this.$refs["addForm"].validate((valid) => {
        //         if(valid){
        //             this.loading = this.$loading({lock: true,text: '保存中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
        //             this.getRoot();
        //             let fd = new FormData();
        //             this.files.forEach((item,index) => {
        //                 fd.append('calculateFiles', item.raw);
        //             })
        //             fd.append('hzInspectionOrder', JSON.stringify(this.addForm));
        //             fd.append('state', JSON.stringify(state));
        //             return fd;
        //         }
        //     })
        // },
        getRoot(){
            if(!!this.addForm.buildUuid){
                this.addForm.chargeDept = 'wx_gj';
                return false;
            }
            this.typeOption.forEach((item,index) => {
                if(item.id == this.addForm.inspectionItemId[0]){
                    this.addForm.chargeDept = item.code;
                }
            })
        },
        save(){
            // 暂存
            this.$refs["addForm"].validate((valid) => {
                if(valid){
                    this.loading = this.$loading({lock: true,text: '保存中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
                    this.getRoot();
                    
                    console.log(this.addForm.inspectionItemId,"命苦")
                    this.addForm.inspectionTypeId = this.addForm.inspectionItemId[0];
                    let fd = new FormData();
                    this.files.forEach((item,index) => {
                        fd.append('calculateFiles', item.raw);
                    })
                    this.addForm.inspectionItemId = this.addForm.inspectionItemId.toString();
                    fd.append('hzInspectionOrder', JSON.stringify(this.addForm));
                    fd.append('state', JSON.stringify(0));
                    add(fd).then(res => {
                        this.loading.close();
                        this.$message({
                            type: 'success',
                            message: '暂存成功'
                        })
                        this.$router.go(-1)
                        console.log(res)
                    })
                }
            })
        },
        submit(){
            // 确认
            this.$refs["addForm"].validate((valid) => {
                if(valid){
                    this.loading = this.$loading({lock: true,text: '保存中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
                    this.getRoot();
                    this.addForm.inspectionTypeId = this.addForm.inspectionItemId[0];
                    let fd = new FormData();
                    this.files.forEach((item,index) => {
                        fd.append('calculateFiles', item.raw);
                    })
                    this.addForm.inspectionItemId = this.addForm.inspectionItemId.toString();
                    fd.append('hzInspectionOrder', JSON.stringify(this.addForm));
                    fd.append('state', JSON.stringify(1));
                    add(fd).then(res => {
                        this.loading.close();
                        this.$message({
                            type: 'success',
                            message: '暂存成功'
                        })
                        this.$router.go(-1)
                        console.log(res)
                    })
                }
            })

        }

    },
    created(){
        this.getPro().then(res => {
            this.projectOption = res;
        });
        this._getTree();
    }
}
</script>

<style lang="scss" scoped>
.app-container {
  /deep/ .el-upload--picture-card {
    width: 120px !important;
    height: 120px !important;
    line-height: 120px !important;
  }
    /deep/ .el-upload-list__item-actions {
    width: 120px !important;
    height: 120px !important;
    line-height: 120px !important;
  }
  /deep/ .el-upload-list__item-thumbnail {
    width: 120px !important;
    height: 120px !important;
    line-height: 120px !important;
  }
  /deep/ .el-upload-list__item {
    width: 120px !important;
    height: 120px !important;
    line-height: 120px !important;
  }
}
.el-row{
    display: flex;
    justify-content: space-between;
    padding-left: 100px;
    padding-right: 160px;
}
.el-col{
    height: 60px;
}
.btns{
    text-align: center;
    margin-top: 40px;
}
</style>