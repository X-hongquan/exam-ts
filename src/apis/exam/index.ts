import http from "@/utils/http"
import { ExamVo, ExamDto,R } from "@/model"
import { LocationQueryValue } from "vue-router"

export function getDoingExamAPI() {
  return http.get<R<ExamVo[]>>("/exam/doing")
}

export function getCompletedExamAPI() {
  return http.get<R<ExamVo[]>>("/exam/completed")
}

export function addExamAPI(data: ExamDto) {
  return http.post<R<null>>("exam", data)
}

//删除考试
export function delExamAPI(id: number) {
  return http.delete<R<null>>(`exam?examId=${id}`)
}

//获取考试信息
export function getExamAPI(id:LocationQueryValue | LocationQueryValue[]) {
  return http.get<R<ExamVo>>(`exam?examId=${id}`)
}

export function examIsBeginAPI(id: number) {
  return http.get<R<null>>(`/exam/begin?examId=${id}`)
}
