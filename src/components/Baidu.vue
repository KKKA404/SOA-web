<template>
    <div class="text item">
        <el-descriptions :title="this.keyword" direction="vertical" :column="1" :colon="showColon">
            <el-descriptions-item>
                {{this.baikeText}}
            </el-descriptions-item>
        </el-descriptions>
    </div>

</template>

<script>
import { getBaidu } from '../api/search'
export default {
    name: "baidu",
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
            showColon: false,
            baikeText: '',
        }
    },
    created() {
        getBaidu(this.keyword).then(res => {
            console.log(res);
            this.baikeText = res.data.data.text;

        })
    },
    methods: {

    }
}
</script>