<script setup lang="ts">
import { Question } from '@/model';

interface MyProp {
  questionList:Question[]
}

defineProps<MyProp>()
</script>


<template>
<div class="item" v-for="(o,index) in questionList " :key="o.id">
    <p class="weight" v-if="o.sort == 1" id="select">一、选择题， (每小题{{ o.grade }}分)</p>
    <p class="weight" v-else-if="o.sort == 11" name="judge" id="judge">
      二、判断题，(每小题{{ o.grade}}分)
    </p>
    <p class="weight" v-else-if="o.sort == 16" name="fill" id="fill">
      三、填空题，(每小题{{ o.grade }}分)
    </p>
    <p class="weight" v-else-if="o.sort == 21" name="compute" id="compute">
      四、综合题，(每小题{{ o.grade }}分)
    </p>
    <p class="one">{{ index+1 }}、 {{ o.content }}</p>
    <el-radio-group v-if="o.typeId < 3">
      <el-radio label="A" size="large" v-if="o.optiona">
       A、 {{ o.optiona }}</el-radio
      ><br />
      <el-radio label="B" size="large" v-if="o.optionb">B、{{
        o.optionb
      }}</el-radio
      ><br />
      <el-radio label="C" size="large" v-if="o.optionc">C、{{
        o.optionc
      }}</el-radio
      ><br />
      <el-radio label="D" size="large" v-if="o.optiond">D、{{
        o.optiond
      }}</el-radio>
    </el-radio-group>
  </div>
  <el-card class="btn-nav">
    <a href="#select" class="maodian">选择</a>
    <a href="#judge" class="maodian">判断</a>
    <a href="#fill" class="maodian">填空</a>
    <a href="#compute" class="maodian">综合</a>
  </el-card>
</template>

<style>
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