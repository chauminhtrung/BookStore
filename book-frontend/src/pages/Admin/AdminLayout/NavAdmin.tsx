import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// Định nghĩa kiểu cho props
interface NavAdminBookProps {
  setIsAdmin: (isAdmin: boolean) => void; // Hàm thay đổi trạng thái admin
}

const NavAdmin: React.FC<NavAdminBookProps> = ({ setIsAdmin }) => {
  useEffect(() => {
    setIsAdmin(true);
  }, []);
  return (
    <div className="">
      <div className="row">
        <div
          className="sidebar_column col-2 d-flex flex-column flex-shrink-0 p-4"
          style={{
            width: "280px",
            height: "696px",
            backgroundColor: "#0f172a",
            borderRadius: "10px",
          }}
        >
          <ul className="nav nav-pills flex-column mb-auto mt-2">
            <li className="text-uppercase text-secondary fw-bold mb-3 ms-1 ">
              Quản lý
            </li>

            <li className="nav-item">
              <Link
                to="/admin/ManagerBook"
                className="nav-link bg-transparent text-white "
                aria-current="page"
              >
                <i
                  className="fa-solid fa-book me-2"
                  style={{ width: "16", height: "16" }}
                ></i>
                Sách
              </Link>
            </li>
            <li>
              <Link
                to="/admin/ManagerCustomer"
                className="nav-link bg-transparent text-white"
              >
                <i
                  className="fa-solid fa-users-gear me-2"
                  style={{ width: "16", height: "16" }}
                ></i>
                Tài khoản
              </Link>
            </li>
            <li>
              <a
                href="/manager/Orders"
                className="nav-link bg-transparent text-white"
              >
                <i
                  className="fa-solid fa-user me-2"
                  style={{ width: "16", height: "16" }}
                ></i>
                Tác giả
              </a>
            </li>
            <li>
              <a
                href="/manager/Authorities"
                className="nav-link bg-transparent text-white"
              >
                <i
                  className="fa-solid fa-money-bills me-2"
                  style={{ width: "16", height: "16" }}
                ></i>
                Hóa đơn
              </a>
            </li>
            <li>
              <a
                href="/manager/Statistical"
                className="nav-link bg-transparent text-white"
              >
                <i
                  className="fa-solid fa-user me-2"
                  style={{ width: "16", height: "16" }}
                ></i>
                Nhân viên
              </a>
            </li>
            <li>
              <a
                href="/manager/Statistical"
                className="nav-link bg-transparent text-white"
              >
                <i
                  className="fa-solid fa-chart-simple me-2"
                  style={{ width: "16", height: "16" }}
                ></i>
                Thống kê
              </a>
            </li>
            <li className="text-uppercase text-secondary fw-bold mb-3 ms-1 ">
              EDIT
            </li>
            <li>
              <a
                href="/manager/EditProducts"
                className="nav-link bg-transparent text-white"
              >
                <i
                  className="fa-solid fa-pen me-2"
                  style={{ width: "16", height: "16" }}
                ></i>
                Chỉnh sửa Sách
              </a>
            </li>
            <li>
              <a
                href="/manager/EditAccount"
                className="nav-link bg-transparent text-white"
              >
                <i
                  className="fa-solid fa-pen me-2"
                  style={{ width: "16", height: "16" }}
                ></i>
                Chỉnh sửa Tài khoản
              </a>
            </li>
            <li>
              <a
                href="/manager/EditAccount"
                className="nav-link bg-transparent text-white"
              >
                <i
                  className="fa-solid fa-pen me-2"
                  style={{ width: "16", height: "16" }}
                ></i>
                Tác giả
              </a>
            </li>
            <li>
              <a
                href="/manager/EditAccount"
                className="nav-link bg-transparent text-white"
              >
                <i
                  className="fa-solid fa-pen me-2"
                  style={{ width: "16", height: "16" }}
                ></i>
                Hóa đơn
              </a>
            </li>
            <li>
              <a
                href="/manager/EditAccount"
                className="nav-link bg-transparent text-white"
              >
                <i
                  className="fa-solid fa-pen me-2"
                  style={{ width: "16", height: "16" }}
                ></i>
                Nhân viên
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavAdmin;
