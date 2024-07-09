import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import'./HeaderHomepage.css'

export default function HeaderHomepage() {
  return (
    <div>
      <header>
        <div className="logo">
          <div>
            <img
              style={{ display: "block" }}
              width="100px"
              src="https://firebasestorage.googleapis.com/v0/b/project-img-86376.appspot.com/o/logo.jpg?alt=media&token=080f3616-f2a4-4ae6-bba8-ed46901e8685"
              alt=""
            />
          </div>
        </div>
        <div className="menu-trangchu">
          <a className="menu" style={{ textDecoration: "none" }}>
            Luyện thi THPT
          </a>
          <a style={{ textDecoration: "none" }} className="nameBanner">
            Đề thi ĐGNL
          </a>
          <a style={{ textDecoration: "none" }} className="nameBanner">
            <NavDropdown title="THCS" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to={"/lop6"}>Lớp 6</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>Lớp 7</NavDropdown.Item>
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
        <Link to={"/login"} className="search">
          <Button variant="primary" size="lg">
            Đăng nhập
          </Button>
        </Link>
      </header>
    </div>
  );
}
