<template>
  <div class="personal-info">
    <div class="profile-box-head">
      <span class="dot"></span>
      <span style="vertical-align:middle;">用户信息</span>
      <div class="profile-box-head-btn">
        <div v-if="!isEdit">
          <el-button type="primary" round @click="isEdit = !isEdit">编辑</el-button>
        </div>
        <div v-else>
          <el-button type="primary" round @click="handelConfirm">保存</el-button>
          <el-button round @click="cancelEdit">取消</el-button>
        </div>
      </div>
    </div>
    <el-row>
      <el-col :span="7">
        <div class="crop-demo">
          <el-avatar shape="square" :size="160" fit="contain" :src="cropImg"></el-avatar>
          <div class="crop-demo-btn" v-show="isEdit">选择图片
            <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
          </div>
        </div>
        <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
          <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage"
                       style="width:100%;height:300px;"></vue-cropper>
          <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelCrop">取 消</el-button>
                    <el-button type="primary" @click="finish">确 定</el-button>
                </span>
        </el-dialog>
      </el-col>
      <el-col :span="17" class="user-info" :class="{'input-border':!isEdit}">
        <el-form ref="elForm" size="medium" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="readerDate.username" placeholder="请输入用户名" 
                      prefix-icon='el-icon-notebook-2' ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="readerDate.name" placeholder="姓名"  prefix-icon='el-icon-user'
            ></el-input>
          </el-form-item>
          <!--<el-form-item label="密码" prop="password">
            <el-input v-model="readerDate.password" placeholder="请输入密码"  prefix-icon='el-icon-lock'
                      show-password ></el-input>
          </el-form-item>-->
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="readerDate.sex" size="medium" style="margin-left: 10px">
              <el-radio v-for="(item, index) in sexOptions" :key="index" :label="item.value"
                        :disabled="true">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="readerDate.phone" placeholder="请输入电话"  prefix-icon='el-icon-phone'
            ></el-input>
          </el-form-item>
          <el-form-item label="生日" prop="birth">
            <el-date-picker style="width: 100%;" v-model="readerDate.birth" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            placeholder="请选择生日" ></el-date-picker>
          </el-form-item>
        </el-form>
        <el-button v-show="isEdit" class="chang-pass-btn" type="primary" @click="changePass">修改密码</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropperjs';
  export default {
    name: "PersonalInfo",
    data: function () {
      return {
        defaultSrc: JSON.parse(sessionStorage.getItem("userInfo")).img,
        fileList: [],
        imgSrc: '',
        cropImg: '',
        dialogVisible: false,
        isEdit: false,
        readerDate: {
          username: '',
          name: undefined,
          password: undefined,
          sex: undefined,
          phone: undefined,
          birth: undefined,
          readerId:undefined,
        },
        sexOptions: [{
          "label": "男",
          "value": "男"
        }, {
          "label": "女",
          "value": "女"
        }],
      }
    },
    components: {
      VueCropper
    },
    methods: {
      changePass(){
        
      },
      cancelEdit(){
        this.isEdit = !this.isEdit;
        this.getReaderInfo()
      },
      handelConfirm() {
        console.log(this.readerDate);
        this.$confirm(`确定${this.dialogFormTitle}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post('/reader/updateOrSave',this.readerDate,
            res =>{
              if(res.data.code === 200){
                this.$message.success(`${this.dialogFormTitle}成功!`);
                this.close();
              }else {
                this.$message.error(`${this.dialogFormTitle}失败${res.data.data}`);
              }
              this.getData();
            });
        }).catch(() => {
        });
      },
      setImage(e) {
        const file = e.target.files[0];
        if (!file.type.includes('image/')) {
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          this.dialogVisible = true;
          this.imgSrc = event.target.result;
          this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);

      },
      cropImage() {
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      },
      cancelCrop() {
        this.dialogVisible = false;
        this.cropImg = this.defaultSrc;
      },
      finish() {
        this.dialogVisible = false;
        let canvas = this.$refs.cropper.getCroppedCanvas();
        canvas.toBlob((blob)=>{
          let param = new FormData();  // 创建form对象
          param.append('file', blob,"a.png");  // 通过append向form对象添加数据
          param.append('readerId', sessionStorage.getItem("readerId"));
          this.$api.post("/reader/update/img",param, res => {
            if(res.data.code === 200){
              this.$message.success(res.data.data);
              this.getReaderInfo();
              location.reload();
            }else {
              this.$message.error(res.data.data);
            }
          })
        });
      },
      // 将base64的图片转换为file文件
      convertBase64UrlToBlob(urlData) {
        let bytes = window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        let ab = new ArrayBuffer(bytes.length);
        let ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
      },
      imageuploaded(res) {
        console.log(res)
      },
      handleError() {
        this.$notify.error({
          title: '上传失败',
          message: '图片上传接口上传失败，可更改为自己的服务器接口'
        });
      },
      getReaderInfo(){
        this.$api.post('/reader/getByReaderId',{
          readerId:sessionStorage.getItem("readerId")
        },res =>{
          if(res.data.code === 200){
            console.log('dataaaa',res.data.data)
            this.readerDate = []
            this.readerDate = res.data.data
            sessionStorage.setItem('userInfo',JSON.stringify(this.readerDate));
          }
        })
      }
    },
    created() {
      this.cropImg = this.defaultSrc;
      this.getReaderInfo()
    }
  }
</script>

<style lang="scss" scoped>
.personal-info{
  background-color: #fcfcfc;
  width: 90%;
  margin: 20px auto 0;
  padding: 0 40px 20px !important;
  .profile-box-head {
    height: 50px;
    border-bottom: 1px solid #E1E1E1;
    line-height: 50px;
    font-size: 18px;
    color:#333;
    overflow: hidden;
  }
  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #0BD;
    margin-right: 10px;
    vertical-align: middle;
  }
  .profile-box-head-btn{
    float: right;
    display: flex
  }
  /deep/.el-row{
    margin-top: 40px;
    .user-info{
      border-left: 1px dashed #E1E1E1;
      .chang-pass-btn{
        margin-left: 20px;
      }
    }
    .input-border{
      input{
        border: none;
        pointer-events: none;
      }
    }
  }
  .crop-demo-btn {
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin-left: 40px;
    margin-top: 10px;
    background-color: #409eff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .crop-input {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }
}
</style>