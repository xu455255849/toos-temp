<template>
  <crop-block
    :option="cropOption"
    ref="crop"
    @upload="upload"
  ></crop-block>
</template>

<script>
    export default {
        name: "index",
      data ()  {
          return {
            cropOption: {
              showCrop: false,
              cropUrl: '',
              fixedNumber: [16, 9]
            }
          }
      }

    }
</script>

<style scoped>

</style>
