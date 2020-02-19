<template>
    <div>
        <el-dialog title="提示" :visible.sync="value" width="60%">
            <el-form :model="addForm" label-width="120px" :rules="addRule" ref="addForm">
                <el-row>
                    <el-form-item label="请选择分单人">
                         <el-radio v-for="(item,index) in typeOption" :key="index" v-model="addForm.personRadio" :label="item.code" border>{{ item.name }}</el-radio>
                         <!-- <el-radio v-model="personRadio" label="2" border>备选项2</el-radio> -->
                    </el-form-item>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" @click="value = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="doSubmit" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { ERR_OK } from 'api/config.js'
import { separateOrders } from 'api/maintenance/listCopy.js'
export default {
    props: {
        value:{
            type: Boolean,
            default: true,
        },
        typeOption: {
            type: Array,
            default: [],
        },
        id: {
            type: Array,
            default: [],
        }
    },
    watch: {
        value(){
            this.$emit('input', this.value)
        }
    },
    data(){
        return {
           addForm: {
               personRadio: ""
           },
           addRule: {

           },
        }
    },
    methods:{
        init(){
            this.$nextTick(() => {
                this.$refs["addForm"].resetFields();
            })
            this.addForm.personRadio = "";
        },
        doSubmit(){
            var loading = this.$loading({lock: true,text: '保存中，请稍后...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
            separateOrders({id: this.id[0], chargeDept: this.addForm.personRadio}).then(res => {
                this.$message({
                    type: 'success',
                    message: '分单成功'
                })
                loading.close();
                this.$emit('refresh')
            })
        }
    },
}
</script>
<style lang="scss" scoped>

</style>