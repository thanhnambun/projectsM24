import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Question } from "../../../interface/interface";

Modal.setAppElement("#root");

export default function Quanlycauhoi() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5; // Số câu hỏi trên mỗi trang

  useEffect(() => {
    axios
      .get("http://localhost:8080/questions")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("lỗi!", error);
      });
  }, []);

  const handleAddQuestion = () => {
    setCurrentQuestion(null);
    setIsModalOpen(true);
  };

  const handleEditQuestion = (question: Question) => {
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };

  const handleDelete = (questionId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này không?")) {
      axios
        .delete(`http://localhost:8080/questions/${questionId}`)
        .then(() => {
          setQuestions(
            questions.filter((question) => question.id !== questionId)
          );
          alert("Câu hỏi đã được xóa thành công!");
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi khi xóa câu hỏi!", error);
        });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const question: Question = {
      id: currentQuestion ? currentQuestion.id : 0,
      question: formData.get("question") as string,
      examId: Number(formData.get("examId")),
      options:
        formData
          .get("options")
          ?.toString()
          .split(",")
          .map((option) => option.trim()) || [],
      answer: formData.get("answer") as string,
    };

    if (currentQuestion) {
      axios
        .put(`http://localhost:8080/questions/${question.id}`, question)
        .then(() => {
          setQuestions(
            questions.map((q) => (q.id === question.id ? question : q))
          );
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("lỗi !", error);
        });
    } else {
      axios
        .post("http://localhost:8080/questions", question)
        .then((response) => {
          setQuestions([...questions, response.data]);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("lỗi!", error);
        });
    }
  };

  // Lấy câu hỏi hiện tại cho phân trang
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Hàm thay đổi trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="main">
        <div className="nav_gallery">
          <div className="nav_gallery_left">
            <p>Chuỗi các câu hỏi </p>
            <h4 className="text1">Câu hỏi</h4>
          </div>
          <div className="nav_gallery_right">
            <button className="create" onClick={handleAddQuestion}>
              Thêm mới
            </button>
          </div>
        </div>
        {/* table */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Đề</th>
              <th scope="col" style={{ minWidth: 200, maxWidth: 200 }}>
                Câu hỏi
              </th>
              <th scope="col">Các Đáp án</th>
              <th scope="col">Đáp án</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody id="tbody" className="table-group-divider">
            {currentQuestions.map((question, index) => (
              <tr key={question.id}>
                <td>{index + 1}</td>
                <td>{question.examTitle}</td>
                <td>{question.question}</td>
                <td>{question.options.join(", ")}</td>
                <td>{question.answer}</td>
                <td>
                  <button onClick={() => handleEditQuestion(question)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(question.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Phân trang */}
        <div className="pagination">
          {[
            ...Array(Math.ceil(questions.length / questionsPerPage)).keys(),
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
        <h2>{currentQuestion ? "Edit Question" : "Add Question"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Question:
            <input
              name="question"
              defaultValue={currentQuestion?.question || ""}
              required
            />
          </label>
          <br />
          <label>
            Exam ID:
            <input
              name="examId"
              type="number"
              defaultValue={currentQuestion?.examId || ""}
              required
            />
          </label>
          <br />
          <label>
            Options (comma separated):
            <input
              name="options"
              defaultValue={currentQuestion?.options.join(", ") || ""}
              required
            />
          </label>
          <br />
          <label>
            Answer:
            <input
              name="answer"
              defaultValue={currentQuestion?.answer || ""}
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
