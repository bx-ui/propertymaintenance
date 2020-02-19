<!--创建人:蒋万鹏  创建时间:  -->
<template>
  <div class="wrap">
    <div>
      <el-row style="width:100%;" :gutter="10">
        <el-col :span="5">
          <el-select
            v-model="projectUuid"
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
        </el-col>
        <el-col :span="5">
          <el-select
            v-model="projectStageUuid"
            size="small"
            clearable
            filterable
            :disabled="projectUuid == ''"
          >
            <el-option
              v-for="(item,index) in stagetOption"
              :key="index"
              :label="item.projectStageName"
              :value="item.projectStageUuid"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-button @click="handleQuery" size="small" type="primary">查询</el-button>
        </el-col>
      </el-row>
      <div class="form" style="position:fiexd;">
        <h3
          style="text-align:center;"
          id="header"
          ref="title"
        >{{projectName}}精装问题维修关差日清 {{todayDate}}</h3>
        <table cellspacing="0" paddingspacing="0" border="1" style="width: 100%;font-size: 13px;">
          <tr>
            <td colspan="24" class="headr">一、维修问题关差情况汇总</td>
          </tr>
          <tr>
            <td colspan="24" class="headr">①各楼座问题报修关差情况：</td>
          </tr>
          <tr>
            <td class="headr center" colspan="2">楼号</td>
            <td class="headr center" colspan="2">公区问题</td>
            <!-- <td colspan="16" class="headr center">8号楼</td> -->
            <td
              :colspan="item.colspan"
              class="headr center"
              v-for="(item,idx) in colIncludeTotalData"
              :key="idx"
            >{{item.value.buildName}}</td>

            <td class="headr center" colspan="4">合计/条</td>
          </tr>
          <tr>
            <td colspan="2" class="ftd">报修问题总量：</td>
            <td colspan="2" class="center">
              <input
                type="text"
                name="gqtotals"
                id="gqtotals"
                style="border: 0;text-align: center;"
              />
            </td>
            <!-- <td colspan="16" class="center" id="total8"></td> -->
            <td
              :colspan="item.colspan"
              class="center"
              v-for="(item,idx) in colIncludeTotalData"
              :key="idx"
            >{{item.value.total}}</td>
            <td class="center ftd" id="totals" colspan="4">{{colIncludeTotalData | sum("total")}}</td>
          </tr>
          <tr>
            <td colspan="2" class="ftd">完成/条</td>
            <td colspan="2" class="center">
              <input
                type="text"
                name="finishgqtotals"
                id="finishgqtotals"
                style="border: 0;text-align: center;"
              />
            </td>
            <td
              :colspan="item.colspan"
              class="center"
              v-for="(item,idx) in colIncludeTotalData"
              :key="idx"
            >{{item.value.finish}}</td>
            <td class="center ftd" id="finishs" colspan="4">{{colIncludeTotalData | sum("finish")}}</td>
          </tr>
          <tr>
            <td colspan="2" class="ftd">未完成/条</td>
            <td colspan="2" class="center">
              <input
                type="text"
                name="unfinishgqtotals"
                id="unfinishgqtotals"
                style="border: 0;text-align: center;"
              />
            </td>
            <td
              :colspan="item.colspan"
              class="center"
              v-for="(item,idx) in colIncludeTotalData"
              :key="idx"
            >{{item.value.unfinish}}</td>
            <td
              class="center ftd"
              id="unfinishs"
              colspan="4"
            >{{colIncludeTotalData | sum("unfinish")}}</td>
          </tr>
          <tr>
            <td colspan="2" class="ftd">完成率</td>
            <td colspan="2" class="center">
              <input
                type="text"
                name="finishgqRP"
                id="finishgqRP"
                style="border: 0;text-align: center;"
              />
            </td>
            <td
              :colspan="item.colspan"
              class="center"
              v-for="(item,idx) in colIncludeTotalData"
              :key="idx"
            >{{item.value.finishrate}}</td>
            <td
              class="complateRate center ftd"
              id="finishrates"
              colspan="4"
            >{{colIncludeTotalData | totalSum}}</td>
          </tr>
          <tr>
            <td rowspan="3" colspan="2" class="ftd">
              <span>逾期</span>
              <span class="complateRate">(超时未完成)</span>
            </td>
            <td colspan="2">小修（1天）</td>
            <td
              :colspan="item.colspan"
              class="center"
              v-for="(item,idx) in colIncludeTotalData"
              :key="idx"
            >{{item.value.outtime1}}</td>
            <td class="center ftd" colspan="4">{{colIncludeTotalData | sum("outtime1")}}</td>
          </tr>
          <tr>
            <td colspan="2">中修（2-7天）</td>
            <td
              :colspan="item.colspan"
              class="center"
              v-for="(item,idx) in colIncludeTotalData"
              :key="idx"
            >{{item.value.outtime2}}</td>
            <td
              class="center ftd"
              id="outtime2s"
              colspan="4"
            >{{colIncludeTotalData | sum("outtime2")}}</td>
          </tr>
          <tr>
            <td colspan="2">大修（8-15天）</td>
            <td
              :colspan="item.colspan"
              class="center"
              v-for="(item,idx) in colIncludeTotalData"
              :key="idx"
            >{{item.value.outtime3}}</td>
            <td
              class="center ftd"
              id="outtime3s"
              colspan="4"
            >{{colIncludeTotalData | sum("outtime3")}}</td>
          </tr>
          <tr>
            <td colspan="4" class="ftd">
              <span>报修户数/</span>
              <span class="complateRate">未闭环户数</span>
            </td>
            <!-- <td colspan="16" class="center ftd">
              <span id="unittotal8"></span>
              <span class="complateRate" id="unfinishunittotal8"></span>
            </!-->
            <td
              :colspan="item.colspan"
              class="center"
              v-for="(item,idx) in colIncludeTotalData"
              :key="idx"
            >
              <span id="unittotal8">{{item.value.roomnum}}</span>户/
              <span class="complateRate" id="unfinishunittotal8">{{item.value.unfinishroomnum}}户</span>
            </td>
            <td class="center ftd" colspan="4">
              <span id="unittotal8">{{colIncludeTotalData | sum("roomnum")}}</span>户/
              <span
                class="complateRate"
                id="unfinishunittotals"
              >{{colIncludeTotalData | sum("unfinishroomnum")}}户</span>
            </td>
          </tr>
          <tr>
            <td colspan="4" class="ftd">今日新增：</td>
            <!-- <td
              :colspan="item.colspan"
              class="center"
              v-for="(item,idx) in colIncludeTotalData"
              :key="idx"
            >{{item.value.todayadd}}</td>
            <td class="center" colspan="4">{{colIncludeTotalData | sum("todayadd")}}</td> -->
            <td colspan="20" class="center">{{!!colIncludeTotalData.length ?colIncludeTotalData[0].value.todayadd:""}}</td>
          </tr>
          <tr>
            <td colspan="4" class="ftd">今日关差：</td>
            <!-- <td colspan="20" class="center ftd" id="todayfinish"></td> -->
            <!-- <td
              :colspan="item.colspan"
              class="center"
              v-for="(item,idx) in colIncludeTotalData"
              :key="idx"
            >{{item.value.todayfinish}}</td>
            <td class="center" colspan="4">{{colIncludeTotalData | sum("todayfinish")}}</td> -->
            <td colspan="20" class="center">{{!!colIncludeTotalData.length ?colIncludeTotalData[0].value.todayfinish:""}}</td>

          </tr>
          <tr>
            <td colspan="4" class="ftd">尚未关差：</td>
            <td colspan="20" class="center ftd">
              <textarea
                style="width: 99%;border: 0;text-align: center;
    			min-height: 7px;"
                name="unfinishtext"
                id="unfinishtext"
              ></textarea>
            </td>
          </tr>
          <!-- 第二部分 -->
          <tr>
            <td colspan="24" class="headr">②重点客户跟踪关差情况/户:</td>
          </tr>
          <tr>
            <td colspan="4" class="headr center">预</td>
            <td colspan="6" class="headr center">实</td>
            <td colspan="6" class="headr center">差</td>
            <td colspan="8" class="headr center">差异情况</td>
          </tr>
          <tr>
            <td colspan="4" class="ftd center">
              <input type="text" name="before" id="before" style="border: 0;text-align: center;" />
            </td>
            <td colspan="6" class="ftd center">
              <input type="text" name="real" id="real" style="border: 0;text-align: center;" />
            </td>
            <td colspan="6" class="ftd center">
              <input type="text" name="differ" id="differ" style="border: 0;text-align: center;" />
            </td>
            <td colspan="8" class="ftd center complateRate">
              <textarea
                style="width: 99%;border: 0;text-align: center; min-height: 7px;"
                name="discrepancy"
                id="discrepancy"
              ></textarea>
            </td>
          </tr>
        </table>
        <table cellspacing="0" paddingspacing="0" border="1" style="width: 100%;font-size: 13px;">
          <!-- 第三小部分 -->
          <tr>
            <td colspan="24" class="headr">③各楼宇集中销项负责人：</td>
          </tr>
          <tr>
            <td colspan="4" class="headr center">责任单位</td>
            <td
              :colspan="item.colspan"
              class="headr center"
              v-for="(item,idx) in colMapData"
              :key="idx"
            >{{item.value.buildName}}</td>
          </tr>
          <tr>
            <td colspan="4" class="ftd">项目物业：</td>
            <!-- <td colspan="20" class="ftd center">王锦华</td> -->
            <td :colspan="item.colspan" class="center" v-for="(item,idx) in colMapData" :key="idx">
              <!-- <div style="display:inline-block;width:20px;">
                <input
                  type="text"
                  name="before"
                  id="before"
                  style="border: 0;text-align: center;margin:0;padding:0;"
                />
              </div>-->
              <div contenteditable="true"></div>
            </td>
          </tr>
          <tr>
            <td colspan="4" class="ftd">项目地产工程：</td>
            <!-- <td colspan="20" class="ftd center">季邵涛/潘永鑫</td> -->
            <td :colspan="item.colspan" class="center" v-for="(item,idx) in colMapData" :key="idx">
              <!-- <div style="display:inline-block;width:20px;">
                <input
                  type="text"
                  name="before"
                  id="before"
                  style="border: 0;text-align: center;margin:0;padding:0;"
                />
              </div>-->
              <div contenteditable="true"></div>
            </td>
          </tr>
        </table>
        <table cellspacing="0" paddingspacing="0" border="1" style="width: 100%;font-size: 13px;">
          <tr>
            <td colspan="24" class="headr">二、施工单位未关差情况汇总：</td>
          </tr>
          <tr>
            <td colspan="14" class="headr">维修分析：</td>
            <td colspan="10" class="headr">剩余问题责任单位界定：</td>
          </tr>
          <tr>
            <td colspan="14">
              <div id="main" style="height:420px;width:100%;"></div>
            </td>
            <td colspan="5" style="border-right:none;" id="listleft">
              <div v-for="(val,index) in listleft" :key="index">
                {{val.index}}.{{val.name}}
                <span class="colorChange">{{val.num}}</span> 项
              </div>
            </td>
            <td colspan="5" style="border-left:none;" id="listright">
              <div v-for="(val,index) in listright" :key="index">
                {{val.index}}.{{val.name}}
                <span class="colorChange">{{val.num}}</span> 项
              </div>
            </td>
          </tr>
        </table>
        <!-- 第三大部分 -->
        <table
          id="table2"
          cellspacing="0"
          paddingspacing="0"
          border="1"
          style="width: 100%;font-size: 13px;border-top:none;"
        >
          <tr>
            <td colspan="19" class="headr" style="width: 97%; border-right: none;">三、精装问题主要推进难点</td>
            <td colspan="5" class="headr" style="border-left: none;">
              <img
                class="needhide"
                src="../../assets/img/addrow.png"
                style="width: 15px;margin-top: 5px;"
                @click="messageAdd1();"
              />
              <img
                class="needhide"
                src="../../assets/img/deleterow.png"
                style="width: 14px;margin-bottom: 0.5px;"
                @click="messageDelete1();"
              />
            </td>
          </tr>
          <tr v-for="(item,index) in fitmentList" :key="index">
            <td colspan="24">
              <textarea
                style="width: 99%;border: 0;
    			min-height: 7px;"
                name="trouble[0]"
                id="trouble0"
              ></textarea>
            </td>
          </tr>
        </table>
        <table
          id="table3"
          cellspacing="0"
          paddingspacing="0"
          border="1"
          style="width: 100%;font-size: 13px;border-top:none;"
        >
          <tr>
            <td colspan="24" class="headr">四、公区主要问题关差情况汇总</td>
          </tr>
          <tr>
            <td colspan="22" class="headr" id="totaltext" style="width:96%;border-right: none;"></td>
            <td colspan="2" class="headr" style="border-left: none;width: 40.5px;">
              <img
                class="needhide"
                src="../../assets/img/addrow.png"
                style="width: 15px;margin-top: 5px;"
                @click="messageAdd2();"
              />
              <img
                class="needhide"
                src="../../assets/img/deleterow.png"
                style="width: 14px;margin-bottom: 0.5px;"
                @click="messageDelete2();"
              />
            </td>
          </tr>
          <tr>
            <td colspan="2" class="center ftd">序号</td>
            <td colspan="10" class="center ftd">问题点</td>
            <td colspan="2" class="center ftd">关差日期</td>
            <td colspan="2" class="center ftd">责任人</td>
            <td colspan="8" class="center ftd">备注</td>
          </tr>
          <tr v-for="(item,key) in publicRightList" :key="key">
            <td colspan="2" class="center">{{key+1}}</td>
            <td colspan="10" class="center">
              <textarea
                style="width: 98%;border: 0;text-align: center;min-height: 7px;"
                name="question[0]"
                id="question0"
              ></textarea>
            </td>
            <td colspan="2" class="center">
              <input
                type="text"
                name="finishdate[0]"
                id="finishdate0"
                style="border: 0;text-align: center;"
              />
            </td>
            <td colspan="2" class="center">
              <input
                type="text"
                name="person[0]"
                id="person0"
                style="border: 0;text-align: center;"
              />
            </td>
            <td colspan="8" class="center">
              <input
                type="text"
                name="remark[0]"
                id="remark0"
                style="border: 0;text-align: center;"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div style="position: absolute;margin: 3% 46% 3%;">
      <select id="sel" style="display:none;">
        <option value="png">png</option>
      </select>
      <button id="save" @click="saveDayClear">生成日清</button>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import echarts from "echarts";
import html2canvas from "html2canvas";
import Canvas2Image from "Canvas2Image";
import { getProjects, getUnit } from "@/api/maintenance/hzpropertyrepair";

export default {
  name: "reportForm",
  data() {
    return {
      projectName: "",
      todayDate: "",
      projectOption: [],
      projectUuid: "",
      projectStageUuid: "",
      options: [],
      listleft: [],
      listright: [],
      fitmentList: [{}],
      publicRightList: [{}],
      colIncludeTotalData: [],
      colMapData: [],
      tableData: [],
      stagetOption: []
    };
  },
  mounted() {
    this.initDate();
    this.getPro();
  },
  filters: {
    sum(data, key) {
      let arr = data.map(v => v["value"]).map(v => v[key]);

      let res = 0;
      if (arr.some(item => !parseInt(item) && item != 0)) {
        console.warn("过滤值不可计算");
        return;
      }
      arr.forEach(item => {
        res += item;
      });
      if (!res) return 0;
      return res;
    },
    totalSum(data) {
      let finishDataSum = 0;
      let totalDataSum = 0;

      let finishData = data.map(v => v["value"]).map(v => v["finish"]);
      let totalData = data.map(v => v["value"]).map(v => v["total"]);
      if (finishData.some(item => !parseInt(item) && item != 0)) {
        console.warn("过滤值不可计算");
        return;
      }
      if (totalData.some(item => !parseInt(item) && item != 0)) {
        console.warn("过滤值不可计算");
        return;
      }
      finishData.forEach(item => {
        finishDataSum += item;
      });
      totalData.forEach(item => {
        totalDataSum += item;
      });
      // console.warn("totalDataSum", totalDataSum);
      if (!totalDataSum) {
        console.warn("报修问题总量为0,不可计算完成率");
        return "0%";
      }

      let res = (finishDataSum / totalDataSum * 100).toFixed(3);

      return res + "%";
    }
  },
  methods: {
    init() {
      this.getEchartData();
      this.getTableData();
    },
    getTableData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      $.ajax({
        url:
          "http://project.haierhouse.com:4005/maintenance/nissin/getNissinList?projectUuid=" +
          this.projectUuid +
          "&projectStageUuid=" +
          this.projectStageUuid,
        dataType: "json",
        cache: false,
        success: data => {
          // console.warn("表格数据", data);
          if (data.length > 16) {
            loading.close();
            this.$message.warning("请选择分期后查询");
            return;
          }
          loading.close();
          this.tableData = data;
          this.initTableData(data);
        }
      });
    },
    initTableData(data) {
      if (!(data && !!data.length)) return;
      let colIncludeTotalMap = {
        1: [16],
        2: [8, 8],
        3: [5, 5, 6],
        4: [4, 4, 4, 4],
        5: [3, 3, 3, 3, 4],
        6: [3, 3, 3, 3, 2, 2],
        7: [2, 2, 2, 2, 2, 3, 3],
        8: [2, 2, 2, 2, 2, 2, 2, 2],
        9: [2, 2, 2, 2, 2, 2, 2, 1, 1],
        10: [2, 2, 2, 2, 2, 2, 1, 1, 1, 1],
        11: [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
        12: [2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1],
        13: [2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        14: [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        15: [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        16: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      };
      let colMap = {
        1: [20],
        2: [10, 10],
        3: [6, 7, 7],
        4: [5, 5, 5, 5],
        5: [4, 4, 4, 4, 4],
        6: [3, 3, 3, 3, 4, 4],
        7: [3, 3, 3, 3, 3, 3, 2],
        8: [2, 2, 2, 2, 3, 3, 3, 3],
        9: [2, 2, 2, 2, 2, 2, 2, 3, 3],
        10: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        11: [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
        12: [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1],
        13: [2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
        14: [2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1],
        15: [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        16: [2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      };
      this.colIncludeTotalData = [];
      this.colMapData = [];

      // console.warn("data的length", data.length);
      colIncludeTotalMap[data.length].forEach((item, index) => {
        this.colIncludeTotalData.push({
          colspan: item,
          value: data[index]
        });
      });
      colMap[data.length].forEach((item, index) => {
        this.colMapData.push({
          colspan: item,
          value: data[index]
        });
      });
    },
    getEchartData() {
      $.ajax({
        url:
          "http://project.haierhouse.com:4005/maintenance/nissin/getSupplierList?projectUuid=" +
          this.projectUuid +
          "&projectStageUuid=" +
          this.projectStageUuid,
        dataType: "json",
        cache: false,
        success: data => {
          this.initEcharts(data);
        },
        error: data => {
          this.$message.error("获取施工单位未关差情况数据失败,请联系管理员");
        }
      });
    },
    initTitle(data) {
      data.forEach((item, index) => {
        console.warn(index);
        if (index + 1 > data.length / 2) {
          this.listright.push({
            index: index + 1,
            name: item.name,
            num: item.unfinish
          });
        } else {
          this.listleft.push({
            index: index + 1,
            name: item.name,
            num: item.unfinish
          });
        }
      });
    },
    initEcharts(data) {
      if (!(data && !!data.length)) return;
      let dataMap = data.map(item => item.unfinish);
      dataMap.sort((a, b) => {
        return b - a;
      });
      let datas = [];
      dataMap.forEach(item => {
        data.forEach((a, key) => {
          if (a.unfinish == item) {
            datas.push(data.splice(key, 1)[0]);
          }
        });
      });

      this.initTitle(datas);

      let suppliers = datas.map(item => item.name);
      let echartsData = datas.map((item, key) => {
        console.warn(item, key);
        if (key < 3) {
          return {
            value: item.unfinish,
            label: {},
            itemStyle: {
              color: "red"
            }
          };
        } else {
          return {
            value: item.unfinish,
            label: {},
            itemStyle: {
              color: "gray"
            }
          };
        }
      });
      var myChart = echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {},
        grid: {
          bottom: 120
        },
        xAxis: {
          data: suppliers,
          axisLabel: {
            interval: 0, //让所有坐标值全部显示
            rotate: 300 //让坐标值旋转一定的角度
          }
        },
        yAxis: {},
        series: [
          {
            name: "待办项",
            type: "bar",
            data: echartsData
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    messageAdd1() {
      this.fitmentList.push({});
    },
    messageDelete1() {
      if (this.fitmentList.length > 1) {
        this.fitmentList.pop();
      }
    },
    messageAdd2() {
      this.publicRightList.push({});
    },
    messageDelete2() {
      if (this.publicRightList.length > 1) {
        this.publicRightList.pop();
      }
    },
    saveDayClear() {
      let form = $(".form").get(0); //将jQuery对象转换为dom对象
      let title = this.$refs.title.innerHTML;
      $(".needhide").addClass("tohide");
      html2canvas(form).then(function(canvas) {
        // console.log($(form));
        // canvas宽度
        var canvasWidth = canvas.width;
        // canvas高度
        var canvasHeight = canvas.height;
        // 渲染canvas
        // 调用Canvas2Image插件
        var img = Canvas2Image.convertToImage(
          canvas,
          canvasWidth,
          canvasHeight
        );
        let dataURL = img.getAttribute("src");

        // 下载图片
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.href = img.src;
        // 设置下载标题
        a.download = title;
        a.click();
        $(".needhide").removeClass("tohide");
      });
    },
    // 获取项目
    getPro() {
      getProjects({ userId: this.Lander, type: 1 }).then(res => {
        this.projectOption = res.data;
        // this.projectUuid = this.projectOption[0].projectId;
        // this.projectName = this.projectOption[0].projectName;
        // this.init();
      });
    },
    //切换项目
    changeProject() {
      this.projectOption.forEach(item => {
        if (item.projectId == this.projectUuid) {
          this.projectName = item.projectName;
        }
      });
      this.projectStageUuid = "";
      getUnit({ projectUuid: this.projectUuid }).then(res => {
        this.stagetOption = res.data;
      });

      // this.init();
    },
    //计算时间
    initDate() {
      let data = new Date();
      this.todayDate = `${data.getFullYear()}-${data.getMonth() +
        1}-${data.getDate()}`;
    },
    //选中项目
    changeStage() {
      if (this.projectStageUuid == "") {
        this.projectStageUuid = "";
      }
      getStore({ projectStageUuid: this.listQuery.projectStageUuid }).then(
        res => {
          this.buildOption = res.data;
        }
      );
    },
    //查询按钮
    handleQuery() {
      this.init();
    }
  }
};
</script>
<style lang="scss" scoped>
$divLineHeight: 16px;
.wrap {
  padding-top: 20px;
  overflow: scroll;
  padding: 20px 5px 0 5px;
  #header {
    font-size: 20px;
    font-weight: bold;
    margin: 30px 0;
  }
  #listleft {
    div {
      line-height: $divLineHeight;
    }
  }
  #listright {
    div {
      line-height: $divLineHeight;
    }
  }
  .needhide {
    cursor: pointer;
  }
  .headr {
    height: 25px;
    border: 1px solid #000;
    color: #fff;
    background: rgba(0, 112, 192, 1);
    font-weight: 600;
  }
  table {
    border-color: #45423c !important;
  }
  .complateRate {
    color: #d00;
  }

  .center {
    text-align: center;
  }

  .ftd {
    font-weight: 600;
  }

  #save {
    display: block;
    margin: 0 auto;
    background: rgba(0, 112, 192, 1);
    border: 0;
    color: white;
    padding: 0px 4px;
    cursor: pointer;
    font-size: 13.3333333px;
  }

  .tohide {
    opacity: 0;
  }

  .colorChange {
    color: red;
  }
}
</style>