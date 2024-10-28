import React from "react";
// Định nghĩa kiểu cho props
interface HeaderAdminProps {
  namQuanLy: string; // Chuỗi tên quản lý
}

export const HeaderAdmin: React.FC<HeaderAdminProps> = ({ namQuanLy }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <a className="navbar-brand position-absolute" href="/home">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/poly-java6-8a32f.appspot.com/o/logo.png?alt=media&token=cccd5b67-2abb-4eab-95ef-d5dc40a952a9"
          width="200"
        />
      </a>
      <div style={{ marginLeft: "270px" }}>
        <h1 className="d-flex flex-column text-dark fw-bolder fs-3 mb-0">
          Quản Lý
        </h1>
        <ul className="breadcrumb fw-bold fs-7 pt-1">
          <li className="breadcrumb-item text-muted">
            <p className="text-muted text-hover-primary">
              Vai trò: Admin - <a href=""> {namQuanLy}</a>
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HeaderAdmin;
