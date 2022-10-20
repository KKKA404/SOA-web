<template>
    <div class="containers" :class="{'sharecontain':sharecontain}">
        <div class="header" :class="{'newheader':newheader,'scrollheader':scrollheader}">
            <div class="content">
                <div class="mainleft">
                    <span class="logo"> 易旅  欢迎您</span>
                    <ul class="navlist">
                        <li>
                            <router-link to="/header/main">首页</router-link>
                        </li>
                        <li>
                            <router-link to="/header/message">旅游资讯</router-link>
                        </li>
                        <li>
                            <router-link to="/header/allinfo">景点信息</router-link>
                        </li>
                    </ul>
                </div>
                <el-row class="demo-autocomplete">
                    <el-autocomplete class="inline-input" v-model="inputContent" :fetch-suggestions="querySearch"
                        placeholder="请输入景区关键字" :trigger-on-focus="false" @select="handleSelect">
                    </el-autocomplete>
                    <el-button icon="el-icon-search" @click="TurnPage">

                    </el-button>
                </el-row>
            </div>
        </div>
        <keep-alive>
            <router-view ref="childRouter" :users='users'></router-view>
        </keep-alive>
    </div>

</template>

<script>
import { getSuggest, getResultList, getBaidu } from '../api/search.js'
export default {
    name: '',
    data() {
        return {
            suggestions: {},
            searchResultsList: {},
            inputContent: '',
            newheader: false,
            scrollheader: false,
            sharecontain: false
        }
    },
    methods: {
        TurnPage: function () {
            this.$router.push({
                path: "/header/allinfo",
                query: {
                    inputContent: this.inputContent
                }
            });
            this.$router.go(0);
        },
        searchRes() {
            getResultList(this.inputContent, 1, 20).then(res => {
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

        getscroll(e) {
            var top = e.srcElement.scrollingElement.scrollTop;    // 获取页面滚动高度
            if (top > 100) {
                this.scrollheader = true
            } else {
                this.scrollheader = false
            }
        },

    },
    mounted() {
        // 监控路由不是首页main，顶部样式改变
        if (this.$route.path != '/header/main') {
            this.newheader = true
        } else {
            this.newheader = false
        }
        // 控制页面滚动，顶部背景变黑
        window.addEventListener("scroll", this.getscroll)

    },
    watch: {
        '$route.path': function (newVal, oldVal) {
            if (newVal != '/header/main') {
                this.newheader = true
            } else {
                this.newheader = false
            }
            if (newVal == '/header/sharedetails' || newVal == '/header/writeshare') {
                this.sharecontain = true
            }
        },
    },
    // 使用计算属性的优先使用缓存的特性，解决刷新子组件/子路由数据丢失的问题
    computed: {
        users() {
            if (localStorage.getItem("users")) {
                return JSON.parse(localStorage.getItem("users"))[0]
            }
        }
    },
}
</script>

<style scoped>
.containers {
    position: relative;
    min-height: 100%;
    box-sizing: border-box;
    padding-bottom: 410px;
}

.sharecontain {
    background: #fff;
}

/* 头部 */
.header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1000;
}

.header:hover {
    background: rgba(45, 51, 54, 0.9);
}

.header.scrollheader {
    background: rgba(45, 51, 54, 0.9);
}

.header.newheader {
    position: static;
    width: 100%;
    z-index: 1000;
    background: rgba(45, 51, 54, 0.9);
}

.content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    line-height: 90px;
}

.mainleft {
    display: flex;
    align-items: center;
    color: #fff;
}

.logo {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    float: left;
}

ul.navlist {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
}

ul.navlist li {
    cursor: pointer;
    width: 100px;
    text-align: center;
    margin-left: 40px;
}

ul.navlist li.on::after {
    display: block;
    content: '';
    position: absolute;
    width: 100px;
    height: 10px;
    background: rgba(17, 123, 241, 1);
    top: 0;
}

ul.navlist li a {
    width: 100%;
    color: #fff;
}

ul.navlist li .router-link-active {
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(17, 123, 241, 1);
}

</style>