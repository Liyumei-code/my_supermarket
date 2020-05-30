<template>
  <div class="toast"  v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default: ""
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    show(message='默认文字', duration=3000) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        message='';
      }, duration);
    }
  }
};
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;

  z-index: 999;
color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>