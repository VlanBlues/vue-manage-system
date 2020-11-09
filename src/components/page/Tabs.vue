<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 公告管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-button  class="mr10" type="primary" icon="el-icon-plus" @click="addNotice">添加</el-button>
      
      <el-tabs v-model="message" @tab-click="handleClick">
        <el-tab-pane :label="`未发布`" name="first">
          <el-table :data="unpublished" :show-header="true" style="width: 100%">
            <el-table-column label="内容">
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createDate" width="180" label="创建时间"></el-table-column>
            <el-table-column width="150" label="操作">
              <template slot-scope="scope">
                <el-button type="success" size="small" @click="handlePublished(scope.row)">发布</el-button>
                <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">

          </div>
        </el-tab-pane>
        <el-tab-pane :label="`已发布`" name="second">
          <template v-if="message === 'second'">
            <el-table :data="published" :show-header="true" style="width: 100%">
              <el-table-column label="内容">
                <template slot-scope="scope">
                  <span class="message-title">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="publishedDate" width="150" label="发布时间"></el-table-column>
              <el-table-column width="120" label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane :label="`回收站`" name="third">
          <template v-if="message === 'third'">
            <el-table :data="recycle" :show-header="true" style="width: 100%">
              <el-table-column label="内容">
                <template slot-scope="scope">
                  <span class="message-title">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="publishedDate" width="150" label="发布时间"></el-table-column>
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
    <el-dialog center :visible.sync="dialogFormVisible" title="添加公告">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="103px">
        <el-form-item label="内容" prop="title">
          <el-input v-model="formData.title" type="textarea" placeholder="请输入公告内容"
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
    name: 'tabs',
    data() {
      return {
        message: 'first',
        showHeader: false,
        dialogFormVisible:false,
        formData: {
          title:'',
          date:'',
          state:0
        },
        query: {
          state: 0,
          pageIndex: 1,
          pageSize: 10
        },
        pageTotal:0,
        rules: {
          title: [{
            required: true,
            message: '请输入公告内容',
            trigger: 'blur'
          }],
        },
        unpublished: [],
        published: [],
        recycle: []
      }
    },
    created() {
      this.getData();
    },
    methods: {
      handlePublished(row) {
        let dataQuery = JSON.parse(JSON.stringify(row));
        dataQuery.state = 1;
        this.$confirm(`是否发布(${row.title})`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.changeState(dataQuery,'发布');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      handleDel(row) {
        let dataQuery = JSON.parse(JSON.stringify(row));
        dataQuery.state = -1;
        this.$confirm(`是否删除(${row.title})`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.changeState(dataQuery,'删除');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      addNotice(){
        this.formData.title = '';
        this.dialogFormVisible = true;
      },
      close() {
        this.dialogFormVisible = false;
      },
      handelConfirm() {
        this.$refs['elForm'].validate(valid => {
          if (!valid) return;
          this.$api.post('/notice/add',this.formData,res => {
            if(res.data.code === 200){
              this.$message.success(`添加成功!`);
              this.getData();
              this.close();
            }else {
              this.$message.error(`添加失败!`);
            }
          });
        })
      },
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
        }else {
          this.$set(this.query, 'state', -1);
        }
        this.getData();
      },
      getData(){
        this.$api.get("/notice/state",this.query,res =>{
          if(res.data.code === 200){
            this.pageTotal = res.data.data.total;
            if(this.query.state === 0){
              this.unpublished = res.data.data.records;
            }else if(this.query.state === 1){
              this.published = res.data.data.records;
            }else {
              this.recycle = res.data.data.records;
            }
          }
        })
      },
      changeState(dataQuery,title){
        this.$api.post('/notice/changeState',dataQuery,res => {
          console.log(res);
          if(res.data.code === 200){
            this.$message.success(`${title}成功！`);
          }else {
            this.$message.error(`${title}失败！`);
          }
          this.getData();
        });
      }
    },
    computed: {
      
    }
  }

</script>

<style>
  .message-title {
    cursor: pointer;
  }

  .handle-row {
    margin-top: 30px;
  }
</style>

