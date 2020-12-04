<template>
  <div class="bookDetail">
    <div class="profile-box-head">
      <span class="dot"></span>
      <span style="vertical-align:middle;">详细信息</span>
    </div>
    <el-row :gutter="40">
      <el-col :span="9" >
        <img :src="bookInfo.bookImg" class="book-img">
      </el-col>
      <el-col :span="15">
        <div class="book-text">
          <p>{{bookInfo.bookName}}</p>
          <p><span>作者：</span>{{bookInfo.author}}</p>
          <p><span>出版社：</span>{{bookInfo.publish}}</p>
          <p><span>出版时间：</span>{{bookInfo.pubDate}}</p>
          <p><span>简介：</span>{{bookInfo.introduction}}</p>
          <p><span>定价：</span>{{bookInfo.price}}元</p>
        </div>
        <el-button v-if="isSubscribe" type="success" class="subscribe" disabled>已订阅</el-button>
        <el-button v-else type="success" class="subscribe" @click="subscribe">订阅</el-button>
        <div v-if="isStar" class="el-icon-star-on star" @click="collection" style="font-size: 36px;"></div>
        <div v-else class="el-icon-star-off star" @click="collection"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "BookDetail",
    data(){
      return{
        bookInfo:JSON.parse(this.$base64.decode(this.$route.query.bookInfo)),
        isStar:this.$route.query.isStar === 'true',
        isSubscribe:false,
      }
    },
    methods:{
      collection(){
        let url = "/book/collection/";
        if(this.isStar){
          url += 'del';
        }else {
          url += 'add';
        }
        this.$api.post(url,{
          bookId:this.bookInfo.bookId,
          readerId:this.$store.state.userInfo.readerId
        },res => {
          if(res.status === 200 && res.data.success){
            this.$message.success(res.data.data);
            this.isStar = !this.isStar
          }else {
            this.$message.error(res.data.data);
          }
        });
      },
      subscribe(){
        this.$confirm(`确定订阅《${this.bookInfo.bookName}》?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post('/subscribe/saveOrUpdate',{
            bookId:this.bookInfo.bookId,
            readerId:this.$store.state.userInfo.readerId
          },res =>{
            if(res.data.code === 200){
              this.$message({
                type: 'success',
                showClose: true,
                message: '订阅成功!'
              });
              this.isSubscribe = true;
            }else {
              this.$message({
                type: 'error',
                showClose: true,
                message: '订阅失败!'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '请求失败!'
          });
        });
      },
      getIsSubscribe(){
        this.$api.get('/subscribe/getIsSubscribe',{
          bookId:this.bookInfo.bookId,
          readerId:this.$store.state.userInfo.readerId
        },res => {
          if(res.data.data === "yes"){
            this.isSubscribe = true
          }else {
            this.isSubscribe = false
          }
        })
      }
    },
    created(){
      this.getIsSubscribe();
    },
    activated(){
      this.getIsSubscribe();
    }
  }
</script>

<style lang="scss">
.bookDetail{
  margin-top: 20px !important;
  padding-bottom: 20px !important;
  .profile-box-head {
    height: 50px;
    border-bottom: 1px solid #E1E1E1;
    line-height: 50px;
    font-size: 18px;
    color:#333;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #409eff;
    margin-right: 10px;
    vertical-align: middle;
  }
  .el-col{
    .book-img{
      width: 100%;
    }
  }
  .book-text{
    font-size: 18px;
    color: #666;
    p{
      margin-bottom: 20px;
      span{
        color: #409eff;
      }
    }
    p:first-child{
      font-size: 34px;
      color: #3377aa;
      cursor: pointer;
    }
  }
  .star{
    position: absolute;
    right: 20px;
    top: 10px;
    font-size: 30px;
    cursor: pointer;
    color: #409eff;
  }
  .subscribe{
    padding: 12px 18px;
    font-size: 18px;
    display: inline-block;
    position: absolute;
    right: 20px;
    bottom: 0;
  }
}
</style>