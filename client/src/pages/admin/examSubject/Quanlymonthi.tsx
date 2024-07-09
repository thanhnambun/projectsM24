import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { ExamSubjects, Courses } from "../../../interface/interface";

Modal.setAppElement("#root");

export default function Quanlymonthi() {
  const [examSubjects, setExamSubjects] = useState<ExamSubjects[]>([]);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [currentExamSubject, setCurrentExamSubject] =
    useState<ExamSubjects | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  useEffect(() => {
    axios
      .get("http://localhost:8080/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("lỗi!", error);
      });
  }, []);

  const handleAddExamSubject = () => {
    setCurrentExamSubject(null);
    setIsModalOpen(true);
  };

  const handleEditExamSubject = (examSubject: ExamSubjects) => {
    setCurrentExamSubject(examSubject);
    setIsModalOpen(true);
  };

  const handleDeleteExamSubject = (examSubjectId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      axios
        .delete(`http://localhost:8080/course/${examSubjectId}`)
        .then(() => {
          setExamSubjects(
            examSubjects.filter((course) => course.id !== examSubjectId)
          );
          alert("Câu hỏi đã được xóa thành công!");
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi!", error);
        });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const examSubject: ExamSubjects = {
      id: currentExamSubject ? currentExamSubject.id : 0,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      courseId: Number(formData.get("courseId")),
    };

    if (currentExamSubject) {
      axios
        .put(`http://localhost:8080/examSubject/${examSubject.id}`, examSubject)
        .then(() => {
          setExamSubjects(
            examSubjects.map((subject) =>
              subject.id === examSubject.id ? examSubject : subject
            )
          );
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("lỗi !", error);
        });
    } else {
      axios
        .post("http://localhost:8080/examSubject", examSubject)
        .then((response) => {
          setExamSubjects([...examSubjects, response.data]);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("lỗi !", error);
        });
    }
  };

  return (
    <div>
      <div className="main">
        <div className="nav_gallery">
          <div className="nav_gallery_left">
            <h4 className="text1">Quản lý môn thi</h4>
          </div>
          <div className="nav_gallery_right">
            <button className="create" onClick={handleAddExamSubject}>
              Thêm mới
            </button>
          </div>
        </div>
        {/* table */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col" style={{ minWidth: 200, maxWidth: 200 }}>
                Môn thi
              </th>
              <th scope="col">Khóa luyện thi</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody id="tbody" className="table-group-divider">
            {examSubjects.map((examSubject) => (
              <tr key={examSubject.id}>
                <td>{examSubject.id}</td>
                <td>{examSubject.title}</td>
                <td>{examSubject.description}</td>
                <td>
                  <button onClick={() => handleEditExamSubject(examSubject)}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteExamSubject(examSubject.id)}
                  >
                    Delete
                  </button>
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
        <h2>{currentExamSubject ? "Edit Exam Subject" : "Add Exam Subject"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              name="title"
              defaultValue={currentExamSubject?.title || ""}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              name="description"
              defaultValue={currentExamSubject?.description || ""}
            />
          </label>
          <br />
          <label>
            Course:
            <select
              name="courseId"
              defaultValue={currentExamSubject?.courseId || ""}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select> 
          </label>

          <br />
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}
