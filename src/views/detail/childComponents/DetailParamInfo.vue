<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length!==0">
    <table v-for="(table,index) in paramInfo.sizes" :key="index" class="info-size">
      <tr v-for="(tr,rindex) in table" :key="rindex">
        <td v-for="(td,dindex) in tr" :key="dindex">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(info,index) in paramInfo.infos" :key="index">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length!==0">
      <img :src="paramInfo.image" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo.vue",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style scoped>
.param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
.param-info table {
  width: 100%;
  border-collapse: collapse;
}
.param-info table tr {
  height: 42px;
}
.param-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-param-key {
  /* 避免value数据量大挤到key */
  width: 95px;
}
.info-param {
  border-top: 1px solid rgba(100, 100, 100, 0.1);
}
.param-value {
  color: #eb4868;
}
.info-img img {
  width: 100%;
}
</style>