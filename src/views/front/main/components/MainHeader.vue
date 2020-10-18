<template>
    <div class="header">
        <div style="position: relative">
            <div class="logo">
                <img src="@/assets/img/book_logo.png" />
            </div>
            <div class="header-right">
                <el-row :gutter="40">
                    <el-col :span="10">
                        <div>
                            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" size="medium">
                                <el-select v-model="select" slot="prepend" placeholder="请选择">
                                    <el-option label="餐厅名" value="1"></el-option>
                                    <el-option label="订单号" value="2"></el-option>
                                    <el-option label="用户电话" value="3"></el-option>
                                </el-select>
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="my-box">
                            <span>我的订阅</span>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="my-box">
                            <span>我的收藏</span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            我的头像
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'main_header',
    data() {
        return {
            collapse: false,
            fullscreen: false,
            name: 'linxin',
            message: 2,
            input3: '',
            select: ''
        };
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username');
                this.$router.push('/login');
            }
        },
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style lang="scss">
.header {
    transition: all .2s linear;
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    padding: 0 350px;
    background-color: #ffffff;
    border-bottom: #1f2f3d29  solid 1px;
    .logo {
        display: inline-block;
        vertical-align: bottom;
        cursor: pointer;
        img{
            width: 70px;
        };
    };

    .header-right{
        display: inline-block;
        padding-left: 30px;
        width: calc(100% - 100px);

        .el-row {
            margin-bottom: 5px;
            font-size: 16px;
            .el-input-group{
                height: 45px;
            }
            .el-input__inner{
                height: 45px;
                line-height: 45px;
                font-size: 16px;
            }
            .input-with-select .el-input-group__prepend {
                background-color: #fff;
                width: 60px;
            }
            .el-input-group__append{
                font-size: 20px;
            }
            .my-box{
                height: 45px;
                width: 64px;
                box-sizing: border-box;
                border-bottom: 0 solid #9254c4;
                span{
                    line-height: 45px;
                }
                &:hover{
                    transition: all .2s linear;
                    border-bottom: 1px solid #07c4a8;
                    cursor: pointer;
                    span{
                        transition: all .4s linear;
                        color: #07c4a8;
                    }
                }
            }

        }
    }

}
</style>
