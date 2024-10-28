import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { LoginResponse, Book } from "../../API/ApiClient";
// Định nghĩa kiểu cho props
interface CartProps {
  setIsAdmin: (isAdmin: boolean) => void; // Hàm thay đổi trạng thái admin
}

interface CartItem extends Book {
  quantity: number;
}

const Cart: React.FC<CartProps> = ({ setIsAdmin }) => {
  const [account, setAccount] = useState<LoginResponse | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Khôi phục giỏ hàng từ localStorage khi khởi động component
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    setIsAdmin(false);
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
  }, []);

  // Hàm tính tổng giá trị tất cả sản phẩm
  const calculateTotal = () => {
    //ham reduce cho phep mot mang thanh 1 gia tri duy nhat
    return cart.reduce((total, book) => {
      return total + book.price * book.quantity;
    }, 0); // Tổng ban đầu là 0
  };

  const handleRemoveFromCart = (bookID: number) => {
    // Cập nhật giỏ hàng bằng cách lọc phần tử
    const updatedCart = cart.filter((item) => item.bookID !== bookID);
    setCart(updatedCart); // Cập nhật state
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (bookID: number) => {
    const updatedCart = cart.map((item) => {
      if (item.bookID === bookID && item.quantity < 10) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (bookID: number) => {
    const updatedCart = cart.map((item) => {
      if (item.bookID === bookID && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleUpdateCart = () => {
    // Lưu giỏ hàng hiện tại vào localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Hiển thị thông báo thành công
    Swal.fire({
      title: "Đã update giỏ hàng!",
      text: `tất cả sản phẩm đã được cập nhật.`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div>
      <section
        className="hero-section position-relative padding-large"
        style={{
          backgroundImage: "url(./banner-image-bg.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "200px",
        }}
      >
        <div className="hero-content">
          <div className="container">
            <div className="row">
              <div className="text-center mt-5">
                <h1>Cart</h1>
                <div className="breadcrumbs">
                  <span className="item">
                    <Link
                      to="/home"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Home &gt;{" "}
                    </Link>
                  </span>
                  <span className="item text-decoration-underline">Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {cart && account ? (
        <div>
          {/* Shop Cart Section Start  */}
          <div className="cart-section section-padding mt-5 mb-5">
            <div className="container">
              <div className="main-cart-wrapper">
                <div className="row g-5">
                  <div className="col-xl-9">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((book, i) => (
                            <tr key={i}>
                              <td>
                                <span className="d-flex gap-5 align-items-center">
                                  <a
                                    href={"/cart"}
                                    className="remove-icon"
                                    onClick={() =>
                                      handleRemoveFromCart(book.bookID)
                                    }
                                  >
                                    <img
                                      src="https://firebasestorage.googleapis.com/v0/b/poly-java6-8a32f.appspot.com/o/icon-9.svg?alt=media&token=dce32f15-0b3f-4ef3-b6aa-118bec864f45"
                                      alt="img"
                                    />
                                  </a>
                                  <span className="cart">
                                    <img
                                      src={book.imageURL}
                                      alt="img"
                                      width={52}
                                    />
                                  </span>
                                  <span className="cart-title">
                                    {book.title}
                                  </span>
                                </span>
                              </td>
                              <td>
                                <span className="cart-price">
                                  ${book.price}
                                </span>
                              </td>
                              <td>
                                <span className="quantity-basket">
                                  <span className="qty">
                                    <button
                                      className="qtyminus"
                                      aria-hidden="true"
                                      onClick={() =>
                                        handleDecreaseQuantity(book.bookID)
                                      }
                                    >
                                      −
                                    </button>
                                    <input
                                      type="number"
                                      name="qty"
                                      id="qty2"
                                      min="1"
                                      max="10"
                                      step="1"
                                      value={book.quantity}
                                    />
                                    <button
                                      className="qtyplus"
                                      aria-hidden="true"
                                      onClick={() =>
                                        handleIncreaseQuantity(book.bookID)
                                      }
                                    >
                                      +
                                    </button>
                                  </span>
                                </span>
                              </td>
                              <td>
                                <span className="subtotal-price">
                                  ${(book.price * book.quantity).toFixed(2)}{" "}
                                  {/* Tổng giá */}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="cart-wrapper-footer">
                      <form action="shop-cart.html">
                        <div className="input-area">
                          <input
                            type="text"
                            name="Coupon Code"
                            id="CouponCode"
                            placeholder="Coupon Code"
                          />
                          <button type="submit" className="theme-btn ">
                            Apply
                          </button>
                        </div>
                      </form>
                      <button onClick={handleUpdateCart} className="theme-btn">
                        Update Cart
                      </button>
                    </div>
                  </div>
                  <div className="col-xl-3">
                    <div className="table-responsive cart-total">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Cart Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <span className="d-flex gap-5 align-items-center justify-content-between">
                                <span className="sub-title">Subtotal:</span>
                                <span className="sub-price">
                                  ${calculateTotal().toFixed(2)}
                                </span>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="d-flex gap-5 align-items-center  justify-content-between">
                                <span className="sub-title">Shipping:</span>
                                <span className="sub-text">Free</span>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="d-flex gap-5 align-items-center  justify-content-between">
                                <span className="sub-title">Total: </span>
                                <span className="sub-price sub-price-total">
                                  ${calculateTotal().toFixed(2)}
                                </span>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <Link to="/checkout" className="theme-btn mt-3">
                        Proceed to checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>.....loading</div>
      )}
    </div>
  );
};

export default Cart;
