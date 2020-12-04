<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    created() {
      // this.$router.push('/front')
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
      }

      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      })
    },
    methods:{
    }
  };
</script>
<style>
  @import "./assets/css/main.css";
  @import "./assets/css/color-dark.css"; /*深色主题*/
  /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
  @font-face {
    font-family: 'webfont';
    font-display: swap;
    src: url('./assets/font/webfont.eot'); /* IE9 */
    src: url('./assets/font/webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('./assets/font/webfont.woff2') format('woff2'),
    url('./assets/font/webfont.woff') format('woff'), /* chrome、firefox */
    url('./assets/font/webfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    url('./assets/font/webfont.svg#webfont') format('svg'); /* iOS 4.1- */
  }
</style>