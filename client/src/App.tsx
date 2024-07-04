import HomePage from './pages/HomePage'
// import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Luyenthithpt from './pages/luyenthithpt/Luyenthithpt';
import Luyenthidgnl from './pages/luyenthidgnl/Luyenthidgnl';
import Lop6 from './pages/thcs/Lop6';
  export default function App() {
  return (
    <div>
       <Router>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}/>
        <Route path="/luyenthithpt" element={<Luyenthithpt/>} />
        <Route path="/luyenthidgnl" element={<Luyenthidgnl />} />
        <Route path="/lop6" element={< Lop6/>} />
        {/* <Route path="/services/seo" element={<THPT />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
      {/* <Login/> */}
    </div>
  )
}
