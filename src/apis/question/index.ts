import http from "@/utils/http"

import { UploadRequestOptions } from "element-plus"
import { Question,R,Choice } from "@/model"

export function upLoadQAPI(file: UploadRequestOptions) {
  const formData = new FormData()
  formData.append("file", file.file)
  return http<R<null>>({
    url: "/question/excel",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

export function getQuestionsAPI(testId: number) {
  return http.get<R<Question[]>>(`/question/one?testId=${testId}`)
}

export function getAllQuestionsAPI(data:Choice) {
  return http.post<R<Question[]>>('/question/all',data)
}