import { useParams, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { getBookById, getBookReviewByBookId } from "../../API/ApiClient";
import type { Book, BookReview } from "../../API/ApiClient";
import { LoginResponse } from "../../API/ApiClient";
import Swal from "sweetalert2";
// Định nghĩa kiểu cho props
interface ItemShopProps {
  setIsAdmin: (isAdmin: boolean) => void; // Hàm thay đổi trạng thái admin
}

interface CartItem extends Book {
  quantity: number;
}

const ItemShop: React.FC<ItemShopProps> = ({ setIsAdmin }) => {
  const { ItemId } = useParams<{ ItemId: string }>(); // Lấy giá trị ItemId từ URL
  //dat ten book moi dung h doi sua lai met :)))
  const [books, setBooks] = useState<Book | null>(null); // Sửa setBook và dùng null làm giá trị khởi tạo
  const [bookReviews, setBookReviews] = useState<BookReview[]>([]); // Sửa setBooks và dùng null làm giá trị khởi tạo
  const [quantity, setQuantity] = useState(1); // Khởi tạo giá trị số lượng
  const [account, setAccount] = useState<LoginResponse | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  // Hàm giảm số lượng
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Giảm số lượng nếu lớn hơn 1
    }
  };

  // Hàm tăng số lượng
  const handleIncrease = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1); // Tăng số lượng nếu nhỏ hơn 10
    }
  };

  useEffect(() => {
    if (ItemId) {
      getBook(Number(ItemId)); // Chuyển ItemId sang kiểu số
    }
    setIsAdmin(false);
  }, [ItemId]); // Thêm ItemId vào dependencies

  const getBook = async (Id: number) => {
    try {
      const booksData = await getBookById(Id); // getBookById là một API trả về dữ liệu
      const bookReviewsData = await getBookReviewByBookId(Id); // getBookReviewByBookId là một API trả về dữ liệu
      setBooks(booksData); // Cập nhật state
      setBookReviews(bookReviewsData);
    } catch (error) {
      console.error("Failed to load books", error); // Sửa thông báo lỗi
    }
  };

  // Hàm xử lý sự kiện Add to Cart
  const handleAddToCart = () => {
    if (books) {
      const newItem: CartItem = { ...books, quantity }; // Mỗi lần thêm vào giỏ, truyền số lượng hiện tại

      // Callback để nhận giỏ hàng hiện tại (prevCart)
      setCart((prevCart) => {
        // Tìm chỉ số của sản phẩm trong giỏ hàng
        const itemIndex = prevCart
          ? prevCart.findIndex((item) => item.bookID === books.bookID)
          : -1;

        let updatedCart;
        if (itemIndex > -1) {
          // Nếu sản phẩm đã tồn tại trong giỏ hàng

          updatedCart = [...prevCart]; // Sao chép giỏ hàng cũ
          // Cộng thêm số lượng đã chọn vào số lượng hiện có
          updatedCart[itemIndex].quantity += quantity;
        } else {
          // Nếu chưa tồn tại, thêm sản phẩm mới vào giỏ
          updatedCart = prevCart ? [...prevCart, newItem] : [newItem];
        }

        // Lưu giỏ hàng đã cập nhật vào localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart; // Trả về giỏ hàng đã cập nhật
      });

      // Hiển thị thông báo thành công
      Swal.fire({
        title: "Đã thêm vào giỏ hàng!",
        text: `${books.title} đã được thêm vào giỏ hàng.`,
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  // Dùng useEffect để theo dõi state books nếu cần log khi thay đổi
  useEffect(() => {
    if (books) {
      console.log(books); // Log giá trị mới của books khi nó thay đổi
    }
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
      console.log(cart);
    }
  }, [books]);

  // Tính toán số sao trung bình từ các đánh giá
  const averageRating =
    bookReviews.reduce((acc, review) => acc + review.rating, 0) /
    bookReviews.length;

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
                <h1>Shop-Detail</h1>
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
                    Shop-Detail
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {books && bookReviews ? (
        <section className="shop-details-section fix section-padding mt-5">
          <div className="container">
            <div className="shop-details-wrapper">
              <div className="row g-4">
                <div className="col-lg-5">
                  <div className="shop-details-image">
                    <div className="tab-content">
                      <div
                        id="thumb1"
                        className="tab-pane fade active show"
                        role="tabpanel"
                      >
                        <div className="shop-details-thumb">
                          <img width={200} src={books.imageURL} alt="img" />
                        </div>
                      </div>
                      <div
                        id="thumb2"
                        className="tab-pane fade"
                        role="tabpanel"
                      >
                        <div className="shop-details-thumb">
                          <img width={200} src={books.imageURL} alt="img" />
                        </div>
                      </div>
                    </div>
                    <ul className="nav" role="tablist">
                      <li className="nav-item" role="presentation">
                        <a
                          href="#thumb1"
                          data-bs-toggle="tab"
                          className="nav-link active"
                          aria-selected="true"
                          role="tab"
                          tabIndex={-1}
                        >
                          <img width={74} src={books.imageURL} alt="img" />
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          href="#thumb2"
                          data-bs-toggle="tab"
                          className="nav-link"
                          role="tab"
                          tabIndex={-1}
                        >
                          <img width={74} src={books.imageURL} alt="img" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="shop-details-content">
                    <div className="title-wrapper">
                      <h2>{books.title}</h2>
                      <h5>Stock availability.</h5>
                    </div>
                    <div className="star">
                      {Array.from({ length: 5 }, (_, index) => {
                        const starClass =
                          index < averageRating
                            ? "fa fa-star"
                            : "fa-regular fa-star";
                        return (
                          <a key={index} href="shop-details.html">
                            <i className={starClass}></i>
                          </a>
                        );
                      })}
                      <span>({bookReviews.length} Customer Reviews)</span>
                    </div>
                    <p>{books.description}</p>
                    <div className="price-list">
                      <h3>${books.price}</h3>
                    </div>
                    <div className="cart-wrapper">
                      <div className="quantity-basket">
                        <p className="qty">
                          <button
                            className="qtyminus"
                            onClick={handleDecrease}
                            aria-hidden="true"
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
                            value={quantity} // Gán giá trị từ state vào input
                            readOnly // Đặt input là chỉ đọc để người dùng không nhập giá trị trực tiếp
                          />
                          <button
                            onClick={handleIncrease}
                            className="qtyplus"
                            aria-hidden="true"
                          >
                            +
                          </button>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="theme-btn style-2 mb-3"
                        data-bs-toggle="modal"
                        data-bs-target="#readMoreModal"
                      >
                        Read A little
                      </button>
                      {/* model read more */}
                      <div
                        className="modal fade"
                        id="readMoreModal"
                        tabIndex={-1}
                        aria-labelledby="readMoreModalLabel"
                        style={{ display: "none" }}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div
                              className="modal-body"
                              style={{
                                backgroundImage:
                                  "url(https://firebasestorage.googleapis.com/v0/b/poly-java6-8a32f.appspot.com/o/bga.jpg?alt=media&token=dbfb8f58-5d9d-40f4-ba19-5b90a998389a)",
                              }}
                            >
                              <div className="close-btn">
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="readMoreBox">
                                <div className="content">
                                  <h3 id="readMoreModalLabel">{books.title}</h3>
                                  <p>
                                    Educating the Public <br />
                                    Political books play a crucial role in
                                    educating the public about political
                                    theories, historical events, policies, and
                                    the workings of governments. They provide
                                    readers with insights into complex political
                                    concepts and the historical context behind
                                    current events, helping to foster a more
                                    informed citizenry. <br />
                                    <br />
                                    Shaping Public Opinion <br />
                                    Authors of political books often aim to
                                    influence public opinion by presenting
                                    arguments and perspectives on various
                                    issues. These books can sway readers' views,
                                    either reinforcing their existing beliefs or
                                    challenging them to consider alternative
                                    viewpoints. This influence can extend to
                                    political debates and discussions in the
                                    public sphere. <br />
                                    <br />
                                    Documenting History <br />
                                    Political books serve as valuable records of
                                    historical events and political movements.
                                    They document the thoughts, actions, and
                                    decisions of political leaders and
                                    activists, providing future generations with
                                    a detailed account of significant periods
                                    and events. This historical documentation is
                                    essential for understanding the evolution of
                                    political systems and ideologies.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={
                          account
                            ? handleAddToCart
                            : () =>
                                Swal.fire({
                                  title: "Chưa đăng nhập!",
                                  text: `bạn chưa đăng nhập để thêm vào giỏ hàng.`,
                                  icon: "error",
                                  confirmButtonText: "OK",
                                })
                        }
                        className="theme-btn mb-3"
                      >
                        <i className="fa-solid fa-basket-shopping"></i> Add To
                        Cart
                      </button>

                      <div className="icon-box mb-3">
                        <a href="shop-details.html" className="icon">
                          <i className="far fa-heart"></i>
                        </a>
                        <a href="shop-details.html" className="icon-2">
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/poly-java6-8a32f.appspot.com/o/shuffle.svg?alt=media&token=ad9fb5b8-b9f8-44a0-a60a-b3646a5327f8"
                            alt="svg-icon"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="category-box">
                      <div className="category-list">
                        <ul>
                          <li>
                            <span>Author:</span>{" "}
                            {books && books.author ? (
                              <Link
                                className="text-dark"
                                to={`/AuthorProfile/${books.author.authorID}`}
                              >
                                {/* Nội dung link */}
                                {books.author.name}
                              </Link>
                            ) : (
                              <span>Thông tin tác giả chưa có</span> // Hiển thị nội dung khác nếu author chưa tải
                            )}
                          </li>
                          <li>
                            <span>Category:</span> {books.genre}
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <span>Pulication:</span> {books.publicationdate}
                          </li>
                          <li>
                            <span>Quanity:</span> {books.stockquantity}
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <span>publisher:</span> {books.publisher}
                          </li>
                          <li>
                            <span>Language:</span> {books.author.nationality}
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <span>SupllierID:</span> {books.supplier.supplierID}
                          </li>
                          <li>
                            <span>SupllierID:</span> {books.supplier.name}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ItemShop;
