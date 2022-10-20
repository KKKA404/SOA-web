
<template>
    <!-- Swiper6之前默认容器是'.swiper-container' -->
    <div class="swiper-container lunbo">
        <div class="swiper-wrapper" >
            <div class="swiper-slide"><img 
                    src="https://b1-q.mafengwo.net/s16/M00/19/EF/CoUBUl6DJMGAWFe4ACR13B4-bt8760.png?imageMogr2%2Finterlace%2F1"
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
</template>

<script type="text/ecmascript-6">
import { getResultList,getSuggest,getSearchDefaultWords } from '../api/search'
//import axios from 'axios';
import VueJsonp from 'vue-jsonp'
//引用swiper
import Swiper from "swiper";
//引用swiper样式
import 'swiper/css/swiper.css';

export default {
    data(){
        return{
            keyword:'',
            query:"小林"
        }
    },
    mounted() {
        //组件挂载完毕后初始化Swiper
        this.getSwiper();
        
        // getAllData().then((res) => {
        //     console.log(res)
        // });
    },
    created() {
        // setTimeout(() => {
        //     this._getResultList()
        // }, 20)
        this.keyword = this.$route.query.inputContent;
        console.log(this.keyword)

        // axios.get('/api/index/ding.json'
        // )
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });

    },
    methods: {
        _getResultList() {
            getResultList(this.keyword, 1, 20).then(res => {
               console.log(res);
            })
        },
        getSwiper() {
            var mySwiper = new Swiper('.swiper-container', {
                //direction: 'vertical', 垂直切换选项
                loop: true, // 开启循环模式选项

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
        }
    },
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

</style>