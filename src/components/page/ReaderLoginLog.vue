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
              :default-sort = "{prop: 'lendDate', order: 'descending'}"
      >
        <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
        <el-table-column prop="readerId" label="用户ID"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="ip" label="ip地址"></el-table-column>
        <el-table-column prop="date" label="时间" sortable></el-table-column>
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
    name: 'loginLog',
    data() {
      return {
        query: {
          pageIndex: 1,
          pageSize: 10,
        },
        tableData: [],
        pageTotal: 0,
      };
    },
    created() {
      this.getloginLog();
    },
    methods: {
      getloginLog() {
        this.$api.get("/log/getAll", this.query, res => {
          if (res.data.code === 200) {
            this.pageTotal = res.data.data.total;
            this.tableData = res.data.data.records;
          }
        })
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getloginLog();
      },
    },
    activated(){
      this.getloginLog();
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
