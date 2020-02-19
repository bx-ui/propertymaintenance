<template>
  <el-form
    class="login-form"
    status-icon
    :rules="loginRules"
    ref="loginForm"
    :model="loginForm"
    label-width="0"
  >
    <el-form-item prop="username">
      <el-row>
        <el-col :span="24">
          <el-input
            size="small"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.username"
            auto-complete="off"
            placeholder="请输入用户名"
            @blur="usernameChange"
          >
            <i slot="prefix" class="icon-yonghu"></i>
          </el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        size="small"
        @keyup.enter.native="handleLogin"
        :type="passwordType"
        v-model="loginForm.password"
        auto-complete="off"
        placeholder="请输入密码"
      >
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row :span="24">
        <el-col :span="14">
          <el-input
            size="small"
            @keyup.enter.native="handleLogin"
            :maxlength="code.len"
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="请输入验证码"
          >
            <!--<i slot="prefix"
            class="icon-yanzhengma"></i>-->
          </el-input>
        </el-col>
        <el-col :span="10">
          <div class="login-code">
            <span
              class="login-code-img"
              @click="refreshCode"
              v-if="code.type == 'text'"
            >{{code.value}}</span>
            <img :src="code.src" alt="验证码" class="login-code-img" @click="refreshCode" v-else />
            <!-- <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i> -->
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item class="messageWrap" v-if="messageIsShow">
      <div class="message">集团账户请采用集团Portal统一密码登录</div>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="small"
        @click.native.prevent="handleLogin"
        class="login-submit"
        round
      >马上登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { randomLenNum } from "@/util/util";
import { validatenull } from "@/util/validate";
import { mapGetters } from "vuex";
// import { beforeLogin } from "@/api/user.js";
export default {
  name: "userlogin",
  data() {
    const validateCode = (rule, value, callback) => {
      if (this.code.value !== value) {
        this.loginForm.code = "";
        this.refreshCode();
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      messageIsShow: false,
      isShow: true,
      socialForm: {
        code: "",
        state: ""
      },
      loginForm: {
        username: "",
        password: "",
        code: "",
        randomStr: ""
      },
      code: {
        src: "/code",
        value: "",
        len: 4,
        type: "image"
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
          // { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" }
        ]
      },
      passwordType: "password"
    };
  },
  watch: {
    $route() {
      const params = this.$route.query;
      this.socialForm.state = params.state;
      this.socialForm.code = params.code;
      if (!validatenull(this.socialForm.state)) {
        const loading = this.$loading({
          lock: true,
          text: `登录中,请稍后。。。`,
          spinner: "el-icon-loading"
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
        this.handleSocialLogin();
      }
    }
  },
  created() {
    this.refreshCode();
  },
  mounted() {},
  computed: {
    ...mapGetters(["tagWel"])
  },
  props: [],
  methods: {
    usernameChange(e) {
      var name = new RegExp(/[0123456789]/);
      if (name.test(this.loginForm.username.split("")[0])) {
        this.messageIsShow = true;
      } else {
        this.messageIsShow = false;
      }
    },
    refreshCode() {
      this.loginForm.code = "";
      this.loginForm.randomStr = randomLenNum(this.code.len, true);
      this.code.type === "text"
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${this.codeUrl}?randomStr=${this.loginForm.randomStr}`);
    },
    showPassword() {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleSocialLogin() {
      this.$store.dispatch("LoginBySocial", this.socialForm).then(res => {
        this.$store.commit("ADD_TAG", this.tagWel);
        this.$router.push({ path: this.tagWel.value });
        this.$router.push({ path: this.tagWel.value });
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("LoginByUsername", this.loginForm).then(
            res => {
              // console.log(res, "res");
              this.$store.commit("ADD_TAG", this.tagWel);
              this.$router.push({ path: this.tagWel.value });
            },
            error => {
              this.refreshCode();
            }
          );
          // 清缓存
          localStorage.clear();
        }
      });
    },
    redirectRestPassword() {
      this.$router.push("/reset");
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  position: relative;
  .messageWrap {
    // position: absolute;
    // bottom: -6.5vh;
    .message {
      color: red;
      text-align: left;
      line-height: 3vh;
      border: 1px solid #fdc2cd;
      background-color: #fff6f9;
      text-align: center;
    }
  }
}

.forget_password {
  text-align: right;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 4px;
  line-height: 14px;
  &:hover {
    color: #3a8ee6;
  }
}
.login-form {
  /deep/ .el-input__inner,
  .login-submit {
    font-size: 12px !important;
  }
  .el-input {
    width: 100%;
  }
  /deep/.el-input__inner {
    padding-right: 30px;
  }
  .el-row,
  .el-form-item {
    width: 280px;
  }
  .el-form-item {
    margin-bottom: 13px;
  }
  /deep/ .el-form-item__content {
    width: 100%;
    .el-form-item__error {
      padding-top: 0;
    }
  }
  .noticeWrap {
    width: 100%;
    color: red;
    span {
      display: inline-block;
      width: 100%;
      &:last-child {
        text-indent: 2em;
      }
    }
  }
}
.login-submit {
  /*margin-top: 20px;*/
  width: 280px;
  border-width: 0;
  background: linear-gradient(to right, #72b1ff, #055cff) !important;
  &:hover {
    opacity: 0.6;
  }
}
</style>
