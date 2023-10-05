import http from '@/utils/http'
import { Course,R } from '@/model'


export function getCourseListAPI() {
    return http.get<R<Course[]>>('/course/list')
}