<template>
  <div class="my-subscribe">
    <el-tabs tab-position="left">
      <el-tab-pane label="未完成">
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
      </el-tab-pane>
      <el-tab-pane label="已借阅">配置管理</el-tab-pane>
      <el-tab-pane label="已归还">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import BookInfo from "../components/BookInfo";
  export default {
    name: "MySubscribe",
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
          readerId:this.$store.state.userInfo.readerId
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
  .my-subscribe{
    .book-list {
      width: 80%;
      min-height: 300px;
      margin-left: 20px;
      p{
        text-align: center;
        line-height: 300px;
        color: #8c939d;
      }
    }
  }

</style>