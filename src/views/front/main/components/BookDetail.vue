<template>
  <div class="bookDetail">
    <el-row :gutter="40">
      <el-col :span="9" >
        <img :src="bookInfo.bookImg" class="book-img">
      </el-col>
      <el-col :span="15">
        <div class="book-text">
          <p>{{bookInfo.bookName}}</p>
          <p>{{bookInfo.author}}</p>
          <p>{{bookInfo.publish}}&nbsp/&nbsp{{bookInfo.pubDate}}</p>
          <p>{{bookInfo.introduction}}</p>
          <p>{{bookInfo.price}}元</p>
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
        isStar:this.$route.query.isStar,
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
                message: '订阅成功!'
              });
              this.isSubscribe = true;
            }else {
              this.$message({
                type: 'error',
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
  padding-top: 40px;
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
    float: right;
  }
}
</style>