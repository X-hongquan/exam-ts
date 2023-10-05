import http from "@/utils/http";

import { StuClass,R } from "@/model";



//获取所有班级信息
export function getAllClassAPI() {
   return  http.get<R<StuClass[]>>('stuClass/list')
}