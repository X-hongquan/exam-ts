<script setup lang="ts">
import { ref, onMounted, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useUserStore } from "@/store"
import { ElMessage } from "element-plus"

import { getExamAPI } from "@/apis/exam"
import { getQuestionsAPI } from "@/apis/question"
import { uploadAnswerPictureAPI, commitExamAPI } from "@/apis/answer"
import { ExamVo, Question, AnswerDto } from "@/model"
import { UploadRequestOptions } from "element-plus"

const store = useUserStore()
const { user } = storeToRefs(store)
const { getUser } = store
const minutes = ref(120)
const seconds = ref(0)
const imageUrl = ref("")
const imgDialog = ref(false)
const router = useRouter()
const route = useRoute()

const examVo = ref({} as ExamVo)
const questionList = ref<Question[]>([])
const answer = reactive<AnswerDto>({
  examId:0,
  radioList: [],
  otherList: new Array(6),
})

function preview(url: string) {
  imageUrl.value = url
  imgDialog.value = true
}

let i = 0
const uploadFile = async (file: UploadRequestOptions) => {
  const r = (await uploadAnswerPictureAPI(file)).data
  if (r.code === 1) {
    if (i < 6) answer.otherList[i++] = r.data
  } else ElMessage.error(r.msg)
}

const getExamVo = async () => {
  const r = (await getExamAPI(route.query.examId)).data
  examVo.value = r.data
  answer.examId = r.data.id
  getAllQuestion(examVo.value.testId)
}
const getAllQuestion = async (testId: number) => {
  const r = (await getQuestionsAPI(testId)).data
  questionList.value = r.data
  answer.radioList = new Array<string>(Number(r.total))
}

const commit = async () => {
  if (user.value.id === examVo.value.userId) {
    ElMessage.warning("预览模式，无法提交")
    return
  }
  const r=(await commitExamAPI(answer)).data
  if(r.code===1) {
  ElMessage.success("提交成功")
  router.replace({
    name: "task",
  })
 } else 
  ElMessage.error(r.msg)
 
}

const reduceTime = () => {
  var countdownInterval = setInterval(function () {
    if (seconds.value === 0 && minutes.value === 0) {
      clearInterval(countdownInterval)
    } else if (seconds.value === 0) {
      minutes.value--
      seconds.value = 59
    } else {
      seconds.value--
    }
  }, 1000)
}
onMounted(() => {
  getExamVo()
  getUser()
  reduceTime()
})
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ user.name }}{{ user.position }} ||{{ user.className }}</span>
        <span style="float: right; color: red"
          >{{ minutes }}:{{ seconds }}</span
        >
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
    <div style="float: right">
      <el-button type="danger" @click="commit">提交</el-button>
    </div>
  </el-card>

  <div class="item" v-for="(o, index) in questionList" :key="o.id">
    <p class="weight" v-if="o.sort == 1" id="select">
      一、选择题， (每小题{{ o.grade }}分)
    </p>
    <p class="weight" v-else-if="o.sort == 11" name="judge" id="judge">
      二、判断题，(每小题{{ o.grade }}分)
    </p>
    <p class="weight" v-else-if="o.sort == 16" name="fill" id="fill">
      三、填空题，(每小题{{ o.grade }}分)
    </p>
    <p class="weight" v-else-if="o.sort == 21" name="compute" id="compute">
      四、综合题，(每小题{{ o.grade }}分)
    </p>
    <p class="one">{{ index + 1 }}、 {{ o.content }}</p>
    <el-radio-group v-model="answer.radioList[o.sort - 1]" v-if="o.typeId < 3">
      <el-radio label="A" size="large" v-if="o.optiona">
        A、 {{ o.optiona }}</el-radio
      ><br />
      <el-radio label="B" size="large" v-if="o.optionb"
        >B、{{ o.optionb }}</el-radio
      ><br />
      <el-radio label="C" size="large" v-if="o.optionc"
        >C、{{ o.optionc }}</el-radio
      ><br />
      <el-radio label="D" size="large" v-if="o.optiond"
        >D、{{ o.optiond }}</el-radio
      >
    </el-radio-group>
  </div>

  <el-divider
    direction="horizontal"
    content-position="center"
    style="margin-top: 100px"
    >请将填空题和计算题填写在白纸上再上传图片,最多上传6张图片</el-divider
  >

  <el-upload class="avatar-uploader" action="void" :http-request="uploadFile">
    <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
  <img
    :src="o"
    alt=""
    v-for="o in answer.otherList"
    style="width: 10%"
    @click="preview(o)"
  />

  <el-dialog v-model="imgDialog">
    <img :src="imageUrl" alt="预览" style="width: 100%" />
  </el-dialog>

  <el-card class="btn-nav">
    <a href="#select" class="maodian">选择</a>
    <a href="#judge" class="maodian">判断</a>
    <a href="#fill" class="maodian">填空</a>
    <a href="#compute" class="maodian">综合</a>
  </el-card>
</template>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.one {
  margin: 30px 0;
}
.weight {
  margin: 100px 0;
  font-weight: 900;
}

.btn-nav {
  margin: 0;
  padding: 0;
  position: fixed;
  top: 350px;
  width: 80px;
  right: 0;
  z-index: 10;
}

.btn-nav a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 80px;
  color: black;
  line-height: 80px;
  margin: 0;
}
</style>
