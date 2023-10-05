<script setup lang="ts">
import { ElMessage, UploadRequestOptions } from "element-plus"
import { onMounted, ref, reactive } from "vue"
import { useUserStore } from "@/store"
import { useRouter } from "vue-router"
import { Course, StuClass, ExamVo, ExamDto, Question, Test } from "@/model"
import { getCourseListAPI } from "@/apis/course"
import { getAllClassAPI } from "@/apis/stuClass"
import { upLoadQAPI, getQuestionsAPI } from "@/apis/question"
import {
  getDoingExamAPI,
  getCompletedExamAPI,
  addExamAPI,
  delExamAPI,
  examIsBeginAPI,
} from "@/apis/exam"
import { upLoadTestAPI, getTestsAPI, delTestAPI } from "@/apis/test"
import MyItem from "@/components/MyItem.vue"
import { storeToRefs } from "pinia"

const store = useUserStore()
const {user}=storeToRefs(store)
const {getUser}=store
const router = useRouter()

const activeName = ref("first")
const exam = reactive({} as ExamDto)
const courseNames = ref<Course[]>([])
const classNames = ref<StuClass[]>([])
const doings = ref<ExamVo[]>([])
const completes = ref<ExamVo[]>([])
const tests = ref<Test[]>([])

const dialog = ref(false)
const makeDialog = ref(false)

const getTests = async () => {
  const res = (await getTestsAPI()).data
  tests.value = res.data
}

const getCourseNames = async () => {
  const res = (await getCourseListAPI()).data
  courseNames.value = res.data
}

const getClassNames = async () => {
  const res = (await getAllClassAPI()).data
  classNames.value = res.data
}

const getDoings = async () => {
  const res = (await getDoingExamAPI()).data
  doings.value = res.data
}

const getCompleted = async () => {
  const res = (await getCompletedExamAPI()).data
  completes.value = res.data
}

const add = async () => {
  const res = (await addExamAPI(exam)).data
  getDoings()
  if (res.code === 1) ElMessage.success("考试创建成功")
  else ElMessage.error(res.msg)
}

const uploadFile = async (file: UploadRequestOptions) => {
  const r = (await upLoadTestAPI(file)).data
  if (r.code === 1) ElMessage.success("上传完成")
  else ElMessage.error(r.msg)
}
const uploadFile1 = async (file: UploadRequestOptions) => {
  const r = (await upLoadQAPI(file)).data
  if (r.code === 1) ElMessage.success("贡献成功")
  else ElMessage.error(r.msg)
}

const preview = (item: ExamVo) => {
  router.push({
    name: "test",
    query: {
      examId: item.id,
    },
  })
}

//学生去考试
const goExam = async (item: ExamVo) => {
  const r = (await examIsBeginAPI(item.id)).data
  if (r.code === 1)
    router.push({
      name: "test",
      query: {
        examId: item.id,
      },
    })
  else ElMessage.error(r.msg)
}

const qList = ref<Question[]>([])

const getqList = async (id: number) => {
  const r = (await getQuestionsAPI(id)).data
  qList.value = r.data
}

const delDialog = ref(false)
let delId: number

const del = (item: ExamVo) => {
  delDialog.value = true
  delId = item.id
}
const goDel = async () => {
  const r = (await delExamAPI(delId)).data
  if (r.code === 1) {
    delDialog.value = false
    ElMessage.success("删除成功")
  } else {
    ElMessage.error(r.msg)
  }

  getDoings()
}

const goMark = (item: ExamVo) => {
  router.push({
    name: "student",
    query: {
      classId: item.classId,
      examId: item.id,
    },
  })
}
const goAnalyse = (item: ExamVo) => {
  router.push({
    name: "analyse",
    query: {
      examId: item.id,
    },
  })
}

const deltest = async (id: number) => {
  const r = (await delTestAPI(id)).data
  if (r.code === 1) {
    ElMessage.success("删除成功")
    getTests()
  } else ElMessage.error(r.msg)
}
const goMakeTest = () => {
  router.push({
    name: "make",
  })
}

const addnewTest = ref(false)

onMounted(() => {
  getUser()
  getCourseNames()
  getClassNames()
  getDoings()
  getCompleted()
  getTests()
})
</script>
<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ store.user.name }}{{ store.user.position }} || {{ store.user.className }}</span>
        <div>
          <el-button
            type="primary"
            icon="Plus"
            style="float: right"
            v-if="store.user.position == '老师'"
            @click="dialog = true"
            >创建考试</el-button
          >
          <el-button type="warning" @click="addnewTest = true"
            >贡献题库</el-button
          >
        </div>
      </div>
    </template>
    <el-tabs type="card" class="demo-tabs" v-model="activeName">
      <el-tab-pane label="进行中" name="first">
        <div class="item" v-for="item in doings">
          <div style="text-align: center">
            <span>{{ item.title }}</span>
          </div>
          <div>科目：{{ item.courseName }}</div>
          <div>班级: {{ item.className }}</div>
          <div>命题人: {{ item.name }}</div>
          <div>开始时间: {{ item.beginTime }}</div>
          <div>结束时间: {{ item.endTime }}</div>
          <div v-if="store.user.id == item.userId" style="float: right">
            <el-button type="primary" @click="preview(item)">预览</el-button>
            <el-button
              type="danger"
              @click="del(item)"
              icon="Delete"
              circle
            ></el-button>
          </div>
          <div v-else>
            <el-button type="primary" @click="goExam(item)" style="float: right"
              >进入考试</el-button
            >
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="second">
        <div class="item" v-for="item in completes">
          <div style="text-align: center">
            <span>{{ item.title }}</span>
          </div>
          <div class="b-box">
            <div>
              <div>科目：{{ item.courseName }}</div>
              <div>班级: {{ item.className }}</div>
              <div>命题人: {{ item.name }}</div>
              <div>开始时间: {{ item.beginTime }}</div>
              <div>结束时间: {{ item.endTime }}</div>
            </div>
            <div class="score" v-if="user.positionId === 2">
              {{ item.score }}
            </div>
          </div>
          <div v-if="user.id == item.userId" style="float: right">
            <el-button type="warning" @click="preview(item)">预览</el-button>
            <el-button type="primary" @click="goMark(item)">批卷</el-button>
            <el-button type="danger" @click="goAnalyse(item)"
              >成绩分析</el-button
            >
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的试卷" name="three" v-if="store.user.positionId === 3">
        <el-button type="warning" @click="makeDialog = true"
          >上传试卷</el-button
        >
        <el-button type="primary" @click="goMakeTest">制作试卷(推荐)</el-button>
        <el-table :data="tests" style="width: 100%">
          <el-table-column type="index" width="50" />
          <el-table-column prop="authorName" label="作者" width="180" />
          <el-table-column prop="degree" label="难度系数(1~10)" width="180" />
          <el-table-column prop="name" label="标题" width="180" />
          <el-table-column label="科目">
            <template #default="scope">
              <span>{{
                courseNames[
                  courseNames.findIndex(
                    (item) => item.id === scope.row.courseId
                  )
                ].courseName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column>
            <template #default="scope">
              <el-button type="info" @click="getqList(scope.row.id)"
                >预览</el-button
              >
              <el-button type="danger" @click="deltest(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <MyItem :questionList="qList"></MyItem>
      </el-tab-pane>
    </el-tabs>
  </el-card>

  <el-dialog title="创建考试" v-model="dialog" width="30%">
    <el-form :model="exam">
      <el-form-item label="标题">
        <el-input v-model="exam.title" size="normal" clearable></el-input>
      </el-form-item>
      <el-form-item label="科目">
        <el-select v-model="exam.courseName">
          <el-option
            v-for="item in courseNames"
            :key="item.id"
            :label="item.courseName"
            :value="item.courseName"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="exam.classId">
          <el-option
            v-for="item in classNames"
            :key="item.id"
            :label="item.className"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="试卷">
        <el-select v-model="exam.testId">
          <el-option
            v-for="item in tests"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <div class="block">
          <el-date-picker
            v-model="exam.timeArray"
            type="datetimerange"
            start-placeholder="Start Date"
            end-placeholder="End Date"
          />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="dialog = false">Cancel</el-button>
        <el-button type="primary" @click="add">OK</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog title="确认删除吗" v-model="delDialog" width="25%">
    <span></span>
    <template #footer>
      <span>
        <el-button @click="delDialog = false">Cancel</el-button>
        <el-button type="danger" @click="goDel">OK</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog title="上传试卷" v-model="makeDialog" width="25%">
    <el-upload drag action="void" :http-request="uploadFile" multiple>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">请上传word文档</div>
      </template>
    </el-upload>
  </el-dialog>

  <el-dialog title="上传试卷" v-model="addnewTest" width="25%">
    <el-upload drag action="void" :http-request="uploadFile1" multiple>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">请上传excel文档</div>
      </template>
    </el-upload>
  </el-dialog>
</template>

<style scoped>
.item {
  width: 100%;
  height: 200px;
  margin-top: 20px;
  justify-content: space-between;
}

.card-header {
  display: flex;
  justify-content: space-between;
}
.b-box {
  display: flex;
  justify-content: space-between;
}
.score {
  height: 50px;
  font-size: 60px;
  color: red;
}
</style>
@/apis/course/CourseAPI
