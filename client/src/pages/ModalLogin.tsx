// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import "./ModalAdd.css";
// import { UserProfile } from '../store/reducer/reducerProfile';

// interface ModalAddProps {
//   addUser: (newUser: UserProfile) => void;
//   closeModalAdd: () => void;
// }

// export default function ModalAdd({ closeModalAdd, }: ModalAddProps) {
//   const [userFirstName, setFirstName] = useState<string>('');
//   const [userLastName, setLastName] = useState<string>('');
//   const [userEmail, setEmail] = useState<string>('');
//   const [userPassword, setuserPassword] = useState<string>('');

//   const dispatch:any = useDispatch();

//   const handleSubmit = () => {
//     const newUser:any = {
//       id: Date.now(),
//       userFirstName,
//       userLastName,
//       userEmail,
//       userPassword,
//       status: false
//     };
//     dispatch(addUser(newUser));
//     closeModalAdd();
//   };

//   return (
//     <>
//       <div className='modalAdd'>
//         <div className="headerModalAdd">
//           <h4>Đăng nhập </h4>
//           <button onClick={closeModalAdd}>X</button>
//         </div>
//         <div className="mainModalAdd">
//           <label htmlFor="userFirstName">First Name</label>
//           <input 
//             type="text" 
//             id="userFirstName" 
//             value={userFirstName} 
//             onChange={(e) => setFirstName(e.target.value)} 
//           />
//           <label htmlFor="userStudent">Last name</label>
//           <input 
//             type="text" 
//             id="userStudent" 
//             value={userLastName} 
//             onChange={(e) => setLastName(e.target.value)} 
//           />
//           <label htmlFor="borrowedDay">Email</label>
//           <input 
//             type="date" 
//             id="userEmail" 
//             value={userEmail} 
//             onChange={(e) => setEmail(e.target.value)} 
//           />
//           <label htmlFor="borrowedDay">Password</label>
//           <input 
//             type="date" 
//             id="userPassword" 
//             value={userPassword} 
//             onChange={(e) => setuserPassword(e.target.value)} 
//           />
          
//         </div>
//         <div className="footerModalAdd">
//           <button onClick={handleSubmit}>Lưu</button>
//         </div>
//       </div>
//       <div className="overlay" onClick={closeModalAdd}></div>
//     </>
//   );
// }