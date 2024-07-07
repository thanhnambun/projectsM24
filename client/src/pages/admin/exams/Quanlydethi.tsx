import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Exam } from "../../../interface/interface";

Modal.setAppElement("#root");

export default function Quanlydethi() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAddExam = () => {
    setCurrentExam(null);
    setIsModalOpen(true);
  };

  const handleEditExam = (exam: Exam) => {
    setCurrentExam(exam);
    setIsModalOpen(true);
  };

  const handleDelete = (examId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đề thi này  dùng này không?")) {
      axios
        .delete(`http://localhost:8080/profiveUser/${examId}`)
        .then(() => {
          setExams(exams.filter((exams) => exams.id !== examId));
          alert("Người dùng đã được xóa thành công!");
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi khi xóa người dùng!", error);
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
      examSubjectId: Number(formData.get("examSubjectId")),
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

  return (
    <div>
      <div className="main">
        <div className="nav_gallery">
          <div className="nav_gallery_left">
            <p>Chuỗi các câu hỏi </p>
            <h4 className="text1">Câu hỏi</h4>
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
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Exam Subject ID</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody id="tbody" className="table-group-divider">
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.id}</td>
                <td>{exam.title}</td>
                <td>{exam.description}</td>
                <td>{exam.duration}</td>
                <td>{exam.examSubjectId}</td>
                <td>
                  <button onClick={() => handleEditExam(exam)}>Edit</button>
                  <button onClick={() => handleDelete(exam.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <h2>{currentExam ? "Edit Exam" : "Add Exam"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input name="title" defaultValue={currentExam?.title || ""} required />
          </label>
          <br />
          <label>
            Description:
            <input name="description" defaultValue={currentExam?.description || ""} required />
          </label>
          <br />
          <label>
            Duration:
            <input name="duration" type="number" defaultValue={currentExam?.duration || ""} required />
          </label>
          <br />
          <label>
            Exam Subject ID:
            <input name="examSubjectId" type="number" defaultValue={currentExam?.examSubjectId || ""} required />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}
