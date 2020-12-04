<template>
  <div class="info">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card shadow="hover" class="card-img">
          <img :src="bookInfo.bookImg" class="book-img" @click="bookDetail">
        </el-card>
      </el-col>
      <el-col :span="19">
        <div class="book-text">
          <p @click="bookDetail">{{bookInfo.bookName}}</p>
          <p>{{bookInfo.author}}</p>
          <p>{{bookInfo.publish}}&nbsp/&nbsp{{bookInfo.pubDate}}</p>
          <p>{{bookInfo.introduction | ellipsis}}</p>
          <p>{{bookInfo.price}}元</p>
          <el-button v-if="isSubscribe" type="primary" @click="cancelSub(bookInfo.bookName)">取消</el-button>
        </div>
        <div v-show="!noStar">
          <div v-if="isStar" class="el-icon-star-on star" @click="collection" style="font-size: 22px;"></div>
          <div v-else class="el-icon-star-off star" @click="collection"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "BookInfo",
    props:{
      bookInfo:{type:Object},
      noStar:{type:Boolean},
      isSubscribe:{type:Boolean,default:false},
      lendId:{type:Number}
    },
    filters:{
      ellipsis(value){
        if(!value) return;
        if(value.length > 100){
          return value.slice(0,100)+'...';
        }
        return value;
      }
    },
    data(){
      return{
        isStar:false
      }
    },
    methods:{
      cancelSub(bookName){
        this.$confirm(`是否取消订阅《${bookName}》?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.get('/subscribe/delByLendId',{
            lendId:this.lendId
          },res =>{
            if(res.data.code === 200){
              this.$message({
                type:'success',
                showClose: true,
                message: res.data.data
              });
              this.$emit('updateDate')
            }else {
              this.$message({
                type:'error',
                showClose: true,
                message: res.data.data
              });
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消!'
          });
        });
      },
      bookDetail(){
        this.$router.push({
          path:'/main/bookDetail',
          query:{
            bookInfo:this.$base64.encode(JSON.stringify(this.bookInfo)),
            isStar:this.isStar
          }})
      },
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
            this.$message({
              type:'success',
              showClose: true,
              message: res.data.data
            });
            this.isStar = !this.isStar
          }else {
            this.$message({
              type:'error',
              showClose: true,
              message: res.data.data
            });
          }
        });
      }
    },
    mounted(){
      this.isStar = this.bookInfo.bookCollection !== null;
    },
    activated(){
      this.isStar = this.bookInfo.bookCollection !== null;
    }
  }
</script>

<style lang="scss">
.info{
  padding: 15px 0;
  border-bottom:1px dashed #929292;
  .card-img{
    .el-card__body{
      padding: unset;
    }
  }
  .book-img{
    width: 100%;
    cursor: pointer;
  }
  .book-text{
    font-size: 14px;
    color: #666;
    p{
      margin-bottom: 8px;
    }
    p:first-child{
      font-size: 16px;
      color: #3377aa;
      cursor: pointer;
    }
    .introduction{
      width: 80%;
    }
    button{
      position: absolute;
      right: 0;
      bottom: 0px;
    }
  }
  .star{
    position: absolute;
    right: 20px;
    top: 10px;
    font-size: 18px;
    cursor: pointer;
    color: #409eff;
  }
}
</style>