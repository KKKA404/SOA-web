
<template>
    <div>
        <el-card shadow="hover" style="width: 95%; margin-left: 30px">
            <el-row>
                <el-col :span="12">
                    <el-card shadow="hover">
                        <Baidu :keyword="keyword" />
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <BiliVideo :keyword="keyword" />
                </el-col>
            </el-row>
            <el-row>
                <el-card shadow="hover">
                    <Map :keyword="keyword" />
                </el-card>
            </el-row>
            <el-row>
                <BingImage :keyword="keyword" />
            </el-row>
            <el-row>
                <Relevant :keyword="keyword" />
            </el-row>
            <el-row>
                <Vip :keyword="keyword" />
            </el-row>
        </el-card>
    </div>
</template>

<script type="text/ecmascript-6">

import Map from "./Map.vue"
import Baidu from "./Baidu.vue"
import BiliVideo from "./BiliVideo.vue"
import Relevant from "./Relevant.vue"
import BingImage from "./BingImage.vue"
import Vip from "./Vip.vue"


//引用swiper样式
import 'swiper/css/swiper.css';

export default {
    data() {
        return {
            keyword: '',
            videoUrls: [],
            videoCoverUrls: [],
            videoAuthors: [],
            flag: false,
        }
    },
    mounted() {
    },
    created() {
        this.keyword = this.$route.query.inputContent;
        console.log(this.keyword)
    },
    methods: {
        openVideo(i) {
            window.open(this.videoUrls[i], "_blank");
        },
    },
    components: {
        Map,
        Baidu,
        BiliVideo,
        Relevant,
        BingImage,
        Vip
    }
}
</script>
<style scoped lange="less">
@import '../assets/cssC/swiper.min.css';

/* 轮播 */
.lunbo {
    width: 100%;
    height: 570px;
    cursor: pointer;
}

.lunbo img {
    width: 110%;
    height: 100%;
    object-fit: cover;
}

.imageVideo {
    width: 95%;
}
</style>