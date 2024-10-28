import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Book } from "../../API/ApiClient";
import { getAllBooks } from "../../API/ApiClient";

// Định nghĩa kiểu cho props
interface WishlistProps {
  setIsAdmin: (isAdmin: boolean) => void; // Hàm thay đổi trạng thái admin
}

const Wishlist: React.FC<WishlistProps> = ({ setIsAdmin }) => {
  const [books, setbooks] = useState<Book[]>([]);

  useEffect(() => {
    loadBooks();
    setIsAdmin(false);
  }, []);

  const loadBooks = async () => {
    try {
      const booksData = await getAllBooks();
      setbooks(booksData);
      console.log(books);
    } catch (error) {
      console.error("Failed to load authors", error);
    }
  };

  useEffect(() => {
    if (books) {
      console.log(books); // Log giá trị mới của books khi nó thay đổi
    }
  }, [books]);

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
                <h1>Wishlist</h1>
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
                    Wishlist
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Shop Wishlist Section Start  */}
      {books ? (
        <div className="cart-section section-padding mt-5 mb-5">
          <div className="container">
            <div className="main-cart-wrapper">
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table ">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {books.slice(0, 2).map((book, i) => (
                          <tr key={i}>
                            <td>
                              <span className="d-flex gap-5 align-items-center">
                                <Link to="/wishlist" className="remove-icon">
                                  <img
                                    src="https://firebasestorage.googleapis.com/v0/b/poly-java6-8a32f.appspot.com/o/icon-9.svg?alt=media&token=dce32f15-0b3f-4ef3-b6aa-118bec864f45"
                                    alt="img"
                                  />
                                </Link>
                                <span className="cart">
                                  <img
                                    src={book.imageURL}
                                    alt="img"
                                    width={52}
                                  />
                                </span>
                                <span className="cart-title">{book.title}</span>
                              </span>
                            </td>
                            <td>
                              <span className="cart-price">${book.price}</span>
                            </td>
                            <td>
                              <span className="stock-title">In Stock</span>
                            </td>
                            <td>
                              <span className="subtotal-price">$120.00</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>.......loading</div>
      )}
    </div>
  );
};

export default Wishlist;
