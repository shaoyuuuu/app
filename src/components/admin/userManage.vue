<template>
  <div>
    <div class="table-container" v-if="!$route.params.userId">
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
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  data() {
    return {
      searchName: '',
      userShowList: [],
      //一页多少条数据
      pageCount: 6,
      //当前页
      currentPage: 1,
    }
  },
  watch: {
    userList() {
      this.showAll();
    }
  },
  methods: {
    //得到所有用户数据
    getUserList() {
      this.$store.dispatch('getUserList');
    },
    //查看单个用户
    showUser(row) {
      let userData = this.userList.filter((item) => {
        return item.userId === row.userId
      })[0]
      this.$router.push({
        path: `/admin/manage/${userData.userId}`,
        name: 'userMsg',
        params: {
          userId: userData.userId,
          userData: userData
        },
      })
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
    ...mapGetters(['userList']),
    pagerCount() {
      return Math.ceil(this.userShowList.length / this.pageCount)
    },
  },
  created() {
    this.userShowList = this.userList
  },
  mounted() {
    this.getUserList();
  }
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