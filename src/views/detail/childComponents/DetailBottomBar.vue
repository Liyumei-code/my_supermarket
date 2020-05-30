<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service" />
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop" />
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select" />
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  props: {},
  data() {
    return {};
  },
  methods: {
    addCart(){
      this.$emit('addCart')
    }
  }
};
</script>
<style scoped>
.bottom-bar {
  height: 49px;
  background: #fff;
  position: relative;
  left: 0;
  /* bottom: 58px; */

  display: flex;
  text-align: center;
  box-shadow: 0px -1px 1px rgba(100, 100, 100, 0.1);

}
.bar-item {
  flex: 1;
  display: flex;
}
.bar-item > div {
  flex: 1;
}
.bar-left .text {
  font-size: 13px;
}
.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 5px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}

.bar-left .service {
  background-position: 0 -54px;
}
.bar-left .shop {
  background-position: 0 -98px;
}
.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 49px;
}
.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}
.bar-right .buy {
  background-color: #f69;
}
.sport-ball {
  position: absolute;
  left: 225px;
  bottom: 20px;
}
</style>