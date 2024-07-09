export interface UserType {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    status: boolean;
    img:string
    role: "ADMIN" | "USER";
  }
  export interface Courses{
    id:number,
    img:string
    title:string,
    description:string,
  }
  export interface ExamSubjects{
    id:number,
    title:string,
    description:string,
    courseId : number,
  }
  export interface Exam{
    id:number,
    title:string,
    description:string,
    duration:number,
    examSubjectId : number,
  }
  export interface Question{
    id:number,
    question:string,
    examId : number,
    options:[],
    answer:string,
  }
  export interface UserAnswer{
    id:number,
   userId:number,
    examId:number,
    score:number,
  }