<template>
  <div class="front-main">
    <v-head></v-head>
    <div style="width:1000px;margin: 55px auto 0;position: relative;overflow: hidden">
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
      let readerId = this.$store.state.userInfo.readerId;
      this.$api.get('/notice/getNewNotice',{
        readerId
      },res =>{
        if(res.data.code === 200){
          if(this.$cookies.isKey(readerId)){
            if(this.$cookies.get(readerId).toString() !== res.data.data.id.toString()){
              this.$cookies.set(readerId,res.data.data.id);
              this.$notify.info({
                title: '系统提示',
                message: res.data.data.title,
                duration: 10000
              });
            }
          }else {
            this.$cookies.set(readerId,res.data.data.id);
            this.$notify.info({
              title: '系统提示',
              message: res.data.data.title,
              duration: 10000
            });
          }
        }
      })
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
