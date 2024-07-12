import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderHomepage from "../../HeaderHomepage";
import "./Dethi.css";

export interface Exam {
  id: number;
  title: string;
  description: string;
  duration: number;
  examSubject: number;
}

export interface ExamSubjects {
  id: number;
  title: string;
  img: string;
  description: string;
  coursesId: number;
}

export default function Monthi() {
  const [exams, setExams] = useState<Exam[]>([]);
  const { idMonthi, idkhoathi } = useParams<{
    idMonthi: string;
    idkhoathi: string;
  }>();

  const [examSubjects, setExamSubjects] = useState<ExamSubjects[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/exams")
      .then((response) => {
        setExams(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exams:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/examSubject")
      .then((response) => {
        setExamSubjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exam subjects:", error);
      });
  }, []);

  const filteredExamSubjects = examSubjects.filter(
    (examSubject) => examSubject.coursesId === Number(idkhoathi)
  );

  const matchingExams = exams.filter((exam) =>
    filteredExamSubjects.some(
      (examSubject) =>
        exam.examSubject === examSubject.id &&
        examSubject.id === Number(idMonthi)
    )
  );

  return (
    <div>
      <HeaderHomepage />
      <div className="main">
        <div className="subject-page">
          <div className="title-topic"></div>
          <div className="body">
            <div className="body-left">
              {matchingExams.map((exam) => (
                <div key={exam.id} className="exam">
                    <h1 className="title-h1">{exam.title}</h1>
                  <p className="summary">{exam.description}</p>
                  <p>Duration: {exam.duration} minutes</p>
                </div>
              ))}
            </div>
            <div className="body-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
