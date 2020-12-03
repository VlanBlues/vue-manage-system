<template>
  <div class="header">
    <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <div class="logo" @click="goHome">
        <img src="@/assets/img/book_logo.png"/>
        <span >图书订阅</span>
      </div>
      <el-menu-item index="/main">书籍搜索</el-menu-item>
      <el-menu-item index="/main/mySubscribe">我的借阅</el-menu-item>
      <el-menu-item index="/main/bookCollection">我的收藏</el-menu-item>
      <el-menu-item index=""><a href="http://localhost:8080/#/login" target="_blank">后台管理</a></el-menu-item>
      <div class="user">
        <el-avatar :src="userInfo.img" shape="circle" fit="contain"></el-avatar>
        <el-dropdown class="user-name" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{userInfo.username}}<i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  command="user-info">个人信息</el-dropdown-item>
            <el-dropdown-item divided  command="system-info">
              <el-badge is-dot class="item">系统消息</el-badge>
            </el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>
<script>
  export default {
    name: 'main_header',
    data() {
      return {
      };
    },
    computed: {
      userInfo(){
        return this.$store.state.userInfo
      },
      activeIndex:{
        get(){
          return this.$store.state.activeIndex
        },
        set(newVal){
          this.$store.commit('updateActiveIndex',newVal);
        }
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        this.activeIndex = key
      },
      goHome(){
        if(this.$route.path !== '/main'){
          this.$router.push("/main")
        }
      },
      handleCommand(command) {
        if(command === 'loginout') {
          this.$confirm('确定退出登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/');
            this.$message({
              type: 'success',
              message: '成功退出!'
            });
          }).catch(() => {
          });
        }else if(command === 'user-info') {
          this.$router.push('/main/personalInfo')
        }else {
          this.$router.push('/main/systemNotice')
        }
        this.activeIndex = 'empty'
      }
    },
    mounted() {

    }
  };
</script>
<style lang="scss">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    .img{
      outline:none;
    }
    div{
      outline: none;
    }
    .el-menu-demo {
      position: relative;
      padding: 0 18%;
      .logo {
        display: inline-block;
        float: left;
        margin-right: 15%;
        cursor: pointer;
        img{
          height: 50px;
          border: none;
          margin-top: 5px;
        }
        span{
          display: inline-block;
          margin-left: 10px;
          font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
          font-size: 30px;
          color: #1069BF;
          vertical-align: top;
          line-height: 60px;
        }
      }
      .el-avatar {
        outline: none;
        margin-top: 10px;
      }
    }
    .user{
      display: inline-block;
      float: right;
      outline: none;
      .user-name{
        cursor: pointer;
        margin-left: 10px;
        margin-top: 20px;
        vertical-align: top;
      }
    }
    
  }
</style>
