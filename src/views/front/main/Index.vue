<template>
  <div class="front-main">
    <v-head></v-head>
    <div style="padding: 0 18%;margin-top: 65px;position: relative;overflow: hidden">
      <!--<transition name="move" mode="out-in">
        &lt;!&ndash;<component :is="componentName"></component>&ndash;&gt;
      </transition>-->
      <transition name="move" mode="out-in">
        <keep-alive include="BookSearch">
          <router-view  style="padding: 0 20px;background-color: #ffffff;"></router-view>
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
      this.$notify.info({
        title: '提示',
        message: '这是一条不会自动关闭的消息',
        duration: 0
      });
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
    background-color: #EEEEEE;
  }
</style>
