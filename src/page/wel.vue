<template>
  <div class="app-container calendar-list-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="font">待办</span>
      </div>
      <div class="text-content">
        <div v-for="(item,index) in tableData" :key="index">
          <p class="pclass" @click="getRouter(item)">{{ item.subject }}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getData } from "@/api/wel";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    getList() {
      getData().then(res => {
        var data = res.data;
        this.tableData = data.filter((item,index,array) => {
          return (item.nodeId != 'UserTask_1');
        })
      });
    },
    getRouter({ procInstId, procDefKey }) {
      var state = 0;
      var str = procDefKey.concat(",", procInstId);
      var code = "";
      // if(procDefKey == 'maintenance_ysqdbw' || procDefKey == 'maintenance_ysqdbn'){
      //   //成本预算
      //   state = 7;
      //   this.$router.push({
      //     path: "/repairManager/index",
      //     query: { id: str, state }
      //     //  id  state   责任划分 5 1成本  7 2
      //   });
      // }else if(procDefKey == 'maintenance_zrhf'){
      //   // 责任划分
      //   state = 5;
      //   this.$router.push({
      //     path: "/repairManager/index",
      //     query: { id: str, state }
      //     //  id  state   责任划分 5 1成本  7 2
      //   });
      // }else if(procDefKey == 'acceptance_baowai_wy' || procDefKey == 'acceptance_baonei_noHandover' || procDefKey == 'acceptance_baonei_isHandover'){
      //   // 
      //   state = 1;
      //   this.$router.push({
      //     name: "验收单审批详情",
      //     query: { id: str, state }
      //   });
      // }else if(procDefKey == 'application_xfqcwxcg' ){

      // }
      switch(procDefKey){
        case 'application_xfqcwxcg':
        case 'application_bjwlsbcg':
        case 'application_jtbsbass':
        case 'application_sswb':
        case 'application_gfsq':
        case 'application_bsbp':
        case 'application_bgyp':
        case 'application_bghc':
        case 'application_gcwl':
        case 'application_acwl':
        case 'application_txkdf':
        case 'application_gqwx':
        case 'application_lhwb':
        case 'application_zx':
        case 'application_bj':
        case 'application_wsfljf':
        case 'application_wyfmdl':
        case 'application_yqflpf':
        case 'application_tzsbwb':
        case 'application_tzsbnjf':
          this.request(str);
          break;
        case 'maintenance_ysqdbw':
        case 'maintenance_ysqdbn':
          this.money(str);
          break;
        case 'maintenance_zrhf':
          this.responsibility(str);
          break;
        case 'acceptance_baowai_wy':
        case 'acceptance_baonei_noHandover':
        case 'acceptance_baonei_isHandover':
          this.apprival(str);
          break;
      }
    },
    request(id){
        var state = 999;
        this.$router.push({
          path: "/requireApproval/details",
          query: { id, state, name: "审批" }
        });
    },
    money(id){
      var state = 7;
      this.$router.push({
        path: "/repairManager/index",
        query: { id, state }
      //  id  state   责任划分 5 1成本  7 2
      });
    },
    responsibility(id){
       // 责任划分
      var state = 5;
      this.$router.push({
        path: "/repairManager/index",
        query: { id, state }
        //  id  state   责任划分 5 1成本  7 2
      });
    },
    apprival(id){
        var state = 1;
        this.$router.push({
          name: "验收单审批详情",
          query: { id, state }
        });
    }

  },
  created() {
    this.getList();
  },
  beforeRouteEnter(to,from,next){
    next(vm => {
      vm.getList();
    })
  }
};
</script>

<style scoped="scoped" lang="scss">
.app-container {
  height: 100%;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  height: 300px;
}
.font {
  font-size: 16px;
  font-weight: 600;
}
.pclass {
  cursor: pointer;
}
.el-card__body{
  overflow: scroll;
}
.text-content{
  width: 450px;
  height: 200px;
  overflow: scroll;
  // background-color: red;
}
</style>
