<template>
  <div class="app-container calendar-list-container">
    <el-table :data="tableData" style="width: 100%;margin: 10px auto"  :height="height"  @row-dblclick="getMessage" @selection-change="handleSelectionChange" border v-loading="loading">
      <el-table-column type="selection" width="55" fixed="left"></el-table-column>
        <template v-for="(item,index) in tableList">
          <el-table-column 
            v-if="item.prop == 'problem'"
            :key="index"
            :prop="item.prop" 
            :label="item.label" 
            align="center"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column 
            v-else
            :key="index"
            :prop="item.prop" 
            :label="item.label" 
            :width="item.width"
            align="center"
            :show-overflow-tooltip="true">
          </el-table-column>
        </template>
        <!-- <el-table-column 
          v-for="(item,index) in tableList"
          :key="index"
          :prop="item.prop" 
          :label="item.label" 
          :width="item.width"
          align="center"
          :show-overflow-tooltip="true">
        </el-table-column> -->
        <!-- 报修新增页面按钮 -->
        <!-- 为了做按钮权限 -->
      <el-table-column fixed="right" label="操作" v-if="isShowBtn && showPremissionBtn == 1" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" v-if="(scope.row.state == '暂存' || scope.row.state == '未确认') && permissions.hzpropertyrepair_index_update">编辑</el-button>
          <el-button @click="seeDetail(scope.row)" type="text" v-if="permissions.hzpropertyrepair_index_see">查看</el-button>
        </template>
      </el-table-column>
      <!-- 维修确认页面 -->
      <el-table-column fixed="right" label="操作" v-if="isShowBtn && showPremissionBtn == 2" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" v-if="(scope.row.state == '暂存' || scope.row.state == '未确认') && permissions.confirmation_index_update">编辑</el-button>
          <el-button @click="seeDetail(scope.row)" type="text" v-if="permissions.confirmation_index_see">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-row style="text-align:center;margin-top:15px">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="page.page"
        :page-sizes="[10,20,30,50]"
        :page-size="page.limit"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    props:{
        tableList:{
            type: Array,
            default: [],
        },
        tableData:{
          type: Array,
          default: [],
        },
        page:{
          type: Object,
         default: {},
        },
        isShowBtn:{
          type: Boolean,
          default: true,
        },
        itemId:{
          type: Array,
        },
        isHeight: {
          type: Number,
        },
        loading:{
          type: Boolean,
          default: true
        },
        showPremissionBtn: {
          type: Number,
          default: 0
        }
    },
    computed:{
      height(){
        if(this.isHeight == 0){
          return 'calc(100% - 220px)'
        }else{
          return this.isHeight + 'px';
        }
      },
      ...mapGetters(['permissions']),
    },
    data(){
      return{
        multipleSelection: [],  //选中的数据
      }
    },
    methods:{
      sizeChange(val){
        console.log(this.loading);
        this.page.limit = val;
        this.$emit("pageChange",this.page)
      },
      currentChange(val){
        this.page.page = val;
        this.$emit("pageChange",this.page)
      },
      detail({id,state}){ 
        // configId: 2代表这个页面是由工程确认模块跳转过来的   1代表从报修管理跳转过来的
        if(this.$route.path == "/maintenance/confirmation"){
            this.$router.push({
              name: "报表新增",
              query: { id , name: '详情' ,itemId: this.itemId,state,configId: 2 },
            });
        }else if(this.$route.path == '/maintenance/hzpropertyrepair'){
            this.$router.push({
              name: "报表新增",
              query: { id , name: '详情' ,itemId: this.itemId,state,configId: 1 },
            });
        }
      },
      seeDetail({id,state}){
          this.$router.push({
            name: "报表新增",
            query: { id , name: '详情' ,itemId: this.itemId,state: '已确认',configId: 0 },
          });
      },
      getMessage(row, event){
        console.log(row);
        this.$emit("rowData",row);
      },
      // 选择项发生改变时
      handleSelectionChange(val){
        this.multipleSelection = val;
        this.$emit('multChange',val);
      }
    }
}
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  padding: 0;
}
</style>