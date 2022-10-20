<template>
    <div>
        <!-- 我是地图demo1 -->
        <label>关键词：<input v-model="keyword"></label>
        <label>地区：<input v-model="location"></label>
        <baidu-map>
            <bm-view class="map"></bm-view>
            <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
        </baidu-map>

    </div>
</template>
     
<script>
export default {
    name: "map",
    props: {
        keyword: {
            type:String,
            default: function () {
                return [];
            },
        },
    },

    data() {
        return {
            location: '',
        }
    },
    methods: {

    }
}
</script>
     
<style>
.map {
    width: 100%;
    height: 400px;
}
</style>