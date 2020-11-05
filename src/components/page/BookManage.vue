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
        <el-button class="mr10" type="success" icon="el-icon-plus" @click="addBookInfo">添加</el-button>
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
        <el-table-column prop="price" width="65" label="价格"></el-table-column>
        <el-table-column prop="classId" width="55" label="类别"></el-table-column>
        <el-table-column prop="number" width="55" label="剩余数量"></el-table-column>
        <el-table-column label="操作" width="150" align="center">
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
    <el-dialog center :visible.sync="dialogFormVisible" @open="onOpen" @close="onClose" width="40%" :title="dialogFormTitle">
      <div class="update-img">
        <el-upload
                class="upload-demo"
                ref="upload"
                action="http://127.0.0.1:8081/book/info/update/bookImg"
                :file-list="fileList"
                :auto-upload="false"
                :data="myData"
                :on-change="addFile"
                :on-success="uploadSuccess"
                list-type="picture">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </div>
      <el-form ref="elForm" :model="formData"  size="medium" label-width="103px">
        <el-form-item label="书名" prop="bookName">
          <el-input v-model="formData.bookName" placeholder="请输入书名" clearable :style="{width: '90%'}"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="formData.author" placeholder="请输入作者" clearable :style="{width: '90%'}"></el-input>
        </el-form-item>
        <el-form-item label="ISBN" prop="isbn">
          <el-input v-model="formData.isbn" placeholder="请输入ISBN" clearable :style="{width: '90%'}"></el-input>
        </el-form-item>
        <el-form-item label="语言" prop="language">
          <el-input v-model="formData.language" placeholder="请输入语言" clearable :style="{width: '90%'}"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="class">
          <el-select v-model="formData.classId" placeholder="请选择类别" clearable :style="{width: '90%'}">
            <el-option v-for="(item, index) in classOptions" :key="index" :label="item.label" :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="formData.price" placeholder="请输入价格" clearable :style="{width: '90%'}"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input-number v-model="formData.number" placeholder="数量" :step='1' controls-position=right>
          </el-input-number>
        </el-form-item>
        <el-form-item label="出版社" prop="publish">
          <el-input v-model="formData.publish" placeholder="请输入出版社" clearable :style="{width: '90%'}"></el-input>
        </el-form-item>
        <el-form-item label="出版时间" prop="pubDate">
          <el-date-picker v-model="formData.pubDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          :style="{width: '90%'}" placeholder="请输入出版时间" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input v-model="formData.introduction" type="textarea" placeholder="请输入多行文本"
                    :autosize="{minRows: 4, maxRows: 10}" :style="{width: '90%'}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>

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
        formData: {
          bookName: undefined,
          author: undefined,
          isbn: undefined,
          language: undefined,
          classId: undefined,
          price: undefined,
          number: 1,
          publish: undefined,
          pubDate: undefined,
          introduction: undefined,
        },
        classOptions: [{
          "label": "选项一",
          "value": 1
        }, {
          "label": "选项二",
          "value": 2
        }],
        fileList: [],
      };
    },
    computed:{
      myData(){
        return {
          "bookId":this.formData.bookId
        }
      }
    },
    created() {
      this.getData();
      this.getClass();
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
      getClass(){
        this.$api.get("/class/info/all",{},res =>{
          if(res.data.code === 200){
            this.classOptions = res.data.data
          }
        })
      },
     addFile(file,fileList){
       if (fileList.length > 1) {
         console.log("99999999999999999999")
         fileList.splice(0, 1);
       }
      },
      uploadSuccess(response, file, fileList){
        console.log('return',response);
      },
      // 触发搜索按钮
      handleSearch() {
        this.$set(this.query, 'pageIndex', 1);
        this.getData();
      },
      // 删除操作
      handleDelete(index, row) {
        // 二次确认删除
        this.$confirm('此操作将永久删除该图书信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.get('/book/info/del',{
            bookId:row.bookId
          },res => {
            if(res.data.code === 200){
              this.$message({
                type: 'success',
                message: `删除书名为${row.bookName}成功!`
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
      addBookInfo(){
        Object.assign(this.formData, this.$options.data().formData);
        this.dialogFormTitle = '添加';
        this.dialogFormVisible = true;
        this.fileList = []
      },
      // 多选操作
      handleSelectionChange(val) {
        console.log('val:'+val)
        this.multipleSelection = val;
      },
      delAllSelection() {
        let bookIdList = [];
        let bookNameList = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          bookIdList.push(this.multipleSelection[i].bookId);
          bookNameList.push(this.multipleSelection[i].bookName);
        }
        console.log('bookId::',bookIdList.toString());
        this.$confirm(`确定批量删除  ${bookNameList.toString()}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.get('/book/info/delList',{
            'bookIdList':bookIdList.toString()
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
        this.formData = row;
        this.fileList = [];
        console.log("row",row)
        let bookImg = {
          url:row.bookImg
        }
        this.fileList.push(bookImg);
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
        console.log(this.formData);
        this.$confirm(`确定${this.dialogFormTitle}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs.upload.submit();
          this.$api.post('/book/info/saveOrUpdate',this.formData,
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

<style lang="scss">
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
  .update-img{
    width: 60%;
    margin: 0 auto 10px;
    button {
      vertical-align: top;
    }
    .el-upload-list__item{
      height: auto;
      .el-upload-list__item-thumbnail{
        width: 60%;
        height: auto;
      }
    }
  }
</style>
