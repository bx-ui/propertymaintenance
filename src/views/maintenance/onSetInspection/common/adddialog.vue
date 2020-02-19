<template>
    <div>
        <el-dialog title="提示" :visible.sync="value" width="30%">
            <el-form :model="addForm" label-width="50px" :rules="addRule" ref="addForm">
                <!-- <el-form-item label="类型" prop="type">
                    <el-select v-model="addForm.type" size="small" clearable filterable>
                        <el-option v-for="(item,index) in typeOption" :key="index" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item> -->
                 <el-form-item label="名称" prop="name">
                    <el-input v-model="addForm.name" size="small" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" @click="value = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="doSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { add, update } from 'api/maintenance/inspect.js'
import { ERR_OK } from 'api/config.js'
export default {
    props: {
        value: {
            type: Boolean,
            default: true,
        },
        setObj: {
            type: Object,
            default: {},
        },
        updateMsg: {
            type: String,
            default: "",
        },
        tag: {
            type: String,
            default: ""
        },
        id: {
            type: Number,
            default: 0,
        }
    },
    data(){
        return {
            addForm: {
                // type: "",
                name: "",
            },
            // typeOption: [{id: 1, name: "训练类型"}, {id: 2, name: "巡检区域"}, {id: 3, name: "巡检项"}],
            addRule: {
                // type: [{required: true, message: "请选择类型", trigger: "blur"}],
                name: [{required: true, message: "请输入姓名", trigger: "blur"}]
            }
        }
    },
    watch: {
        value(){
            this.$emit('input', this.value)
        },
        updateMsg(){
            this.$nextTick(() => {
                this.addForm.name = this.updateMsg;
            })
        }
    },
    methods:{
        doSubmit(){
           if(this.tag === "新增"){
                Object.assign(this.addForm, this.setObj);
                var loading = this.$loading({lock: true,text: '保存中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
                add(this.addForm).then(res => {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    })
                    this.$emit('input', !this.value);
                    this.$emit('refresh',this.setObj.parentId);
                    loading.close();
                })
           }else if(this.tag === "编辑"){
               Object.assign(this.addForm, {id: this.id});
               var loading = this.$loading({lock: true,text: '保存中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
               update(this.addForm).then(res => {
                        this.$emit('input', !this.value);
                        this.$emit('refresh',this.setObj.parentId);
                        loading.close();
               })
           }
        },
        init(){
            this.$nextTick(() => {
                this.$refs["addForm"].resetFields();
            })
        },
    },
}
</script>
<style lang="scss" scoped>

</style>