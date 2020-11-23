<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">图书借阅</div>
      <el-form :model="loginParam" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="loginParam.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
                  type="password"
                  placeholder="password"
                  v-model="loginParam.password"
                  @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button type="success" @click="dialogFormVisible = true" class="register">注册</el-button>
        </div>
      </el-form>
    </div>
    <div>
      <el-dialog @open="onOpen" @close="onClose" title="快速注册"
                 :visible.sync="dialogFormVisible" center width="30%" v-dialogDrag>
        <el-form ref="elForm" :model="registerData" :rules="rules" size="medium" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registerData.username" placeholder="请输入用户名" clearable
                      prefix-icon='el-icon-notebook-2'></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="registerData.name" placeholder="姓名" clearable prefix-icon='el-icon-user'
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerData.password" placeholder="请输入密码" clearable prefix-icon='el-icon-lock'
                      show-password></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="registerData.sex" size="medium">
              <el-radio v-for="(item, index) in sexOptions" :key="index" :label="item.value"
                        :disabled="item.disabled">{{item.label}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="registerData.phone" placeholder="请输入电话" clearable prefix-icon='el-icon-phone'
            ></el-input>
          </el-form-item>
          <el-form-item label="生日" prop="birth">
            <el-date-picker style="width: 100%;" v-model="registerData.birth" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择生日" clearable></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="handelConfirm">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
        loginParam: {
          username: 'zhanghua',
          password: '123456',
        },
        registerData: {
          username: '',
          name: undefined,
          password: undefined,
          sex: '男',
          phone: undefined,
          birth: undefined,
          readerId: undefined,
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          sex: [{
            required: true,
            message: '性别不能为空',
            trigger: 'change'
          }],
          phone: [{
            required: true,
            message: '请输入电话',
            trigger: 'blur'
          }],
          birth: [{
            required: true,
            message: '请选择生日',
            trigger: 'change'
          }],
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
    methods: {
      submitForm() {
        this.$refs['login'].validate(valid => {
          if(valid){
            this.$api.post('/reader/login',this.loginParam,res => {
              console.log('res:',res.data);
              if(res.data.code === 200){
                this.$message.success(`登录成功!`);
                this.$router.push('/main');
              }else {
                this.$message.error(`登录失败，${res.data.data}`);
              }
            })
          }
        });
        
      },
      onOpen() {
      },
      onClose() {
        this.$refs['elForm'].resetFields();
      },
      close() {
        this.dialogFormVisible = false;
      },
      handelConfirm() {
        console.log(this.registerData);
        this.$confirm(`确定注册?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post('/reader/updateOrSave',this.registerData,
            res =>{
              console.log('res:',res.data);
              if(res.data.code === 200){
                this.$message.success(`注册成功!`);
                this.close();
              }else {
                this.$message.error(`注册失败，${res.data.data}`);
              }
            });
        }).catch(() => {
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../../assets/img/back.jpg);
    background-size: 100%;
  }

  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(16, 22, 26, 0.1);
    overflow: hidden;
  }

  .ms-content {
    padding: 30px 30px;
  }

  .login-btn {
    text-align: center;
    button {
      width: 100%;
      height: 36px;
      margin-bottom: 10px;
      margin-left: 0;
    }

  }

  .login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
  }
</style>
