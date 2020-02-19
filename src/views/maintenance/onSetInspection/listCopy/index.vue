<template>
    <div class="app-container calendar-list-container">
        <!-- 搜索 -->
        <el-form label-width="40px">
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="项目" label-width="80px">
                        <el-select v-model="listQuery.projectUuid" size="mini" clearable filterable @change="_getUnit">
                            <el-option v-for="(item,index) in projectOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="分期">
                        <el-select v-model="listQuery.projectStageUuid" size="mini" clearable filterable @change="_getBuild">
                            <el-option v-for="(item,index) in stageOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="楼栋" label-width="80px">
                        <el-select v-model="listQuery.buildUuid" size="mini" clearable filterable>
                            <el-option v-for="(item,index) in buildOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="巡检类型" label-width="80px">
                        <el-select v-model="listQuery.inspectionTypeId" size="mini" clearable filterable>
                            <el-option v-for="(item,index) in typeOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="状态">
                        <el-select v-model="listQuery.state" size="mini" clearable filterable>
                            <el-option v-for="(item,index) in stateOption" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="巡检时间" label-width="80px">
                        <el-date-picker
                            size="mini"
                            v-model="timer"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="巡检级别" label-width="80px">
                        <el-select v-model="listQuery.inspectionLevel" size="mini" clearable filterable>
                            <el-option v-for="(item,index) in levalOption" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                 <el-col :span="4">
                    <el-form-item label-width="10px">
                        <el-button size="mini" type="primary" @click="hander">查询</el-button>
                        <el-button size="mini" type="primary">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!-- 按钮 -->
        <div style="margin-bottom: 15px;">
            <!-- <el-button type="primary" size="mini" @click="add">新增</el-button> -->
            <el-button type="primary" size="mini" @click="closePage">闭单</el-button>
            <el-button type="primary" size="mini" @click="separatePage">分单</el-button>
            <!-- <el-button type="primary" size="mini" @click="del">删除</el-button> -->
            <!-- <el-button type="primary" size="mini" @click="jumpPage">跳单</el-button> -->
        </div>
        <!-- 列表 -->
        <el-table :data="tableData" height="calc(100% - 180px)" style="width: 100%" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column width="120" label="项目" prop="projectName" align="center"></el-table-column>
            <el-table-column width="200" label="分期" prop="projectStageName" align="center"></el-table-column>
            <el-table-column width="60" label="楼栋" prop="buildName" align="center"></el-table-column>
            <el-table-column width="90" label="状态" prop="state" align="center">
                <template slot-scope="scope">
                    {{ scope.row.state | showState }}
                </template>
            </el-table-column>
            <el-table-column width="80" label="巡检类型" prop="inspectionTypeName" align="center"></el-table-column>
            <el-table-column width="100" label="巡检级别" prop="inspectionLevel" align="center">
                <template slot-scope="scope">
                    {{ scope.row.inspectionLevel | showLevel }}
                </template>
            </el-table-column>
            <!-- <el-table-column width="100" label="巡检项" prop="project" align="center"></el-table-column> -->
            <el-table-column width="150" label="问题描述" prop="description" align="center"></el-table-column>
            <el-table-column width="90" label="巡检人" prop="createUserName" align="center"></el-table-column>
            <el-table-column width="90" label="巡检时间" prop="createTime" align="center"></el-table-column>
            <el-table-column width="150" label="闭单原因" prop="closeReason" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="100" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.row)" v-if="scope.row.state == '0'">编辑</el-button>
                    <el-button size="mini" @click="see(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分液器 -->
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
         <!-- 彈框 -->
        <el-dialog title="跳单" :visible.sync="dialogVisible" width="50%">
            <el-form :model="dialogForm" ref="dialogForm" :rules="dialogRule" label-width="60px">
                <el-row>
                    <el-form-item label="闭单图片">
                        <el-upload 
                        action="111" 
                        :file-list="fileList" 
                        ref="upload" 
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
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="理由" prop="reason">
                        <el-input
                            v-model="dialogForm.reason"
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 6}"
                            maxlength="50"
                            show-word-limit
                        ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="doSelectPush" size="mini">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 闭单弹框 -->
        <reDialog v-model="separateVisible" :typeOption="typeOption" :id="selId" ref="reDialog"></reDialog>
    </div>
</template>

<script>
import { closeOrder,chargePage,getRole } from 'api/maintenance/listCopy.js'
import { mixinText } from "@/mixins/getProjectAndstage.js"
import { getItemsByParentId } from 'api/maintenance/inspect.js'
import reDialog from '../common/reDialog.vue'
import {
  getBuild,
} from "@/api/maintenance/relation.js";
export default {
    mixins: [mixinText],
    components: {
        reDialog
    },
    data(){
        return {
            listQuery: {
                projectUuid: "",
                projectStageUuid: "",
                buildUuid: "",
                inspectionTypeId: "",
                state: "",
                startTime: "",
                endTime: '',
                inspectionLevel : "",
                page: 1,
                limit: 10,
            },
            levalOption: [
                {code:'wx_xj_first', name: '一级巡检'},
                {code:'wx_xj_second', name: '二级巡检'},
                {code:'wx_xj_third', name: '三级巡检'},
                {code:'wx_xj_fourth', name: '四级巡检'},
            ],
            total: 0,
            timer: [],
            projectOption: [],
            stageOption: [],
            buildOption: [],
            typeOption: [],
            stateOption: [{id: '', name: '全部'},{id: 0, name: '暂存'}, {id: 1, name: '待闭单'}, {id: 2, name: '已闭单'},{id: 3, name: '跳单'},{id:4, name: '延期'}, {id: 5, name: '申请闭单'}, {id: 6, name: '分单'}],
            tableData: [],
            selId: [],
            multion: [],
            dialogVisible: false,
            dialogForm: {
                reason: "",
            },
            dialogRule: {
                reason: [{required: true, message: "请输入跳单原因", trigger: "blur"}],
            },
            files: [],
            fileList: [],
            Lander: JSON.parse(sessionStorage.getItem("userInfo")).content.userId,
            role: 0,
            imgFlag: true,
            // 分单
            separateVisible: false,
        }
    },
    filters: {
        showState(value){
            const statusDef = {
                0: "暂存",
                1: "待闭单",
                2: "已闭单",
                3: "跳单",
                4: "延期",
                5: "申请闭单",
                6: '分单'
            };
            return statusDef[value];
        },
        showLevel(value){
             const statusDef = {
                'wx_xj_first': "一级巡检",
                'wx_xj_second': "二级巡检",
                'wx_xj_third': "三级巡检",
                'wx_xj_fourth': "四级巡检",
            };
            return statusDef[value];
        }
    },
    methods: {
        sizeChange(val){
            this.listQuery.limit = val;
            this.getList();
        },
        currentChange(val){
            this.listQuery.page = val;
            this.getList();
        },
        refresh(){
            this.getList();
        },
        hander(){
            this.listQuery.page = 1;
            this.getList();
        },
        // add(){
        //     this.$router.push({
        //         name: "巡检新增",
        //         // query: { itemId: this.itemId, name: "新增", configId: 1 }
        //     });
        // },
        getList(){
            if(this.timer){
                this.listQuery.startTime = this.timer[0];
                this.listQuery.endTime = this.timer[1]
            }else{
                this.listQuery.startTime = '';
                this.listQuery.endTime = ''
            }
            chargePage(this.listQuery).then(res => {
                this.tableData = res.data.records;
                this.total = res.data.total;
            })
        },
        edit({id}){
            console.log(id)
             this.$router.push({
                name: "巡检详情",
                query: { id, beforeName: '编辑' },
            });
        },
        see({id}){
            this.$router.push({
                name: "巡检详情",
                query: { id, beforeName: '查看', star: 'gj' },
            });
        },
        handleSelectionChange(val){
            this.multion = val;
            this.selId = val.map(v => v.id);
        },
        // jumpPage(){
        //     this.$nextTick(() => {
        //         this.$refs['dialogForm'].resetFields();
        //     })
        //     if(!this.selId.length){
        //         this.$message.warning('至少选择一条数据')
        //         return false;
        //     }
        //     if(this.selId.length > 1){
        //         this.$message.warning('最多选择一条数据')
        //         return false;
        //     }
        //     if(this.multion[0].state != '1'){
        //         this.$message.warning('只有确认的数据才可以跳单')
        //         return false;
        //     }
        //     this.dialogVisible = true;

        // },
        closePage(){
            console.log(this.multion.map(v => v.state))
            this.$nextTick(() => {
                this.$refs['dialogForm'].resetFields();
            })
            if(!this.selId.length){
                this.$message.warning('至少选择一条数据')
                return false;
            }
                if(this.selId.length > 1){
                this.$message.warning('最多选择一条数据')
                return false;
            }
            if(this.multion.map(v => v.state).indexOf('1') == -1){
                this.$message.warning("只有待闭单的数据才可以闭单");
                return false;
            }
            if(this.multion[0].state == 1){
                this.imgFlag = false;
            }
             this.dialogVisible = true;
        },
        separatePage(){
            // this.separateVisible = true;
            if(!this.selId.length){
                this.$message.warning("至少选择一条数据");
                return false;
            }
            let mulData = this.multion.map(v => v.state);
            if(mulData.indexOf('1') == -1 && mulData.indexOf('4') == -1){
                this.$message.warning("该状态下的数据不可分单");
                return false;
            }
            this.$refs.reDialog.init();
            this.separateVisible = true;
        },
        doSelectPush(){
            console.log(this.multion[0],"this.multion[0]");
            let fd = new FormData();
            this.files.forEach((item,index) => {
                fd.append('closeFile', item.raw);
            })
            fd.append('id', JSON.stringify(this.selId[0]));
            fd.append('reason', JSON.stringify(this.dialogForm.reason));
            fd.append('state', this.multion[0].state)
            if(this.role == 1 && !! this.multion[0].buildName){
                fd.append('closePerson', JSON.stringify(1))
            }else{
                fd.append('closePerson', JSON.stringify(0))
            }
            var loading = this.$loading({lock: true,text: '保存中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
            closeOrder(fd).then(res => {
                this.$message({
                    type: 'success',
                    message: '闭单成功'
                })
                this.dialogVisible = false;
                this.getList();
                loading.close();
            })
        },
        onChange(file,fileList){
            this.files.push(file);
            console.log(file);
        },
        onRemove(file,fileList){
             this.files.forEach((item,index) => {
                if(file.url == item.url){
                    this.files.splice(index,1);
                }
            })
        },
        _getRole(){
            getRole().then(res => {
                console.log(res,"比大宝")
                let roles = res.data.data;
                if(roles.indexOf('wx_gj') != -1){
                    this.role = '管家'
                }else{

                }
                this.role = roles.indexOf('wx_gj') == -1 ? 1 : 0;
            })
        },
        _getUnit(){
            this.listQuery.projectStageUuid = "";
            this.changePro(this.listQuery.projectUuid).then(res => {
                this.stageOption = res;
            })
        },
        _getBuild(){
            getBuild({projectStageCode: this.listQuery.projectStageUuid}).then(res => {
                this.buildOption = res.data;
            })
        },
        getType(){
            getItemsByParentId({parentId: 0}).then(res => {
                this.typeOption = res.data.records;
            })
        }
        
    },
    created(){
        this.getList(); 
        this._getRole();
        this.getPro().then(res => {
            this.projectOption = res;
        });
        this.getType();
    }
}
</script>
 
<style lang="scss" scoped>
.el-col{
    height: 45px;
}
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
</style>