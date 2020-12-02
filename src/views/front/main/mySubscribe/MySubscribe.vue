<template>
  <div class="my-subscribe">
    <el-tabs tab-position="left" @tab-click="handleClick" v-model="activeName">
      <el-tab-pane label="未完成" name="first">
        <div class="book-list">
          <div v-for="item in lendList">
            <book-info class="book-info"  :key="item.bookInfo.isbn" :bookInfo="item.bookInfo" :noStar = true></book-info>
            <div class="steps">
              <el-steps direction="vertical" :active="1">
                <el-step title="借阅" :description="item.lendDate"></el-step>
                <el-step title="待审批"></el-step>
              </el-steps>
            </div>
          </div>
          <p v-if="pageTotal === 0">暂无数据</p>
          <div class="pagination" v-else>
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
      <el-tab-pane label="已借阅" name="second">
        <div class="book-list">
          <div v-for="item in lendList">
            <book-info class="book-info"  :key="item.bookInfo.isbn" :bookInfo="item.bookInfo" :noStar = true></book-info>
            <div class="steps" style="height: 200px">
              <el-steps direction="vertical" :active="2">
                <el-step title="借阅" :description="item.lendDate"></el-step>
                <el-step title="审批" :description="item.approvalDate"></el-step>
                <el-step title="归还" ></el-step>
              </el-steps>
            </div>
          </div>
          <p v-if="pageTotal === 0">暂无数据</p>
          <div class="pagination" v-else>
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
      <el-tab-pane label="已归还" name="third">
        <div class="book-list">
          <div v-for="item in lendList">
            <book-info class="book-info"  :key="item.bookInfo.isbn" :bookInfo="item.bookInfo" :noStar = true></book-info>
            <div class="steps" style="height: 200px">
              <el-steps direction="vertical" :active="3">
                <el-step title="借阅" :description="item.lendDate"></el-step>
                <el-step title="审批" :description="item.approvalDate"></el-step>
                <el-step title="归还" :description="item.backDate"></el-step>
              </el-steps>
            </div>
          </div>
          <p v-if="pageTotal === 0">暂无数据</p>
          <div class="pagination" v-else>
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
      /*paginationIsShow: {
        get() {
          return this.pageTotal !== 0 || this.lendList.bookInfo.length >= 10;
        }
      }*/
    },
    data(){
      return{
        query: {
          pageIndex: 1,
          pageSize: 10,
          readerId:this.$store.state.userInfo.readerId,
          state:0
        },
        pageTotal: 0,
        lendList: [],
        activeName:'first'
      }
    },
    methods:{
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getBookInfo();
      },
      handleClick(tab) {
        this.getBookInfo(tab.index)
      },
      getBookInfo(state) {
        if(state !== null){
          this.$set(this.query, 'state', state);
        }
        console.log('state',state)
        this.$api.get("/subscribe/getListByState", this.query, res => {
          if (res.data.code === 200) {
            this.pageTotal = res.data.data.total;
            this.lendList = res.data.data.records;
            console.log('bookInfo',res.data.data);
          }
        })
      },
    },
    mounted(){
      this.getBookInfo(0);
    }
  }
</script>

<style lang="scss" scoped>
  .my-subscribe{
    margin-top: 20px;
    padding-top: 20px !important;
    .book-list {
      width: 100%;
      min-height: 300px;
      margin-left: 20px;
      .book-info{
        width: 80%;
        display: inline-block;
      }
      .steps{
        display: inline-block;
        vertical-align: top;
        height: 120px;
        margin-left: 30px;
        /deep/.el-step__description{
          white-space:nowrap
        }
      }
      p{
        text-align: center;
        line-height: 300px;
        color: #8c939d;
      }
      .pagination{
        margin-right: 20px;
      }
    }
  }

</style>