<template>
  <div class="table-container">
    <h1 class="table-title" style="margin-bottom: 20px;font-size: 25px;text-align: center;color: #606266;">用户信息表</h1>
    <div class="search-container">
      <el-input placeholder="请输入要查询的姓名" suffix-icon="el-icon-search" v-model="searchName"
        style="width: 180px;"></el-input>
      <el-button icon="el-icon-search" @click="searchByName" style="margin-left: 10px;">查询</el-button>
      <el-button v-show="userShowList !== userList" @click="showAll">显示所有数据</el-button>
    </div>
    <el-table :data="userShowList.slice((currentPage - 1) * pageCount, currentPage * pageCount)" border
      style="width: 100%;text-align: center;">
      <el-table-column prop="userId" label="id">
      </el-table-column>
      <el-table-column prop="userNickname" label="昵称">
      </el-table-column>
      <el-table-column prop="userGender" label="性别">
      </el-table-column>
      <el-table-column prop="userPhone" label="手机号">
      </el-table-column>
      <el-table-column prop="userBirth" label="出生日期">
      </el-table-column>
      <el-table-column prop="userAvatar" label="用户头像" align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" :src="scope.row.userAvatar" size="large" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click.prevent="showUser(scope.row)">查看</el-button>
          <el-button type="text" size="medium" @click.prevent="changeUser(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background align="center" layout="prev, pager, next" :page-size="pageCount"
      :total="userShowList.length" :current-page="currentPage" :page-count="pagerCount"
      @current-change="currentChange($event)" style="margin-top: 20px;">
    </el-pagination>
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchName: '',
      userShowList: [],
      userList: [
        {
          userId: '1',
          userNickname: '张三',
          userGender: '男',
          userPhone: '18161131561',
          userBirth: '2002-1-12',
          userAvatar: require('@/assets/logo.png'),
        },
        {
          userId: '2',
          userNickname: '张四',
          userGender: '男',
          userPhone: '18161131561',
          userBirth: '2002-1-12',
          userAvatar: require('@/assets/logo.png'),
        },
        {
          userId: '3',
          userNickname: '张五',
          userGender: '男',
          userPhone: '18161131561',
          userBirth: '2002-1-12',
          userAvatar: require('@/assets/logo.png'),
        },
        {
          userId: '4',
          userNickname: '张三',
          userGender: '男',
          userPhone: '18161131561',
          userBirth: '2002-1-12',
          userAvatar: require('@/assets/logo.png'),
        },
        {
          userId: '1',
          userNickname: '张三',
          userGender: '男',
          userPhone: '18161131561',
          userBirth: '2002-1-12',
          userAvatar: require('@/assets/logo.png'),
        },
        {
          userId: '2',
          userNickname: '张四',
          userGender: '男',
          userPhone: '18161131561',
          userBirth: '2002-1-12',
          userAvatar: require('@/assets/logo.png'),
        },
        {
          userId: '3',
          userNickname: '张五',
          userGender: '男',
          userPhone: '18161131561',
          userBirth: '2002-1-12',
          userAvatar: require('@/assets/logo.png'),
        },
        {
          userId: '4',
          userNickname: '张三',
          userGender: '男',
          userPhone: '18161131561',
          userBirth: '2002-1-12',
          userAvatar: require('@/assets/logo.png'),
        },
        {
          userId: '1',
          userNickname: '张三',
          userGender: '男',
          userPhone: '18161131561',
          userBirth: '2002-1-12',
          userAvatar: require('@/assets/logo.png'),
        },
        {
          userId: '2',
          userNickname: '张四',
          userGender: '男',
          userPhone: '18161131561',
          userBirth: '2002-1-12',
          userAvatar: require('@/assets/logo.png'),
        },
        {
          userId: '3',
          userNickname: '张五',
          userGender: '男',
          userPhone: '18161131561',
          userBirth: '2002-1-12',
          userAvatar: require('@/assets/logo.png'),
        },
        {
          userId: '4',
          userNickname: '张三',
          userGender: '男',
          userPhone: '18161131561',
          userBirth: '2002-1-12',
          userAvatar: require('@/assets/logo.png'),
        },
      ],
      //一页多少条数据
      pageCount: 6,
      //当前页
      currentPage: 1,
    }
  },
  methods: {
    //查看单个用户
    showUser(row) {
      console.log(row)
    },
    //修改单个用户
    changeUser(row) { },
    //通过姓名查找用户
    searchByName() {
      let searchName = this.searchName.trim()
      if (searchName === '') return
      this.userShowList = this.userList.filter((item, index) => {
        return item.userNickname === searchName
      })
    },
    showAll() {
      this.userShowList = this.userList
      this.searchName = ''
    },
    //当前页改变
    currentChange(page) {
      this.currentPage = page
      // this.userShowList=this.userList.slice(startIndex,endIndex)
    }
  },
  computed: {
    pagerCount() {
      return Math.ceil(this.userShowList.length / this.pageCount)
    },
  },
  created() {
    this.userShowList = this.userList
  },
}
</script>

<style scoped lang="less">
.table-container {
  margin-top: 20px;
  width: 1250px;

  .search-container {
    margin-bottom: 20px;
  }
}
</style>