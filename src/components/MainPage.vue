<template>
  <el-main>
    <div class="search-ontop">
      <input type="text" v-model="keyword" @keydown.enter="search()" />
      <span class="search-reset" @click="clearInput()">&times;</span>
      <button class="search-btn" @click="search()">搜一下</button>
    </div>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
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
  created() {
    this.keyword = this.$route.query.keyword;
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
.search-ontop {
  height: 10px;
  width: 600px;
  margin: 0 auto;
  margin-top: 10px;
  position: relative;
}
.search-ontop input {
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
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 800px;
  margin-top: 20px;
}
</style>
