<template>
  <div class="search-panel">
    <div class="search-input">
      <input type="text" v-model="keyword" @keydown.enter="search()" />
      <!-- 点击清除输入框内容 -->
      <span class="search-reset" @click="clearInput()">&times;</span>
      <button class="search-btn" @click="TurnPage()">搜一下</button>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      keyword: "", //v-model绑定
      searchIndex: 0,
      logoData: [
        {
          name: "360搜索",
          searchSrc: "https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q="
        }
      ]
    };
  },
  methods: {
    search: function() {
      //跳转到搜索界面，打开对应关键词的搜索界面
      window.open(this.logoData[this.searchIndex].searchSrc + this.keyword);
    },
    selectClick: function(index) {
      this.keyword = this.myData[index];
      this.search();
    },
    clearInput: function() {
      this.keyword = "";
      this.$http
        .jsonp(
          "https://sug.so.360.cn/suggest?word=" +
            this.keyword +
            "&encodein=utf-8&encodeout=utf-8"
        )
        .then(function(res) {
          this.myData = res.data.s;
        });
    },
    TurnPage: function() {
      this.$router.push({
        path: "./MainPage",
        query: {
          keyword: this.keyword
        }
      });
    }
  }
};
</script>

<style type="text/css">
.search-panel {
  color: #2c3e50;
  width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
  position: absolute;
  top: 35%;
  left: 50%;
  margin-left: -300px;
  margin-top: -100px;
}

.search-input {
  height: 45px;
  width: 600px;
  margin: 0 auto;
  margin-top: 10px;
  position: relative;
}

.search-input input {
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  width: 500px;
  height: 45px;
  font-size: 18px;
  float: left;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
}

.search-btn {
  height: 45px;
  width: 100px;
  border: 1px solid rgb(129, 216, 208);
  background-color: rgb(129, 216, 208);
  color: white;
  font-size: 16px;
  font-weight: bold;
  float: left;
}

.search-btn {
  cursor: pointer;
}

.selectback {
  background-color: #eee !important;
  cursor: pointer;
}

input::-ms-clear {
  display: none;
}

.search-reset {
  width: 21px;
  height: 21px;
  position: absolute;
  display: block;
  line-height: 21px;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  right: 110px;
  top: 12px;
}

.itemfade-enter,
.itemfade-leave-active {
  opacity: 0;
}

.itemfade-leave-active {
  position: absolute;
}

.selectback {
  background-color: #eee !important;
  cursor: pointer;
}
</style>
