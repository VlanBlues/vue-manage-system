<template>
  <div>
    <div class="book-list">
      <book-info v-for="item in bookList" :key="item.isbn" :bookInfo="item"></book-info>
      <p v-show="pageTotal === 0">暂无数据</p>
      <div class="pagination" v-if="paginationIsShow">
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
  </div>
</template>

<script>
  import BookInfo from "../components/BookInfo";
  export default {
    name: "bookCollection",
    components: {
      BookInfo
    },
    computed: {
      paginationIsShow: {
        get() {
          return this.pageTotal !== 0 || this.bookList.length >= 10;
        }
      }
    },
    data(){
      return{
        query: {
          pageIndex: 1,
          pageSize: 10,
          readerId:sessionStorage.getItem('readerId')
        },
        pageTotal: 0,
        bookList: [],
      }
    },
    methods:{
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getBookInfo();
      },
      getBookInfo() {
        console.log('this.query',this.query);
        this.$api.get("/book/info/getListByReaderId", this.query, res => {
          if (res.data.code === 200) {
            this.pageTotal = res.data.data.total;
            this.bookList = res.data.data.records;
            console.log('bookInfo',res.data.data);
          }
        })
      },
    },
    mounted(){
      this.getBookInfo();
    }
  }
</script>

<style lang="scss" scoped>
  .book-list {
    width: 80%;
    margin: 20px auto 0;
    height: 100%;
    min-height: 300px;
    padding-top: 10px !important;
    padding-bottom: 20px !important;
    p{
      text-align: center;
      line-height: 300px;
      color: #8c939d;
    }
  }
</style>