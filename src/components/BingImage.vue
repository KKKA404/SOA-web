<template>
    <div>
        <el-row :gutter="12">
            <el-card shadow="hover" class="box-card">
                <div slot="header" align="left" class="bing-title">
                    <span>必应精选壁纸</span>
                </div>
                <el-col :span="6">
                    <img :src="bingImageUrls[0]" @click="openBingImages(0)" class="bing-image" />
                </el-col>
                <el-col :span="6">
                    <img :src="bingImageUrls[1]" @click="openBingImages(1)" class="bing-image" />
                </el-col>
                <el-col :span="6">
                    <img :src="bingImageUrls[2]" @click="openBingImages(2)" class="bing-image" />
                </el-col>
                <el-col :span="6">
                    <img :src="bingImageUrls[3]" @click="openBingImages(3)" class="bing-image" />
                </el-col>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import { getBingImages} from '../api/bing.js'

export default {
    name: "bing",
    props: {
        keyword: {
            type: String,
            default: function () {
                return [];
            },
        },
    },

    data() {
        return {
            bingImageUrls:[],
        }
    },
    created() {
        getBingImages(this.keyword).then(res => {
            var bingImagesData = []
            bingImagesData = res.data.value
            for (var i = 0; i < bingImagesData.length; i++) {
                this.bingImageUrls.push(bingImagesData[i].contentUrl)
            }
            console.log(res)
        })

    },
    mounted() {
       

    },
    methods: {
        openBingImages(i) {
            window.open(this.bingImageUrls[i], "_blank");
        }
    }
}
</script>

<style scoped>
.bing-image {
    width: 100%;
}

.bing-title {
    font-weight: bold;
    font-size: large;
}
</style>
