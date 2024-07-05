import React from "react";

export default function Quanlycauhoi() {
  return (
    <div>
      <div className="main">
        <div className="nav_gallery">
          <div className="nav_gallery_left">
            <p>Chuỗi các câu hỏi </p>
            <h4 className="text1">Câu hỏi</h4>
          </div>
          <div className="nav_gallery_right">
            <button className="create">Câu hỏi </button>
          </div>
        </div>
        {/* table */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Mã đề</th>
              <th scope="col">STT</th>
              <th scope="col" style={{ minWidth: 200, maxWidth: 200 }}>
                câu hỏi 
              </th>
              <th scope="col">đáp án</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody id="tbody" className="table-group-divider" />
        </table>
      </div>
    </div>
  );
}
