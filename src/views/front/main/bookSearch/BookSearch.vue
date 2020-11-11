<template>
  <div>
    <div class="book-search">
      <el-input placeholder="请输入内容" v-model="query.bookName" class="input-with-select" prefix-icon="el-icon-notebook-2" size="medium">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="book-info-content">
      <div class="book-list">
        <book-info :bookInfo="bookList[0]"></book-info>
      </div>
      <div class="recommend">
        <div>热门推荐</div>
      </div>
    </div>
    <div class="pagination" v-if="pageTotal !== 0">
      <el-pagination
              background
              layout="total, prev, pager, next"
              :current-page="query.pageIndex"
              :page-size="query.pageSize"
              :total="pageTotal"
              @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import BookInfo from "../components/BookInfo";
  export default {
    name: "BookSearch",
    components:{
      BookInfo
    },
    data(){
      return{
        query: {
          bookName: '',
          pageIndex: 1,
          pageSize: 10
        },
        pageTotal:0,
        bookList:[]
      }
    },
    methods:{
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getBookInfo();
      },
      getBookInfo(){
        this.$api.get("/book/info/getList", this.query, res => {
          console.log('777', res.data);
          if (res.data.code === 200) {
            this.pageTotal = res.data.data.total;
            this.bookList = res.data.data.records;
          }
        })
      }
    },
    created() {
      this.getBookInfo();
    },
  }
</script>

<style lang="scss" scoped>
.book-search{
  width: 50%;
  margin: 20px auto;
}
  .book-info-content{
    width: 100%;
    .book-list{
      display: inline-block;
      width: 70%;
    }
    .recommend{
      display: inline-block;
      background: #00d1b2;
      width: 30%;
    }
  }
</style>