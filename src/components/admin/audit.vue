<template>
  <div>内容审核</div>
</template>

<script>
export default {
  data() {
    return {
      auditList: [
        {
          id: '1',   //这条记录的id
          commentId: '1',//举报的评论id
          userId: '1',  //举报人id
          state: '0'  //状态，0为审核中，1为审核完成
        }
      ]
    }
  }
}
</script>

<style></style>