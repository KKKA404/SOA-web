<template>
    <div class="searchpanel" margin:0>
        <div class="swiper-container lunbo">
            <div class="swiper-wrapper" id="bannerList">
                <div class="swiper-slide"><img
                        src="https://p1-q.mafengwo.net/s19/M00/19/82/CoNCJ2NJYRsROg9yACzguLxkr4M.png?imageView2%2F2%2Fw%2F1920%2Fq%2F90%2Fformat%2Fjpeg"
                        alt=""></div>
                <div class="swiper-slide"><img
                        src="https://b1-q.mafengwo.net/s16/M00/19/EF/CoUBUl6DJMGAWFe4ACR13B4-bt8760.png?imageMogr2%2Finterlace%2F1"
                        alt=""></div>
                <div class="swiper-slide"><img
                        src="https://p1-q.mafengwo.net/s19/M00/2B/C6/CoNCJ2NPdQxvYs5oAChO41orkGg.png?imageView2%2F2%2Fw%2F1920%2Fq%2F90%2Fformat%2Fjpeg"
                        alt=""></div>
                <div class="swiper-slide"><img
                        src="https://p1-q.mafengwo.net/s19/M00/D8/85/CoNKpWNJaRtAgkcDAB-Wp3xNGvY.png?imageView2%2F2%2Fw%2F1920%2Fq%2F90%2Fformat%2Fjpeg"
                        alt=""></div>
                <div class="swiper-slide"><img
                        src="http://b1-q.mafengwo.net/s15/M00/55/42/CoUBGV31OMKAJYRyAA7X007gsCE55.jpeg?imageMogr2%2Fstrip"
                        alt=""></div>
                <div class="swiper-slide"><img
                        src="http://n1-q.mafengwo.net/s15/M00/83/CE/CoUBGV4PYT2AenxpABJu17BCfsw23.jpeg?imageMogr2%2Fstrip"
                        alt=""></div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>

            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
        <div class="recomment">
            <div class="recomcourse">
                <span class="coursetitle"> 世界那么大</span>
                <div class="more">
                    <router-link to="/header/recoment">
                        <span>更多</span>
                        <img src="../assets/image/more.png" alt="">
                    </router-link>
                </div>
            </div>
            <ul class="list">
                <li class="item" v-for="(item, index) in searchResultsList" :key="index">
                    <div><img class="pic" :src=item.pic alt=""></div>
                    <div class="content">
                        <div class="title">{{ item.title|filter }}</div>
                        <p>{{ item.description }}</p>
                    </div>
                    <a :href="item.arcurl">&gt;</a>
                </li>
            </ul>
        </div>
    </div>

</template>
<script>
import { getSuggest, getResultList } from '../api/search.js'
import { getDocument } from '../api/document.js'
import Swiper from "swiper";

export default {
    data() {
        return {
            suggestions: {},
            documents: {},
            searchResultsList: {},
            inputContent: '',
        };
    },
    created() {
        getResultList('旅游推荐', 1, 20).then(res => {
            this.searchResultsList = res.data.data.result[10].data
            console.log(this.searchResultsList)
        });
        getDocument(180, 3, 0).then(res => {
            console.log(res.data.data);
            this.documents = res.data.data;
        })
    },
    mounted() {
        this.getSwiper();

    },
    methods: {
        TurnPage: function () {
            this.$router.push({
                path: "/header/message",
                query: {
                    inputContent: this.inputContent
                }
            })
        },
        searchRes() {
            getResultList('旅游推荐', 1, 20).then(res => {
                this.searchResultsList = res.data.data.result[10].data
                console.log(this.searchResultsList)
            })
        },
        querySearch(queryString, cb) {
            getSuggest(queryString).then(res => {
                this.suggestions = res.data
                console.log("---------suggestions--------")
                console.log(this.suggestions)
                let arr = []
                for (const i in this.suggestions) {
                    arr.push({ "value": this.suggestions[i].name })
                }
                console.log(arr)
                // 调用 callback 返回建议列表的数据
                cb(arr)
            })
        },
        handleSelect(item) {
            console.log(item);
        },
        getSwiper() {
            var mySwiper = new Swiper('.swiper-container', {
                //direction: 'vertical', 垂直切换选项
                loop: true, // 开启循环模式选项
                speed: 300,
                autoplay: {
                    delay: 3000
                },

                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,  //点分页时可以切换
                },

                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
        },
    },
    filters: {
        filter: function (value) {
            value = value.replace(/[emclasskeyword`*\-+=<>?:"{}|/;'\\[\]*——\-+=]/g, '').replace(/\s/g, "");
            return value;
        }
    }
}
</script>

<style scoped lange="less">
@import '../assets/cssC/swiper.min.css';

/* 轮播 */
.lunbo {
    width: 100%;
    height: 450px;
    cursor: pointer;
}

.lunbo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}



.news {
    padding: 2rem 1.6rem;
    font-size: 3rem;
    background-color: #fff;
}

.card {
    border-radius: 0.04rem;
    border: 2rem solid #ebebeb;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 0.2rem 0.6rem 0 rgba(0, 0, 0, 0.05);
}

.item {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    border-bottom: 5px solid #f1f1f1;
}

.pic {
    width: 300px;
    height: 200px;
    object-fit: cover;

}

.tag2 {
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

.content {
    display: flex;
    flex: auto;
    flex-direction: column;
    justify-content: center;
    margin: 0 5rem;
}

.title {
    color: #333;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.5rem;
}

.content p {
    margin: 0.03rem;
    color: #999;
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 1rem;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

/* 身体 */

.allcourses {
    width: 1520px;
    margin: 0 auto;
}

.recomment {
    margin-top: 46px;
}

.recomcourse {
    padding: 14px 0 14px 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 4px solid rgba(17, 123, 241, 1);
}

.coursetitle {
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(17, 123, 241, 1);
    letter-spacing: 1px;
}

.more_name {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(52, 52, 52, 1);
    line-height: 20px;
    letter-spacing: 1px;
    cursor: pointer;
}

.more img {
    margin-left: 16px;
    width: 16px;
    height: 16px;
}

.recomeEach {
    display: flex;
    flex-wrap: wrap;
}

.recomeEach li {
    width: 350px;
    margin-top: 40px;
    margin-left: 30px;
    cursor: pointer;
    border: 1px solid #ededed;
    padding: 0 0 15px 0;
    background: #fff;
}

.recomeEach li.on {
    border-color: #f40;
}

.recomeEach li:nth-child(4n+1) {
    margin-left: 0;
}

.coursecover {
    position: relative;
    width: 350px;
    height: 240px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    overflow: hidden;
}

.coursecover img {
    width: 100%;
    height: 100%;
    transition: all .3s;
}

.recomeEach li.on .coursecover img {
    transform: scale(1.2);
}

.courseback {
    position: absolute;
    width: 285px;
    height: 50px;
    line-height: 50px;
    text-align: right;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.6) 100%);
    bottom: 0;
    left: 0;
}

.intro {
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    letter-spacing: 1px;
    padding-right: 40px;
}

.course_title {
    padding: 15px 0 0 10px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(52, 52, 52, 1);
    line-height: 28px;
    letter-spacing: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.course_title:hover {
    color: rgba(17, 123, 241, 1);
}

.price_time {
    height: 40px;
    padding: 0 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 6px;
}

.price {
    padding: 2px 0 0 10px;
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(241, 17, 64, 1);
    letter-spacing: 1px;
}

.price span {
    color: #999;
}

.time {
    padding-top: 7px;
    color: #999;
}

/* 热门资讯 */
.twicerecomment {
    display: flex;
    justify-content: space-between;
}

.twicerecomment>div {
    width: 48%;
}

.messageEach {
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    margin-top: 40px;
    background: #fff;
}

.messageEach li {
    width: 100%;
    height: 135px;
    box-sizing: border-box;
    padding: 15px 10px;
    border-bottom: 1px dashed rgb(243, 243, 243);
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}

.messageEach li:hover {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, .2);
}

.text_mess {
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(52, 52, 52, 1);
    letter-spacing: 1px;
}

.createtime {
    padding-top: 20px;
}

.messageEach li>img {
    width: 100px;
    height: 100x;
    border-radius: 4px;
}

.share ul>li:hover {
    background: #f3f3f3;
}

.title_content:hover {
    color: rgba(17, 123, 241, 1);
}
</style>