<template>
  <div class="component-dialog" v-if="options.show">
    <div class="mask">
      <slot name="ctx"></slot>
      <img class="close" @click="close" src="../assets/images/detail/dialog-close.svg" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "component-dialog",
    props: {
      options: {
        type: Object
      }
    },
    data() {
      return {
      
      }
    },
    methods: {
      close () {
        this.options.show = false
      }
    },
    mounted: function () {
    }
  }
</script>

<style lang="less">
  .component-dialog {
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    .mask {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 80%;
      min-height: 200px;
      height: auto;
      background: #fff;
      border-radius: 16px;
      transform: translate(-50%, -50%);
      .close {
        width: 32px;
        height: 32px;
        position: absolute;
        left: 50%;
        bottom: -60px;
        transform: translateX(-16px);
      }
    }
    
  }

</style>
