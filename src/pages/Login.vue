<script setup lang="ts">
import { reactive } from "vue"
import { useRouter } from "vue-router"
import { LoginUser } from "@/model"
import { goLoginAPI, tourAPI } from "@/apis/user"
import { ElMessage } from "element-plus";

const router = useRouter()
const loginDto = reactive<LoginUser>({
  phone: "",
  password: "",
})
const onSubmit = async () => {
  const r = (await goLoginAPI(loginDto)).data
  if (r.code === 1) {
    localStorage.setItem("token", r.data)
    router.push({
      name: "task",
    })
  } else 
   ElMessage.error(r.msg)
  
}
const make = async () => {
  const r = (await tourAPI()).data
  if (r.code === 1) {
    localStorage.setItem("token", r.data)
    router.push({
      name: "task",
    })
  }
}
</script>

<template>
  <div class="main">
    <div class="form-wrapper">
      <div class="header">在线考试平台</div>
      <div class="input-wrapper">
        <div class="border-wrapper">
          <input
            type="text"
            placeholder="phone"
            class="border-item"
            v-model="loginDto.phone"
          />
        </div>
        <div class="border-wrapper">
          <input
            type="password"
            placeholder="password"
            class="border-item"
            v-model="loginDto.password"
          />
        </div>
      </div>
      <div class="action">
        <div class="btn" @click="onSubmit">login</div>
      </div>
      <div class="icon-wrapper">
        <el-button type="primary" @click="make">我是访客</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  height: 1000px;
  font-family: JetBrains Mono Medium;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #0e92b3; */
  background: url("./2.png") no-repeat;
  background-size: 100% 100%;
}

.form-wrapper {
  width: 300px;
  background-color: rgba(41, 45, 62, 0.8);
  color: #fff;
  border-radius: 2px;
  padding: 50px;
}

.form-wrapper .header {
  text-align: center;
  font-size: 35px;
  text-transform: uppercase;
  line-height: 100px;
}

.form-wrapper .input-wrapper input {
  background-color: rgb(41, 45, 62);
  border: 0;
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: #fff;
  outline: none;
}

.form-wrapper .input-wrapper input::placeholder {
  text-transform: uppercase;
}

.form-wrapper .input-wrapper .border-wrapper {
  background-image: linear-gradient(to right, #e8198b, #0eb4dd);
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-wrapper .input-wrapper .border-wrapper .border-item {
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  border-radius: 30px;
}

.form-wrapper .action {
  display: flex;
  justify-content: center;
}

.form-wrapper .action .btn {
  width: 60%;
  text-transform: uppercase;
  border: 2px solid #0e92b3;
  text-align: center;
  line-height: 50px;
  border-radius: 30px;
  cursor: pointer;
}

.form-wrapper .action .btn:hover {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}

.form-wrapper .icon-wrapper {
  text-align: center;
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
  border-top: 1px dashed rgb(146, 146, 146);
  padding: 20px;
}

.form-wrapper .icon-wrapper i {
  font-size: 20px;
  color: rgb(187, 187, 187);
  cursor: pointer;
  border: 1px solid #fff;
  padding: 5px;
  border-radius: 20px;
}

.form-wrapper .icon-wrapper i:hover {
  background-color: #0e92b3;
}
</style>
