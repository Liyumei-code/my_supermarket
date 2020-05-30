<template>
  <div class="bottom-bar">
    <div class="check-container">
      <check-button :value="isSelectAll" class="check-button" @click.native="allBtnClick" />
      <span>全选</span>
    </div>
    <div class="total-price">合计:{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  props: {},
  data() {
    return {};
  },

  components: {
    CheckButton
  },

  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return (preValue * 1 + item.price * item.count).toFixed(2);
          }, 0)
      );
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      // 会遍历所有元素，性能不高
      // return (this.cartList.filter(item=>!item.checked).length)
      if (this.cartList.length === 0) return false;
      return !this.cartList.find(item => !item.checked);
    }
  },
  methods: {
    allBtnClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => (item.checked = false));
      } else {
        this.cartList.forEach(item => (item.checked = true));
      }
      // 不可以这样做 每次遍历都会改变isselectall的值，导致混乱
      // this.cartList.forEach(item => (item.checked = !this.isSelectAll));
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  line-height: 40px;
  height: 40px;
  /*left: 0;*/
  /*bottom: -410px;*/
  background-color: #eee;
}
.check-container {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.total-price {
  margin-left: 10px;
  flex: 1;
}
.calculate {
  width: 100px;
  background-color: var(--color-tint);
  text-align: center;
  color: #fff;
}
</style>
