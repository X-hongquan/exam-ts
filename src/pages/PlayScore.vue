<template>
  <el-card class="box-card">
    <div>
      1~15:{{ answer.radioList }} 计算机解析得分:{{ score.selectScore }}
    </div>
    <el-divider></el-divider>
    <div>
      <img
        :src="item"
        alt="答案图片"
        v-for="item in array"
        style="height: 100px"
        @click="
          () => {
            ;(imgDialog = true), (imgUrl = item)
          }
        "
      />
    </div>
  </el-card>

  <el-dialog v-model="imgDialog">
    <img :src="imgUrl" alt="预览" style="width: 100%" />
  </el-dialog>
  <el-form :model="score">
    <el-form-item label="选择判断分数">
      <el-input v-model="score.selectScore"></el-input>
    </el-form-item>
    <el-form-item label="其他题型分数">
      <el-input v-model="score.ohterScore"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addScore">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { getMyAnswerAPI } from "@/apis/answer"
import { saveScoreAPI } from "@/apis/score"

import { ElMessage } from "element-plus"
import { onMounted, ref, reactive} from "vue"
import { useRoute, useRouter } from "vue-router"
import { Answer, Score } from "@/model"

const router = useRouter()
const route = useRoute()

const answer = ref<Answer>({
id: 0,
examId: 0,
radioList: "",
otherList: "",
userId: 0,
createTime: ""
})
const score = reactive({} as Score)
const array = ref<string[]>([])
const imgDialog = ref(false)
const imgUrl = ref("")
const getAnswerOne = async () => {
  const r = (await getMyAnswerAPI(route.query.id)).data
  answer.value = r.data
  score.examId = r.data.examId
  score.userId = r.data.userId
  score.selectScore = r.total
  const imgList = r.data.otherList
  array.value = imgList.split(";")
}

const addScore = async () => {
  const r = (await saveScoreAPI(score)).data
  if (r.code === 1) {
    router.replace({
      name: "student",
      query: {
        examId: score.examId,
      },
    })
  } else ElMessage.error(r.msg)
}

onMounted(() => {
  getAnswerOne()
})
</script>

<style scoped></style>
