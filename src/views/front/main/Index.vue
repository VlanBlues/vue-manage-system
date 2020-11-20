<template>
  <div class="front-main">
    <vHead></vHead>
    <div style="padding: 0 20%;margin-top: 65px;position: relative">
      <!--<transition name="move" mode="out-in">
        &lt;!&ndash;<component :is="componentName"></component>&ndash;&gt;
      </transition>-->
      <transition name="move" mode="out-in">
        <keep-alive include="BookSearch">
          <router-view></router-view>
        </keep-alive>
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
    position: relative;
    height: 100%;
    overflow: auto;
  }
</style>
