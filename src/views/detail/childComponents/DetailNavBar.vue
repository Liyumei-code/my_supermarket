<template>
  <div>
    <nav-bar id="detailnavbar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in title"
          :key="index"
          class="title-item"
          :class="{active:currentIndex===index}"
          @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex:0
    };
  },
  components: {
    NavBar
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index);
    },
    backClick(){
      this.$router.back()
    }
  },

  watch: {}
};
</script>
<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-tint);
}
.back img {
  margin-top: 10px;
}
</style>