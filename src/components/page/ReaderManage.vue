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
        <el-input v-model="query.name" placeholder="姓名" class="handle-input mr10" clearable></el-input>
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
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="readerId" label="ID" width="60" align="center"></el-table-column>
        <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <el-image
                    class="table-td-thumb"
                    :src="scope.row.img"
                    @click=""
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="sex" width="55" label="性别"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="birth" label="生日"></el-table-column>
        <el-table-column prop="registerDate" label="注册时间"></el-table-column>
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
    <el-dialog @open="onOpen" @close="onClose" :title="dialogFormTitle" :visible.sync="dialogFormVisible" center width="30%" v-dialogDrag>
      <el-form ref="elForm" size="medium" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerData.username" placeholder="请输入用户名" clearable
                    prefix-icon='el-icon-notebook-2' ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="registerData.name" placeholder="姓名" clearable prefix-icon='el-icon-user'
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerData.password" placeholder="请输入密码" clearable prefix-icon='el-icon-lock'
                    show-password ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="registerData.sex" size="medium">
            <el-radio v-for="(item, index) in sexOptions" :key="index" :label="item.value"
                      :disabled="item.disabled">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="registerData.phone" placeholder="请输入电话" clearable prefix-icon='el-icon-phone'
          ></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-date-picker style="width: 100%;" v-model="registerData.birth" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          placeholder="请选择生日" clearable></el-date-picker>
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
  import {fetchData} from '../../api/index';

  export default {
    name: 'basetable',
    data() {
      return {
        query: {
          name: '',
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
          username: '',
          name: undefined,
          password: undefined,
          sex: undefined,
          phone: undefined,
          birth: undefined
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
        this.$api.get("/reader/getList", this.query, res => {
          // console.log(res.data);
          if(res.data.code === 200){
            this.tableData = res.data.data.readerInfoList;
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
                this.$message.success(`${this.dialogFormTitle}!成功`);
                this.getData();
              }else {
                this.$message.error(`${this.dialogFormTitle}失败!${res.data.data}`);
              }
            });
          this.close();
        }).catch(() => {
        });
      }
    }
  };
</script>

<style  lang="scss">
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

  .table-td-thumb {
    display: block;
    margin: auto;
    width: 50px;
    img{
      width: 50px;
    }
  }
  
</style>
