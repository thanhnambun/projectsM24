import HomePage from "./pages/HomePage";
// import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Luyenthithpt from "./pages/user/luyenthithpt/Luyenthithpt";
import Luyenthidgnl from "./pages/user/luyenthidgnl/Luyenthidgnl";
import Lop6 from "./pages/user/thcs/Lop6";
import Admin from "./pages/admin/Admin";
import Quanlycauhoi from "./pages/admin/quanlycauhoi/Quanlycauhoi";
import Quanlydethi from "./pages/admin/quanlydethi/Quanlydethi";
import Quanlykhoaluyenthi from "./pages/admin/quanlykhoaluyenthi/Quanlykhoaluyenthi";
import Quanlymonthi from "./pages/admin/quanlymonthi/Quanlymonthi";
import Quanlynguoidung from "./pages/admin/quanlynguoidung/Quanlynguoidung";
export default function App() {
  return (
    <div>
      {/* <Router>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}/>
        <Route path="/luyenthithpt" element={<Luyenthithpt/>} />
        <Route path="/luyenthidgnl" element={<Luyenthidgnl />} />
        <Route path="/lop6" element={< Lop6/>} />
      
      </Routes>
    </Router> */}
      {/* <Login/> */}
      <Router>
          <Admin></Admin>
        <Routes>
          <Route
            path="/quanlycauhoi"
            element={<Quanlycauhoi/>}
          ></Route>
          <Route
            path="/quanlydethi"
            element={<Quanlydethi/>}
          ></Route>
          <Route
            path="/quanlykhoaluyenthi"
            element={<Quanlykhoaluyenthi/>}
          ></Route>
          <Route
            path="/quanlymonthi"
            element={<Quanlymonthi/>}
          ></Route>
          <Route
            path="/quanlynguoidung"
            element={<Quanlynguoidung/>}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}
