<template>
    <div :flag="flag">
        <el-card v-loading="loadingVideo" class="box-card">
            <el-descriptions title="相关商品-唯品会" direction="vertical" :column="1" :colon="showColon">
            </el-descriptions>
            <!-- 前四个商品 -->
            <el-row :gutter="24">
                <el-col :span="6">
                    <img :src="goodsMainPicture[0]" @click="openSale(0)" class="imageVideo" />
                </el-col>
                <el-col :span="6">
                    <img :src="goodsMainPicture[1]" @click="openSale(1)" class="imageVideo" />
                </el-col>
                <el-col :span="6">
                    <img :src="goodsMainPicture[2]" @click="openSale(2)" class="imageVideo" />
                </el-col>
                <el-col :span="6">
                    <img :src="goodsMainPicture[3]" @click="openSale(3)" class="imageVideo" />
                </el-col>
            </el-row>
            <!-- 前四个商品介绍 -->
            <el-col :span="6" style="margin-top:5px">{{ price[0] + "￥" }}
            </el-col>
            <el-col :span="6" style="margin-top:5px">{{ price[1] + "￥" }}
            </el-col>
            <el-col :span="6" style="margin-top:5px">{{ price[2] + "￥" }}
            </el-col>
            <el-col :span="6" style="margin-top:5px">{{ price[3] + "￥" }}
            </el-col>
            <el-row :gutter="24">
                <el-col :span="6" style="margin-top:5px">{{ goodsName[0] }}
                </el-col>
                <el-col :span="6" style="margin-top:5px">{{ goodsName[1] }}
                </el-col>
                <el-col :span="6" style="margin-top:5px">{{ goodsName[2] }}
                </el-col>
                <el-col :span="6" style="margin-top:5px">{{ goodsName[3] }}
                </el-col>
            </el-row>
            <!-- 分割线 -->
            <el-divider></el-divider>

            <!-- 后四个商品 -->
            <el-row :gutter="24">
                <el-col :span="6">
                    <img :src="goodsMainPicture[4]" @click="openSale(4)" class="imageVideo" />
                </el-col>
                <el-col :span="6">
                    <img :src="goodsMainPicture[5]" @click="openSale(5)" class="imageVideo" />
                </el-col>
                <el-col :span="6">
                    <img :src="goodsMainPicture[6]" @click="openSale(6)" class="imageVideo" />
                </el-col>
                <el-col :span="6">
                    <img :src="goodsMainPicture[7]" @click="openSale(7)" class="imageVideo" />
                </el-col>
            </el-row>
            <!-- 后四个商品介绍 -->
            <el-row :gutter="24">
                <el-col :span="6" style="margin-top:5px">{{ price[4] + "￥" }}
                </el-col>
                <el-col :span="6" style="margin-top:5px">{{ price[5] + "￥" }}
                </el-col>
                <el-col :span="6" style="margin-top:5px">{{ price[6] + "￥" }}
                </el-col>
                <el-col :span="6" style="margin-top:5px">{{ price[7] + "￥" }}
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6" style="margin-top:5px">{{ goodsName[4] }}
                </el-col>
                <el-col :span="6" style="margin-top:5px">{{ goodsName[5] }}
                </el-col>
                <el-col :span="6" style="margin-top:5px">{{ goodsName[6] }}
                </el-col>
                <el-col :span="6" style="margin-top:5px">{{ goodsName[7] }}
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import { getVipInfo } from '../api/vip.js'

export default {
    name: "vip",
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
            //商品信息
            brandName: [],
            destUrl: [],
            goodsName: [],
            goodsMainPicture: [],
            price: [],
            flag:false,
        }
    },
    created() {
        getVipInfo(this.keyword).then(res => {
            //console.log(res);
            for (var i = 0; i < 8; i++) {
                this.brandName[i] = res.data.data[i].brandName; //商品品牌
                this.destUrl[i] = res.data.data[i].destUrl; //购买链接url
                this.goodsMainPicture[i] = res.data.data[i].goodsMainPicture; //商品图
                this.goodsName[i] = res.data.data[i].goodsName; //商品名
                this.price[i] = res.data.data[i].vipPrice; //商品价格
            }
            this.flag=true;
        });
    },
    mounted() {

    },
    methods: {
        openSale(i){
            window.open(this.destUrl[i], "_blank");
        }
    }
}
</script>

<style scoped>
.imageVideo {
    width: 95%;
}
</style>
