<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <scroll class="container" ref="scroll" :probe-type="3" @scroll="containerScorll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="good" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgload="imageLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childComponents/DetailNavBar";
import DetailSwiper from "views/detail/childComponents/DetailSwiper";
import DetailBaseInfo from "views/detail/childComponents/DetailBaseInfo";
import DetailShopInfo from "views/detail/childComponents/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childComponents/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childComponents/DetailParamInfo";
import DetailCommentInfo from "views/detail/childComponents/DetailCommentInfo";
import DetailBottomBar from "views/detail/childComponents/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";


import {
  getDetail,
  GoodsInfo,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import { mapActions } from "vuex";

export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      good: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      titleTopYs: [],
      getTitleTopY: null,
      cIndex: 0
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.newRefresh();
      this.getTitleTopY();
      // console.log(this.$refs);
    },
    titleClick(index) {
      console.log("titleIndex" + index);
      this.$refs.scroll.scrollTo(0, -this.titleTopYs[index] + 44, 100);
    },
    containerScorll(position) {
      // 获取y
      const positionY = -position.y;

      // 判断y
      for (let i in this.titleTopYs) {
        if (this.cIndex != i && positionY >= this.titleTopYs[i] - 44) {
          this.cIndex = parseInt(i);
          this.$refs.nav.currentIndex = this.cIndex;
        }
      }

      // 1.判断backtop是否显示
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      // 获取购物车需要的信息
      const product = {};
      console.log(this.topImages[0]);

      product.image = this.topImages[0];
      product.title = this.good.title;
      product.desc = this.good.desc;
      product.price = this.good.realPrice;
      product.iid = this.iid;

      // 将商品添加到购物车里
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart',product)
      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log();

      // })
      this.addCart(product).then(res => {
        console.log(res,this.$toast);
        this.$toast.show(res)
      });

      // 添加到购物车成功
    }
  },
  created() {
    // 保存iid
    this.iid = this.$route.params.iid;
    // 根据iid请求数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.good = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 创建店铺信息
      this.shop = new Shop(data.shopInfo);

      // 保存商品详情
      this.detailInfo = data.detailInfo;

      // 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    this.getTitleTopY = debounce(() => {
      this.titleTopYs = [];
      this.titleTopYs.push(0);
      this.titleTopYs.push(this.$refs.param.$el.offsetTop);
      this.titleTopYs.push(this.$refs.comment.$el.offsetTop);
      this.titleTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.titleTopYs.push(Number.MAX_VALUE);
      // console.log(this.titleTopYs);
    });
    // 若初次加载缓慢，会有错
    // this.$nextTick(() => {
    //   this.titleTopYs = [];
    //   this.titleTopYs.push(0);
    //   this.titleTopYs.push(this.$refs.params.$el.offsetTop);
    //   this.titleTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.titleTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.titleTopYs);
    // });
  },
  destroyed() {
    this.$EventBus.$off("itemImgLoad", this.itemListener);
  }
};
</script>
<style scoped>
#detail {
  position: relative;
  height: 100vh;
  z-index: 11;
  background-color: #fff;
}
.container {
  /* calc在chrome中使用需要添加前缀 */
  height: -webkit-calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>