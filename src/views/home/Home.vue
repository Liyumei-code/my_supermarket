<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showType" />
    </scroll>
    <!-- 监听组件原生事件时，必须加上native才可以监听到 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import GoodsListItem from "components/content/goods/GoodsListItem";
import Scroll from "components/common/scroll/Scroll";

// 方法
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { itemListenerMixin,backTopMixin } from "common/mixin";


export default {
  name: "Home",
  mixins:[itemListenerMixin,backTopMixin],
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    GoodsListItem,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [], positionY: 0 },
        new: { page: 0, list: [], positionY: 0 },
        sell: { page: 0, list: [], positionY: 0 }
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showType() {
      return this.goods[this.currentType].list;
    }
  },
  activated() {
    console.log(this.saveY);
    
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 保存y值
    this.saveY = this.$refs.scroll.getScrollY();
    // 取消全局时间监听
    this.$EventBus.$off('itemImgLoad',this.itemListener)
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("new");
    this.getHomeGoods("pop");
    this.getHomeGoods("sell");
  },
  mounted() {
  },
  methods: {
    // 事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          this.isTabFixed &&
            this.$refs.scroll.scrollTo(
              0,
              this.goods[this.currentType].positionY,
              0
            );
          break;
        case 1:
          this.currentType = "new";
          this.isTabFixed &&
            this.$refs.scroll.scrollTo(
              0,
              this.goods[this.currentType].positionY,
              0
            );

          break;
        case 2:
          this.currentType = "sell";
          this.isTabFixed &&
            this.$refs.scroll.scrollTo(
              0,
              this.goods[this.currentType].positionY,
              0
            );

          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    
    contentScroll(position) {
      // 1.判断backtop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2.决定tabcontrol是否吸顶
      // console.log(-position.y > this.tabOffsetTop);

      this.isTabFixed = -position.y > this.tabOffsetTop;
      this.goods[this.currentType].positionY = position.y;
      // console.log(this.currentType,this.goods);
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // 2.获取tabControl的offsettop
      // $el用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);

      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      for (let item in this.goods) {
        this.goods[item].positionY = -this.tabOffsetTop;
      }
    },

    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, 1).then(res => {
        console.log(res);
        // ...把list数组解析push进来
        // console.log(res);

        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 使用原生滚动有作用 */
  /* position: fixed; */
  /* left: 0;
  right: 0;
  top: 0;
  z-index: 10; */
}
.tab-control {
  position: relative;
  z-index: 10;
}

/* .content { */
/* height: calc(100% - 93px); */
/* mg和of位置不能互换，不然会卡住 */
/* margin-top: 44px; */
/* overflow: hidden; */
/* } */

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>