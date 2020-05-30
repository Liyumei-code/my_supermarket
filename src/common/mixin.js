import { debounce } from "common/utils";
import BackTop from "components/content/backTop/BackTop";
import { POP, NEW, SELL } from 'common/const'


export const itemListenerMixin = {
  data() {
    return {
      itemListener: null,
      newReflash: null
    }
  },
  mounted() {
    // 1.图片加载完成的事件监听
    this.newRefresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemListener = () => {
      this.newRefresh();
    };
    this.$EventBus.$on("itemImageLoad", this.itemListener);
    // console.log("我是混入我自豪");

  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,

    }
  },
  methods: {
    backClick() {
      // scroll第三个参数是时间，单位是毫秒
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  },

}

export const tabControlMixin = {
  data() {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
      
    }
  }
}