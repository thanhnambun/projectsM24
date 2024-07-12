import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { UserAnswer } from "../../../interface/interface";

Modal.setAppElement("#root");

export default function Diemnguoidung() {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentUserAnswer, setCurrentUserAnswer] = useState<UserAnswer | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const userAnswersPerPage = 5; // Adjust the number of user answers per page as needed

  useEffect(() => {
    axios
      .get("http://localhost:8080/userAnswers")
      .then((response) => {
        setUserAnswers(response.data);
      })
      .catch((error) => {
        console.error("Lỗi!", error);
      });
  }, []);

  const handleAddUserAnswer = () => {
    setCurrentUserAnswer(null);
    setIsModalOpen(true);
  };

  const handleEditUserAnswer = (userAnswer: UserAnswer) => {
    setCurrentUserAnswer(userAnswer);
    setIsModalOpen(true);
  };

  const handleDeleteUserAnswer = (userAnswerId: number) => {
    if (window.confirm("Bạn có chắc muốn xóa ?")) {
      axios
        .delete(`http://localhost:8080/userAnswers/${userAnswerId}`)
        .then(() => {
          setUserAnswers(
            userAnswers.filter((answer) => answer.id !== userAnswerId)
          );
          alert("đã xóa thành công !");
        })
        .catch((error) => {
          console.error("lỗi !", error);
        });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const userAnswer: UserAnswer = {
      id: currentUserAnswer ? currentUserAnswer.id : 0,
      userId: Number(formData.get("userId")),
      examId: Number(formData.get("examId")),
      score: Number(formData.get("score")),
    };

    if (currentUserAnswer) {
      axios
        .put(`http://localhost:8080/userAnswers/${userAnswer.id}`, userAnswer)
        .then(() => {
          setUserAnswers(
            userAnswers.map((answer) =>
              answer.id === userAnswer.id ? userAnswer : answer
            )
          );
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("There was an error updating the user answer!", error);
        });
    } else {
      axios
        .post("http://localhost:8080/userAnswers", userAnswer)
        .then((response) => {
          setUserAnswers([...userAnswers, response.data]);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("There was an error creating the user answer!", error);
        });
    }
  };

  // Get current user answers for pagination
  const indexOfLastUserAnswer = currentPage * userAnswersPerPage;
  const indexOfFirstUserAnswer = indexOfLastUserAnswer - userAnswersPerPage;
  const currentUserAnswers = userAnswers.slice(
    indexOfFirstUserAnswer,
    indexOfLastUserAnswer
  );

  // Function to change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="main">
        <div className="nav_gallery">
          <div className="nav_gallery_left">
            <h4 className="text1">Quản lý điểm người dùng</h4>
          </div>
          <div className="nav_gallery_right">
            <button className="create" onClick={handleAddUserAnswer}>
              Thêm mới
            </button>
          </div>
        </div>
        {/* table */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">User Id</th>
              <th scope="col">Exam Id</th>
              <th scope="col">Score</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody id="tbody" className="table-group-divider">
            {currentUserAnswers.map((userAnswer) => (
              <tr key={userAnswer.id}>
                <td>{userAnswer.id}</td>
                <td>{userAnswer.userId}</td>
                <td>{userAnswer.examId}</td>
                <td>{userAnswer.score}</td>
                <td>
                  <button onClick={() => handleEditUserAnswer(userAnswer)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteUserAnswer(userAnswer.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination">
          {[
            ...Array(Math.ceil(userAnswers.length / userAnswersPerPage)).keys(),
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
        <h2>{currentUserAnswer ? "Edit User Answer" : "Add User Answer"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            User ID:
            <input
              name="userId"
              type="number"
              defaultValue={currentUserAnswer?.userId || ""}
              required
            />
          </label>
          <br />
          <label>
            Exam ID:
            <input
              name="examId"
              type="number"
              defaultValue={currentUserAnswer?.examId || ""}
              required
            />
          </label>
          <br />
          <label>
            Score:
            <input
              name="score"
              type="number"
              defaultValue={currentUserAnswer?.score || ""}
              required
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}
