<template>

<el-card>
<el-button type="warning"  @click="goExcel">导出excel</el-button>

<el-table :data="dataList" style="width: 100%">
    <el-table-column type="index" width="50" />
    <el-table-column prop="sno" label="学号" width="180" />
    <el-table-column prop="name" label="名字" width="180" />
    <el-table-column prop="className" label="班级" />
    <el-table-column prop="subject" label="科目" />
    <el-table-column prop="score" label="得分" />
  </el-table>
  <div class="main"></div>
  <div class="two"></div>

</el-card>
  
    
      
  <div >


  </div>
</template>
    
<script setup lang="ts">
import echarts from '@/echarts';
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import {getScoreVosAPI,getScoreExcel} from '@/apis/score'
import { ScoreVo } from '@/model';
import {ECOption} from '@/echarts'

const route=useRoute()
const dataList=ref<ScoreVo[]>([])
const getDataList=async ()=>{
    const r=(await getScoreVosAPI(route.query.examId)).data
    dataList.value=r.data
    const arr=dataList.value
    const data=new Array(6)
    for (let i=0;i<6;i++) {
        data[i]=0;
    }
    arr.forEach(element => {
        if(element.score<40)
        data[0]+=1
        else if(element.score<60)
        data[1]+=1
        else if(element.score<70)
        data[2]+=1
        else if(element.score<80)
        data[3]+=1
        else if(element.score<90)
        data[4]+=1
        else 
        data[5]+=1
    });
    makeBar(data)
    
    
}
const goExcel=async ()=> {
    const res=await getScoreExcel(route.query.examId)
	  let url = window.URL.createObjectURL(res.data)   
    var a = document.createElement('a')  
    document.body.appendChild(a)
    a.href = url
    a.download='得分排行.xlsx'
    a.click()   
    window.URL.revokeObjectURL(url)
}




const makeBar= (data:number[])=> {
const option:ECOption={
  title: {
    text: '成绩分布榜'
  },
  tooltip: {},
  xAxis: {
    data: ['0~40', '40~60', '60~70', '70~80', '80~90', '90~100']
  },
  yAxis: {},
  series: [
    {
      name: '人数',
      type: 'bar',
      data
    }
  ]
}
var myChart = echarts.init(document.querySelector('.main') as HTMLElement);
myChart.setOption(option);
}

onMounted(()=>{
getDataList()
})

    

</script>
    
<style scoped>
.main {
    margin-top: 60px;
    width: 1000px;
    height: 500px;
}
.two {
    margin-top: 60px;
    width: 1000px;
    height: 500px;
}
</style>
    