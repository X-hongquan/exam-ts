export interface Course {
    id:number
    courseName:string
    createTime:string
}

export interface Question {
    id:number
    testId:number
    degree:number
    grade:number
    content:string
    sort:number
    optiona:string
    optionb:string
    optionc:string
    optiond:string
    result:string
    typeId:number
    userId:number
    createTime:string

}

export interface User {
    value: any
    id:number
    sno:string
    name:string
    sex:string
    phone:string
    bornDate:string
    classId:number
    className:string
    position:string
    positionId:number
    email:string
 }
 
export interface LoginUser {
    phone:string
    password:string
 }

export interface StuClass {
    id:number
    className:string
    createTime:string
}

export interface ExamVo {
   id:number
   title:string
   testId:number
   beginTime:string
   endTime:string
   classId:string
   userId:number
   courseName:string
   className:string
   name:string
   score:number
   createTIme:string
}

export interface ExamDto {
    title:string
    classId:number
    courseName:string
    testId:number
    timeArray:[]
}

export interface Test {
    id:number
    authorId:number
    name:string
    degree:number
    sum:number
    courseId:number
    authorName:string
    url:string
    createTime:string
}

export interface Answer {
    id:number
    examId:number
    radioList:string
    otherList:string
    userId:number
    createTime:string
}
export interface AnswerDto {
    examId:number
    radioList:string[]
    otherList:string[]
}

export interface UserDto {
     id:number
     phone:string
     sno:string
     name:string
     classId:number
     sex:string
     bornDate:string
     email:string
     positionId:number
     status:number
}
export interface R<T> {
    code:number
    data:T
    msg:string
    total:number
}

export interface PasswordDto {
     password:string
     code:string
}

export interface Score {
    userId:number
    examId:number
    selectScore:number
    ohterScore:number
    createTime?:string
    id?:number

}

export interface ScoreVo {
    userId:number
    sno:string
    name:string
    className:string
    subject:string
    score:number
}

export interface TestDto {
    courseId: number
    degree: number
    sum: number
    name:string
    newTest: Question[]
}

export interface Choice{
    concurrentPage: number
    courseId: number
    degree: number;
    typeId: number;
}