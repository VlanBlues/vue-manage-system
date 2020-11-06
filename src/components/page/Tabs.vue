<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 公告管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-button  class="mr10" type="primary" icon="el-icon-plus" @click="addNotice">添加</el-button>
      
      <el-tabs v-model="message">
        <el-tab-pane :label="`未发布(${unRelease.length})`" name="first">
          <el-table :data="unRelease" :show-header="false" style="width: 100%">
            <el-table-column>
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" width="180"></el-table-column>
            <el-table-column width="150">
              <template slot-scope="scope">
                <el-button type="success" size="small" @click="handleRelease(scope.row)">发布</el-button>
                <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">

          </div>
        </el-tab-pane>
        <el-tab-pane :label="`已发布(${read.length})`" name="second">
          <template v-if="message === 'second'">
            <el-table :data="read" :show-header="false" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="150"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="danger">删除全部</el-button>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
          <template v-if="message === 'third'">
            <el-table :data="recycle" :show-header="false" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="150"></el-table-column>
            </el-table>
            <div class="handle-row">

            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog center @open="onOpen" @close="onClose" :visible.sync="dialogFormVisible" title="添加公告">
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
          title: undefined,
        },
        rules: {
          title: [{
            required: true,
            message: '请输入公告内容',
            trigger: 'blur'
          }],
        },
        unRelease: [{
          date: '2018-04-19 20:00:00',
          title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
        }, {
          date: '2018-04-19 21:00:00',
          title: '今晚12点整发大红包，先到先得',
        }],
        read: [{
          date: '2018-04-19 20:00:00',
          title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        }],
        recycle: [{
          date: '2018-04-19 20:00:00',
          title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        }]
      }
    },
    methods: {
      handleRelease(row) {
        this.$confirm(`是否发布(${row.title})`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '发布成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      handleDel(row) {
        this.$confirm(`是否删除(${row.title})`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      addNotice(){
        this.dialogFormVisible = true;
      },
      onOpen() {},
      onClose() {
        this.$refs['elForm'].resetFields()
      },
      close() {
        this.$emit('update:visible', false)
      },
      handelConfirm() {
        this.$refs['elForm'].validate(valid => {
          if (!valid) return
          this.close()
        })
      },
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

