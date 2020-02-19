<template>
    <div class="app-container calendar-list-container">
        <el-form :model="addForm" label-width="50px" :rules="addRule" ref="addForm">
            <el-row :gutter="24" style="margin: 0 auto">
                <el-col :span="8">
                    <el-form-item label="项目" prop="projectUuid">
                        <el-select v-model="addForm.projectUuid" size="mini" clearable filterable @change="_getUnit" :disabled="flag">
                            <el-option v-for="(item,index) in projectOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                 <el-col :span="10">
                    <el-form-item label="分期" prop="projectStageUuid" label-width="80px">
                        <el-select v-model="addForm.projectStageUuid" size="mini" clearable filterable @change="_getBuild" :disabled="flag">
                            <el-option v-for="(item,index) in stageOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24" style="margin: 0 auto">
                <el-col :span="8">
                    <el-form-item label="楼栋" prop="buildUuid">
                        <el-select v-model="addForm.buildUuid" size="mini" clearable filterable :disabled="flag">
                            <el-option v-for="(item,index) in buildOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                 <el-col :span="10">
                    <el-form-item label="巡检类型" prop="inspectionItemId" label-width="80px">
                        <!-- <el-select v-model="addForm.type" size="mini" clearable filterable>
                            <el-option v-for="(item,index) in typeOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select> -->
                         <el-cascader :options="typeOption" clearable  v-model="addForm.inspectionItemId" size="mini" :props="defaultParams" @change="addDesc" :disabled="flag"></el-cascader>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24" style="margin: 0 auto">
                <el-col :span="8">
                    <el-form-item label="巡检人">
                        <el-input v-model="addForm.createUserName" size="mini" clearable :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="巡检时间" label-width="80px">
                        <el-input v-model="addForm.createTime" size="mini" clearable :disabled="true"></el-input>
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
                            :on-remove="onRemove"
                            :disabled="flag">
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
                        v-model="addForm.description"
                        :disabled="flag">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div v-if="star">
                <el-row :gutter="24">
                    <el-col :span="9">  
                        <el-form-item label="闭单人" label-width="50px">
                            <el-input :disabled="true" v-model="addForm.closePerson" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="闭单时间" label-width="70px">
                            <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="addForm.closeTime"
                            :disabled="flag">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="21">  
                        <el-form-item label="闭单理由" label-width="70px">
                            <el-input :disabled="true" v-model="addForm.closeReason" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="21" style="margin-top: 10px; height: 140px">
                        <el-form-item label="闭单图片" label-width="70px">
                            <el-upload 
                                :file-list="closeList"
                                ref="upload"
                                action="111"
                                accept=".jpg,.jpeg,.png,.gif"
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
            </div>
            <div class="btns">
                <el-button size="mini" type="primary" @click="submit" v-if="!star">确认</el-button>
                <el-button size="mini" type="primary" @click="save" v-if="!star">暂存</el-button>
                <el-button size="mini" type="primary" @click="back">返回</el-button>
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
import { add,details } from 'api/maintenance/listData.js'
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
                createTime: "",
                createUserName: "",
                closePerson: "",
                closeTime: "",
                closeReason: ","
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
            // 
            id: "",
            beforeName: "",
            flag: false,
            star: false,
            // 闭单图片部分
            closeList: [],
        }
    },
    methods: {
        // _getProjects(){
        //     getProjects({ userId: this.Lander, type: 1 }).then(res => {
        //         this.projectOption = res.data;
        //     })
        // },
        _getUnit(){
            this.changePro(this.addForm.projectUuid).then(res => {
                this.stageOption = res;
            })
        },
        _getBuild(){
            return new Promise((resolve,reject) => {
                getBuild({projectStageCode: this.addForm.projectStageUuid}).then(res => {
                    
                    resolve(res.data)
                })
            })
        },
        _getTree(){
            getTree().then(res => {
                console.log(res)
                this.typeOption = res.data.data;
            })
        },
        addDesc(){
            console.log(this.addForm.inspectionItemId)
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
            this.fileList.forEach((item,index) => {
                if(file.id = item.id){
                    this.fileList.splice(index,1);
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
                    this.addForm.inspectionTypeId = this.addForm.inspectionItemId[0];
                    let fd = new FormData();
                    this.files.forEach((item,index) => {
                        fd.append('calculateFiles', item.raw);
                    })
                    this.$set(this.addForm, "fileId", this.fileList.map(v => v.id).toString());
                    this.$set(this.addForm,"id",this.id);
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
                    this.files.forEach((item,index) => {
                        fd.append('calculateFiles', item.raw);
                    })
                    this.$set(this.addForm, "fileId", this.fileList.map(v => v.id).toString());
                    this.$set(this.addForm,"id",this.id);
                    fd.append('hzInspectionOrder', JSON.stringify(this.addForm));
                    fd.append('state', JSON.stringify(1));
                    add(fd).then(res => {
                        this.loading.close();
                        this.$message({
                            type: 'success',
                            message: '确认成功'
                        })
                        this.$router.go(-1)
                        console.log(res)
                    })
                }
            })

        },
        // 详情接口
        _detail(){
            details({id: this.id}).then(res => {
                let data = res.data.data;
                Object.keys(this.addForm).forEach(item => {
                    this.addForm[item] = data[item];
                })
                console.log(this.addForm.inspectionItemId,"1111111111111111111")
                this.addForm.inspectionItemId = this.addForm.inspectionItemId.split(",");
                this.addForm.inspectionItemId.forEach((item,index) => {
                    this.$set(this.addForm.inspectionItemId,index,Number(item))
                })
                console.log(this.addForm.inspectionItemId,"1111111111111111111")
                // 文件回显
                data.files.forEach((item,index) => {
                    var obj = {};
                    obj.name = item.attViewName;
                    obj.url = item.attUrl;
                    obj.id = item.id;
                    this.fileList.push(obj);
                })
                data.closeFile.forEach((item,index) => {
                    var obj = {};
                    obj.name = item.attViewName;
                    obj.url = item.attUrl;
                    obj.id = item.id;
                    this.closeList.push(obj);
                })
                console.log(this.fileList,"1111111")
            })
        },
        back(){
            this.$router.go(-1)
        }

    },
    created(){
        this.id = this.$route.query.id;
        this.beforeName = this.$route.query.beforeName;
        this.flag = this.beforeName == '查看' ? true : false;
        this.star = this.$route.query.star == 'gj' ? true : false;
        this.getPro()
        .then(res => {
            this.projectOption = res;
            return this.changePro(this.addForm.projectUuid)
        })
        .then(res => {
            this.stageOption = res;
            return this._getBuild()
        })
        .then(res => {
            this.buildOption = res;
        })
        this._getTree();
        this._detail();
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
    margin-top: 20px;
}
.app-container{
    overflow: scroll;
}
</style>