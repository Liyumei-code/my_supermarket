<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="container">
      <tab-menu :categories="categories" @selectItem="selectItem" />
      <scroll id="tab-content" :data="[categoryData]" ref="scroll">
        <div>
          <tab-content-category :subcategories="showCategory"/>
          <tab-control :titles="['综合','新品','销量']" @tabClick="tabClick()" />
          <goods-list :goods="showCategoryDetail" />
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";


import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category";
import { POP,NEW,SELL} from 'common/const'
  import {tabControlMixin} from "@/common/mixin";


export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    TabControl,
    Scroll,
    GoodsList,
    TabContentCategory
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex:-1
    };
  },
  computed:{
    showCategory(){
      if(this.currentIndex===-1) return {}
      return this.categoryData[this.currentIndex].subCategories
    },
    showCategoryDetail(){
      if(this.currentIndex===-1) return[]
      console.log('aaaa',this.categoryData[this.currentIndex].categoryDetail[this.currentType])
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  created() {
    // 请求分类数据
    this._getCategory();
  },
  mixins: [tabControlMixin],
  methods: {
    _getCategory() {
      getCategory().then(res => {
        // 获取分类数据
        // console.log(res)
        this.categories = res.data.category.list;
        // 初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subCategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        }
        // console.log(this.categories)
        // 请求第一个分类的数据
        this._getSubcategory(0)
      });
    },
    _getSubcategory(index) {
      this.currentIndex=index
      const maitKey=this.categories[index].maitKey
      console.log(maitKey)
      getSubcategory(maitKey).then((res)=>{
        console.log(res)
        this.categoryData[index].subCategories=res.data
        this.categoryData={...this.categoryData}
        this._getCategoryDetail(POP)
        this._getCategoryDetail(NEW)
        this._getCategoryDetail(SELL)
        // ths.categoryData[index].categoryDetail
      })
    },
    _getCategoryDetail(type) {
      const miniWallkey=this.categories[this.currentIndex].miniWallkey
      getCategoryDetail(miniWallkey,type).then((res)=>{
        this.categoryData[this.currentIndex].categoryDetail[type]=res
        this.categoryData={...this.categoryData}
      })
    },
    selectItem(index){
        this._getSubcategory(index)
    }
  }
};
</script>

<style scoped>
#category {
  height: 100vh;
}

.nav-bar {
  position: relative;
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  z-index: 99;
}

.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  display: flex;
}

#tab-content {
  height: 100%;
  flex: 1;
}
</style>
