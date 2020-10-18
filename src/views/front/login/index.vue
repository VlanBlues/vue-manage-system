<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">图书借阅</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                    <el-button type="success" @click="dialogFormVisible = true" class="register" >注册</el-button>
                </div>
            </el-form>
        </div>
        <div>
            <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="快速注册" :visible.sync="dialogFormVisible" center width="30%" v-dialogDrag>
                <el-form ref="elForm" :model="registerData" :rules="rules" size="medium" label-width="70px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="registerData.username" placeholder="请输入用户名" clearable
                                  prefix-icon='el-icon-notebook-2' ></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="acount">
                        <el-input v-model="registerData.acount" placeholder="账号" clearable prefix-icon='el-icon-user'
                                  ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input v-model="registerData.pass" placeholder="请输入密码" clearable prefix-icon='el-icon-lock'
                                  show-password ></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="registerData.sex" size="medium">
                            <el-radio v-for="(item, index) in sexOptions" :key="index" :label="item.value"
                                      :disabled="item.disabled">{{item.label}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="电话" prop="tel">
                        <el-input v-model="registerData.tel" placeholder="请输入电话" clearable prefix-icon='el-icon-phone'
                                  ></el-input>
                    </el-form-item>
                    <el-form-item label="生日" prop="birthday">
                        <el-date-picker v-model="registerData.birthday" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
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
    data: function() {
        return {
            dialogFormVisible: false,
            param: {
                username: 'admin',
                password: '123123',
            },
            registerData: {
                username: undefined,
                acount: undefined,
                pass: undefined,
                sex: "男",
                tel: undefined,
                birthday: "2020-10-17",
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
                acount: [{
                    required: true,
                    message: '账号',
                    trigger: 'blur'
                }],
                pass: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }],
                sex: [{
                    required: true,
                    message: '性别不能为空',
                    trigger: 'change'
                }],
                tel: [{
                    required: true,
                    message: '请输入电话',
                    trigger: 'blur'
                }],
                birthday: [{
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
            this.$refs.login.validate(valid => {
                console.log(valid);
                if (valid) {
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        onOpen() {},
        onClose() {
            this.$refs['elForm'].resetFields();
            console.log(66666)
        },
        close() {
            this.$emit('update:visible', false);
            this.dialogFormVisible = false;
        },
        handelConfirm() {
            this.$refs['elForm'].validate(valid => {
                if (!valid) return;
                this.close()
            });
            console.log(this.registerData)
        },
    },
};
</script>

<style scoped lang="scss">
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../../assets/img/login-bg.jpg);
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
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
    button{
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
