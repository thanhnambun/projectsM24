import React, { useEffect, useState } from "react";
import axios from "axios";
import { Courses } from "../interface/interface";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import HeaderHomepage from "./HeaderHomepage";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 9;

export default function HomePage() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page of courses
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  // Calculate courses to display based on current page
  const indexOfLastCourse = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstCourse = indexOfLastCourse - ITEMS_PER_PAGE;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handleCardClick = (id: number) => {
    navigate(`/luyenthi/${id}`);
  };

  // Pagination click handler
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <HeaderHomepage />
      <body>
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/public/nhung-cau-noi-hay-ve-hoc-tap-2.jpg"
              alt="First slide"
              id="carousel-image"
            />
            <Carousel.Caption>
              <h5>Không lẽ</h5>
              <p>Bây giờ mình bỏ cuộc à</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/public/Nhung-cau-noi-hay-ngan-gon-01.jpeg"
              alt="Second slide"
              id="carousel-image"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/public/nhung-cau-noi-hay-ve-cong-viec-11.jpg"
              alt="Third slide"
              id="carousel-image"
            />
          </Carousel.Item>
        </Carousel>
        {/* Main section */}
        <div
          id="main"
          style={{ marginTop: "-1px", paddingBottom: 80, minHeight: 700 }}
        >
          <div className="MuiContainer-root MuiContainer-maxWidthXl css-1ll7j1d">
            <h1 className="overview-text">
              Bộ bài tập và đề thi trắc nghiệm online các lớp
              <div className="overview-des">
                Bộ bài tập và đề thi được cá nhân hóa theo trình độ từng học
                sinh giúp các em tự tin đứng top chỉ với 30 phút học mỗi ngày.
              </div>
            </h1>
            <div className="full">
              {/* Render courses */}
              {currentCourses.map((course) => (
                <div
                  key={course.id}
                  className="subject-card"
                  onClick={() => handleCardClick(course.id)}
                >
                  <div className="subject-item">
                    <img
                      src={course.img}
                      alt={course.title}
                      className="subject-image"
                    />
                    <div className="subject-info">
                      <h2>{course.title}</h2>
                      <p>{course.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <ul className="pagination">
              {Array.from(
                { length: Math.ceil(courses.length / ITEMS_PER_PAGE) },
                (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginate(i + 1)}
                      className="page-link"
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </body>
      {/* Footer */}
      <footer className="footer">
        <div className="wrapper-footer">
          <div className="block1">
            <div className="logo-footer">
              <img
                src="/folder_asset/423737895_1758954421253469_7838479141028168453_n.png"
                style={{ height: 100 }}
                alt=""
              />
            </div>
            <p>
              Website chuyên cung cấp phẩm giá sỉ lẻ phân khối
              <br />
              toàn quốc, khách hàng có nhu cầu vui lòng đặt <br />
              hàng để chúng tôi kiểm kho và báo lại sớm nhất. <br />
              Ngoài ra chúng tôi còn cung cấp hàng sỉ lẻ khi <br />
              đặt số lượng lớn.
              <br />
            </p>
          </div>
          <div className="links-container">
            <h4>YHL store</h4>
            <ul>
              <li>
                <a style={{ textDecoration: "none" }}>giới thiệu</a>
              </li>
              <li>
                <a style={{ textDecoration: "none" }}>liên hệ</a>
              </li>
              <li>
                <a style={{ textDecoration: "none" }}>học tập</a>
              </li>
            </ul>
          </div>
          <div className="chinhsach">
            <h4>Chính sách</h4>
            <ul>
              <li>
                <a href="#" style={{ textDecoration: "none" }}>
                  Chính sách riêng tư
                </a>
              </li>
              <li>
                <a href="#" style={{ textDecoration: "none" }}>
                  điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>
          <div className="lienhe">
            <h4>Liên hệ với chúng tôi</h4>
            <ul>
              <li>
                <p></p>
              </li>
              <li>
                <p>Người đại diện: Nguyễn Thành Nam</p>
              </li>
              <li>
                <p>
                  Địa chỉ: Đường Thanh Bình, Mộ Lao, Hà Đông
                  <br />
                  và Trực Ninh, Nam Định
                </p>
              </li>
              <li>
                <p>Điện thoại: 02839369142</p>
              </li>
              <li>
                <p>Email: namnguyen@gmail.com</p>
              </li>
              <li>
                <p>MSDN: 0102289856 cấp ngày 23/05/2007 tại Hà Nội</p>
              </li>
            </ul>
          </div>
          <div className="follow-container">
            <div className="follow">
              <h4>Theo dõi chúng tôi tại:</h4>
            </div>
            <div className="icon">
              <ul>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-instagram" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-youtube" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-twitter" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
