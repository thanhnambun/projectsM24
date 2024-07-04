import "./HomePage.css";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <header>
        <div className="logo">
          <div>
            <img
              style={{ display: "block" }}
              width="100px"
              src="/folder_asset/423737895_1758954421253469_7838479141028168453_n.png"
              alt=""
            />
          </div>
        </div>
        <a
          className="menu"
          style={{ textDecoration: "none" }}
        >
          Luyện thi THPT
        </a>
        <div className="menu-trangchu">
          <a
            style={{ textDecoration: "none" }}
            className="nameBanner"
          >
            Đề thi ĐGNL
          </a>
          <a
            style={{ textDecoration: "none" }}
            className="nameBanner"
          >
            <NavDropdown title="THCS" id="basic-nav-dropdown">
              <NavDropdown.Item>
              <Link to={"/lop6"}>Lớp 6</Link>
              </NavDropdown.Item>
              <NavDropdown.Item >Lớp 7</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Lớp 8</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Lớp 9</NavDropdown.Item>
            </NavDropdown>
          </a>
          <a
            href="/folder_pages/phone.html"
            style={{ textDecoration: "none" }}
            className="nameBanner"
          >
            <NavDropdown title="THPT" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Lớp 10</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Lớp 11</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Lớp 12</NavDropdown.Item>
            </NavDropdown>
          </a>
        </div>
        <div className="search">
          <Button variant="primary" size="lg">
            Đăng nhập
          </Button>
        </div>
      </header>
      <body>
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="public/nhung-cau-noi-hay-ve-hoc-tap-2.jpg"
              alt="First slide"
              id="carousel-image"
            />
            <Carousel.Caption>
              <h5>Không lẽ </h5>
              <p>Bây giờ mình bỏ cuộc à</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="public/Nhung-cau-noi-hay-ngan-gon-01.jpeg"
              alt="Second slide"
              id="carousel-image"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="public/nhung-cau-noi-hay-ve-cong-viec-11.jpg"
              alt="Third slide"
              id="carousel-image"
            />
          </Carousel.Item>
        </Carousel>
        {/* phần thân  */}
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
            <div className="practice-panel">
              <div className="practice-panel-header">Trung học phổ thông</div>
              <div id="allProduct-section">
                <div className="product" id="product-container-1">
                  <div className="photo">
                    <img
                      src="public/lop-10.png"
                      style={{ width: "100%" }}
                      alt="photo"
                    />
                  </div>
                  <h4 className="h4-product">
                    Lớp 10
                  </h4>
                  <div className="textlorem">bộ bài tập và kiến thức mở  đầu cho cấp 3</div>
                  <p className="value">
                  </p>
                  <div className="tong">
                    <button className="timhieuthem">
                      <a
                        href="#"
                        style={{ textDecoration: "none" }}
                      >
                        luyện ngay 
                      </a>
                    </button>
                  </div>
                </div>
                <div className="product" id="product-container-1">
                  <div className="photo">
                    <img
                      src="public/lop-11.png"
                      style={{ width: "100%" }}
                      alt="photo"
                    />
                  </div>
                  <h4 className="h4-product">
                    Lớp 11
                  </h4>
                  <div className="textlorem">bộ bài tập , đề thi lớp 11 và lập kế hoạch cho tương lai </div>
                  <p className="value">
                  </p>
                  <div className="tong">
                    <button className="timhieuthem">
                      <a
                        href="#"
                        style={{ textDecoration: "none" }}
                      >
                        luyện ngay
                      </a>
                    </button>
                  </div>
                </div>
                <div className="product" id="product-container-1">
                  <div className="photo">
                    <img
                      src="public/lop-12.png"
                      style={{ width: "100%" }}
                      alt="photo"
                    />
                  </div>
                  <h4 className="h4-product">
                    Lớp 12
                  </h4>
                  <div className="textlorem">chuẩn bị cho kì thi tốt nghiệp cấp 3 và đại học với lớp 12 </div>
                  <p className="value">
                  </p>
                  <div className="tong">
                    <button className="timhieuthem">
                      <a
                        href="#"
                        style={{ textDecoration: "none" }}
                      >
                       luyện ngay
                      </a>
                    </button>
                  </div>
                </div>
                <div className="product" id="product-container-1">
                  <div className="photo">
                    <img
                      src="public/dgnl.png"
                      style={{ width: "100%" }}
                      alt="photo"
                    />
                  </div>
                  <h4 className="h4-product">
                    Đề thi ĐGNL
                  </h4>
                  <div className="textlorem"> Bộ đề thi đánh giá năng lực mới nhất từ các trường  </div>
                  <p className="value">
                  </p>
                  <div className="tong">
                    <button className="timhieuthem">
                      <a
                        href="#"
                        style={{ textDecoration: "none" }}
                      >
                        Tìm hiểu thêm
                      </a>
                    </button>
                  </div>
                </div>
                <div className="product" id="product-container-1">
                  <div className="photo">
                    <img
                      src="public/thpt.png"
                      style={{ width: "100%" }}
                      alt="photo"
                    />
                  </div>
                  <h4 className="h4-product">
                    Luyện thi THPT
                  </h4>
                  <div className="textlorem"> Bài tập và đề luyện thi THPT Quốc Gia mới nhất  </div>
                  <p className="value">
                  </p>
                  <div className="tong">
                    <button className="timhieuthem">
                      <a
                        href="#"
                        style={{ textDecoration: "none" }}
                      >
                        Tìm hiểu thêm
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="practice-panel">
              <div className="practice-panel-header">Trung học cơ sở</div>
              <div id="allProduct-section">
                <div className="product" id="product-container-1">
                  <div className="photo">
                    <img
                      src="public/lop-6.png"
                      style={{ width: "100%" }}
                      alt="photo"
                    />
                  </div>
                  <h4 className="h4-product">
                    Lớp 6
                  </h4>
                  <div className="textlorem">bộ bài tập và kiến thức mở  đầu cho cấp 2</div>
                  <p className="value">
                  </p>
                  <div className="tong">
                    <button className="timhieuthem">
                      <a
                        href="#"
                        style={{ textDecoration: "none" }}
                      >
                        luyện ngay 
                      </a>
                    </button>
                  </div>
                </div>
                <div className="product" id="product-container-1">
                  <div className="photo">
                    <img
                      src="public/lop-7.png"
                      style={{ width: "100%" }}
                      alt="photo"
                    />
                  </div>
                  <h4 className="h4-product">
                    Lớp 7
                  </h4>
                  <div className="textlorem">Khám phá những kiến thức và đề thi lớp 7 mới nhất  </div>
                  <p className="value">
                  </p>
                  <div className="tong">
                    <button className="timhieuthem">
                      <a
                        href="#"
                        style={{ textDecoration: "none" }}
                      >
                        luyện ngay
                      </a>
                    </button>
                  </div>
                </div>
                <div className="product" id="product-container-1">
                  <div className="photo">
                    <img
                      src="public/lop-8.png"
                      style={{ width: "100%" }}
                      alt="photo"
                    />
                  </div>
                  <h4 className="h4-product">
                    Lớp 8
                  </h4>
                  <div className="textlorem">Củng cố kiến thức và kĩ năng học tập lớp 8 </div>
                  <p className="value">
                  </p>
                  <div className="tong">
                    <button className="timhieuthem">
                      <a
                        href="#"
                        style={{ textDecoration: "none" }}
                      >
                       luyện ngay
                      </a>
                    </button>
                  </div>
                </div>
                <div className="product" id="product-container-1">
                  <div className="photo">
                    <img
                      src="public/lop-9.png"
                      style={{ width: "100%" }}
                      alt="photo"
                    />
                  </div>
                  <h4 className="h4-product">
                    Lớp 9
                  </h4>
                  <div className="textlorem">Chuẩn bị cho kì thi tốt nghiệp THCS cho lớp 9 </div>
                  <p className="value">
                  </p>
                  <div className="tong">
                    <button className="timhieuthem">
                      <a
                        href="#"
                        style={{ textDecoration: "none" }}
                      >
                        luyện ngay 
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      {/* footer */}
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
                  Địa chỉ: Đường Thanh Bình , Mộ Lao , Hà Đông
                  <br />
                  và Trực Ninh , Nam Định
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
