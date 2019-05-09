<template>
    <div id="index">
        <div class="search">
            <van-row class="vantrow">
                <van-col span="4">
                    <img class="search-icon" :src="iconSrc" alt srcset>
                </van-col>
                <van-col span="16">
                    <form action="/">
                        <van-search
                            v-model="value"
                            placeholder="请输入搜索关键词"
                            show-action
                            @search="onSearch"
                            @cancel="onCancel"
                        />
                    </form>
                </van-col>
                <van-col span="4">
                    <van-button class="search-btn" round size="small" type="info">查找</van-button>
                </van-col>
            </van-row>
        </div>

        <!-- 轮播 -->
        <div class="vanswiper">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(item, index) in slides" :key="index">
                    <img v-lazy="item.image">
                </van-swipe-item>
            </van-swipe>
        </div>

        <!-- 分类 -->
        <div class="type-bar">
            <div v-for="item in category" :key="item.mallCategoryId">
                <img v-lazy="item.image" alt sizes srcset>
                <span>{{item.mallCategoryName}}</span>
            </div>
        </div>

        <!-- 广告 -->
        <div class="ad">
            <img src v-lazy="adbanner" width="100%" alt srcset>
        </div>

        <!-- 推荐 -->
        <div class="recomend">
            <h5 class="recomend-title">商品推荐</h5>
            <div class="recomend-body">
                <swiper :options="swiperOption">
                    <swiper-slide
                        class="recomend-slide"
                        v-for="(item, index) in recommend"
                        :key="index"
                    >
                        <div class="recomend-item">
                            <img :src="item.image" width="80%" alt>
                            <p>{{item.goodsName}}</p>
                            <p>{{item.price}}¥</p>
                        </div>
                    </swiper-slide>
                    <div class="swiper-pagination recommend-pagination" slot="pagination"></div>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { log } from "util";
import "swiper/dist/css/swiper.css";
import api from "../api/api.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            value: null,
            // 图标
            iconSrc: require("../assets/images/dingwei.png"),
            // 搜素
            onSearch() {},
            onCancel() {},
            // 轮播
            slides: [],
            // 分类
            category: [],
            // 广告图
            adbanner: "",
            recommend: [],
            swiperOption: {
                // loop:true,
                slidesPerView: 3,
                // freeMode: true,
                // mousewheel: true,
                pagination: {
                    clickable: true
                    // el: ".recommend-pagination"
                }
            }
        };
    },
    created() {
        axios({
            method: "get",
            url: api.indexGoods
        })
            .then(res => {
                if (res.status == 200) {
                    let res_data = res.data.data;
                    console.log(res_data);

                    // 分类
                    this.slides = res_data.slides;
                    this.category = res_data.category;
                    this.adbanner = res_data.advertesPicture.PICTURE_ADDRESS;
                    this.recommend = res_data.recommend;

                    console.log(res_data.recommend);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
};
</script>

<style scoped>
img {
    width: 100%;
    height: auto;
}

#index {
    width: 100%;
    height: auto;
    overflow: hidden;
}
.search {
    height: auto;
    overflow: hidden;
    line-height: 2.3rem;
    text-align: center;
}
.search-icon {
    margin-top: 0.4rem;
    width: 1.5rem;
}

.search-btn {
    font-size: 0.3rem;
    color: #fff;
}

.vanswiper {
    height: 9.3rem;
}

/* type */
.type-bar {
    display: flex;
    text-align: center;
    font-size: 0.7rem;
    justify-content: space-between;
}
.type-bar img {
    width: 3.5rem;
}

/* 商品推荐 */
.recomend-title {
    margin: 0.3rem;
    color: palevioletred;
}
.recomend-item {
    font-size: 0.7rem;
    text-align: center;
}
.recomend-slide {
    /* width: 44% !important; */
}
.recomend-item p {
    margin: 0.3rem;
}
</style>