<template>
<!--  <div class="cart-list">-->
<!--    <scroll class="container" ref="scroll">-->
<!--      &lt;!&ndash; <li v-for="(item,index) in cartList" :key="index">{{item}}</li> &ndash;&gt;-->
<!--      <cart-list-item v-for="(item,index) in cartList" :key="index" -->
<!--      :product="item" />-->
<!--    </scroll>-->
<!--  </div>-->
  <div class="cart_total">
    <div class="cart-list" v-if="$store.state.cartList.length>0">
      <scroll class="container" ref="scroll">
        <!-- <li v-for="(item,index) in cartList" :key="index">{{item}}</li> -->
        <cart-list-item v-for="(item,index) in cartList" :key="index"
                        :product="item" />
      </scroll>

    </div>
    <div v-if="$store.state.cartList.length==0" class="img">
      <img :src="img" />

    </div>

  </div>


</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";


import { mapGetters } from "vuex";

export default {
  name: "CartList",
  props: {},
  data() {
    // return {};
    return {
      img:require('assets/img/gouwuc.jpg'),
    };
  },

  components: {
    Scroll,
    CartListItem
  },

  computed: {
    ...mapGetters(["cartList"])
  },
  activated (){
    if(this.$store.state.cartList.length>0){
      this.$refs.scroll.refresh()
    }
  }
};
</script>
<style scoped>
.cart_total {
  height: -webkit-calc(100% - 44px - 49px - 40px);

}
.cart-list{
   height: -webkit-calc(100% - 44px - 49px - 40px);

}
.container {
  height: 100%;
  overflow: hidden;
}
.img {
  height: calc(100vh - 93px - 40px);
  background-color: #F2F2F2;
}
.img img{
    width:100%;
  }
/*.img .img_cart{*/
/*    width:100%;*/
/*    height:3rem;*/
/*    background-color: #f2f2f2;*/
/*  }*/

</style>
