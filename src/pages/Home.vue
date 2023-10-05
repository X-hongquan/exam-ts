<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { getUseAPI,getIsLoginAPI } from "@/apis/user"

const router = useRouter()
const subject = ref("")
const goTask = async () => {
   router.push({
    name:'task'
   })
}
const goUser =async () => {
  const r=(await getIsLoginAPI()).data
  if(r.code===1) {
  router.push({
    name: "user",
  })
 }else {
  router.push( {
    name:'login'
  })
 }
}


const make = async () => {
  const res = await getUseAPI()
  let url = URL.createObjectURL(res.data)
  var a = document.createElement("a")
  document.body.appendChild(a)
  a.href = url
  a.download = "用户手册.docx"
  a.click()
  window.URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="header">
    <div class="heart">

      <div class="search">
        <el-input
          v-model="subject"
          placeholder="搜索功能暂未开启"
          clearable
          @change=""
          class="search"
          style="height: 100%"
        ></el-input>
      </div>
      <el-button
        type="info"
        size="large"
        icon="House"
        circle
        class="user"
        @click="goTask"
      ></el-button>
      <el-button
        type="info"
        size="large"
        icon="User"
        circle
        class="user"
        @click="goUser"
      ></el-button>
      <el-button type="info" @click="make" class="user">用户手册</el-button>
      <a href="/api/question/download" class="user"
        >下载贡献文档</a
      >
    </div>
  </div>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.content {
  margin: 80px auto;
  width: 1220px;
  background-color: #ffffff;
}

.heart {
  margin: 0 auto;
  width: 1220px;
  display: flex;
}
.header {
  position: fixed;
  display: flex;
  width: 100%;
  top: 0;
  left: 0;
  height: 72px;
  background-color: #000000;
  z-index: 10;
}
.search {
  margin: 10px 50px;
  width: 400px;
  height: 40px;
}
.user {
  margin: 16px 50px;
  text-decoration: none;
}
</style>
