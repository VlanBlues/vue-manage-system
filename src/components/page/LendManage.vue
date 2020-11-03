<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-button
                type="primary"
                icon="el-icon-delete"
                class="handle-del mr10"
                @click="delAllSelection"
        >批量删除
        </el-button>
        <el-button class="mr10" type="success" icon="el-icon-plus" @click="addReader">添加</el-button>
        <el-input v-model="query.bookName" placeholder="书名" class="handle-input mr10" clearable></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
              :data="tableData"
              border
              class="table"
              ref="multipleTable"
              header-cell-class-name="table-header"
              @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="图片" style="width: 30%">
                <span><img :src="props.row.bookImg" style="width: 200px"/> </span>
              </el-form-item>
              <el-form-item label="简介" style="width: 70%">
                <span>{{ props.row.introduction }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="bookId" label="ID" width="60" align="center"></el-table-column>
        <el-table-column prop="bookName" label="书名"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="publish" label="出版社"></el-table-column>
        <el-table-column prop="isbn"  label="ISBN"></el-table-column>
        <el-table-column prop="language" width="55" label="语言"></el-table-column>
        <el-table-column prop="price" width="55" label="价格"></el-table-column>
        <el-table-column prop="classId" width="55" label="类别"></el-table-column>
        <el-table-column prop="number" width="55" label="剩余数量"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
                    type="text"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
            <el-button
                    type="text"
                    icon="el-icon-delete"
                    class="red"
                    @click="handleDelete(scope.$index, scope.row)"
            >删除
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

    <!--添加弹出框-->
  </div>
</template>

<script>

  export default {
    name: 'LendManage',
    data() {
      return {
        query: {
          bookName: '',
          pageIndex: 1,
          pageSize: 10
        },
        dialogFormVisible:false,
        dialogFormTitle:'添加',
        tableData: [],
        multipleSelection: [],
        pageTotal: 0,
        form: {},
        registerData: {
          
        },
        sexOptions: [{
          "label": "男",
          "value": "男"
        }, {
          "label": "女",
          "value": "女"
        }],
      };
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        this.$api.get("/book/info/getList", this.query, res => {
          console.log('777',res.data);
          if(res.data.code === 200){
            this.tableData = res.data.data.records;
            this.pageTotal = res.data.data.total;
          }
        })
      },
      // 触发搜索按钮
      handleSearch() {
        this.$set(this.query, 'pageIndex', 1);
        this.getData();
      },
      // 删除操作
      handleDelete(index, row) {
        // 二次确认删除
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.get('/reader/del',{
            readerId:row.readerId
          },res => {
            if(res.data.code === 200){
              this.$message({
                type: 'success',
                message: `删除ID为${row.readerId}成功!`
              });
              this.getData();
            }else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      addReader(){
        Object.assign(this.registerData, this.$options.data().registerData);
        this.dialogFormTitle = '添加';
        this.dialogFormVisible = true;
      },
      // 多选操作
      handleSelectionChange(val) {
        console.log('val:'+val)
        this.multipleSelection = val;
      },
      delAllSelection() {
        let readerIdList = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          readerIdList.push(this.multipleSelection[i].readerId)
        }
        console.log('reader::',readerIdList.toString())
        this.$confirm('确定批量删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.get('/reader/delList',{
            'readerIdList':readerIdList.toString()
          },res => {
            if(res.data.code === 200){
              this.$message({
                type: 'success',
                message: `删除成功!`
              });
              this.getData();
            }else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        this.multipleSelection = [];
      },
      // 编辑操作
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.registerData = row;
        this.dialogFormTitle = '编辑';
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getData();
      },
      onOpen() {},
      onClose() {
        this.$refs['elForm'].resetFields();
        console.log(66666)
      },
      close() {
        this.dialogFormVisible = false;
      },
      handelConfirm() {
        // this.$refs['elForm'].validate(valid => {
        //   console.log('valid:'+JSON.stringify(valid))
        //   if (!valid) return;
        //   this.close()
        // });
        console.log(this.registerData);
        this.$confirm(`确定${this.dialogFormTitle}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post('/reader/updateOrSave',this.registerData,
            res =>{
              if(res.data.code === 200){
                this.$message.success(`${this.dialogFormTitle}成功!`);
                this.getData();
              }
            });
          this.close();
        }).catch(() => {
        });
      }
    }
  };
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

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

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
  .el-image__inner{
    width: 200px;
  }
</style>
