import axios from "axios";
import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Modal from "react-modal";
import { storage } from "../../../config/fisabase";
// import { Courses } from "../../../interface/interface";
export interface Courses {
  id: number;
  img: string;
  title: string;
  description: string;
}

Modal.setAppElement("#root");

export default function Quanlykhoaluyenthi() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [currentCourse, setCurrentCourse] = useState<Courses | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5; // Adjust the number of courses per page as needed

  useEffect(() => {
    axios
      .get("http://localhost:8080/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Lỗi!", error);
      });
  }, []);

  const handleAddCourse = () => {
    setCurrentCourse(null);
    setIsModalOpen(true);
  };

  const handleEditCourse = (course: Courses) => {
    setCurrentCourse({ ...course });
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (courseId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      axios
        .delete(`http://localhost:8080/course/${courseId}`)
        .then(() => {
          setCourses(courses.filter((course) => course.id !== courseId));
          alert("Khóa học đã được xóa thành công!");
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const course: Courses = {
      id: currentCourse ? currentCourse.id : 0,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      img: imageUrl,
    };

    if (currentCourse) {
      axios
        .put(`http://localhost:8080/courses/${course.id}`, course)
        .then(() => {
          setCourses(courses.map((c) => (c.id === course.id ? course : c)));
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi khi cập nhật khóa học!", error);
        });
    } else {
      axios
        .post("http://localhost:8080/courses", course)
        .then((response) => {
          setCourses([...courses, response.data]);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi khi tạo khóa học!", error);
        });
    }
  };

  // Get current courses for pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Function to change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="main">
        <div className="nav_gallery">
          <div className="nav_gallery_left">
            <p>Khóa luyện thi</p>
          </div>
          <div className="nav_gallery_right">
            <button className="create" onClick={handleAddCourse}>
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
                Khóa luyện thi
              </th>
              <th>Decription</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody id="tbody" className="table-group-divider">
            {currentCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>
                  <button onClick={() => handleEditCourse(course)}>Sửa</button>
                  <button onClick={() => handleDeleteCourse(course.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination">
          {[...Array(Math.ceil(courses.length / coursesPerPage)).keys()].map(
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
        <h2>{currentCourse ? "Edit Course" : "Add Course"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={currentCourse?.title || ""}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              defaultValue={currentCourse?.description || ""}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              id="upLoadImg"
              name="upLoadImg"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {currentCourse ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
}
