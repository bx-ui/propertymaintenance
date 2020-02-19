<!--创建人:蒋万鹏  创建时间:  -->
<template>
  <div class="wrap">
    <div class="logo">
      <div class="logoBlock"></div>
      <p>{{title}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "CommonTitle",
  props: ["title"],
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.wrap {
  .logo {
    height: 24px;
    margin-top: 10px;
    line-height: 25px;
    margin-bottom: 10px;
    text-align: left;
  }
  p {
    float: left;
    margin-left: 10px;
  }
  .logoBlock {
    width: 8px;
    height: 14px;
    background-color: blue;
    margin-top: 5px;
    float: left;
  }
}
</style>