import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { UserType } from "../../../interface/interface";

Modal.setAppElement("#root");

export default function QuanLyNguoiDung() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/profiveUser")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("lỗi !", error);
      });
  }, []);

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: UserType) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      axios
        .delete(`http://localhost:8080/profiveUser/${userId}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== userId));
          alert("Người dùng đã được xóa thành công!");
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi khi xóa người dùng!", error);
        });
    }
  };

  const handleStatusChange = (user: UserType) => {
    const updatedUser = { ...user, status: !user.status };
    axios
      .put(`http://localhost:8080/profiveUser/${user.id}`, updatedUser)
      .then(() => {
        setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
        alert(`Trạng thái người dùng đã được thay đổi thành ${updatedUser.status ? "Active" : "Inactive"}`);
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi cập nhật trạng thái người dùng!", error);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const user: UserType = {
      id: currentUser ? currentUser.id : 0,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      status: formData.get("status") === "true",
      role: formData.get("role") as "ADMIN" | "USER",
    };

    if (currentUser) {
      axios
        .put(`http://localhost:8080/profiveUser/${user.id}`, user)
        .then(() => {
          setUsers(users.map((u) => (u.id === user.id ? user : u)));
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi khi cập nhật người dùng!", error);
        });
    } else {
      axios
        .post("http://localhost:8080/profiveUser", user)
        .then((response) => {
          setUsers([...users, response.data]);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi khi tạo người dùng!", error);
        });
    }
  };

  return (
    <div>
      <div className="main">
        <div className="nav_gallery">
          <div className="nav_gallery_left">
            <p>Người dùng</p>
            <h4 className="text1">người dùng</h4>
          </div>
          <div className="nav_gallery_right">
            <button className="create" onClick={handleAddUser}>
              Thêm mới
            </button>
          </div>
        </div>
        {/* table */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col" style={{ minWidth: 200, maxWidth: 200 }}>
                Tài khoản
              </th>
              <th scope="col" style={{ minWidth: 200, maxWidth: 200 }}>
                Mật khẩu
              </th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.status ? "Active" : "Inactive"}</td>
                  <td><button
                      className="btn-status"
                      onClick={() => handleStatusChange(user)}
                    >
                      Thay đổi trạng thái
                    </button></td>
                  <td>
                    
                    <button
                      className="btn-edit"
                      onClick={() => handleEditUser(user)}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <Modal
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            width: '400px',
          },
        }}
        >
          <h2>
            {currentUser ? "Chỉnh sửa người dùng" : "Thêm mới người dùng"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                defaultValue={currentUser?.firstName || ""}
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                defaultValue={currentUser?.lastName || ""}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                defaultValue={currentUser?.email || ""}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                defaultValue={currentUser?.password || ""}
                required
              />
            </div>
            <div>
              <label>Status</label>
              <select
                name="status"
                defaultValue={currentUser?.status ? "true" : "false"}
                required
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <div>
              <label>Role</label>
              <select
                name="role"
                defaultValue={currentUser?.role || "USER"}
                required
              >
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
              </select>
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
