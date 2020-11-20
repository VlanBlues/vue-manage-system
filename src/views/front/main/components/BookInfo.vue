<template>
  <div class="info">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card shadow="hover" class="card-img">
          <img :src="bookInfo.bookImg" class="book-img">
        </el-card>
      </el-col>
      <el-col :span="19">
        <div class="book-text">
          <div>{{bookInfo.bookName}}</div>
          <div>{{bookInfo.author}}</div>
          <div>{{bookInfo.publish}}&nbsp/&nbsp{{bookInfo.pubDate}}&nbsp/&nbsp{{bookInfo.price}}元</div>
          <div>{{bookInfo.introduction | ellipsis}}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "BookInfo",
    props:{
      bookInfo:{type:Object}
    },
    filters:{
      ellipsis(value){
        console.log('---------------------------------')
        if(!value) return;
        if(value.length > 100){
          return value.slice(0,100)+'...';
        }
        return value;
      }
    },
    data(){
      return{
        
      }
    },
    
    
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
    div{
      margin-bottom: 8px;
    }
    div:first-child{
      font-size: 16px;
      color: #3377aa;
      cursor: pointer;
    }
    .introduction{
      width: 80%;
    }
  }
}
</style>