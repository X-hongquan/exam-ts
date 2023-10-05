<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ user.name }}{{ user.position }} ||{{ user.className }}</span>
      </div>
    </template>
    <div style="text-align: center">
      <span>{{ examVo.title }}</span>
    </div>
    <div>科目：{{ examVo.courseName }}</div>
    <div>班级: {{ examVo.className }}</div>
    <div>命题人: {{ examVo.name }}</div>
    <div>开始时间: {{ examVo.beginTime }}</div>
    <div>结束时间: {{ examVo.endTime }}</div>

    <el-table :data="studentList" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="sno" label="学号" width="180" />
      <el-table-column prop="name" label="名字" width="180" />
      <el-table-column label="操作" width="600">
        <template #default="scope">
          <el-button type="warning" @click="goMarkOne(scope.row)"
            >批卷</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import {  onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useUserStore } from "@/store"
import { ElMessage } from "element-plus"
import  {UserDto,ExamVo} from '@/model'
import { listStudentAPI } from "@/apis/user"
import { getExamAPI } from "@/apis/exam"
import {getAnswerAPI} from '@/apis/answer'

const store = useUserStore()
const { user } = storeToRefs(store)
const { getUser } = store

const examVo= ref({} as ExamVo)
const router = useRouter()
const route = useRoute()
const {classId,examId}=route.query
const studentList = ref([] as UserDto[])
const getAllStudentExam = async () => {
  const r= (await listStudentAPI(classId,examId)).data
  studentList.value = r.data
}

const getExamVo = async () => {
  const r = (await getExamAPI(examId)).data
  examVo.value=r.data
}

const goMarkOne = async (item:UserDto)  => {
  const r = (await getAnswerAPI(examId, item.id)).data
  if(r.code===1) {
  router.push({
      name: "play",
      query: {
        id:r.data.id
      }
    })
  }
  else {
    await getAllStudentExam()
    ElMessage.warning(r.msg)
  }
}


onMounted(() => {
  getAllStudentExam()
  getUser()
  getExamVo()
})
</script>

<style scoped>
.box {
  height: 80px;
  margin-top: 20px;
}
</style>
