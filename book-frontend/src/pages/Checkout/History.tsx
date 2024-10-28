import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Order, OrderDetailDTO, LoginResponse } from "../../API/ApiClient";
import { getOrderByUsId, getOrderDetailsbyOrderid } from "../../API/ApiClient";
import Swal from "sweetalert2";
// Định nghĩa kiểu cho props
interface HistoryProps {
  setIsAdmin: (isAdmin: boolean) => void; // Hàm thay đổi trạng thái admin
}
const History: React.FC<HistoryProps> = ({ setIsAdmin }) => {
  const { userId } = useParams<{ userId: string }>(); // Lấy giá trị ItemId từ URL
  const [account, setAccount] = useState<LoginResponse | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null); // Khởi tạo order là null
  const [orderdetails, setOrderdetails] = useState<OrderDetailDTO[] | null>(
    null
  ); // Khởi tạo order là null
  useEffect(() => {
    setIsAdmin(false);
    getOrderbyCustomer(Number(userId));
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
  }, []);

  const getOrderbyCustomer = async (Id: number) => {
    try {
      const ordersData = await getOrderByUsId(Id);
      setOrders(ordersData);
    } catch (error) {
      console.error("Failed to load Order", error); // Sửa thông báo lỗi
    }
  };

  const getOrderDetailbid = async (Id: number) => {
    try {
      const orderdetailsData = await getOrderDetailsbyOrderid(Id);
      setOrderdetails(orderdetailsData);
      return orderdetailsData; // Trả về dữ liệu trực tiếp
    } catch (error) {
      console.error("Failed to load OrderDetail", error); // Sửa thông báo lỗi
      return []; // Trả về mảng rỗng nếu có lỗi
    }
  };

  //show detail
  const handleShowOrderDetail = async (Id: number) => {
    try {
      const orderdetailsData = await getOrderDetailbid(Id); // Đợi lấy dữ liệu từ API
      if (orderdetailsData && orderdetailsData.length > 0) {
        Swal.fire({
          title: "Order List",
          html: `
            <table style="width:100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="border: 1px solid #dddddd; padding: 8px;">Order Detail ID</th>
                  <th style="border: 1px solid #dddddd; padding: 8px;">Book Title</th>
                  <th style="border: 1px solid #dddddd; padding: 8px;">Book Image</th>
                  <th style="border: 1px solid #dddddd; padding: 8px;">Quantity</th>
                  <th style="border: 1px solid #dddddd; padding: 8px;">Unit Price</th>
                </tr>
              </thead>
              <tbody>
                ${orderdetailsData
                  .map(
                    (orderdetail) => `
                  <tr>
                    <td style="border: 1px solid #dddddd; padding: 8px;">${orderdetail.orderdetailID}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">${orderdetail.bookTitle}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">
                      <img src="${orderdetail.bookImage}" alt="" style="width:50px" />
                    </td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">${orderdetail.quantity}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">${orderdetail.unitprice}$</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          `,
          width: "80%",
          showCloseButton: true,
        });
      } else {
        Swal.fire("No details found for this order");
      }
    } catch (error) {
      console.error("Failed to load books", error); // Sửa thông báo lỗi
    }
  };

  return (
    <div>
      <section
        className="hero-section position-relative padding-large"
        style={{
          backgroundImage:
            "url(https://firebasestorage.googleapis.com/v0/b/poly-java6-8a32f.appspot.com/o/banner-image-bg.jpg?alt=media&token=01ce541c-b584-4d1d-9d83-96375e1deb43)",
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
                <h1>List Order</h1>

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
      {account ? (
        <section className="mt-5">
          <div className="container mt-3">
            <h2>List Order</h2>
            <p>
              You can view invoice details when clicking the button{" "}
              <span className="btn btn-info text-white">Detail</span>{" "}
            </p>
            <table className="table table-bordered">
              <thead>
                <tr className="text-center">
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Total Price</th>
                  <th>Order Status</th>
                  <th>Shipping Address</th>
                  <th>Payment Method</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders ? (
                  orders.map((order, i) => (
                    <tr key={i} className="text-center">
                      <td>{order.orderID}</td>
                      <td>{new Date(order.orderdate).toLocaleDateString()}</td>
                      <td>{order.totalprice}</td>
                      <td className="text-center">
                        {" "}
                        <span
                          className={
                            order.orderstatus === "đang xử lý" ||
                            order.orderstatus === "Ðang x? lý"
                              ? "btn bg-danger text-center text-white"
                              : "btn bg-success text-center text-white"
                          }
                        >
                          {order.orderstatus}
                        </span>
                      </td>
                      <td>{order.shippingaddress}</td>
                      <td>{order.paymentmethod}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => handleShowOrderDetail(order.orderID)}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div>Loading.........</div>
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <div>Loading.........</div>
      )}
    </div>
  );
};

export default History;
