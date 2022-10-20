<template>
    <div>
        <el-card :flag="flag" shadow="hover" class="box-card">
            <!-- 前两个视频 -->
            <el-row :gutter="24">
                <el-col :span="12">
                    <img :src="videoCoverUrls[0]" @click="openVideo(0)" class="imageVideo" />
                </el-col>
                <el-col :span="12">
                    <img :src="videoCoverUrls[1]" @click="openVideo(1)" class="imageVideo" />
                </el-col>
            </el-row>
            <!-- 前两个视频介绍 -->
            <el-row :gutter="24">
                <el-col :span="12" style="margin-top:10px">{{ "up主：" + videoAuthors[0] }}
                </el-col>
                <el-col :span="12" style="margin-top:10px">{{ "up主：" + videoAuthors[1] }}
                </el-col>
            </el-row>
            <!-- 分割线 -->
            <el-divider></el-divider>

            <!-- 后两个视频 -->
            <el-row :gutter="24">
                <el-col :span="12">
                    <img :src="videoCoverUrls[2]" @click="openVideo(2)" class="imageVideo" />
                </el-col>
                <el-col :span="12">
                    <img :src="videoCoverUrls[3]" @click="openVideo(3)" class="imageVideo" />
                </el-col>
            </el-row>
            <!-- 后两个视频介绍 -->
            <el-row :gutter="24">
                <el-col :span="12" style="margin-top:10px">{{ "up主：" + videoAuthors[2] }}
                </el-col>
                <el-col :span="12" style="margin-top:10px">{{ "up主：" + videoAuthors[3] }}
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import { getResultList, } from '../api/search'
export default {
    name: "bilivideo",
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
            videoUrls: [],
            videoCoverUrls: [],
            videoAuthors: [],
            flag:false,
        }
    },
    created() {
        getResultList(this.keyword, 1, 20).then(res => {
            console.log(res);
            for (let i = 0; i < 4; i++) {
                this.videoUrls[i] = res.data.data.result[10].data[i].arcurl; //视频url
                this.videoCoverUrls[i] =
                    "https:" + res.data.data.result[10].data[i].pic; //视频封面url
                this.videoAuthors[i] = res.data.data.result[10].data[i].author; //作者名
            }
            this.flag=true;
        })
    },
    methods: {
        openVideo(i) {
            window.open(this.videoUrls[i], "_blank");
        }
    }
}
</script>

<style scoped>
.imageVideo {
    width: 95%;
}
</style>
