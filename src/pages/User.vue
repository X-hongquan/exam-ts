<template>
  <el-card>
    <div>学号: {{ user.sno }}</div>
    <div>名字: {{ user.name }}</div>
    <div>性别: {{ user.sex }}</div>
    <div>邮箱: {{ user.email }}</div>
    <div>出生日期: {{ user.bornDate }}</div>
    <div>
      <el-button type="danger" @click="logout">注销</el-button>
      <el-button type="danger" @click="setdialog = true">重置密码</el-button>
    </div>
  </el-card>
  <el-dialog title="重置密码" v-model="setdialog" width="25%">
    <template #footer>
      <el-form :model="form">
        <el-form-item label="设置密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="再次输入">
          <el-input v-model="pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="写验证码">
          <el-input v-model="form.code"></el-input>
          <el-button type="success" @click="sendCode">发送验证码</el-button>
        </el-form-item>
      </el-form>

      <span>
        <el-button @click="setdialog = false">Cancel</el-button>
        <el-button type="primary" @click="goUpdatePassword">OK</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store"
import { onMounted, reactive, ref } from "vue"
import { storeToRefs } from "pinia"
import { logoutAPI, sendCodeAPI, updateAPI } from "@/apis/user"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"


const router = useRouter()
const store = useUserStore()
const { user } = storeToRefs(store)
const { getUser } = store
const setdialog = ref(false)
const pwd = ref("")
const form = reactive({
  password:'',
  pwd:'',
  code:''
})

const logout = async () => {
  const r = (await logoutAPI()).data
  if (r.code === 1) {
    localStorage.removeItem("token")
    router.replace({
      name: "login",
    })
  } else {
    ElMessage("你还未登录")
    router.replace({
      name: "login",
    })
  }
}
const sendCode = async () => {
  const r = (await sendCodeAPI()).data
  if (r.code === 1) ElMessage.success("发送成功,5分钟后失效")
  else ElMessage.error(r.msg)
}

const goUpdatePassword = async () => {
  if (form.password.length < 6) {
    ElMessage.error("密码长度必须大于等于6")
    return
  }
  if (form.password != pwd.value) {
    ElMessage.error("密码不一致")
    return
  }
  const r = (await updateAPI(form)).data
  if (r.code===1) {
    ElMessage.success("密码修改成功")
    logout()
  } else {
    ElMessage.error(r.msg)
  }
}
onMounted(() => {
  getUser()
})
</script>

<style scoped></style>
