<template>
  <div class="system-notice">
    <div class="profile-box-head">
      <span class="dot"></span>
      <span style="vertical-align:middle;">系统消息</span>
    </div>
    <el-tabs v-model="message" @tab-click="handleClick">
      <el-tab-pane :label="`未阅读`" name="first">
        <el-table :data="unRead" :show-header="true" style="width: 100%">
          <el-table-column label="内容">
            <template slot-scope="scope">
              <span class="message-title">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" width="180" label="发布时间"></el-table-column>
          <el-table-column width="100" label="确认" center>
            <template slot-scope="scope">
              <el-button type="success" icon="el-icon-check" circle plain size="mini" @click="changeState(scope.row)"></el-button>

            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="`已阅读`" name="second">
        <template v-if="message === 'second'">
          <el-table :data="read" :show-header="true" style="width: 100%">
            <el-table-column label="内容">
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="readDate" width="150" label="发布时间"></el-table-column>
            <!--<el-table-column width="120" label="操作">
              <template slot-scope="scope">
                <el-button type="danger" >删除</el-button>
              </template>
            </el-table-column>-->
          </el-table>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="pagination">
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
  export default {
    name: 'SystemNotice',
    data() {
      return {
        message: 'first',
        query: {
          readerId: this.$store.state.userInfo.readerId,
          state:0,
          pageIndex: 1,
          pageSize: 10
        },
        pageTotal:0,
        unRead: [],
        read: [],
      }
    },
    created() {
      this.getData(0);
    },
    methods: {
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getData();
      },
      handleClick(tab) {
        if(tab.name === 'first'){
          this.$set(this.query, 'state', 0);
        }else if(tab.name === 'second'){
          this.$set(this.query, 'state', 1);
        }
        this.getData();
      },
      getData(){
        this.$api.get("/notice/getByReaderIdAndState",this.query,res =>{
          console.log(res.data)
          if(res.data.code === 200){
            this.pageTotal = res.data.data.total;
            if(this.query.state === 0){
              this.unRead = res.data.data.records;
            }else if(this.query.state === 1){
              this.read = res.data.data.records;
            }
          }
        })
      },
      changeState(data){
        console.log(data)
        this.$api.get('/readNotice/read',{
          noticeId:data.id,
          readerId:this.query.readerId
        },res => {
          console.log(res);
          if(res.data.code === 200){
            this.getData();
          }
          
        });
      }
    },
    computed: {

    }
  }

</script>

<style scoped lang="scss">
  .system-notice{
    margin-top: 20px !important;
    padding: 0 20px 20px!important;
    .profile-box-head {
      height: 50px;
      /*border-bottom: 1px solid #E1E1E1;*/
      line-height: 50px;
      font-size: 18px;
      color:#333;
      overflow: hidden;
    }
    .dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #409eff;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
</style>

