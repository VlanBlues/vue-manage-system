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
        <el-button type="success" class="subscribe">订阅</el-button>
        <div class="el-icon-star-on star"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "BookDetail",
    data(){
      return{
        bookInfo:JSON.parse(this.$base64.decode(this.$route.query.bookInfo))
      }
    },
    methods:{
      
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