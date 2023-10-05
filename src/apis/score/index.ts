import http from "@/utils/http"
import { Score, R ,ScoreVo } from "@/model"
import { LocationQueryValue } from "vue-router"

export function saveScoreAPI(data: Score) {
  return http.post<R<null>>("/score", data)
}

export function getScoreVosAPI(examId: LocationQueryValue | LocationQueryValue[]) {
  return http.get<R<ScoreVo[]>>(`/score/list?examId=${examId}`)
}

export function getScoreExcel(examId: LocationQueryValue | LocationQueryValue[]) {
  return http({
    url: "/score/download",
    params: {
      examId,
    },
    responseType: "blob",
  })
}

