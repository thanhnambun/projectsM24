import React from "react";
import "./Admin.css"
import { Link } from "react-router-dom";
export default function Admin() {
  return (
    <div>
      <div>
        <header className="header">
          <div className="khoitrai">
            <img src="public/logo.jpg" className="logo" alt="logo" />
            <h4 className="tenlogo">HOCTOT</h4>
          </div>
          <div className="khoiphai">
            <a href="#">
              <i className="fa-regular fa-bell" />
            </a>
            <p className="userName">
              thanhnam <br /> HN, VietNam{" "}
            </p>
            <img
              src="/SVG/A-Blank-pic 2.svg"
              alt="nguoidung"
              className="nguoidung"
            />
          </div>
        </header>
        <section className="body">
          <nav>
            <menu className="menu">
              <div className="menu-link">
              <Link to={"/quanlykhoaluyenthi"}>Quản lý khóa luyện thi </Link>
              </div>
              <div  className="menu-link">
                <Link to={"/quanlymonthi"}>Quản lý môn thi </Link>
              </div>
              <a  className="menu-link">
                <Link to={"/quanlydethi"}>Quản lý đề thi </Link>
              </a>
              <a className="menu-link-doodle">
                <Link to={"/quanlycauhoi"}>Quản lý câu hỏi</Link>
              </a>
              <a  className="menu-link">
                <Link to={"quanlynguoidung"}>Người dùng </Link>
              </a>
              <div  className="menu-link">
                <Link to={"/diemnguoidung"}>Điểm người dùng  </Link>
              </div>
              <a href="" className="menu-link">
                <i className="fa-solid fa-gear" />
                <span>Cài đặt </span>
              </a>
            </menu>
          </nav>
        </section>
      </div>
    </div>
  );
}
