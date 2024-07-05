import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Courses } from "../../../interface/interface";



export default function Quanlykhoaluyenthi() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [currentCourse, setCurrentCourse] = useState<Courses | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const handleAddCourse = () => {
    setCurrentCourse(null);
    setIsModalOpen(true);
  };

  const handleEditCourse = (course: Courses) => {
    setCurrentCourse(course);
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (courseId: number) => {
    axios
      .delete(`http://localhost:8080/courses/${courseId}`)
      .then(() => {
        setCourses(courses.filter((course) => course.id !== courseId));
      })
      .catch((error) => {
        console.error("There was an error deleting the course!", error);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const course: Courses = {
      id: currentCourse ? currentCourse.id : 0,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    };

    if (currentCourse) {
      axios
        .put(`http://localhost:8080/courses/${course.id}`, course)
        .then(() => {
          setCourses(courses.map((c) => (c.id === course.id ? course : c)));
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("There was an error updating the course!", error);
        });
    } else {
      axios
        .post("http://localhost:8080/courses", course)
        .then((response) => {
          setCourses([...courses, response.data]);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("There was an error creating the course!", error);
        });
    }
  };

  return (
    <div>
      <div className="main">
        <div className="nav_gallery">
          <div className="nav_gallery_left">
            <p>Khóa luyện thi</p>
            <h4 className="text1">Khóa luyện thi</h4>
          </div>
          <div className="nav_gallery_right">
            <button className="create" onClick={handleAddCourse}>Thêm mới</button>
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
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>
                  <button onClick={() => handleEditCourse(course)}>Sửa</button>
                  <button onClick={() => handleDeleteCourse(course.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" defaultValue={currentCourse?.title || ""} required />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input id="description" name="description" type="text" defaultValue={currentCourse?.description || ""} required />
          </div>
          <button type="submit">{currentCourse ? "Update" : "Create"}</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
}
