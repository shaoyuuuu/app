<template>
  <div class="activities1-container">
    <h1 class="title">登山活动-周六自动发布</h1>
    <div class="activities-list">
      <el-button type="warning" icon="el-icon-plus">创建爬山活动</el-button>
      <div class="list-item">
        <img src="@/assets/logo.png" alt="" class="activitie-img">
        <div class="activitie-info">
          <h1>去往青城山后山,去往青城山后山,去往青城山后山,去往青城山后山</h1>
          <p><b>简介：</b>采</p>
          <span><b>人数：</b>50人</span>
          <span><b>活动时间：</b>2023年6月15日至2023年6月17日</span>
        </div>
        <div class="activitie-state">
          <h1>未发布</h1>
          <p>{{ nextSatTime }}<br>后自动发布</p>
        </div>
        <div class="operation-btn">
          <el-button type="text">查看</el-button>
          <el-button type="text">编辑</el-button>
        </div>
      </div>
      <div class="list-item">

      </div>
      <div class="list-item">

      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //计时器
      timer: null,
      //当前时间
      nowTime: this.$moment()
    }
  },
  methods:{
    getDiffToNowTime(endTime){
      const diffTime = endTime.diff(this.nowTime);
      const days = Math.floor(diffTime / (24 * 60 * 60 * 1000));
      const hours = Math.floor((diffTime - days * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
      const minutes = Math.floor((diffTime - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000) / (60 * 1000));
      const seconds = Math.floor((diffTime - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000);
      return `${days}天${hours}时${minutes}分${seconds}秒`
    }
  },
  computed: {
    nextSatTime() {
      //获取下周6时间
      const endTime = this.$moment().day(13).startOf('day');
      return this.getDiffToNowTime(endTime)
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.nowTime = this.$moment()
    })
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
}
</script>

<style scoped lang="less">
.activities1-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-top: 20px;
    font-size: 25px;
    text-align: center;
    color: #606266;
  }


  .activities-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #606266;
    border-radius: 4px;
    margin-top: 20px;
    padding: 20px;
    width: 800px;

    .el-button {
      width: 200px;
      align-self: flex-start;
    }

    .list-item {
      margin-top: 20px;
      width: 800px;
      height: 150px;
      border: 3px solid #606266;
      border-radius: 4px;
      display: flex;
      align-items: center;

      .activitie-img {
        width: 120px;
        height: 120px;
        margin-left: 20px;
        border: 1px solid #606266;
      }

      .activitie-info {
        display: flex;
        width: 350px;
        flex-direction: column;
        height: 100%;
        margin-left: 20px;

        b{
          font-size: 14px;
        }
        h1 {
          display: block;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          margin-top: 20px;
          font-size: 18px;
        }

        p,
        span {
          margin-top: 5px;
          font-size: 12px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        p{
          height: 35px;
        }
      }

      .activitie-state {
        height: 100%;
        position: relative;
        margin-left: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 150px;
        h1{
          font-size: 20px;
          color: #606266;
        }
        p{
          display: inline-block;
          position: absolute;
          bottom: 20px;
          padding-top: 20px;
          font-size: 12px;
        }
      }

      .operation-btn {
        margin-right: 20px;
        width: 100px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .el-button {
          align-self: center;
        }
      }
    }
  }
}
</style>