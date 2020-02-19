<template>
	<div id="app">
			<router-view></router-view>
	</div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {

    };
  },
  watch: {},
  created() {
    // console.warn("12",this.$router)
    // console.warn("122",this.$route)
  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow:hidden;
}
</style>
