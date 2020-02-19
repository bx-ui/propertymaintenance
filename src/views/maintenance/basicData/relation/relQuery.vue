<template>
    <!-- 查询 -->
    <div class="selectIt">
        <el-form label-width="80px">
            <el-row :gutter="24">
                <el-col :span="4">
                    <el-form-item label="模块" label-width="40px">
                        <el-select v-model="listQuery.model" size="small" @change="changeModel">
                            <el-option v-for="(item,index) in modelOption" :key="index" :value="item.id" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="大类" label-width="40px">
                        <el-select v-model="listQuery.bigProblem" size="small">
                            <el-option v-for="(item,index) in bigProblemOption" :key="index" :value="item.id" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="项目" label-width="40px">
                        <el-select v-model="listQuery.project" size="small">
                            <el-option v-for="(item,index) in projectOption" :key="index" :value="item.id" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="分期" label-width="40px">
                        <el-select v-model="listQuery.stage" size="small">
                            <el-option v-for="(item,index) in stageOption" :key="index" :value="item.id" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="楼栋" label-width="40px">
                        <el-select v-model="listQuery.lou" size="small">
                            <el-option v-for="(item,index) in stageOption" :key="index" :value="item.id" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                 <el-col :span="4">
                    <el-form-item label-width="0px">
                        <el-button size="small" type="primary">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import {
    getModelData
} from "@/api/maintenance/relation.js";
export default {
    data(){
        return {
            listQuery: {
                page: 1,
                limit: 10,
                model: "",  //模块
                bigProblem: "",  //问题大类
                project: "",   //项目
                stage: "",  //分期
                lou: "",  //楼栋
            },
            modelOption: [],
            bigProblemOption: [],
            projectOption: [],
            stageOption: [],
            louOption: [],
        }
    },
    methods: {
        getDetailModel(){
            getModelData().then(res => {
                console.log(res)
                this.modelOption = res.data;
            })
        },
        changeModel(){
            this.listQuery.bigProblem = "";
            this.modelOption.forEach((item,index) => {
                if(item.id == this.listQuery.model){
                    this.bigProblemOption = this.modelOption[index].children;
                }
            })
        }
    },
    created(){
        this.getDetailModel();
    }
}
</script>

<style lang="scss" scoped>

</style>