import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Exam, ExamSubjects } from "../../../interface/interface";

Modal.setAppElement("#root");

export default function Quanlydethi() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [examSubjects, setExamSubjects] = useState<ExamSubjects[]>([]);
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 6; 

  useEffect(() => {
    axios
      .get("http://localhost:8080/exams")
      .then((response) => {
        setExams(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the exams!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/examSubjects")
      .then((response) => {
        setExamSubjects(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the exam subjects!", error);
      });
  }, []);

  const handleAddExam = () => {
    setCurrentExam(null);
    setIsModalOpen(true);
  };

  const handleEditExam = (exam: Exam) => {
    setCurrentExam(exam);
    setIsModalOpen(true);
  };

  const handleDeleteExam = (examId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đề thi này không?")) {
      axios
        .delete(`http://localhost:8080/exams/${examId}`)
        .then(() => {
          setExams(exams.filter((exam) => exam.id !== examId));
          alert("Đề thi đã được xóa thành công!");
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi khi xóa đề thi!", error);
        });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const exam: Exam = {
      id: currentExam ? currentExam.id : 0,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      duration: Number(formData.get("duration")),
      examSubject: Number(formData.get("examSubjectId")),
    };

    if (currentExam) {
      axios
        .put(`http://localhost:8080/exams/${exam.id}`, exam)
        .then(() => {
          setExams(exams.map((ex) => (ex.id === exam.id ? exam : ex)));
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("There was an error updating the exam!", error);
        });
    } else {
      axios
        .post("http://localhost:8080/exams", exam)
        .then((response) => {
          setExams([...exams, response.data]);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("There was an error creating the exam!", error);
        });
    }
  };

  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = exams.slice(indexOfFirstExam, indexOfLastExam);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="main">
        <div className="nav_gallery">
          <div className="nav_gallery_left">
            <p>Quản lý đề thi</p>
            <h4 className="text1">Đề thi</h4>
          </div>
          <div className="nav_gallery_right">
            <button className="create" onClick={handleAddExam}>
              Thêm mới
            </button>
          </div>
        </div>
        {/* table */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col" style={{ minWidth: 200, maxWidth: 200 }}>
                Đề thi
              </th>
              <th scope="col">Mô tả</th>
              <th scope="col">Thời gian</th>
              <th scope="col">ID Môn thi</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody id="tbody" className="table-group-divider">
            {currentExams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.id}</td>
                <td>{exam.title}</td>
                <td>{exam.description}</td>
                <td>{exam.duration}</td>
                <td>{exam.examSubject}</td>
                <td>
                  <button onClick={() => handleEditExam(exam)}>Sửa</button>
                  <button onClick={() => handleDeleteExam(exam.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {[...Array(Math.ceil(exams.length / examsPerPage)).keys()].map(
            (number) => (
              <button key={number} onClick={() => paginate(number + 1)}>
                {number + 1}
              </button>
            )
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            width: "400px",
          },
        }}
      >
        <h2>{currentExam ? "Sửa đề thi" : "Thêm đề thi"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Tên đề thi:
            <input
              name="title"
              defaultValue={currentExam?.title || ""}
              required
            />
          </label>
          <br />
          <label>
            Mô tả:
            <input
              name="description"
              defaultValue={currentExam?.description || ""}
              required
            />
          </label>
          <br />
          <label>
            Thời gian (phút):
            <input
              name="duration"
              type="number"
              defaultValue={currentExam?.duration || ""}
              required
            />
          </label>
          <br />
          <label>
            Môn thi:
            <select
              name="examSubjectId"
              defaultValue={currentExam?.examSubject || ""}
              required
            >
              {examSubjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.title}
                </option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit">Gửi</button>
        </form>
        <button onClick={() => setIsModalOpen(false)}>Đóng</button>
      </Modal>
    </div>
  );
}
