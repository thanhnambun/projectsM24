import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/fisabase";
import { Courses } from "../../../interface/interface";

export interface ExamSubjects {
  id: number;
  title: string;
  img: string;
  description: string;
  courseId: number;
}

Modal.setAppElement("#root");

export default function Quanlymonthi() {
  const [examSubjects, setExamSubjects] = useState<ExamSubjects[]>([]);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [currentExamSubject, setCurrentExamSubject] =
    useState<ExamSubjects | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const examSubjectsPerPage = 5; // Adjust the number of exam subjects per page as needed

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
        .delete(`http://localhost:8080/examSubject/${examSubjectId}`)
        .then(() => {
          setExamSubjects(
            examSubjects.filter((subject) => subject.id !== examSubjectId)
          );
          alert("Môn thi đã được xóa thành công!");
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi!", error);
        });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const imageRef = ref(storage, `images/${file.name}`);
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
        });
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
      img: imageUrl,
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

  // Get current exam subjects for pagination
  const indexOfLastExamSubject = currentPage * examSubjectsPerPage;
  const indexOfFirstExamSubject = indexOfLastExamSubject - examSubjectsPerPage;
  const currentExamSubjects = examSubjects.slice(
    indexOfFirstExamSubject,
    indexOfLastExamSubject
  );

  // Function to change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
            {currentExamSubjects.map((examSubject) => (
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
        <div className="pagination">
          {[
            ...Array(
              Math.ceil(examSubjects.length / examSubjectsPerPage)
            ).keys(),
          ].map((number) => (
            <button key={number} onClick={() => paginate(number + 1)}>
              {number + 1}
            </button>
          ))}
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
          <label>
            Ảnh:
            <input type="file" name="img" onChange={handleChange} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}
