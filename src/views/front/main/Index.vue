<template>
  <div class="front-main">
    <v-head></v-head>
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
        componentName:'bookSearch',
      }
    },
    methods:{

    },
    created(){
    },
    mounted(){
      
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
