<template>
  <div>
    <div class="container">
      <div class="crop-demo">
        <img :src="cropImg" class="pre-img">
        <img :src="otherImg" class="pre-img">
        <div class="crop-demo-btn">选择图片
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
    </div>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropperjs';

  export default {
    name: 'upload',
    data: function () {
      return {
        defaultSrc: require('../../assets/img/img.jpg'),
        otherImg: require('../../assets/img/img.jpg'),
        fileList: [],
        imgSrc: '',
        cropImg: '',
        dialogVisible: false,
      }
    },
    components: {
      VueCropper
    },
    methods: {
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
        this.otherImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        canvas.toBlob((blob)=>{
          let param = new FormData();  // 创建form对象
          param.append('file', blob,"a.png");  // 通过append向form对象添加数据
          param.append('bookId', '1');
          this.$api.post("/book/info/update/bookImg",param, res => {
            console.log('redd:', res);
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
      }
    },
    created() {
      this.cropImg = this.defaultSrc;
    }
  }
</script>

<style scoped>
  .pre-img {
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
  }

  .crop-demo {
    display: flex;
    align-items: flex-end;
  }

  .crop-demo-btn {
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin-left: 30px;
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
</style>