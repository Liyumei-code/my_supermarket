<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
}
.recommend-item {
  flex: 1;
  text-align: center;
  font-size: 12px;
  padding: 15px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommend-item img {
  width: 65px;
  height: 65px;
  margin-bottom: 5px;
}
</style>