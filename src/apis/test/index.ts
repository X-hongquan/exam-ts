import http from "@/utils/http"
import { Test,R,TestDto } from "@/model"
import { UploadRequestOptions } from "element-plus"

export function upLoadTestAPI(file: UploadRequestOptions) {
  const formData = new FormData()
  formData.append("file", file.file)
  return http<R<null>>({
    url: "/test/upload",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

export function delTestAPI(id: number) {
  return http.delete<R<null>>(`/test?id=${id}`)
}

export function getTestsAPI() {
 return http.get<R<Test[]>>(`/test/list/id`)
}

export function addTestAPI(data:TestDto) {
  return http.post<R<null>>('/test',data)
}