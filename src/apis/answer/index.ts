import http from "@/utils/http"
import { UploadRequestOptions } from "element-plus"
import { AnswerDto,Answer,R } from "@/model"

export function uploadAnswerPictureAPI(file: UploadRequestOptions) {
  const formData = new FormData()
  formData.append("file", file.file)
  return http<R<string>>({
    url: "/answer/upload",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

export function commitExamAPI(data: AnswerDto) {
  return http.post<R<null>>("/answer", data)
}

export function getAnswerAPI(examId:any, userId:number) {
  return http.get<R<Answer>>(`/answer?examId=${examId}&userId=${userId}`)
}

export function getMyAnswerAPI(id:any) {
  return http.get<R<Answer>>(`/answer/byId?id=${id}}`)
}