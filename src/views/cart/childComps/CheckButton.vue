<template>
  <div>
    <div class="icon-selector" :class="{active:checked}" @click="selectItem">
      <img src="~assets/img/cart/tick.svg" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checked: this.value
    };
  },

  methods: {
    selectItem() {
      this.$emit("checkBtnClick");
    }
  },

  watch: {
    value(newValue) {
      this.checked = newValue;
    }
  }
};
</script>
<style scoped>
.icon-selector{
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: #fff;
}
.icon-selector img{
  width: 15px;
}
.active{
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>