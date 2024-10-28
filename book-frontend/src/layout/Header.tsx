import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { login, LoginRequest, LoginResponse, Book } from "../API/ApiClient";
import { Box, FormControl, MenuItem, Menu } from "@mui/material";
import Swal from "sweetalert2";

interface CartItem extends Book {
  quantity: number;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [signInData, setSignInData] = useState<LoginRequest>({
    phone: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState<{
    phone: string;
    password: string;
  }>({
    phone: "",
    password: "",
  });
  const [account, setAccount] = useState<LoginResponse | null>(null);
  const [cart, setCart] = useState<CartItem[] | null>(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //logout
  const handleLogout = () => {
    Swal.fire({
      title: "Đăng xuất thành công!",
      text: "", // Lấy thông điệp từ phản hồi
      icon: "success",
      confirmButtonText: "OK",
    });
    setAccount(null);
    setAnchorEl(null);
    localStorage.removeItem("account"); // Xóa tài khoản đã lưu khỏi localStorage
    navigate(location.pathname); // Điều hướng đến trang
  };

  console.log(account);
  //khi thay doi ben tab login se nhan cac du lieu tu the input khi ng dung nhap
  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //name o day la cac cai input khi su dung ham nay va gia tri cua no
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };

  //khi thay doi ben tab Resgis se nhan cac du lieu tu the input khi ng dung nhap
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //name o day la cac cai input khi su dung ham nay va gia tri cua no
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  //nhan vao nut submit form login
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: LoginResponse = await login(signInData);
      // Xử lý phản hồi thành công
      setAccount(response);
      console.log("Đăng nhập thành công", response);
      // Lưu account vào Local Storage
      if (response.data) {
        localStorage.setItem("account", JSON.stringify(response.data)); // Lưu tài khoản
        console.log("Tài khoản đã lưu:", response.data.name);
      }
      // Tắt modal bằng cách thêm thuộc tính vào nút
      document.getElementById("closeModalButton")?.click();
      // Hiển thị thông báo thành công bằng SweetAlert2
      Swal.fire({
        title: "Đăng nhập thành công!",
        text: "", // Lấy thông điệp từ phản hồi
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate(location.pathname); // Điều hướng đến trang
    } catch (error) {
      console.error("Đăng nhập thất bại", error);
      Swal.fire({
        title: "Đăng nhập thất bại!",
        text: "Vui lòng kiểm tra thông tin đăng nhập của bạn.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  //nhan vao nut submit form regis
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý đăng ký ở đây
    console.log("Đăng ký với dữ liệu", registerData);
    // Hiển thị thông báo thành công cho đăng ký
    Swal.fire({
      title: "Đăng ký thành công!",
      text: "Vui lòng kiểm tra email để xác thực.",
      icon: "success",
      confirmButtonText: "OK",
    });
    setRegisterData({ phone: "", password: "" });
  };

  // Lấy dữ liệu từ localStorage khi component mount
  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    const storedCart = localStorage.getItem("cart");
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <header id="header" className="site-header">
      <div className="top-info border-bottom d-none d-md-block ">
        <div className="container-fluid">
          <div className="row g-0">
            <div className="col-md-4">
              <p className="fs-6 my-2 text-center">
                Need any help? Call us{" "}
                <a href="#" className="text-decoration-none text-black ">
                  112233344455
                </a>
              </p>
            </div>
            <div className="col-md-4 border-start border-end">
              <p className="fs-6 my-2 text-center">
                Summer sale discount off 60% off!{" "}
                <a
                  className="text-decoration-underline text-black"
                  href="shop.html"
                >
                  Shop Now
                </a>
              </p>
            </div>
            <div className="col-md-4">
              <p className="fs-6 my-2 text-center">
                2-3 business days delivery &amp; free returns
              </p>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg py-3" id="header-nav">
        <div className="container">
          <a className="navbar-brand" href="index.html">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/poly-java6-8a32f.appspot.com/o/logo.png?alt=media&token=cccd5b67-2abb-4eab-95ef-d5dc40a952a9"
              className="logo"
              style={{ width: "180px", height: "100px" }}
            />
          </a>
          <button
            className="navbar-toggler d-flex d-lg-none order-3 p-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#bdNavbar"
            aria-controls="bdNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={1}
            id="bdNavbar"
            aria-labelledby="bdNavbarOffcanvasLabel"
          >
            <div className="offcanvas-body">
              <ul
                id="navbar"
                className="navbar-nav text-uppercase justify-content-start justify-content-lg-center align-items-start align-items-lg-center flex-grow-1"
              >
                <li className="nav-item">
                  <Link className="nav-link me-4 active" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link me-4" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link me-4" to="/shop">
                    Shop
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link me-4" to="/blog">
                    Blogs
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link me-4 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-expanded="false"
                  >
                    Pages
                  </a>
                  <ul className="dropdown-menu animate slide border">
                    <li>
                      <Link to="/about" className="dropdown-item fw-light">
                        About{" "}
                        <span
                          className="badge"
                          style={{ backgroundColor: " #682d37" }}
                        >
                          Pro
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop" className="dropdown-item fw-light">
                        Shop{" "}
                        <span
                          className="badge"
                          style={{ backgroundColor: " #682d37" }}
                        >
                          Pro
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="single-product.html"
                        style={{ textDecoration: "none" }}
                        className="dropdown-item fw-light"
                      >
                        Single Product{" "}
                        <span
                          className="badge"
                          style={{ backgroundColor: " #682d37" }}
                        >
                          Pro
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/cart" className="dropdown-item fw-light">
                        Cart{" "}
                        <span
                          className="badge"
                          style={{ backgroundColor: " #682d37" }}
                        >
                          Pro
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/checkout" className="dropdown-item fw-light">
                        Checkout{" "}
                        <span
                          className="badge"
                          style={{ backgroundColor: " #682d37" }}
                        >
                          Pro
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/blog" className="dropdown-item fw-light">
                        Blog{" "}
                        <span
                          className="badge"
                          style={{ backgroundColor: " #682d37" }}
                        >
                          Pro
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/single-post"
                        className="dropdown-item fw-light"
                      >
                        Single Post{" "}
                        <span
                          className="badge"
                          style={{ backgroundColor: " #682d37" }}
                        >
                          Pro
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="dropdown-item fw-light">
                        Contact{" "}
                        <span
                          className="badge"
                          style={{ backgroundColor: " #682d37" }}
                        >
                          Pro
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link me-4" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-decoration-underline me-4"
                    href="https://templatesjungle.gumroad.com/l/bookly-bookstore-ecommerce-bootstrap-html-css-website-template"
                    target="_blank"
                  >
                    Get Pro
                  </a>
                </li>
              </ul>
              <div className="user-items d-flex">
                <ul className="d-flex justify-content-end list-unstyled mb-0">
                  <li className="search-item pe-4">
                    <a href="#" className="search-button">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </a>
                  </li>
                  <li className="pe-4">
                    {account !== null ? (
                      <div>
                        <i
                          className="fa-solid fa-user-minus"
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                        ></i>
                        {open === true ? (
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem>
                              <FormControl size="small" sx={{ width: 130 }}>
                                <MenuItem value={"Infor"}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                    Infor
                                  </Box>
                                </MenuItem>
                                <MenuItem value={"MyOrder"}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <i className="fa-solid fa-clipboard"></i>
                                    <a
                                      style={{
                                        textDecoration: "none",
                                        color: "black",
                                      }}
                                      href={`/history/${account.customerID}`}
                                    >
                                      My Order
                                    </a>
                                  </Box>
                                </MenuItem>
                                <MenuItem
                                  value={"Logout"}
                                  onClick={handleLogout}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    Log-out
                                  </Box>
                                </MenuItem>
                              </FormControl>
                            </MenuItem>
                          </Menu>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <i className="fa-regular fa-user"></i>
                        </a>
                        {/* Modal  */}
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex={-1}
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header border-bottom-0">
                                <button
                                  type="button"
                                  id="closeModalButton"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <div className="tabs-listing">
                                  <nav>
                                    <div
                                      className="nav nav-tabs d-flex justify-content-center"
                                      id="nav-tab"
                                      role="tablist"
                                    >
                                      <button
                                        className="nav-link text-capitalize active"
                                        id="nav-sign-in-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#nav-sign-in"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-sign-in"
                                        aria-selected="true"
                                      >
                                        Sign In
                                      </button>
                                      <button
                                        className="nav-link text-capitalize"
                                        id="nav-register-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#nav-register"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-register"
                                        aria-selected="false"
                                        tabIndex={1}
                                      >
                                        Register
                                      </button>
                                    </div>
                                  </nav>
                                  <div
                                    className="tab-content"
                                    id="nav-tabContent"
                                  >
                                    <div
                                      className="tab-pane fade active show"
                                      id="nav-sign-in"
                                      role="tabpanel"
                                    >
                                      <form
                                        onSubmit={handleSignInSubmit}
                                        noValidate
                                      >
                                        <div className="form-group py-3">
                                          <label
                                            className="mb-2"
                                            htmlFor="username"
                                          >
                                            Phone{" "}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <input
                                            type="text"
                                            minLength={2}
                                            name="phone" // Sử dụng tên trường tương ứng với LoginRequest
                                            placeholder="Your Phone"
                                            className="form-control w-100 rounded-3 p-3"
                                            onChange={handleSignInChange}
                                            required
                                          />
                                        </div>
                                        <div className="form-group pb-3">
                                          <label
                                            className="mb-2"
                                            htmlFor="password"
                                          >
                                            Password *
                                          </label>
                                          <input
                                            type="password"
                                            minLength={2}
                                            name="password"
                                            placeholder="Your Password"
                                            className="form-control w-100 rounded-3 p-3"
                                            onChange={handleSignInChange}
                                            required
                                          />
                                        </div>
                                        <label className="py-3">
                                          <input
                                            type="checkbox"
                                            required
                                            className="d-inline"
                                          />
                                          <span className="label-body">
                                            Remember me
                                          </span>
                                          <span className="label-body">
                                            <a href="#" className="fw-bold">
                                              Forgot Password
                                            </a>
                                          </span>
                                        </label>
                                        <button
                                          type="submit"
                                          className="btn btn-dark w-100 my-3"
                                        >
                                          Login
                                        </button>
                                      </form>
                                    </div>

                                    <div
                                      className="tab-pane fade"
                                      id="nav-register"
                                      role="tabpanel"
                                    >
                                      <form onSubmit={handleRegisterSubmit}>
                                        <div className="form-group py-3">
                                          <label
                                            className="mb-2"
                                            htmlFor="register-email"
                                          >
                                            Your Phone *
                                          </label>
                                          <input
                                            type="text"
                                            minLength={2}
                                            name="phone" // Sử dụng tên trường cho phone
                                            placeholder="Your phone"
                                            className="form-control w-100 rounded-3 p-3"
                                            onChange={handleRegisterChange}
                                            value={registerData.phone}
                                            required
                                          />
                                        </div>
                                        <div className="form-group pb-3">
                                          <label
                                            className="mb-2"
                                            htmlFor="register-password"
                                          >
                                            Password *
                                          </label>
                                          <input
                                            type="password"
                                            minLength={2}
                                            name="password"
                                            placeholder="Your Password"
                                            className="form-control w-100 rounded-3 p-3"
                                            onChange={handleRegisterChange}
                                            value={registerData.password}
                                            required
                                          />
                                        </div>
                                        <label className="py-3">
                                          <input
                                            type="checkbox"
                                            required
                                            className="d-inline"
                                          />
                                          <span className="label-body">
                                            I agree to the{" "}
                                            <a href="#" className="fw-bold">
                                              Privacy Policy
                                            </a>
                                          </span>
                                        </label>
                                        <button
                                          type="submit"
                                          className="btn btn-dark w-100 my-3"
                                        >
                                          Register
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                  <li className="wishlist-dropdown dropdown pe-3">
                    <Link to="/wishlist" className="">
                      <i className="fa-regular fa-heart"></i>
                    </Link>
                  </li>
                  <li className="cart-dropdown ">
                    <a
                      href="/cart"
                      className="text-black"
                      role="button"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                      <span className="fs-6 fw-light">
                        {account ? cart?.length : <></>}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
