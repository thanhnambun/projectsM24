import React from "react";

export default function Quanlymonthi() {
  return (
    <div>
      {" "}
      <div className="main">
        <div className="nav_gallery">
          <div className="nav_gallery_left">
            <h4 className="text1">Quanr lý môn thi </h4>
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
                Môn thi                 
              </th>
              <th scope="col">khóa luyện thi </th>
              {/* <th scope="col"></th> */}
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody id="tbody" className="table-group-divider" />
        </table>
      </div>
    </div>
  );
}
