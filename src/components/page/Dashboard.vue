<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="6">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-lx-people grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>用户总访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-notebook-2 grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>可借阅图书数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-lx-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>总借阅数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-check grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>总归还数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>    
    </el-row>
    <div id="useChart" style="width: 100%;height: 400px"></div>
  </div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    name: 'dashboard',
    data() {
      return {
        name: localStorage.getItem('ms_username'),
        charts:'',
      };
    },
    components: {},
    computed: {
      role() {
        return '超级管理员';
      }
    },
    mounted() {
      this.drawPie();
    },
    // activated() {
    //     this.handleListener();
    // },
    methods: {
     drawPie(){
       this.charts = echarts.init(document.getElementById('useChart'));
       this.charts.setOption({
         title: {
           text: '近一周借阅访问情况'
         },
         tooltip: {
           trigger: 'axis',
           axisPointer: {            // 坐标轴指示器，坐标轴触发有效
             type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
           }
         },
         legend: {
           data: ['注册数量', '访问次数', '借阅数量', '归还数量']
         },
         grid: {
           left: '10%',
           right: '8%',
           bottom: '3%',
           containLabel: true
         },
         xAxis: {
           type: 'value'
         },
         yAxis: {
           type: 'category',
           data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
         },
         series: [
           {
             name: '注册数量',
             type: 'bar',
             stack: '总量',
             label: {
               show: true,
               position: 'insideRight'
             },
             data: [320, 302, 301, 334, 390, 330, 320]
           },
           {
             name: '访问次数',
             type: 'bar',
             stack: '总量',
             label: {
               show: true,
               position: 'insideRight'
             },
             data: [120, 132, 101, 134, 90, 230, 210]
           },
           {
             name: '借阅数量',
             type: 'bar',
             stack: '总量',
             label: {
               show: true,
               position: 'insideRight'
             },
             data: [220, 182, 191, 234, 290, 330, 310]
           },
           {
             name: '归还数量',
             type: 'bar',
             stack: '总量',
             label: {
               show: true,
               position: 'insideRight'
             },
             data: [150, 212, 201, 154, 190, 330, 410]
           }
         ]
       });
     }
    }
  };
</script>


<style scoped>
  .el-row {
    margin-bottom: 20px;
  }

  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }

  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }

  .grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }

  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }

  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

  .user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }

  .mgb20 {
    margin-bottom: 20px;
  }

  .mgt30 {
    margin-top: 50px;
  }
</style>
