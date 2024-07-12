import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Luyenthi.css";
import HeaderHomepage from "../../HeaderHomepage";
import { ExamSubjects } from "../../../interface/interface";

export default function Luyenthithpt() {
  let { idkhoathi } = useParams<{ idkhoathi: string }>();

  const navigate = useNavigate();
  const [examSubjects, setExamSubjects] = useState<ExamSubjects[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/examSubject")
      .then((response) => {
        setExamSubjects(response.data);
      })
      .catch((error) => {
        console.error("lỗi!", error);
      });
  }, []);

  const handleCardClick = (idMonthi: number) => {
    navigate(`monthi/${idMonthi}`);
  };

  return (
    <div>
      <HeaderHomepage></HeaderHomepage>
      <div className="main">
        <div className="title-topic">
          <h1 className="title-h1">THI THử THPT Quốc Gia</h1>
          <p className="summary">
            Bộ đề thi thử THPT Quốc Gia các môn Toán, Lý, Hóa, Sinh, Sử, Địa,
            Giáo Dục Công Dân, Tiếng Anh với đề thi chọn lọc từ các trường và
            những dạng bài thi bám sát với chương trình thi đại học.
          </p>
        </div>
        <div className="full">
          {examSubjects
            .filter(
              (examSubject: any) => examSubject.coursesId === Number(idkhoathi)
            )
            .map((examSubject) => (
              <div
                key={examSubject.id}
                className="subject-card"
                onClick={() => handleCardClick(examSubject.id)}
              >
                <img
                  src={examSubject.img}
                  alt={examSubject.title}
                  className="subject-image"
                />
                <div className="subject-info">
                  <h2>{examSubject.title}</h2>
                  <p>{examSubject.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
