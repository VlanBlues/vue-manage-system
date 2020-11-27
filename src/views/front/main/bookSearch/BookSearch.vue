<template>
  <div>
    <div class="book-search">
      <el-input placeholder="请输入内容" v-model="query.bookName" class="input-with-select" prefix-icon="el-icon-notebook-2"
                size="medium" clearable @keyup.enter.native="search">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="book-info-content">
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
      <div class="recommend">
        <p>热门推荐</p>
        <div class="img-list">
          <el-row :gutter="10">
            <el-col :span="8" v-for="item in bookRecommend" :key="item.isbn">
              <img :src="item.bookImg">
              <p>{{item.bookName}}</p>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import BookInfo from "../components/BookInfo";

  export default {
    name: "BookSearch",
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
    data() {
      return {
        query: {
          bookName: '',
          pageIndex: 1,
          pageSize: 10,
          readerId:this.$route.query.readerId
        },
        pageTotal: 0,
        bookList: [],
        bookRecommend:[]
      }
    },
    methods: {
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getBookInfo();
      },
      getBookInfo() {
        this.$api.get("/book/info/getList", this.query, res => {
          if (res.data.code === 200) {
            this.pageTotal = res.data.data.total;
            this.bookList = res.data.data.records;
            console.log('bookInfo',res.data.data);
          }
        })
      },
      getBookRecommend() {
        this.$api.get("/book/info/recommend", {}, res => {
          if (res.data.code === 200) {
            this.bookRecommend = res.data.data;
            console.log('bookRecommend',res.data.data);
          }
        })
      },
      search() {
        this.$set(this.query, 'pageIndex', 1);
        this.getBookInfo();
      },
    },
    created() {
      // this.getBookInfo();
      this.getBookRecommend();
    },
    activated(){
      this.getBookInfo();
    },
    watch:{
      /*'query.bookName': {
        handler(newName, oldName) {
          console.log('newName',newName);
          console.log('oldName',oldName);
        },
        immediate: true,
        // deep: true
      }*/
    }
  }
</script>

<style lang="scss" scoped>
  .book-search {
    width: 50%;
    margin: 20px auto;
    padding-top: 20px;
  }

  .book-info-content {
    width: 100%;
    .book-list {
      display: inline-block;
      width: 70%;
      min-height: 300px;
      p{
        text-align: center;
        line-height: 300px;
        color: #8c939d;
      }
    }
    .recommend {
      display: inline-block;
      margin-left: 2%;
      width: 28%;
      vertical-align: top;
      .img-list {
        margin-top: 10px;
        /deep/.el-col{
          height: 154px;
        }
        img {
          width: 100%;
        }
        p {
          font-size: 10px;
          color: #3377aa;
          text-align: center;
          margin-bottom: 10px;
        }
      }
    }
    .pagination {
      text-align: left !important;
    }
  }
</style>