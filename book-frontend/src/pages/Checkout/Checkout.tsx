import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type {
  LoginResponse,
  Book,
  Customer,
  Order,
  OrderDetail,
  Payment,
} from "../../API/ApiClient";
import {
  createOrder,
  createOrderDetails,
  createPayment,
} from "../../API/ApiClient";

import Swal from "sweetalert2";
// Định nghĩa kiểu cho props
interface CheckoutProps {
  setIsAdmin: (isAdmin: boolean) => void; // Hàm thay đổi trạng thái admin
}
interface CartItem extends Book {
  quantity: number;
}
const Checkout: React.FC<CheckoutProps> = ({ setIsAdmin }) => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<LoginResponse | null>(null);
  const [customer, setCustomer] = useState<Customer>({
    customerID: 0,
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");

  useEffect(() => {
    setIsAdmin(false);
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      const parsedAccount = JSON.parse(storedAccount);
      setAccount(parsedAccount);
      // Cập nhật customer sau khi account đã được lấy
      setCustomer({
        customerID: parsedAccount.customerID || 0,
        name: parsedAccount.name,
        email: parsedAccount.email,
        phoneNumber: parsedAccount.phonenumber || "",
        address: parsedAccount.address || "",
      });
    }
  }, []);

  const [order, setOrder] = useState<Order | null>(null); // Khởi tạo order là null

  useEffect(() => {
    if (customer.name) {
      // Chỉ tạo order nếu customer đã có tên
      setOrder({
        customer: customer,
        orderdate: new Date().toISOString().split("T")[0],
        totalprice: calculateTotal(),
        orderstatus: "đang xử lý",
        shippingaddress: customer.address,
        paymentmethod: selectedPaymentMethod,
      });
    }
  }, [customer, selectedPaymentMethod]); // Cập nhật khi customer hoặc paymentMethod thay đổi

  //tinh tong
  const calculateTotal = () => {
    return cart.reduce((total, book) => total + book.price * book.quantity, 0);
  };

  //thay doi payment
  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(event.target.value);
  };

  //tao order
  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(order);

    try {
      if (order) {
        // Gọi hàm tạo đơn hàng
        const createdOrder = await createOrder(order);

        // Kiểm tra nếu đơn hàng đã được tạo thành công
        if (createdOrder) {
          // Tạo các chi tiết đơn hàng
          const orderDetails: OrderDetail[] = cart.map((item) => ({
            order: createdOrder, // Lấy ID của đơn hàng mới tạo
            orderbook: item, // Giả sử mỗi mục trong cart có trường id
            quantity: item.quantity,
            unitprice: item.price,
          }));

          const createPaymenta: Payment = {
            order: createdOrder,
            paymentdate: new Date().toISOString().split("T")[0],
            paymentmethod: selectedPaymentMethod,
            amount: calculateTotal(),
          };

          // Gọi hàm tạo OrderDetail va createpayment
          await createOrderDetails(orderDetails);
          await createPayment(createPaymenta);
          // Xác nhận từ người dùng
          const result = await Swal.fire({
            title: "Đặt hàng thành công?",
            text: "Bạn có muốn chuyển đến xem hóa đơn không!",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có, chuyển đi!",
          });
          if (result) {
            // Điều hướng đến trang lịch sử với ID khách hàng
            window.location.href = `/History/${customer.customerID}`;
            localStorage.removeItem("cart");
          }
          if (!result) {
            // Điều hướng đến trang lịch sử với ID khách hàng
          }
        }
      }
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      Swal.fire({
        title: "Có lỗi xảy ra!",
        text: "Không thể tạo đơn hàng. Vui lòng thử lại.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
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
                <h1>Checkout</h1>
                <div className="breadcrumbs">
                  <span className="item">
                    <Link
                      to="/home"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Home &gt;{" "}
                    </Link>
                  </span>
                  <span className="item text-decoration-underline">
                    Checkout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {cart && account ? (
        <div className="checkout-wrap padding-large mt-5 mb-5">
          <div className="container">
            <form className="form-group">
              <div className="row d-flex flex-wrap">
                <div className="col-lg-6">
                  <h3 className="mb-3">Billing Details</h3>
                  <div className="billing-details">
                    <label htmlFor="fname">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="fname"
                      name="email"
                      className="form-control mt-2 mb-4 ps-3"
                      readOnly
                      value={account.name}
                    ></input>
                    <label htmlFor="email">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control mt-2 mb-4 ps-3"
                      readOnly
                      value={account.email}
                    ></input>
                    <label htmlFor="phone">
                      Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control mt-2 mb-4 ps-3"
                      readOnly
                      value={account.phonenumber}
                    ></input>
                    <label htmlFor="Address">
                      Address <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="Address"
                      name="Address"
                      className="form-control mt-2 mb-4 ps-3"
                      readOnly
                      value={account.address}
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div>
                    <h3 className="mb-3">Additional Information</h3>
                    <div className="billing-details">
                      <label htmlFor="fname">Order notes (optional)</label>
                      <textarea
                        className="form-control pt-3 pb-3 ps-3 mt-2"
                        placeholder="Notes about your order. Like special notes for delivery."
                      ></textarea>
                    </div>
                  </div>

                  <div className="cart-totals padding-medium pb-0">
                    <h3 className="mb-3">Cart Totals</h3>
                    <div className="total-price pb-3">
                      <table cellSpacing={0} className="table text-capitalize">
                        <tbody>
                          <tr className="subtotal pt-2 pb-2 border-top border-bottom">
                            <th>Subtotal</th>
                            <td data-title="Subtotal">
                              <span className="price-amount amount text-primary ps-5 fw-light">
                                <bdi
                                  style={{
                                    color: "#FF6500",
                                    fontWeight: "600",
                                  }}
                                >
                                  <span className="price-currency-symbol">
                                    $
                                  </span>
                                  {calculateTotal().toFixed(2)}
                                </bdi>
                              </span>
                            </td>
                          </tr>
                          <tr className="order-total pt-2 pb-2 border-bottom">
                            <th>Total</th>
                            <td data-title="Total">
                              <span className="price-amount amount text-primary ps-5 fw-light">
                                <bdi
                                  style={{
                                    color: "#FF6500",
                                    fontWeight: "600",
                                  }}
                                >
                                  <span className="price-currency-symbol">
                                    $
                                  </span>
                                  {calculateTotal().toFixed(2)}
                                </bdi>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="list-group">
                      <label className="list-group-item d-flex gap-2 border-0">
                        <input
                          className="form-check-input flex-shrink-0"
                          type="radio"
                          name="listGroupRadios"
                          id="listGroupRadios1"
                          value="Direct bank transfer"
                          checked={
                            selectedPaymentMethod === "Direct bank transfer"
                          }
                          onChange={handlePaymentChange}
                          required
                        />
                        <span>
                          <p className="mb-1">Direct bank transfer</p>
                          <small>
                            Make your payment directly into our bank account.
                            Please use your Order ID. Your order will be shipped
                            after funds have cleared in our account.
                          </small>
                        </span>
                      </label>
                      <label className="list-group-item d-flex gap-2 border-0">
                        <input
                          className="form-check-input flex-shrink-0"
                          type="radio"
                          name="listGroupRadios"
                          id="listGroupRadios2"
                          value="Check payments"
                          checked={selectedPaymentMethod === "Check payments"}
                          onChange={handlePaymentChange}
                          required
                        />
                        <span>
                          <p className="mb-1">Check payments</p>
                          <small>
                            Please send a check to Store Name, Store Street,
                            Store Town, Store State / County, Store Postcode.
                          </small>
                        </span>
                      </label>
                      <label className="list-group-item d-flex gap-2 border-0">
                        <input
                          className="form-check-input flex-shrink-0"
                          type="radio"
                          name="listGroupRadios"
                          id="listGroupRadios3"
                          value="Cash on delivery"
                          checked={selectedPaymentMethod === "Cash on delivery"}
                          onChange={handlePaymentChange}
                          required
                        />
                        <span>
                          <p className="mb-1">Cash on delivery</p>
                          <small>Pay with cash upon delivery.</small>
                        </span>
                      </label>
                      <label className="list-group-item d-flex gap-2 border-0">
                        <input
                          className="form-check-input flex-shrink-0"
                          type="radio"
                          name="listGroupRadios"
                          id="listGroupRadios4"
                          value="Paypal"
                          checked={selectedPaymentMethod === "Paypal"}
                          onChange={handlePaymentChange}
                          required
                        />
                        <span>
                          <p className="mb-1">Paypal</p>
                          <small>
                            Pay via PayPal; you can pay with your credit card if
                            you don’t have a PayPal account.
                          </small>
                        </span>
                      </label>
                    </div>
                    <div className="button-wrap mt-3">
                      <button
                        type="submit"
                        name="submit"
                        className="btn btn-dark"
                        onClick={handleCreateOrder}
                      >
                        Place an order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>Loading..........</div>
      )}
    </div>
  );
};

export default Checkout;
