<template>
  <div class="activities1-container">
    <h1 class="title">登山活动-周六自动发布</h1>
    <div class="activities-list">
      <el-button class="add-activitie" type="warning" icon="el-icon-plus">创建登山活动</el-button>
      <div class="list-item" v-for="(item) in activityList" :key="item.id">
        <div class="create">
          创建人：{{ item.adminName }}
        </div>
        <img :src="item.img" alt="" class="activitie-img">
        <div class="activitie-info">
          <h1>{{ item.content.title }}</h1>
          <p><b>简介：</b>{{ item.content.synopsis }}</p>
          <span><b>人数：</b>{{ item.max }}人</span>
          <span><b>活动时间：</b>{{item.startTime}}至{{ item.endTime }}</span>
        </div>
        <div class="activitie-state" v-html="getActivityState(item).stateStr">
        </div>
        <div class="time" v-html="getActivityState(item).time">
        </div>
        <div class="operation-btn">
          <el-button type="text">查看</el-button>
          <el-button type="text">编辑</el-button>
        </div>
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
      nowTime: this.$moment(),
      //登山活动列表
      activityList: [
        {
          id: '1',
          adminId: '1',
          adminName: 'zs',
          img:require('D:/WebLearn/shanYouYuan/app/public/image/logo.png'),
          createTime: '2023-6-10',//发布时间
          startTime: '2023-6-13',//开始时间
          endTime: '2023-6-15',//结束时间
          state: 0,//0未发布，1报名中，2进行中，3已结束
          content: {
            title: '去青城山',
            synopsis: '体验道家风采',//简介
          },
          max: 50,//最大人数
          applicant: 48,//报名人数
        },
        {
          id: '2',
          adminId: '2',
          adminName: 'admin',
          img:require('D:/WebLearn/shanYouYuan/app/public/image/logo.png'),
          createTime: '2023-6-12',//发布时间
          startTime: '2023-6-15',//开始时间
          endTime: '2023-6-18',//结束时间
          state: 1,//0未发布，1报名中，2进行中，3已结束
          content: {
            title: '去青城山',
            synopsis: '体验道家风采',//简介
          },
          max: 50,//最大人数
          applicant: 48,//报名人数
        }
      ]
    }
  },
  methods: {
    //获取某一时间与当前时间的差值
    getDiffToNowTime(endTime) {
      const diffTime = endTime.diff(this.nowTime);
      const days = Math.floor(diffTime / (24 * 60 * 60 * 1000));
      const hours = Math.floor((diffTime - days * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
      const minutes = Math.floor((diffTime - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000) / (60 * 1000));
      const seconds = Math.floor((diffTime - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000);
      return `${days}天${hours}时${minutes}分${seconds}秒`
    },
    //获取活动状态
    getActivityState(item) {
      let stateObj = {};
      if (item.state == 0) {
        stateObj.stateStr = `<h1 class="no-release">未发布</h1>`;
        stateObj.time = `<p>${this.nextSatTime}<br>后自动发布</p>`
        return stateObj
      } else if (item.state == 1) {
        stateObj.stateStr = `<h1 class="enroll">报名中</h1>`;
        stateObj.time = `<p>${this.applicantTime(item.endTime)}<br>后结束报名</p>`;
        return stateObj
      } else if (item.state == 2) {
        stateObj.stateStr=`<h1 class="progress">进行中</h1>`
        stateObj.time=`<p>{{ nextSatTime }}<br>后结束活动</p>`
        return stateObj
      } else if (item.state == 3) {
        stateObj.stateStr=`<h1 class="finished">已结束</h1>`;
        stateObj.time=`<p>结束时间：<br>{{item.endTime}}</p>`
      } else throw new Error('获取活动状态出错')
    },
    applicantTime(endTimeStr){
      const endTime = this.$moment(endTimeStr).startOf('day');
      return this.getDiffToNowTime(endTime)
    }
  },
  computed: {
    nextSatTime() {
      let days = 6;
      //获取下周6时间
      const endTime = this.$moment().day(days).startOf('day');
      return this.getDiffToNowTime(endTime)
    },
    
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
    position: relative;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin-top: 20px;
    padding: 40px 20px;
    width: 1200px;
    height: 600px;
    overflow-y: scroll;

    .add-activitie {

      position: fixed;
      width: 200px;
      margin-top: -20px;
      align-self: flex-start;
    }

    .list-item {
      background-color: #fff;
      margin-top: 20px;
      width: 100%;
      height: 150px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      .create {
        width: 150px;
        text-align: left;
        font-size: 14px;
      }

      .activitie-img {
        cursor: pointer;
        width: 120px;
        height: 120px;
        background-color: #fff;
      }

      .activitie-info {
        display: flex;
        width: 350px;
        flex-direction: column;
        height: 100%;
        margin-left: 20px;

        b {
          font-size: 14px;
        }

        h1 {
          display: block;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          margin-top: 20px;
          font-size: 18px;
          cursor: pointer;

          &:hover {
            color: #606266
          }
        }

        p,
        span {
          color: #606266;
          margin-top: 3px;
          font-size: 12px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        p {
          height: 35px;
        }
      }

      /deep/.time {
        width: 100px;

        p {
          font-size: 12px;
          text-align: center;
        }
      }

      .activitie-state {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 150px;

        h1 {
          text-align: center;
          font-size: 20px;
        }

        /deep/.no-release {
          color: #F56C6C;
        }

        /deep/.progress {
          color: #67C23A;
        }

        /deep/.enroll {
          color: #E6A23C;
        }

        /deep/.finished {
          color: #909399;
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