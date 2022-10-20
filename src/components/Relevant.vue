<template>
    <div>
        <el-row>
            <el-col :span="12">
                <el-card shadow="hover">
                    <div class="recomcourse">
                        <p class="coursetitle">相关景点</p>
                    </div>
                    <div>
                        <li class="item" v-for="(item, index) in relevantData" :key="index">
                            <div class="title">
                                <p>{{item.name}}</p>
                            </div>
                            <div>
                                <p>{{item.province}} , {{item.city}}</p>
                            </div>
                        </li>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <div class="recomcourse">
                        <p class="coursetitle">当地风险区域</p>
                    </div>
                    <div>
                        <p class="title">__ 高风险区 {{this.covidHighArea.length}}个</p>
                        <li class="item" v-for="(item, index) in covidHighArea" :key="index">
                            <div>
                                <p>{{item.area_name}}</p>
                            </div>
                        </li>
                        <p class="title">__ 中风险区 {{this.covidMiddleArea.length}}个</p>
                        <li class="item" v-for="(item, index) in covidMiddleArea" :key="index">
                            <div>
                                <p>{{item.area_name}}</p>
                            </div>
                        </li>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getLocation, getCovidInfo } from '../api/relevant.js'

export default {
    name: "relevant",
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
            relevantData: {},
            cityName: '',
            covidHighArea: {},
            covidMiddleArea: {},
        }
    },
    created() {
        getLocation(this.keyword, 1, 10).then(res => {
            console.log(res);
            this.relevantData = res.data.newslist;
            this.cityName = res.data.newslist[1].city + '市';
            getCovidInfo(this.cityName).then(res => {
                this.covidHighArea = res.data.data.high_list;
                this.covidMiddleArea = res.data.data.middle_list;
                console.log(res);
            })
        })

    },
    mounted() {


    },
    methods: {

    }
}
</script>

<style scoped>
.item {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    border-bottom: 5px solid #f1f1f1;
}

.title {
    color: #333;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.5rem;
}

.title2 {
    color: #333;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.5rem;
    margin-right: 30rem;
}


.tag {
    display: flex;
    flex: none;
    align-items: center;
    height: 2.5rem;
    margin-top: 0.2rem;
    padding: 0 0.4rem;
    border-radius: 0.2rem;
    background-color: #1E90FF;
    color: #fff;
    font-weight: 700;
    font-size: 1.5rem;
}

.coursetitle {
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(17, 123, 241, 1);
    letter-spacing: 1px;
}

.recomcourse {
    padding: 14px 0 14px 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 4px solid rgba(17, 123, 241, 1);
}
</style>
