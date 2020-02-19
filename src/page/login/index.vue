<template>
  <div
    class="login-container pull-height"
    @keyup.enter.native="handleLogin"
    style="text-align:center;"
  >
    <!-- <div v-if="leftbanner" class="left-banner"></div>
    <div v-if="leftbannerCopy" class="left-bannerCopy"></div>-->
    <!-- <div>
      <h1 class="boot">|</h1>
    </div>-->
    <!-- <div>
      <h1 class="rightboot">地产门户</h1>
    </div>-->
    <div class="login-border">
      <div class="left">
        <img src="../../assets/img/loginLeftBg.jpg" alt />
      </div>
      <div class="right">
        <div class="login-main">
          <h2 class="login-title">产城创物业ERP</h2>
          <userLogin></userLogin>
        </div>
      </div>
      <!-- <div class="bottom"></div> -->
    </div>
    <!-- <div class="login-border" :height="$screenClientHeight*0.45"></div> -->
  </div>
</template>
<script>
import userLogin from "./userlogin";
import socialLogin from "./sociallogin";
import topTheme from "../index/top/top-theme";
import theme from "@/mixins/theme";
import { mapGetters } from "vuex";
export default {
  name: "login",
  mixins: [theme()],
  components: {
    topTheme,
    userLogin,
    socialLogin
  },

  data() {
    return {
      activeName: "user",
      leftbanner: false,
      leftbannerCopy: false
    };
  },
  created() {},
  mounted() {
    this.initData();
  },
  computed: {
    ...mapGetters(["website"])
  },
  props: [],
  methods: {
    initData() {
      // screenWidth:1920,
      // screenHeight:1080,
      if (this.$screenClientHeight < 1080) {
        this.leftbanner = true;
      } else {
        this.leftbannerCopy = true;
      }
    }
  }
};
</script>

<style lang="scss">
.login-container {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  /*background: rgba(0, 0, 0, 0.3);*/
  position: relative;
}
.login-container::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/loginBg.jpg");
  background-size: 100% 100%;
}
.login-info {
  padding-left: 60px;
}
.login-info-title {
  line-height: 90px;
}
.login-info-item {
  font-size: 14px;
}
.login-border {
  display: flex;
  flex-direction: row;
  //justify-content: right;
  align-items: end;
}
.boot {
  font-family: 微软雅黑;
  font-size: 24px;
  color: #fff;
  margin-left: 23%;
  margin-top: 39px;

  position: absolute;
}
.rightboot {
  font-family: 微软雅黑;
  font-size: 24px;
  color: #fff;
  margin-left: 25%;
  margin-top: 39px;

  position: absolute;
}
.login-main {
  position: relative;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #fff;
  float: left;
  // width: 350px;
  height: 290px;
  margin-top: 13%;
  opacity: 0.9;
  display: flex;
  // justify-content: center;
  align-items: center;
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-title {
  top: 15px;
  text-align: center;
  width: 100%;
  // left: 39px;
  position: absolute;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #1e78fc;
  font-family: Microsoft YaHei;
  font-size: 22px;
  line-height: 5px;
}
.main_title {
  width: 240px;
  height: 250px;
}
.login-submit {
  /*margin-top: 20px;*/
  width: 240px;
  background: #3080fe;
  // border-radius: 28px;
}
.login-form {
  /*margin: 10px 0;*/
  position: relative;
  top: 30px;
  display: block;
  .el-form-item__content {
    width: 270px;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
  .el-input {
    input {
      text-indent: 5px;
      border-color: #dcdcdc;
      border-radius: 3px;
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  width: 100px;
  height: 32px;
  // margin: 4px 0;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 32px;
  text-indent: 5px;
  text-align: center;
}
.arrimg {
  vertical-align: middle;
  height: 23px;
  width: 23px;
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 1366px) {
  .login-container .login-border {
    // top: 17.5%;
    .left {
      width: 50%;
      float: left;
      // top: 20%;
    }
    .right {
      width: 50%;
    }
  }
  .login-main {
    margin-top: 10%;
  }
}
.login-border {
  display: inline-block;
  width: 880px;
  height: 397px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 15px;
  position: relative;
  top: calc(50% - 215px);
  .title {
    text-align: left;
    img {
      width: 20%;
    }
  }
  .left {
    height: 100%;
    float: left;
    width: 50%;
    position: relative;
    top: 0;
    img {
      width: 100%;
      position: relative;
    }
  }
  .right {
    width: 50%;
    float: right;
  }
  .login-main {
    margin-left: calc(50% - 140px);
  }
}
</style>
