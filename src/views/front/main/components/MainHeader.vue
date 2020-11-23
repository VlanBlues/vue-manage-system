<template>
  <div class="header">
    <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <div class="logo">
        <img src="@/assets/img/book_logo.png"/>
        <span>图书订阅</span>
      </div>
      <el-menu-item index="/main">书籍搜索</el-menu-item>
      <el-menu-item index="/main/mySubscribe">我的订阅</el-menu-item>
      <el-menu-item index="3">我的收藏</el-menu-item>
      <el-menu-item index=""><a href="http://localhost:8080/#/dashboard" target="_blank">后台管理</a></el-menu-item>
      <div class="user">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <el-dropdown class="user-name" @command="handleCommand">
                    <span class="el-dropdown-link">
                        用户名<i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  command="user-info">个人信息</el-dropdown-item>
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
        activeIndex: '/main',
      };
    },
    computed: {},
    methods: {
      handleSelect(key, keyPath) {
        
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
        }
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
      padding: 0 20%;
      .logo {
        display: inline-block;
        float: left;
        margin-right: 20%;
        img{
          height: 60px;
          border: none;
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
