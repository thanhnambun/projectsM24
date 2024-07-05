import React from "react";

export default function Quanlydethi() {
  return (
    <div>
      {" "}
      <div className="main">
        <div className="nav_gallery">
          <div className="nav_gallery_left">
            <p>Quản lý đề thi </p>
            <h4 className="text1">đề thi </h4>
          </div>
          <div className="nav_gallery_right">
            <button className="create">thêm mới </button>
          </div>
        </div>
        {/* table */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col" style={{ minWidth: 200, maxWidth: 200 }}>
                mã đề thi
              </th>
              <th scope="col">MÔn thi </th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody id="tbody" className="table-group-divider" />
        </table>
      </div>
    </div>
  );
}
