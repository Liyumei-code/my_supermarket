<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt @load="imageLoad" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },

  components: {
    Swiper,
    SwiperItem
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    imageLoad() {
      if (!this.isLoad) {
        // this.$emit("detailSwiperLoad")
        this.isLoad = true;
      }
    }
  },

  watch: {}
};
</script>
<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>