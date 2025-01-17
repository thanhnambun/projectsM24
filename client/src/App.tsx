import HomePage from "./pages/HomePage";
// import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Luyenthi from "./pages/user/khoaluyenthi/Luyenthi";
import Monthi from "./pages/user/monthi/Dethi";
import Admin from "./pages/admin/Admin";
import Quanlycauhoi from "./pages/admin/questions/Quanlycauhoi";
import Quanlydethi from "./pages/admin/exams/Quanlydethi";
import Quanlykhoaluyenthi from "./pages/admin/courses/Quanlykhoaluyenthi";
import Quanlymonthi from "./pages/admin/examSubject/Quanlymonthi";
import Quanlynguoidung from "./pages/admin/profiveUser/Quanlynguoidung";
import Diemnguoidung from "./pages/admin/userAnswers/Diemnguoidung";
import Login from "./pages/user/login/Login";
import SubjectCard from "./pages/SubjectCard";
export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/luyenthi/:idkhoathi" element={<Luyenthi />}></Route>
          <Route
            path="/luyenthi/:idkhoathi/monthi/:idMonthi"
            element={<Monthi />}
          />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/admin" element={<Admin></Admin>}>
            <Route path="quanlycauhoi" element={<Quanlycauhoi />}></Route>
            <Route path="quanlydethi" element={<Quanlydethi />}></Route>
            <Route
              path="quanlykhoaluyenthi"
              element={<Quanlykhoaluyenthi />}
            ></Route>
            <Route path="quanlymonthi" element={<Quanlymonthi />}></Route>
            <Route path="quanlynguoidung" element={<Quanlynguoidung />}></Route>
            <Route path="diemnguoidung" element={<Diemnguoidung />}></Route>
          </Route>
        </Routes>
      </Router>
      {/* <Router>
          <Admin></Admin>
        <Routes>
        </Routes>
      </Router> */}
    </div>
  );
}
