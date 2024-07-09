import React from 'react';
import SubjectCard from '../../SubjectCard';
import'./Lop6.css'
import HeaderHomepage from '../../HeaderHomepage';
function Lop6() {
  const subjects = [
    { title: 'Toán', description: 'Bộ bài tập về đề kiểm tra toán lớp 6 với lời giải chi tiết dễ hiểu nhất', imageUrl: 'https://hocaz.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fhocthongminhs.appspot.com%2Fprod%2F2023%2F06%2F20%2F32743258.png&w=1920&q=75' },
    { title: 'Khoa học tự nhiên', description: 'Bộ bài tập và đề kiểm tra khoa học tự nhiên lớp 6 mới có lời giải chi tiết', imageUrl: 'https://hocaz.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fhocthongminhs.appspot.com%2Fprod%2F2023%2F06%2F20%2F52152259.jpg&w=1920&q=75' },
    { title: 'Lịch sử và Địa lý', description: 'Tổng hợp bài tập lịch sử và địa lý lớp 6 có đề kiểm tra chấm điểm', imageUrl: 'https://hocaz.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fhocthongminhs.appspot.com%2Fprod%2F2023%2F06%2F20%2F36462979.jpg&w=1920&q=75'},
    { title: 'Giáo dục công dân', description: 'Luyện bài tập và đề kiểm tra GDCD lớp 6 có giải thích', imageUrl: 'https://hocaz.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fhocthongminhs.appspot.com%2Fprod%2F2023%2F06%2F20%2F96633317.png&w=1920&q=75'},
    { title: 'Ngữ văn', description: 'Bộ bài tập và đề kiểm tra ngữ văn lớp 6 có chấm điểm chi tiết', imageUrl: 'https://hocaz.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fhocthongminhs.appspot.com%2Fprod%2F2023%2F06%2F20%2F23046684.jpg&w=1920&q=75'},
    { title: 'Tiếng anh', description: 'Xác định trình độ tiếng anh lớp 6 qua bài tập và đề kiểm tra', imageUrl: 'https://hocaz.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fhocthongminhs.appspot.com%2Fprod%2F2023%2F06%2F20%2F67857494.png&w=1920&q=75'},
  ];

  return (
    <div>

    <HeaderHomepage></HeaderHomepage>
    <div className="main-content">
      {subjects.map(subject => (
        <SubjectCard key={subject.title} {...subject} />
      ))}
    </div>
      </div>
  );
}

export default Lop6;