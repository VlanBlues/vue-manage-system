<template>
  <div>
    <div class="container">
      <el-table
              :data="tableData"
              border
              stripe
              class="table"
              ref="multipleTable"
              header-cell-class-name="table-header"
      >
        <el-table-column prop="lendId" label="ID" width="60" align="center"></el-table-column>
        <el-table-column prop="bookInfo.bookName" label="书名"></el-table-column>
        <el-table-column prop="readerInfo.name" label="借阅人"></el-table-column>
        <el-table-column prop="lendDate" label="借阅时间" sortable></el-table-column>
        <el-table-column prop="approvalDate" label="审批时间" sortable></el-table-column>
        <el-table-column prop="state" width="100" label="状态" :formatter="formatState"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
                    type="text"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
            >归还
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>

  export default {
    name: 'approval',
    data() {
      return {
        query: {
          pageIndex: 1,
          pageSize: 10,
          state:1
        },
        tableData: [],
        pageTotal: 0,
      };
    },
    created() {
      this.getBookInfo();
    },
    methods: {
      getBookInfo() {
        this.$api.get("/subscribe/getListByState", this.query, res => {
          if (res.data.code === 200) {
            this.pageTotal = res.data.data.total;
            this.tableData = res.data.data.records;
          }
        })
      },
      formatState(row, column){
        if(row.state === 0){
          return '未审批'
        }else if(row.state === 1){
          return '未归还'
        }else if(row.state === 2){
          return '已归还'
        }
        
      },
      // 编辑操作
      handleEdit(index, row) {
        this.$confirm(`${row.readerInfo.name}归还图书《${row.bookInfo.bookName}》`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post('/subscribe/saveOrUpdate',{
            lendId:row.lendId,
            lendDate:row.lendDate,
            approvalDate:row.approvalDate,
            state:2
          },res => {
            if(res.data.code === 200){
              this.$message({
                type: 'success',
                message: '借阅成功!'
              });
              this.getBookInfo();
            }
          });
        });
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getBookInfo();
      },
    }
  };
</script>

<style  lang="scss">

  .handle-select {
    width: 120px;
  }
  .el-table th.gutter {
    display: table-cell !important
  }
  .handle-input {
    width: 300px;
    display: inline-block;
  }

  .table {
    width: 100%;
    font-size: 14px;
  }

  .red {
    color: #ff0000;
  }

  .mr10 {
    margin-right: 10px;
  }

  .table-td-thumb {
    display: block;
    margin: auto;
    width: 50px;
    img{
      width: 50px;
    }
  }
  
</style>
