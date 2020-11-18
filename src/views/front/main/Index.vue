<template>
  <div class="front-main">
    <vHead></vHead>
    <div style="padding: 0 20%;">
      <transition name="move" mode="out-in">
        <component :is="componentName"></component>
      </transition>
    </div>
  </div>
</template>

<script>
  import vHead from "./components/MainHeader";
  import bookSearch from "./bookSearch/BookSearch";

  export default {
    name: "index",
    components: {
      vHead,
      bookSearch
    },
    data(){
      return {
        componentName:'bookSearch'
      }
    },
    methods:{

    }
  }
</script>

<style scoped lang="scss">
  .front-main{
    height: 100vh;
    overflow: auto;
  }
</style>
