<script setup lang="ts">
import { useUserStore } from "@/store"
import { onMounted, ref, reactive, computed } from "vue"
import { getAllQuestionsAPI} from "@/apis/question"
import { ElMessage } from "element-plus"
import { getCourseListAPI } from "@/apis/course"
import {addTestAPI} from '@/apis/test'
import { Choice, Course, Question,TestDto } from "@/model"



const store = useUserStore()
const { getUser } = store

const tableData = ref<Question[]>([])
const total = ref(0)
const courses = ref<Course[]>([])
const getAllList = async () => {
  const r = (await getAllQuestionsAPI(choice)).data
  tableData.value = r.data
  total.value = Number(r.total)
}



const typeList = ref([
  { id: 1, label: "选择题" },
  { id: 2, label: "判断题" },
  { id: 3, label: "填空题" },
  { id: 4, label: "综合题" },
])
const degreeList = ref([
  { id: 1, label: "简单" },
  { id: 2, label: "中等" },
  { id: 3, label: "困难" },
])

const getCourses = async () => {
  const r = (await getCourseListAPI()).data
  courses.value = r.data
}
const choice = reactive<Choice>({
  concurrentPage: 1,
  courseId: 2,
  degree: 2,
  typeId: 1,
})



const testDto=reactive<TestDto>({
  courseId: 2,
  degree: 5,
  sum: 0,
  name:'',
  newTest: []
})


const modify=ref<boolean[]>([])
const pushNew = (item:Question) => {
  testDto.newTest.push(item)
  modify.value.push(false)
}
const del=(index:number) => {
  testDto.newTest.splice(index,1)
}
testDto.sum=computed(()=>{
   let sum=0
   testDto.newTest.forEach(item=>sum+=item.grade)
   return sum
}).value

const addTest=async()=> {
  if(testDto.name.length<=4) {
    ElMessage.error('标题长度必须大于等于4')
    return
  }
  const r=(await addTestAPI(testDto)).data
  if (r.code===1) {
    ElMessage.success('make it')
  }else if(r.code===0){
    ElMessage.error(r.msg)
  }else {
    ElMessage.error('fail')
  }
}

const pageChange=(e:number)=> {
    choice.concurrentPage=e
    getAllList()
}

onMounted(() => {
  getUser()
  getAllList()
  getCourses()
})
</script>
<template>
  <div class="c-box">
    <el-select v-model="choice.courseId" size="large" @change="getAllList">
      <el-option
        v-for="item in courses"
        :key="item.id"
        :label="item.courseName"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="choice.degree" size="large" @change="getAllList">
      <el-option
        v-for="item in degreeList"
        :key="item.id"
        :label="item.label"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="choice.typeId" size="large" @change="getAllList">
      <el-option
        v-for="item in typeList"
        :key="item.id"
        :label="item.label"
        :value="item.id"
      />
    </el-select>
  </div>
  <el-pagination background layout="prev, pager, next" :total="total" :page-size="10" @current-change="pageChange"/>
  共{{ total }}条
  <el-table border :data="tableData" style="width: 100%">
    <el-table-column prop="content" label="题目" width="400" />
    <el-table-column prop="optiona" label="选项A" />
    <el-table-column prop="optionb" label="选项B" />
    <el-table-column prop="optionc" label="选项C" />
    <el-table-column prop="optiond" label="选项D" />
    <el-table-column prop="result" label="答案" width="60"> </el-table-column>
    <el-table-column width="100">
      <template #default="scope">
        <el-button type="warning" @click="pushNew(scope.row)" icon="Plus">添加</el-button>
      </template>
    </el-table-column>
  </el-table>
 <div class="mid-box">
  <input type="text" class="te-box" v-model="testDto.name">   
  目前分值：{{ testDto.sum }}
  <el-select v-model="testDto.degree" size="large" class="s-box">
      <el-option
        v-for="item in 10"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    <el-button type="warning"  @click="addTest">提交</el-button>
    <el-select v-model="testDto.courseId" size="large">
      <el-option
        v-for="item in courses"
        :key="item.id"
        :label="item.courseName"
        :value="item.id"
      />
    </el-select>
</div>
  <div class="t-box" v-for="(item,index) in testDto.newTest">
  <p class="my-box">
    <div>
    {{ index + 1 }}、 
    <span v-if="!modify[index]" >{{ item.content }} </span> 
    <input class="in-box" v-else  type="text" v-model="item.content" >
    </div>
    <div>
    <el-button  size="large" @click="modify[index]=!modify[index]"><span v-if="!modify[index]">编辑</span><span v-else>确认保存</span></el-button>
    
    <el-select v-model="item.result" size="large" class="s-box" v-if="item.result">
      <el-option
        v-for="item in ['A','B','C','D']"
        :label="item"
        :value="item"
      />
    </el-select>
    <el-select v-model="item.degree" size="large" class="m-box">
      <el-option
        v-for="item in degreeList"
        :key="item.id"
        :label="item.label"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="item.grade" size="large" class="s-box">
      <el-option
        v-for="item in 15"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    <el-button type="danger" icon="Delete" @click="del(index)" circle/>
  </div>
  </p>    
  
  <el-radio-group v-if="item.typeId<3">
    <el-radio label="A" size="large" v-if="item.optiona">
      <span  v-if="!modify[index]">A、{{ item.optiona }}</span>
      <input class="e-box" v-else type="text" v-model="item.optiona">
      </el-radio><br />
    <el-radio label="B" size="large" v-if="item.optionb">
      <span  v-if="!modify[index]" >B、{{ item.optionb }}</span>
      <input class="e-box" v-else type="text" v-model="item.optionb" >
    </el-radio><br />
    <el-radio label="C" size="large" v-if="item.optionc">
      <span  v-if="!modify[index]" >C、{{ item.optionc }}</span>
      <input class="e-box" v-else type="text" v-model="item.optionc" >
    </el-radio><br />
    <el-radio label="D" size="large" v-if="item.optiond">
      <span  v-if="!modify[index]" >D、{{ item.optiond }}</span>
      <input class="e-box" v-else type="text" v-model="item.optiond" >
    </el-radio>
  </el-radio-group>
</div>
<div class="bot-box"></div>

</template>

<style scoped>
.c-box {
  margin: 120px 0px 50px 0;
}

.t-box {
  margin-top: 50px;
}
.my-box {
  display: flex;
  justify-content: space-between;
}

.in-box {
  width: 800px;
  font-size: 16px;
  height: 30px;
}

.e-box {
  width: 200px;
  height: 25px;
}
.bot-box {
  height: 500px;
}
.s-box {
 width: 70px;
}
.m-box {
  width: 80px;
}
.mid-box {
  margin-top: 30px
}
.te-box {
  width: 300px;
  height: 35px;
  font-size: 18px;
}
</style>
