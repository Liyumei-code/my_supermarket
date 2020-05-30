<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item,index) in titles"
      :key="index"
      :class="{active:currentIndex===index}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods:{
    itemClick(index){
      this.currentIndex=index
      this.$emit('tabClick',index)
    }
  }
};
</script>

<style scoped>
.tab-control {
  /* width: 100%; */
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;

}
.tab-control-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}

.active span {
  padding: 5px;
  border-bottom: 3px solid var(--color-high-text);
}
</style>