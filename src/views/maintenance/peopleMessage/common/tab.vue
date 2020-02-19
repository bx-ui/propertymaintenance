<template>
    <div>
        <div class="tab-list">
            <div class="tab-block" :style="{backgroundColor: tabMessage.color}"></div>
            <div class="font">{{ tabMessage.text }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props: {
        tabMessage:{
            type: Object,
            default: {},
        }
    },
}
</script>
<style lang="scss" scoped>
    .tab-list{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .tab-block{
        width: 7px;
        height: 12px;
        background-color: red;
        margin-right: 5px;
        vertical-align: middle;
    }
    .font{
        vertical-align: middle;
        font-weight: bold;
    }
</style>