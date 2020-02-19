<template>
  <div class="selectIt" style="padding-bottom:15px;">
    <el-form label-width="100px">
      <el-row :gutter="24">
        <el-col :span="5">
          <el-form-item label="项目名称" label-width="80px">
            <el-select
              v-model="listQuery.projectUuid"
              size="small"
              clearable
              filterable
              @change="changeProject"
            >
              <el-option
                v-for="(item,index) in projectOption"
                :key="index"
                :label="item.projectName"
                :value="item.projectId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="分期" label-width="40px">
            <el-select
              v-model="listQuery.projectStageUuid"
              size="small"
              clearable
              filterable
              @change="changeStage"
              :disabled="listQuery.projectUuid == ''"
            >
              <el-option
                v-for="(item,index) in stagetOption"
                :key="index"
                :label="item.projectStageName"
                :value="item.projectStageUuid"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="楼栋" label-width="70px">
            <el-select
              v-model="listQuery.buildUuid"
              size="small"
              clearable
              filterable
              :disabled="listQuery.projectStageUuid == '' || listQuery.projectUuid == ''"
            >
              <el-option
                v-for="(item,index) in buildOption"
                :key="index"
                :label="item.buildName"
                :value="item.buildUuid"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业主姓名" label-width="80px">
            <el-input size="small" v-model="listQuery.ownerName" clearable placeholder="请输入业主姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" v-if="isShowItemAndTag">
          <el-button size="small" type="text" @click="changeTag">
            {{ tagShow ? "展开" : "收起"}}
            <i :class="tagShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
          </el-button>
        </el-col>
      </el-row>
      <template v-if="!tagShow">
        <el-row :gutter="24">
          <el-col :span="5">
            <el-form-item label="电话号码" label-width="80px">
              <el-input size="small" v-model="listQuery.ownerTep" clearable placeholder="请输入电话号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="状态" label-width="40px">
              <el-select v-model="listQuery.state" size="small" filterable @change="changeState">
                <el-option
                  v-for="(item,index) in stateOption"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="报修日期" label-width="70px">
              <el-date-picker
                v-model="repairTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="small"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="报修标题" label-width="80px">
              <el-input v-model="listQuery.title" size="small" clearable placeholder="请输入标题"></el-input>
            </el-form-item>
          </el-col>
          <template v-if="!isShowItemAndTag">
            <el-col :span="1">
              <el-form-item label-width="0px">
                <el-button size="small" type="primary" @click="handerSelect">查询</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item label-width="20px">
                <el-button size="small" type="primary" @click="repush">重置</el-button>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
        <el-row :gutter="24" v-if="isShowItemAndTag">
          <el-col :span="5">
            <el-form-item label="维修单位" label-width="80px">
              <el-select v-model="listQuery.isThree" size="small" clearable>
                <el-option
                  v-for="(item,index) in sourceOption"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="margin-left: 20px">
            <el-form-item label-width="0px">
              <el-button size="small" type="primary" @click="handerSelect">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label-width="20px">
              <el-button size="small" type="primary" @click="repush">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>
  </div>
</template>

<script>
import {
  getProjects,
  getUnit,
  getStore,
  getDans,
  getHaos
} from "@/api/maintenance/hzpropertyrepair";
export default {
  props: {
    stateOption: {
      type: Array,
      default: []
    },
    moState: {
      default: ""
    },
    isShowItemAndTag: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    moState(a, b) {
      // console.warn(a,b,'newData,oldData')
      this.listQuery.state = a;
    }
  },
  data() {
    return {
      listQuery: {
        projectUuid: "",
        projectStageUuid: "",
        buildUuid: "",
        title: "",
        startTime: "",
        endTime: "",
        ownerName: "",
        ownerTep: "",
        state: "",
        isThree: 0
      },
      repairTime: [],
      Lander: JSON.parse(sessionStorage.getItem("userInfo")).content.userId,
      projectOption: [], //项目列表
      stagetOption: [], //分期列表
      buildOption: [], //楼栋列表
      itemId: [],
      sourceOption: [
        { id: "", name: "全部" },
        { id: 1, name: "第三方" },
        { id: 0, name: "责任方" }
      ],
      tagShow: false //true  展开   false  收起
    };
  },
  methods: {
    handerSelect() {
      if (this.repairTime && this.repairTime.length !== 0) {
        this.listQuery.startTime = this.getTimeData(this.repairTime[0]);
        this.listQuery.endTime = this.getTimeData(this.repairTime[1]);
      } else {
        this.listQuery.startTime = "";
        this.listQuery.endTime = "";
      }
      this.$emit("getQuery", this.listQuery);
      this.$emit("sendState", this.listQuery.state);
    },
    changeState() {
      this.$emit("getQuery", this.listQuery);
    },
    // 中国标准时间转换成 年-月-日
    getTimeData(time) {
      var d = new Date(time);
      return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    },
    // 获取项目
    getPro() {
      console.log(this.Lander, "this.Lander");
      getProjects({ userId: this.Lander, type: 1 }).then(res => {
        this.projectOption = res.data;
        this.itemId = res.data.map(v => v.projectId);
        this.$emit("changeItemId", this.itemId);
      });
    },
    // 选择项目
    changeProject() {
      if (this.listQuery.projectUuid == "") {
        this.listQuery.projectStageUuid = "";
        this.listQuery.buildUuid = "";
        this.listQuery.unitUuid = "";
      }
      console.log(this.listQuery.projectUuid, "所以我");
      getUnit({ projectUuid: this.listQuery.projectUuid }).then(res => {
        console.log(res, "33333333333333333");
        this.stagetOption = res.data;
      });
    },
    // 选择分期
    changeStage() {
      if (this.listQuery.projectStageUuid == "") {
        this.listQuery.buildUuid = "";
        this.listQuery.unitUuid = "";
      }
      getStore({ projectStageUuid: this.listQuery.projectStageUuid }).then(
        res => {
          this.buildOption = res.data;
        }
      );
    },
    // 重置按钮
    repush() {
      this.repairTime = [];
      this.listQuery = {
        projectUuid: "",
        projectStageUuid: "",
        buildUuid: "",
        title: "",
        startTime: "",
        endTime: "",
        ownerName: "",
        isThree: 0,
        state: this.moState
      };
    },
    changeTag() {
      this.tagShow = !this.tagShow;
      this.$emit("tagShows", this.tagShow);
    }
  },
  created() {
    this.getPro();
    // console.log(window.location.pathname,"ssss");
    // 进行默认值的判断
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  height: 40px;
}
</style>